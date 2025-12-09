/**
 * Page Manager Utility - Gestione pagine multiple
 */

import { LAYOUT } from '../config/index.js';

export const PageManager = {
    /**
     * Verifica se c'è spazio sufficiente nella pagina corrente
     * @param {number} currentY - Posizione Y corrente
     * @param {number} requiredSpace - Spazio richiesto in mm
     * @returns {boolean} True se c'è spazio sufficiente
     */
    hasSpaceOnPage(currentY, requiredSpace) {
        const { height, margin } = LAYOUT.page;
        const availableSpace = height - margin - currentY;
        return availableSpace >= requiredSpace;
    },

    /**
     * Aggiunge una nuova pagina se necessario
     * @param {jsPDF} doc - Istanza jsPDF
     * @param {number} currentY - Posizione Y corrente
     * @param {number} requiredSpace - Spazio richiesto in mm
     * @returns {number} Nuova posizione Y (margin se nuova pagina, currentY altrimenti)
     */
    addNewPageIfNeeded(doc, currentY, requiredSpace) {
        if (!this.hasSpaceOnPage(currentY, requiredSpace)) {
            doc.addPage();
            return LAYOUT.page.margin;
        }
        return currentY;
    },

    /**
     * Ottiene la posizione Y massima prima del footer
     * @returns {number} Posizione Y massima
     */
    getMaxYBeforeFooter() {
        const { height, margin } = LAYOUT.page;
        const footerHeight = 60; // Spazio riservato per footer
        return height - margin - footerHeight;
    },

    /**
     * Calcola lo spazio rimanente nella pagina corrente
     * @param {number} currentY - Posizione Y corrente
     * @returns {number} Spazio rimanente in mm
     */
    getRemainingSpace(currentY) {
        return this.getMaxYBeforeFooter() - currentY;
    }
};
