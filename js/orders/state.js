/**
 * Orders State Module
 * Manages the data state for orders and editing session
 */

// Array di ordini salvati
export let savedOrders = [];

// Stato modifica ordine
export let editingState = {
    isEditing: false,
    orderId: null,
    orderData: null
};

// Preview state
export let currentPreviewOrderId = null;

/**
 * Aggiorna la lista degli ordini salvati
 * @param {Array} orders - Nuova lista ordini
 */
export function setSavedOrders(orders) {
    savedOrders = orders || [];
}

/**
 * Imposta lo stato di modifica
 * @param {string|number} id - ID Ordine
 * @param {Object} data - Dati ordine
 */
export function setEditingState(id, data) {
    editingState.isEditing = true;
    editingState.orderId = id;
    editingState.orderData = data;
    
    // Mantieni compatibilità con codice legacy che usa window
    window.editingOrderId = id;
    window.editingOrderData = data;
}

/**
 * Resetta lo stato di modifica
 */
export function resetEditingState() {
    editingState.isEditing = false;
    editingState.orderId = null;
    editingState.orderData = null;
    
    // Mantieni compatibilità legacy
    window.editingOrderId = null;
    window.editingOrderData = null;
}

/**
 * Imposta l'ID dell'ordine in anteprima
 * @param {string|number} id 
 */
export function setPreviewOrderId(id) {
    currentPreviewOrderId = id;
    window.currentPreviewOrderId = id; // Legacy compat
}