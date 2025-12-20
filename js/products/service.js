/**
 * Products Service Module
 * Handles database interactions for products
 */

import { supabase } from '../config.js';

/**
 * Carica i prodotti personalizzati (custom) da Supabase
 * @returns {Promise<Array>} Array di prodotti custom
 */
export async function fetchCustomProducts() {
    const { data, error } = await supabase
        .from('custom_products')
        .select('*');

    if (error) {
        console.error('Errore caricamento prodotti personalizzati:', error.message);
        throw error;
    }

    return data || [];
}

/**
 * Salva un nuovo prodotto personalizzato nel database
 * @param {Object} product - Dati del prodotto
 * @returns {Promise<Object>} Dati del prodotto inserito
 */
export async function insertCustomProduct(product) {
    const { data, error } = await supabase
        .from('custom_products')
        .insert([product])
        .select();

    if (error) throw error;
    return data;
}