/**
 * Customer Info Component - Box con informazioni cliente
 */

import { LAYOUT, STYLES, CONSTANTS } from '../config/index.js';

export const CustomerInfoComponent = {
    render(doc, data, startY) {
        const { margin } = LAYOUT.page;
        const { customer } = LAYOUT;
        let y = startY;

        // Box con sfondo grigio
        const boxHeight = this.calculateBoxHeight(data);
        doc.setFillColor(...STYLES.colors.headerBg);
        doc.roundedRect(
            margin,
            y - 5,
            LAYOUT.page.width - 2 * margin,
            boxHeight,
            2,
            2,
            'F'
        );

        // Testo saluto personalizzato
        doc.setFontSize(STYLES.fonts.body.size);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...STYLES.colors.text);

        const greetingLine1 = `${CONSTANTS.customer.greetingPrefix} ${data.customer_name.toUpperCase()}${CONSTANTS.customer.greetingSuffix}`;
        doc.text(greetingLine1, margin + 5, y);
        y += customer.lineHeight;

        doc.text(CONSTANTS.customer.message1, margin + 5, y);
        y += customer.lineHeight + 5;

        // Q.tà e Descrizione headers sopra la tabella
        y += 3;
        doc.setFont('helvetica', 'bold');
        doc.text('Q.tà', margin + 5, y);
        doc.text('Descrizione', margin + 30, y);
        doc.text('Prezzo', LAYOUT.page.width - margin - 70, y);

        return y + 5;
    },

    calculateBoxHeight(data) {
        // Altezza fissa per il box cliente
        return 25;
    }
};
