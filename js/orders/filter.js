/**
 * Orders V2 - Filter Logic
 * Gestione filtri e costruzione query Supabase
 */

import { filters, setFilters, resetFilters } from './state.js';

// ============================================================================
// FILTER QUERY BUILDER
// ============================================================================

/**
 * Costruisce i parametri della query Supabase basandosi sui filtri attivi
 * @param {Object} supabaseQuery - Query Supabase base (from('orders'))
 * @param {Object} currentFilters - Oggetto filtri corrente
 * @returns {Object} - Query Supabase con filtri applicati
 */
export function applyFiltersToQuery(supabaseQuery, currentFilters = filters) {
    let query = supabaseQuery;

    // Filtro periodo (mese/anno)
    if (currentFilters.month && currentFilters.year) {
        const startDate = new Date(currentFilters.year, currentFilters.month - 1, 1);
        const endDate = new Date(currentFilters.year, currentFilters.month, 0, 23, 59, 59);

        query = query
            .gte('created_at', startDate.toISOString())
            .lte('created_at', endDate.toISOString());
    }

    // Filtro metodo pagamento
    if (currentFilters.paymentMethod) {
        query = query.eq('payment_method', currentFilters.paymentMethod);
    }

    // Filtro stato ordine (basato su logica ROAC)
    // Nota: questo richiede una query più complessa lato server o post-filtering
    // Per ora lo gestiamo come flag 'cancelled' e poi filtriamo in JS per open/closed

    if (currentFilters.status === 'cancelled') {
        query = query.eq('cancelled', true);
    } else if (currentFilters.status !== 'all') {
        query = query.eq('cancelled', false);
    }

    // Filtro ricerca testuale
    if (currentFilters.searchText && currentFilters.searchText.trim()) {
        query = applySearchFilter(query, currentFilters.searchText, currentFilters.searchScope);
    }

    return query;
}

/**
 * Applica il filtro di ricerca testuale
 * @param {Object} query - Query Supabase
 * @param {string} searchText - Testo da cercare
 * @param {string} scope - Campo in cui cercare
 * @returns {Object} - Query con filtro applicato
 */
function applySearchFilter(query, searchText, scope) {
    const search = searchText.trim().toLowerCase();

    switch (scope) {
        case 'order_number':
            // Ricerca per numero ordine (ID)
            query = query.ilike('order_number', `%${search}%`);
            break;

        case 'customer':
            // Ricerca nel nome cliente
            query = query.ilike('customer_name', `%${search}%`);
            break;

        case 'tax_id':
            // Ricerca in P.IVA o Codice Fiscale
            query = query.or(`tax_id.ilike.%${search}%,fiscal_code.ilike.%${search}%`);
            break;

        case 'notes':
            // Ricerca nelle note
            query = query.ilike('notes', `%${search}%`);
            break;

        case 'product':
            // Ricerca nei prodotti (richiede join o post-filtering)
            // Per ora restituiamo la query e filtreremo in JS
            break;

        case 'all':
        default:
            // Ricerca in tutti i campi testuali
            query = query.or(
                `customer_name.ilike.%${search}%,` +
                `customer_email.ilike.%${search}%,` +
                `customer_phone.ilike.%${search}%,` +
                `notes.ilike.%${search}%,` +
                `order_number.ilike.%${search}%,` +
                `tax_id.ilike.%${search}%,` +
                `fiscal_code.ilike.%${search}%`
            );
            break;
    }

    return query;
}

// ============================================================================
// POST-QUERY FILTERS (Client-side)
// ============================================================================

/**
 * Filtra ordini lato client per stato ROAC (open/closed)
 * Necessario perché lo stato è calcolato dagli items
 * @param {Array} orders - Array di ordini
 * @param {string} statusFilter - 'all', 'open', 'closed'
 * @returns {Array} - Ordini filtrati
 */
export function filterOrdersByROACStatus(orders, statusFilter) {
    if (statusFilter === 'all' || statusFilter === 'cancelled') {
        return orders;
    }

    return orders.filter(order => {
        const items = order.items || [];
        if (items.length === 0) return statusFilter === 'open';

        const allClosed = items.every(item => item.status === 'C');

        if (statusFilter === 'closed') {
            return allClosed;
        } else if (statusFilter === 'open') {
            return !allClosed;
        }

        return true;
    });
}

/**
 * Filtra ordini per ricerca nei prodotti (client-side)
 * @param {Array} orders - Array di ordini
 * @param {string} searchText - Testo da cercare
 * @returns {Array} - Ordini che contengono prodotti matching
 */
export function filterOrdersByProduct(orders, searchText) {
    if (!searchText || !searchText.trim()) return orders;

    const search = searchText.trim().toLowerCase();

    return orders.filter(order => {
        const items = order.items || [];
        return items.some(item =>
            (item.name && item.name.toLowerCase().includes(search)) ||
            (item.sku && item.sku.toLowerCase().includes(search)) ||
            (item.description && item.description.toLowerCase().includes(search))
        );
    });
}

// ============================================================================
// FILTER STATE MANAGEMENT FROM UI
// ============================================================================

/**
 * Aggiorna i filtri dal form UI
 * @param {HTMLFormElement} formElement - Form element contenente i filtri
 * @returns {Object} - Nuovi filtri
 */
export function updateFiltersFromForm(formElement) {
    const formData = new FormData(formElement);

    // Helper to get first non-empty value from duplicate fields (mobile/desktop have same names)
    const getFirstNonEmpty = (name, defaultValue = '') => {
        const values = formData.getAll(name);
        return values.find(v => v && v.trim()) || defaultValue;
    };

    const newFilters = {
        searchText: getFirstNonEmpty('searchText', ''),
        searchScope: getFirstNonEmpty('searchScope', 'all'),
        status: getFirstNonEmpty('status', 'all'),
        paymentMethod: getFirstNonEmpty('paymentMethod', '')
    };

    // Parse periodo (formato: "month-year" o "all")
    const period = getFirstNonEmpty('period', 'all');
    if (period && period !== 'all') {
        const [month, year] = period.split('-').map(Number);
        newFilters.month = month;
        newFilters.year = year;
    } else {
        newFilters.month = null;
        newFilters.year = null;
    }

    console.log('[OrdersV2] Filters updated:', newFilters);
    setFilters(newFilters);
    return newFilters;
}

/**
 * Ottiene il valore del periodo corrente per il select
 * @returns {string} - Formato "month-year"
 */
export function getCurrentPeriodValue() {
    return `${filters.month}-${filters.year}`;
}

/**
 * Resetta tutti i filtri ai valori default
 */
export function resetAllFilters() {
    resetFilters();
}

// ============================================================================
// FILTER SUMMARY
// ============================================================================

/**
 * Genera un riepilogo testuale dei filtri attivi
 * @param {Object} currentFilters - Filtri correnti
 * @returns {string} - Descrizione dei filtri attivi
 */
export function getFiltersSummary(currentFilters = filters) {
    const parts = [];

    // Periodo
    if (currentFilters.month && currentFilters.year) {
        const date = new Date(currentFilters.year, currentFilters.month - 1, 1);
        parts.push(date.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' }));
    } else {
        parts.push('Tutti i periodi');
    }

    // Stato
    const statusLabels = {
        'all': 'Tutti',
        'open': 'Aperti',
        'closed': 'Chiusi',
        'cancelled': 'Annullati'
    };
    if (currentFilters.status !== 'all') {
        parts.push(statusLabels[currentFilters.status] || currentFilters.status);
    }

    // Pagamento
    if (currentFilters.paymentMethod) {
        const paymentLabels = {
            'bonifico': 'Bonifico',
            'contanti': 'Contanti',
            'pos': 'POS',
            'finanziamento': 'Finanziamento',
            'permuta': 'Permuta'
        };
        parts.push(paymentLabels[currentFilters.paymentMethod] || currentFilters.paymentMethod);
    }

    // Ricerca
    if (currentFilters.searchText) {
        parts.push(`"${currentFilters.searchText}"`);
    }

    return parts.join(' • ');
}

// ============================================================================
// GLOBAL EXPOSURE
// ============================================================================

if (typeof window !== 'undefined') {
    window.ordersFilter = {
        applyFiltersToQuery,
        filterOrdersByROACStatus,
        filterOrdersByProduct,
        updateFiltersFromForm,
        getCurrentPeriodValue,
        resetAllFilters,
        getFiltersSummary
    };
}
