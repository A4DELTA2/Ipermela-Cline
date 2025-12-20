/**
 * Orders Service Module
 * Handles interactions with Supabase database
 */

import { supabase } from '../config.js';

/**
 * Carica tutti gli ordini dal database
 * @returns {Promise<Array>} Lista ordini
 */
export async function fetchOrdersFromDb() {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('id', { ascending: false });

    if (error) throw error;
    return data || [];
}

/**
 * Salva un nuovo ordine nel database
 * @param {Object} order - Oggetto ordine
 * @returns {Promise<Object>} Risultato operazione
 */
export async function createOrderInDb(order) {
    const result = await supabase
        .from('orders')
        .insert([order])
        .select();

    if (result.error) throw result.error;
    return result.data;
}

/**
 * Aggiorna un ordine esistente
 * @param {string|number} orderId - ID Ordine
 * @param {Object} updates - Dati da aggiornare
 * @returns {Promise<void>}
 */
export async function updateOrderInDb(orderId, updates) {
    const result = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId);

    if (result.error) throw result.error;
    return result.data; // Note: update might not return data depending on policy
}

/**
 * Elimina un ordine dal database
 * @param {string|number} orderId - ID Ordine
 * @returns {Promise<void>}
 */
export async function deleteOrderFromDb(orderId) {
    const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

    if (error) throw error;
}