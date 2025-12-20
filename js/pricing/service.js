/**
 * Pricing Service Module
 * Handles interactions with Supabase for price management
 */

import { supabase } from '../config.js';

/**
 * Recupera tutti i prezzi personalizzati dalla tabella product_prices
 */
export async function fetchProductPrices() {
    const { data, error } = await supabase
        .from('product_prices')
        .select('*');

    if (error) throw error;
    return data || [];
}

/**
 * Aggiorna il prezzo di un prodotto custom (aggiorna direttamente il prodotto)
 */
export async function updateCustomProductPriceInDb(productId, price) {
    const { error } = await supabase
        .from('custom_products')
        .update({ price: price })
        .eq('id', productId);

    if (error) throw error;
}

/**
 * Inserisce o aggiorna un prezzo personalizzato per un prodotto standard
 */
export async function upsertProductPriceInDb(productId, price, userId) {
    const { error } = await supabase
        .from('product_prices')
        .upsert({
            product_id: productId,
            custom_price: price,
            updated_by: userId
        }, {
            onConflict: 'product_id'
        });

    if (error) throw error;
}

/**
 * Inserisce o aggiorna prezzi multipli (batch operation)
 */
export async function upsertMultipleProductPricesInDb(updates) {
    const { error } = await supabase
        .from('product_prices')
        .upsert(updates, {
            onConflict: 'product_id'
        });

    if (error) throw error;
}

/**
 * Elimina un prezzo personalizzato (ripristina originale)
 */
export async function deleteProductPriceFromDb(productId) {
    const { error } = await supabase
        .from('product_prices')
        .delete()
        .eq('product_id', productId);

    if (error) throw error;
}

/**
 * Elimina TUTTI i prezzi personalizzati (reset totale)
 */
export async function deleteAllProductPricesFromDb() {
    const { error } = await supabase
        .from('product_prices')
        .delete()
        .neq('product_id', 0); // Hack per selezionare tutte le righe

    if (error) throw error;
}

/**
 * Elimina definitivamente un prodotto custom
 */
export async function deleteCustomProductFromDb(productId) {
    const { error } = await supabase
        .from('custom_products')
        .delete()
        .eq('id', productId);

    if (error) throw error;
}