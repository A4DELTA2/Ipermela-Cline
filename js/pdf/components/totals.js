/**
 * Totals Component - Subtotale, IVA e Totale
 */

import { LAYOUT, STYLES } from '../config/index.js';

export const TotalsComponent = {
    render(doc, data, startY) {
        const { xRight, lineHeight } = LAYOUT.totals;
        const { colors, fonts } = STYLES;

        let currentY = startY;

        // Calcola totali
        const subtotal = data.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        const ivaRate = 0.22; // 22%
        const ivaAmount = subtotal * ivaRate;
        const total = subtotal + ivaAmount;

        // Subtotale
        doc.setFontSize(fonts.body.size);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...colors.text);

        doc.text('Subtotale:', xRight - 40, currentY, { align: 'left' });
        doc.text(`${subtotal.toFixed(2)} €`, xRight, currentY, { align: 'right' });
        currentY += lineHeight;

        // IVA 22%
        doc.text('IVA 22%:', xRight - 40, currentY, { align: 'left' });
        doc.text(`${ivaAmount.toFixed(2)} €`, xRight, currentY, { align: 'right' });
        currentY += lineHeight;

        // Linea separatore
        doc.setDrawColor(...colors.border);
        doc.setLineWidth(0.3);
        doc.line(xRight - 50, currentY, xRight, currentY);
        currentY += lineHeight;

        // TOTALE (bold e arancione)
        doc.setFontSize(fonts.heading.size);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...colors.primary);

        doc.text('TOTALE:', xRight - 40, currentY, { align: 'left' });
        doc.text(`${total.toFixed(2)} €`, xRight, currentY, { align: 'right' });
        currentY += lineHeight + 5;

        // Ritorna Y finale
        return currentY;
    }
};
