/**
 * Orders V2 - Service Layer
 * Operazioni database Supabase per il modulo ordini
 */

import { supabase } from '../config.js';
import { applyFiltersToQuery, filterOrdersByROACStatus, filterOrdersByProduct } from './filter.js';
import { filters, setOrders, setPagination, pagination } from './state.js';
import { notify } from '../shared/notifications.js';

// ============================================================================
// FETCH ORDERS
// ============================================================================

/**
 * Recupera gli ordini dal database con i filtri applicati
 * @param {Object} customFilters - Filtri opzionali (default: usa stato globale)
 * @returns {Promise<Array>} - Array di ordini
 */
export async function fetchOrders(customFilters = null) {
    // Use window.ordersState.filters as fallback to ensure we get latest state
    const currentFilters = customFilters || window.ordersState?.filters || filters;

    try {
        console.log('[OrdersV2] Fetching orders with filters:', currentFilters.searchText);

        // Query semplice base (stessa del modulo orders esistente)
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            console.error('[OrdersV2] Query error:', error);
            throw error;
        }

        let orders = data || [];
        console.log('[OrdersV2] Loaded orders from DB:', orders.length);

        // Filtro periodo - client side
        if (currentFilters.month && currentFilters.year) {
            const startDate = new Date(currentFilters.year, currentFilters.month - 1, 1);
            const endDate = new Date(currentFilters.year, currentFilters.month, 0, 23, 59, 59);

            orders = orders.filter(order => {
                const orderDate = new Date(order.date || order.created_at);
                return orderDate >= startDate && orderDate <= endDate;
            });
        }

        // Filtro ricerca testuale - client side
        if (currentFilters.searchText && currentFilters.searchText.trim()) {
            const search = currentFilters.searchText.trim().toLowerCase();
            orders = orders.filter(order => {
                // Convert all fields to string before searching
                const name = String(order.customer_name || '').toLowerCase();
                const email = String(order.customer_email || '').toLowerCase();
                const phone = String(order.customer_phone || '').toLowerCase();
                const notes = String(order.notes || '').toLowerCase();
                const orderNumber = String(order.order_number || '').toLowerCase();
                const taxId = String(order.tax_id || '').toLowerCase();
                const fiscalCode = String(order.fiscal_code || '').toLowerCase();

                return name.includes(search) ||
                       email.includes(search) ||
                       phone.includes(search) ||
                       notes.includes(search) ||
                       orderNumber.includes(search) ||
                       taxId.includes(search) ||
                       fiscalCode.includes(search);
            });
        }

        // Filtri client-side per stato ROAC (se gli items hanno status)
        if (currentFilters.status === 'open' || currentFilters.status === 'closed') {
            orders = filterOrdersByROACStatus(orders, currentFilters.status);
        }

        // Filtro client-side per ricerca prodotti
        if (currentFilters.searchScope === 'product' && currentFilters.searchText) {
            orders = filterOrdersByProduct(orders, currentFilters.searchText);
        }

        // Aggiorna stato
        setOrders(orders);
        setPagination({ total: orders.length });

        console.log('[OrdersV2] Final orders count:', orders.length);
        return orders;

    } catch (error) {
        console.error('[OrdersV2] Errore fetch ordini:', error);
        // Mostra errore all'utente
        notify.error('Errore nel caricamento ordini: ' + error.message);
        throw error;
    }
}

/**
 * Recupera un singolo ordine per ID
 * @param {string|number} orderId - ID dell'ordine
 * @returns {Promise<Object>} - Ordine
 */
export async function fetchOrderById(orderId) {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

        if (error) throw error;
        return data;

    } catch (error) {
        console.error('[OrdersV2] Errore fetch ordine:', error);
        throw error;
    }
}

// ============================================================================
// UPDATE ORDER
// ============================================================================

/**
 * Aggiorna un ordine esistente
 * @param {string|number} orderId - ID dell'ordine
 * @param {Object} updates - Campi da aggiornare
 * @returns {Promise<Object>} - Ordine aggiornato
 */
export async function updateOrder(orderId, updates) {
    try {
        const { data, error } = await supabase
            .from('orders')
            .update(updates)
            .eq('id', orderId)
            .select()
            .single();

        if (error) throw error;
        return data;

    } catch (error) {
        console.error('[OrdersV2] Errore aggiornamento ordine:', error);
        throw error;
    }
}

/**
 * Aggiorna lo stato ROAC di un singolo item
 * @param {string|number} orderId - ID dell'ordine
 * @param {number} itemIndex - Indice dell'item nell'array
 * @param {string} newStatus - Nuovo stato ('R', 'O', 'A', 'C')
 * @returns {Promise<Object>} - Ordine aggiornato
 */
export async function updateItemStatus(orderId, itemIndex, newStatus) {
    try {
        // Prima recupera l'ordine corrente
        const order = await fetchOrderById(orderId);
        if (!order) throw new Error('Ordine non trovato');

        // Aggiorna lo stato dell'item specifico
        const items = [...(order.items || [])];
        if (itemIndex < 0 || itemIndex >= items.length) {
            throw new Error('Item non trovato');
        }

        items[itemIndex] = {
            ...items[itemIndex],
            status: newStatus,
            status_updated_at: new Date().toISOString()
        };

        // Salva l'ordine aggiornato
        return await updateOrder(orderId, { items });

    } catch (error) {
        console.error('[OrdersV2] Errore aggiornamento stato item:', error);
        throw error;
    }
}

/**
 * Aggiorna lo stato di tutti gli items di un ordine
 * @param {string|number} orderId - ID dell'ordine
 * @param {string} newStatus - Nuovo stato per tutti gli items
 * @returns {Promise<Object>} - Ordine aggiornato
 */
export async function updateAllItemsStatus(orderId, newStatus) {
    try {
        const order = await fetchOrderById(orderId);
        if (!order) throw new Error('Ordine non trovato');

        const items = (order.items || []).map(item => ({
            ...item,
            status: newStatus,
            status_updated_at: new Date().toISOString()
        }));

        return await updateOrder(orderId, { items });

    } catch (error) {
        console.error('[OrdersV2] Errore aggiornamento stato items:', error);
        throw error;
    }
}

// ============================================================================
// CANCEL ORDER
// ============================================================================

/**
 * Annulla un ordine
 * @param {string|number} orderId - ID dell'ordine
 * @param {string} reason - Motivo annullamento (opzionale)
 * @returns {Promise<Object>} - Ordine aggiornato
 */
export async function cancelOrder(orderId, reason = '') {
    try {
        return await updateOrder(orderId, {
            cancelled: true,
            cancelled_at: new Date().toISOString(),
            cancel_reason: reason
        });
    } catch (error) {
        console.error('[OrdersV2] Errore annullamento ordine:', error);
        throw error;
    }
}

/**
 * Ripristina un ordine annullato
 * @param {string|number} orderId - ID dell'ordine
 * @returns {Promise<Object>} - Ordine aggiornato
 */
export async function restoreOrder(orderId) {
    try {
        return await updateOrder(orderId, {
            cancelled: false,
            cancelled_at: null,
            cancel_reason: null
        });
    } catch (error) {
        console.error('[OrdersV2] Errore ripristino ordine:', error);
        throw error;
    }
}

// ============================================================================
// CREATE ORDER
// ============================================================================

/**
 * Crea un nuovo ordine
 * @param {Object} orderData - Dati dell'ordine
 * @returns {Promise<Object>} - Ordine creato
 */
export async function createOrder(orderData) {
    try {
        // Assicurati che ogni item abbia status iniziale 'R'
        const items = (orderData.items || []).map(item => ({
            ...item,
            status: item.status || 'R',
            status_updated_at: new Date().toISOString()
        }));

        // Genera numero ordine se non presente
        const orderNumber = orderData.order_number || await generateOrderNumber();

        const { data, error } = await supabase
            .from('orders')
            .insert([{
                ...orderData,
                items,
                order_number: orderNumber,
                cancelled: false,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) throw error;
        return data;

    } catch (error) {
        console.error('[OrdersV2] Errore creazione ordine:', error);
        throw error;
    }
}

/**
 * Genera un numero ordine univoco
 * @returns {Promise<string>} - Numero ordine nel formato YYYY-NNNNN
 */
async function generateOrderNumber() {
    const year = new Date().getFullYear();

    try {
        // Trova l'ultimo numero ordine dell'anno
        const { data } = await supabase
            .from('orders')
            .select('order_number')
            .ilike('order_number', `${year}-%`)
            .order('order_number', { ascending: false })
            .limit(1);

        let nextNumber = 1;
        if (data && data.length > 0) {
            const lastNumber = data[0].order_number.split('-')[1];
            nextNumber = parseInt(lastNumber, 10) + 1;
        }

        return `${year}-${String(nextNumber).padStart(5, '0')}`;

    } catch (error) {
        // Fallback: usa timestamp
        return `${year}-${Date.now().toString().slice(-5)}`;
    }
}

// ============================================================================
// DELETE ORDER
// ============================================================================

/**
 * Elimina definitivamente un ordine
 * @param {string|number} orderId - ID dell'ordine
 * @returns {Promise<boolean>} - True se eliminato
 */
export async function deleteOrder(orderId) {
    try {
        const { error } = await supabase
            .from('orders')
            .delete()
            .eq('id', orderId);

        if (error) throw error;
        return true;

    } catch (error) {
        console.error('[OrdersV2] Errore eliminazione ordine:', error);
        throw error;
    }
}

// ============================================================================
// STATISTICS
// ============================================================================

/**
 * Recupera statistiche rapide per il periodo corrente
 * @param {Object} periodFilters - Filtri periodo { month, year }
 * @returns {Promise<Object>} - Statistiche
 */
export async function fetchOrderStats(periodFilters = null) {
    const period = periodFilters || { month: filters.month, year: filters.year };

    const startDate = new Date(period.year, period.month - 1, 1);
    const endDate = new Date(period.year, period.month, 0, 23, 59, 59);

    try {
        const { data, error } = await supabase
            .from('orders')
            .select('id, total, cancelled, items')
            .gte('created_at', startDate.toISOString())
            .lte('created_at', endDate.toISOString());

        if (error) throw error;

        const orders = data || [];

        // Calcola statistiche
        const activeOrders = orders.filter(o => !o.cancelled);
        const stats = {
            totalOrders: orders.length,
            activeOrders: activeOrders.length,
            cancelledOrders: orders.filter(o => o.cancelled).length,
            totalRevenue: activeOrders.reduce((sum, o) => sum + (o.total || 0), 0),
            openOrders: 0,
            closedOrders: 0
        };

        // Conta ordini aperti/chiusi basandosi su ROAC
        activeOrders.forEach(order => {
            const items = order.items || [];
            const allClosed = items.length > 0 && items.every(item => item.status === 'C');
            if (allClosed) {
                stats.closedOrders++;
            } else {
                stats.openOrders++;
            }
        });

        return stats;

    } catch (error) {
        console.error('[OrdersV2] Errore fetch statistiche:', error);
        throw error;
    }
}

// ============================================================================
// GLOBAL EXPOSURE
// ============================================================================

if (typeof window !== 'undefined') {
    window.ordersService = {
        fetchOrders,
        fetchOrderById,
        updateOrder,
        updateItemStatus,
        updateAllItemsStatus,
        cancelOrder,
        restoreOrder,
        createOrder,
        deleteOrder,
        fetchOrderStats
    };
}
