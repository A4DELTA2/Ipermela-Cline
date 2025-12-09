/**
 * Customer Info Component - Box con informazioni cliente
 */

import { LAYOUT, STYLES, CONSTANTS } from '../config/index.js';

export const CustomerInfoComponent = {
    render(doc, data, startY) {
        const { margin } = LAYOUT.page;
        const { customer } = LAYOUT;
        let y = startY + 2;

        // Box con sfondo grigio chiaro
        const boxHeight = 20;
        doc.setFillColor(245, 245, 245);
        doc.rect(
            margin,
            y,
            LAYOUT.page.width - 2 * margin,
            boxHeight,
            'F'
        );

        // Testo saluto personalizzato
        y += 6;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);

        const customerName = data.customer_name || 'Cliente';
        const greetingLine1 = `${CONSTANTS.customer.greetingPrefix} ${customerName.toUpperCase()}${CONSTANTS.customer.greetingSuffix}`;

        // Splitting del testo lungo
        const splitText = doc.splitTextToSize(greetingLine1, LAYOUT.page.width - 2 * margin - 10);
        doc.text(splitText, margin + 3, y);
        y += splitText.length * 4;

        const splitText2 = doc.splitTextToSize(CONSTANTS.customer.message1, LAYOUT.page.width - 2 * margin - 10);
        doc.text(splitText2, margin + 3, y);

        return startY + boxHeight + 8;
    }
};
