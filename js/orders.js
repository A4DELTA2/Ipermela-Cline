/**
 * Orders - Main Controller
 * Modulo gestione ordini con logica ROAC (ex Orders V2, ora sistema principale)
 *
 * ROAC Status (Item-Level):
 * R = Richiesto - Ordine creato
 * O = Ordinato - Merce ordinata al fornitore
 * A = Arrivato - Merce arrivata in negozio
 * C = Chiuso - Cliente ha ritirato
 */

// ============================================================================
// RE-EXPORTS FROM SUB-MODULES
// ============================================================================

// State
export {
    orders,
    currentOrder,
    isLoading,
    filters,
    pagination,
    viewMode,
    ROAC_STATUS,
    ORDER_STATUS,
    PAYMENT_METHODS,
    SEARCH_SCOPES,
    setOrders,
    setCurrentOrder,
    setIsLoading,
    setFilters,
    resetFilters,
    setPagination,
    setViewMode,
    calculateOrderStatus,
    countItemsByStatus,
    generatePeriodOptions
} from './orders/state.js';

// Filter
export {
    applyFiltersToQuery,
    filterOrdersByROACStatus,
    filterOrdersByProduct,
    updateFiltersFromForm,
    getCurrentPeriodValue,
    resetAllFilters,
    getFiltersSummary
} from './orders/filter.js';

// Service
export {
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
} from './orders/service.js';

// DOM
export {
    renderOrdersModule,
    renderFilterBar,
    renderOrdersList,
    showOrdersV2Module,
    hideOrdersV2Module,
    setupEventListeners
} from './orders/dom.js';

// ============================================================================
// MODULE INITIALIZATION
// ============================================================================

import { setIsLoading } from './orders/state.js';
import { fetchOrders } from './orders/service.js';
import {
    renderOrdersModule,
    renderOrdersList,
    showOrdersV2Module as showModule,
    hideOrdersV2Module as hideModule,
    setupEventListeners as setupDomListeners
} from './orders/dom.js';

/**
 * Inizializza il modulo Orders V2
 * Configura event listeners e prepara la UI
 */
export function initOrdersV2() {
    console.log('[OrdersV2] Inizializzazione modulo...');

    // Crea il container se non esiste
    ensureModuleContainer();

    console.log('[OrdersV2] Modulo inizializzato');
}

/**
 * Setup degli event listeners del modulo
 * Chiamato da app.js durante l'inizializzazione
 */
export function setupOrdersV2EventListeners() {
    setupDomListeners();
}

/**
 * Apre il modulo Orders V2
 * @param {boolean} fetchData - Se true, carica gli ordini dal database
 */
export async function openOrdersV2(fetchData = true) {
    console.log('[OrdersV2] Apertura modulo...');

    ensureModuleContainer();
    showModule();

    if (fetchData) {
        setIsLoading(true);
        renderOrdersList();

        try {
            await fetchOrders();
        } catch (error) {
            console.error('[OrdersV2] Errore caricamento ordini:', error);
        } finally {
            setIsLoading(false);
        }

        renderOrdersList();
    }
}

/**
 * Chiude il modulo Orders V2
 */
export function closeOrdersV2() {
    console.log('[OrdersV2] Chiusura modulo...');
    hideModule();
}

/**
 * Assicura che il container del modulo esista nel DOM
 */
function ensureModuleContainer() {
    let container = document.getElementById('orders-v2-module');

    if (!container) {
        container = document.createElement('div');
        container.id = 'orders-v2-module';
        container.className = 'hidden';

        // Inserisci dopo l'header o all'inizio del body
        const body = document.body;
        const firstChild = body.firstChild;
        body.insertBefore(container, firstChild);
    }

    return container;
}

// ============================================================================
// GLOBAL EXPOSURE
// ============================================================================

if (typeof window !== 'undefined') {
    window.ordersV2 = {
        // Initialization
        init: initOrdersV2,
        open: openOrdersV2,
        close: closeOrdersV2,

        // Module visibility
        show: showModule,
        hide: hideModule,

        // Data operations
        fetchOrders,
        fetchOrderById: async (id) => {
            const { fetchOrderById } = await import('./orders/service.js');
            return fetchOrderById(id);
        },

        // Get current state
        getState: () => ({
            orders: window.ordersV2State?.orders || [],
            currentOrder: window.ordersV2State?.currentOrder,
            filters: window.ordersV2State?.filters,
            isLoading: window.ordersV2State?.isLoading
        })
    };
}
