/**
 * Header Component - Logo e intestazione documento
 */

import { LAYOUT, STYLES, CONSTANTS } from '../config/index.js';

export const HeaderComponent = {
    render(doc, data) {
        const { margin } = LAYOUT.page;
        const { header } = LAYOUT;

        // Sfondo grigio per l'header (altezza ridotta)
        const headerBgHeight = 25;
        doc.setFillColor(...STYLES.colors.headerBg);
        doc.rect(0, 0, LAYOUT.page.width, headerBgHeight, 'F');

        // Logo allineato verticalmente con numero ordine
        const logoY = header.logoY;
        if (CONSTANTS.logos.base64) {
            try {
                doc.addImage(
                    CONSTANTS.logos.base64,
                    'PNG',
                    header.logoX,
                    logoY,
                    header.logoWidth,
                    header.logoHeight
                );
            } catch (err) {
                console.warn('Logo non disponibile, uso fallback testo');
                this.renderFallbackLogo(doc, header.logoX, logoY);
            }
        } else {
            this.renderFallbackLogo(doc, header.logoX, logoY);
        }

        // Numero e data ordine (in alto a destra, allineati con il logo)
        doc.setFontSize(STYLES.fonts.small.size);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...STYLES.colors.text);
        const orderNumX = LAYOUT.page.width - margin - 60;
        doc.text(`${CONSTANTS.document.numberLabel} ${data.order_number || data.id}`, orderNumX, header.orderInfoY);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(STYLES.fonts.tiny.size);
        const dateStr = data.created_at ? new Date(data.created_at).toLocaleDateString('it-IT') : new Date().toLocaleDateString('it-IT');
        doc.text(`${CONSTANTS.document.dateLabel} ${dateStr}`, orderNumX, header.orderInfoY + 4);

        // Sede (se presente)
        if (data.sede) {
            doc.setFontSize(STYLES.fonts.tiny.size);
            doc.setFont('helvetica', 'bold');
            const sedeColor = data.sede === 'Thiene' ? [0, 100, 200] : [0, 150, 100]; // Blu per Thiene, Verde per Bassano
            doc.setTextColor(...sedeColor);
            doc.text(`Sede: ${data.sede}`, orderNumX, header.orderInfoY + 8);
        }

        return headerBgHeight + 5;
    },

    renderFallbackLogo(doc, x, y) {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...STYLES.colors.primary);
        doc.text('IPERMELA', x, y + 8);
    }
};
