/**
 * Formatting Utilities - Formattazione date e numeri
 */

export const Formatting = {
    /**
     * Formatta una data in formato italiano
     * @param {Date|string} date - Data da formattare
     * @returns {string} Data formattata (es: "09/12/2025")
     */
    formatDate(date) {
        if (!date) return '';

        const d = date instanceof Date ? date : new Date(date);

        if (isNaN(d.getTime())) return '';

        return d.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    },

    /**
     * Formatta un numero come valuta euro
     * @param {number} amount - Importo da formattare
     * @param {boolean} includeSymbol - Se includere il simbolo €
     * @returns {string} Importo formattato (es: "123,45 €")
     */
    formatCurrency(amount, includeSymbol = true) {
        if (typeof amount !== 'number' || isNaN(amount)) return '0,00 €';

        const formatted = amount.toFixed(2).replace('.', ',');
        return includeSymbol ? `${formatted} €` : formatted;
    },

    /**
     * Formatta un numero come quantità
     * @param {number} quantity - Quantità da formattare
     * @returns {string} Quantità formattata
     */
    formatQuantity(quantity) {
        if (typeof quantity !== 'number' || isNaN(quantity)) return '0';
        return quantity.toString();
    },

    /**
     * Tronca un testo alla lunghezza massima aggiungendo ...
     * @param {string} text - Testo da troncare
     * @param {number} maxLength - Lunghezza massima
     * @returns {string} Testo troncato
     */
    truncateText(text, maxLength) {
        if (!text || text.length <= maxLength) return text || '';
        return text.substring(0, maxLength - 3) + '...';
    }
};
