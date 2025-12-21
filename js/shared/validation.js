/**
 * @fileoverview Funzioni condivise per validazione input
 * @module shared/validation
 */

/**
 * Valida un indirizzo email
 *
 * @param {string} email - Email da validare
 * @returns {boolean} True se valida, false altrimenti
 *
 * @example
 * validateEmail('test@example.com'); // true
 * validateEmail('invalid'); // false
 */
export function validateEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Valida un numero di telefono
 *
 * Accetta formati: +39 123 456 7890, 123-456-7890, (123) 456-7890, 1234567890
 *
 * @param {string} phone - Numero di telefono da validare
 * @returns {boolean} True se valido, false altrimenti
 *
 * @example
 * validatePhone('+39 123 456 7890'); // true
 * validatePhone('abc'); // false
 */
export function validatePhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/\s+/g, '');
  // Accetta numeri, +, -, (, )
  return /^[\d+\-()]+$/.test(cleaned) && cleaned.length >= 8;
}

/**
 * Valida che un campo non sia vuoto
 *
 * @param {string} value - Valore da validare
 * @returns {boolean} True se non vuoto, false altrimenti
 *
 * @example
 * validateRequired('Mario Rossi'); // true
 * validateRequired('   '); // false
 * validateRequired(''); // false
 */
export function validateRequired(value) {
  return value && value.trim().length > 0;
}

/**
 * Valida un prezzo (deve essere numero positivo)
 *
 * @param {number|string} price - Prezzo da validare
 * @returns {boolean} True se valido, false altrimenti
 *
 * @example
 * validatePrice(99.99); // true
 * validatePrice('99.99'); // true
 * validatePrice(-10); // false
 * validatePrice('abc'); // false
 */
export function validatePrice(price) {
  const num = parseFloat(price);
  return !isNaN(num) && num > 0;
}

/**
 * Valida un range numerico
 *
 * @param {number} value - Valore da validare
 * @param {number} min - Valore minimo (incluso)
 * @param {number} max - Valore massimo (incluso)
 * @returns {boolean} True se nel range, false altrimenti
 *
 * @example
 * validateRange(5, 1, 10); // true
 * validateRange(15, 1, 10); // false
 */
export function validateRange(value, min, max) {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
}

/**
 * Valida la lunghezza di una stringa
 *
 * @param {string} value - Stringa da validare
 * @param {number} minLength - Lunghezza minima
 * @param {number} [maxLength] - Lunghezza massima (opzionale)
 * @returns {boolean} True se valida, false altrimenti
 *
 * @example
 * validateLength('test', 2, 10); // true
 * validateLength('x', 2, 10); // false
 */
export function validateLength(value, minLength, maxLength = Infinity) {
  if (!value) return false;
  const length = value.trim().length;
  return length >= minLength && length <= maxLength;
}
