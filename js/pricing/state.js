/**
 * Pricing State Module
 * Manages prices, filters, and search queries for the pricing management tool
 */

export let originalPrices = {};
export let modifiedPrices = {};
export let priceFilter = 'all';
export let priceSearchQuery = '';

/**
 * Imposta il prezzo originale di un prodotto
 */
export function setOriginalPrice(productId, price) {
    originalPrices[productId] = price;
}

/**
 * Imposta un prezzo modificato (pending save)
 */
export function setModifiedPrice(productId, price) {
    modifiedPrices[productId] = price;
}

/**
 * Rimuove un prezzo modificato (dopo salvataggio o reset)
 */
export function removeModifiedPrice(productId) {
    delete modifiedPrices[productId];
}

/**
 * Rimuove un prezzo originale (es. eliminazione prodotto)
 */
export function removeOriginalPrice(productId) {
    delete originalPrices[productId];
}

/**
 * Resetta tutti i prezzi modificati
 */
export function resetModifiedPrices() {
    // Svuota l'oggetto mantenendo il riferimento se possibile, o resettandolo
    for (const key in modifiedPrices) {
        delete modifiedPrices[key];
    }
}

export function setPriceFilter(filter) {
    priceFilter = filter;
}

export function setPriceSearchQuery(query) {
    priceSearchQuery = query ? query.toLowerCase() : '';
}