/**
 * Orders V2 - State Management
 * Gestione dello stato del modulo ordini con logica ROAC
 *
 * ROAC Status (Item-Level):
 * R = Richiesto - Ordine creato
 * O = Ordinato - Merce ordinata al fornitore
 * A = Arrivato - Merce arrivata in negozio
 * C = Chiuso - Cliente ha ritirato
 */

// ============================================================================
// ROAC STATUS CONSTANTS
// ============================================================================

export const ROAC_STATUS = {
    R: { code: 'R', label: 'Richiesto', color: 'blue', icon: '📋' },
    O: { code: 'O', label: 'Ordinato', color: 'yellow', icon: '📦' },
    A: { code: 'A', label: 'Arrivato', color: 'green', icon: '✅' },
    C: { code: 'C', label: 'Chiuso', color: 'gray', icon: '🏁' }
};

export const ORDER_STATUS = {
    OPEN: 'open',
    CLOSED: 'closed',
    CANCELLED: 'cancelled'
};

export const PAYMENT_METHODS = {
    ALL: { value: '', label: 'Tutti' },
    BONIFICO: { value: 'bonifico', label: 'Bonifico' },
    CONTANTI: { value: 'contanti', label: 'Contanti' },
    POS: { value: 'pos', label: 'POS' },
    FINANZIAMENTO: { value: 'finanziamento', label: 'Finanziamento' },
    PERMUTA: { value: 'permuta', label: 'Permuta' }
};

export const SEARCH_SCOPES = {
    ALL: { value: 'all', label: 'Tutti i campi' },
    ORDER_NUMBER: { value: 'order_number', label: 'Numero Ordine' },
    CUSTOMER: { value: 'customer', label: 'Cliente' },
    TAX_ID: { value: 'tax_id', label: 'P.IVA/CF' },
    NOTES: { value: 'notes', label: 'Note' },
    PRODUCT: { value: 'product', label: 'Prodotto' }
};

// ============================================================================
// STATE VARIABLES
// ============================================================================

// Orders data
export let orders = [];
export let currentOrder = null;
export let isLoading = false;

// Filter state
export let filters = {
    searchText: '',
    searchScope: 'all',
    month: null,  // null = tutti i mesi
    year: null,   // null = tutti gli anni
    status: 'all',  // 'all', 'open', 'closed', 'cancelled' - default tutti per vedere tutti gli ordini
    paymentMethod: ''
};

// Pagination
export let pagination = {
    page: 1,
    perPage: 20,
    total: 0
};

// View state
export let viewMode = 'list'; // 'list' or 'detail'

// ============================================================================
// STATE SETTERS
// ============================================================================

export function setOrders(newOrders) {
    orders = newOrders;
    window.ordersState = { ...window.ordersState, orders };
}

export function setCurrentOrder(order) {
    currentOrder = order;
    window.ordersState = { ...window.ordersState, currentOrder };
}

export function setIsLoading(loading) {
    isLoading = loading;
    window.ordersState = { ...window.ordersState, isLoading };
}

export function setFilters(newFilters) {
    filters = { ...filters, ...newFilters };
    window.ordersState = { ...window.ordersState, filters };
}

export function resetFilters() {
    filters = {
        searchText: '',
        searchScope: 'all',
        month: null,
        year: null,
        status: 'all',
        paymentMethod: ''
    };
    window.ordersState = { ...window.ordersState, filters };
}

export function setPagination(newPagination) {
    pagination = { ...pagination, ...newPagination };
    window.ordersState = { ...window.ordersState, pagination };
}

export function setViewMode(mode) {
    viewMode = mode;
    window.ordersState = { ...window.ordersState, viewMode };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calcola lo stato aggregato di un ordine basandosi sugli stati ROAC degli item
 * @param {Array} items - Array degli items dell'ordine
 * @returns {string} - 'open', 'closed', o 'cancelled'
 */
export function calculateOrderStatus(items) {
    if (!items || items.length === 0) return ORDER_STATUS.OPEN;

    const allClosed = items.every(item => item.status === 'C');
    if (allClosed) return ORDER_STATUS.CLOSED;

    return ORDER_STATUS.OPEN;
}

/**
 * Conta gli item per ogni stato ROAC
 * @param {Array} items - Array degli items dell'ordine
 * @returns {Object} - { R: n, O: n, A: n, C: n }
 */
export function countItemsByStatus(items) {
    const counts = { R: 0, O: 0, A: 0, C: 0 };

    if (!items) return counts;

    items.forEach(item => {
        if (counts.hasOwnProperty(item.status)) {
            counts[item.status]++;
        }
    });

    return counts;
}

/**
 * Genera le opzioni mese/anno per il filtro periodo
 * @param {number} monthsBack - Quanti mesi indietro mostrare
 * @returns {Array} - Array di oggetti { month, year, label }
 */
export function generatePeriodOptions(monthsBack = 24) {
    const options = [];
    const now = new Date();

    for (let i = 0; i < monthsBack; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        options.push({
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            label: date.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })
        });
    }

    return options;
}

// ============================================================================
// GLOBAL EXPOSURE
// ============================================================================

if (typeof window !== 'undefined') {
    window.ordersState = {
        orders,
        currentOrder,
        isLoading,
        filters,
        pagination,
        viewMode,
        ROAC_STATUS,
        ORDER_STATUS,
        PAYMENT_METHODS,
        SEARCH_SCOPES
    };
}
