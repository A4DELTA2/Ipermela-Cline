/**
 * AI Service Module
 * Handles AI-powered product advice via Groq API through Supabase Edge Function
 */

import { supabase } from '../config.js';
import { notify } from '../shared/notifications.js';

/**
 * Get AI product advice
 * @param {Object} productData - Product information
 * @param {string} userQuery - User's question (optional, defaults to general advice)
 * @returns {Promise<string>} - AI advice
 */
export async function getProductAdvice(productData, userQuery = 'Dammi un consiglio su questo prodotto') {
    try {
        console.log('[AI Service] Requesting advice for product:', productData.name);

        // Prepare product context
        const productContext = {
            id: productData.id,
            name: productData.name,
            price: productData.price || productData.basePrice,
            category: productData.category,
            colors: productData.colors,
            storage: productData.storage,
            configurations: productData.configurations,
            currentConfig: productData.currentConfig
        };

        // Call edge function
        const { data, error } = await supabase.functions.invoke('ai-advisor', {
            body: {
                action: 'advice',
                productContext,
                userQuery
            }
        });

        if (error) {
            console.error('[AI Service] Error:', error);
            throw error;
        }

        if (data.error) {
            throw new Error(data.error);
        }

        console.log('[AI Service] Received advice');
        return data.advice;

    } catch (error) {
        console.error('[AI Service] Failed to get advice:', error);
        notify.error('Errore nell\'ottenere il consiglio AI: ' + error.message);
        throw error;
    }
}

// Global exposure for onclick handlers
if (typeof window !== 'undefined') {
    window.aiService = {
        getProductAdvice
    };
}
