/**
 * Products State Module
 * Manages the product list, filters, and search query
 */

import { defaultProducts } from '../data.js';

export let products = [...defaultProducts];
export let nextProductId = 400;
export let currentFilter = 'all';
export let currentSubcategory = 'all';
export let searchQuery = '';

/**
 * Aggiorna la lista completa dei prodotti
 * @param {Array} newProducts - Nuova lista prodotti
 */
export function setProducts(newProducts) {
    products = newProducts;
    updateNextProductId();
}

/**
 * Aggiunge un singolo prodotto alla lista
 * @param {Object} product - Prodotto da aggiungere
 */
export function addProduct(product) {
    products.push(product);
    updateNextProductId();
}

/**
 * Aggiorna l'ID per il prossimo prodotto custom
 */
function updateNextProductId() {
    if (products.length > 0) {
        nextProductId = Math.max(...products.map(p => p.id)) + 1;
    }
}

export function setCurrentFilter(filter) {
    currentFilter = filter;
}

export function setCurrentSubcategory(subcategory) {
    currentSubcategory = subcategory;
}

export function setSearchQuery(query) {
    searchQuery = query ? query.toLowerCase() : '';
}