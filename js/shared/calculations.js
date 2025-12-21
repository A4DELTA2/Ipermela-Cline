/**
 * @fileoverview Funzioni condivise per calcoli finanziari con IVA
 * @module shared/calculations
 */

import { IVA_MULTIPLIER, IVA_RATE } from '../config.js';

/**
 * Calcola i totali dell'ordine con breakdown IVA
 *
 * IMPORTANTE: I prezzi degli items sono IVA INCLUSA
 *
 * @param {Array<{price: number, quantity: number}>} items - Array di items del carrello
 * @returns {{subtotal: number, tax: number, total: number}} Totali calcolati
 *
 * @example
 * const totals = calculateTotals([
 *   { price: 122, quantity: 2 },
 *   { price: 61, quantity: 1 }
 * ]);
 * // Returns: { subtotal: 250, tax: 55, total: 305 }
 */
export function calculateTotals(items) {
  if (!items || items.length === 0) {
    return { subtotal: 0, tax: 0, total: 0 };
  }

  // Calcola totale IVA inclusa
  const totalIvaInclusa = items.reduce((sum, item) => {
    const itemPrice = item.price || 0;
    const itemQuantity = item.quantity || 1;
    return sum + (itemPrice * itemQuantity);
  }, 0);

  // Calcola subtotal (senza IVA)
  const subtotal = totalIvaInclusa / IVA_MULTIPLIER;

  // Calcola l'IVA
  const tax = totalIvaInclusa - subtotal;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(totalIvaInclusa.toFixed(2))
  };
}

/**
 * Calcola il subtotal da un totale IVA inclusa
 *
 * @param {number} totalIvaInclusa - Totale con IVA inclusa
 * @returns {number} Subtotal senza IVA
 *
 * @example
 * const subtotal = calculateSubtotal(122);
 * // Returns: 100
 */
export function calculateSubtotal(totalIvaInclusa) {
  const subtotal = totalIvaInclusa / IVA_MULTIPLIER;
  return parseFloat(subtotal.toFixed(2));
}

/**
 * Calcola l'importo IVA da un totale IVA inclusa
 *
 * @param {number} totalIvaInclusa - Totale con IVA inclusa
 * @returns {number} Importo IVA
 *
 * @example
 * const tax = calculateTax(122);
 * // Returns: 22
 */
export function calculateTax(totalIvaInclusa) {
  const subtotal = calculateSubtotal(totalIvaInclusa);
  return parseFloat((totalIvaInclusa - subtotal).toFixed(2));
}

/**
 * Formatta un prezzo in formato valuta Euro
 *
 * @param {number} amount - Importo da formattare
 * @returns {string} Prezzo formattato (es. "122,00 €")
 *
 * @example
 * formatPrice(122);
 * // Returns: "122,00 €"
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount || 0);
}
