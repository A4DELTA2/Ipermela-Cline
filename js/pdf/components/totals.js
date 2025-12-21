/**
 * Totals Component - Subtotale, IVA e Totale
 */

import { LAYOUT, STYLES } from '../config/index.js';
import { IVA_MULTIPLIER, IVA_DISPLAY } from '../../config.js';

export const TotalsComponent = {
    render(doc, data, startY) {
        const { xRight, startX, lineHeight } = LAYOUT.totals;
        const { colors, fonts } = STYLES;

        let currentY = startY + 5;

        // Calcola totali (i prezzi sono già IVA inclusa, quindi scorporiamo)
        const total = data.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        // Scorporo IVA: Imponibile = Totale / IVA_MULTIPLIER
        const subtotal = total / IVA_MULTIPLIER; // Imponibile (senza IVA)
        const ivaAmount = total - subtotal;      // IVA scorporata

        // Subtotale (Imponibile)
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);

        doc.text('Subtotale:', startX, currentY);
        doc.text(`${subtotal.toFixed(2)} €`, xRight, currentY, { align: 'right' });
        currentY += lineHeight;

        // IVA
        doc.text(`IVA ${IVA_DISPLAY}:`, startX, currentY);
        doc.text(`${ivaAmount.toFixed(2)} €`, xRight, currentY, { align: 'right' });
        currentY += lineHeight + 2;

        // Linea separatore
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(startX, currentY, xRight, currentY);
        currentY += lineHeight;

        // TOTALE (bold e arancione) - IVA INCLUSA
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...colors.primary);

        doc.text('TOTALE:', startX, currentY);
        doc.text(`${total.toFixed(2)} €`, xRight, currentY, { align: 'right' });
        currentY += lineHeight + 5;

        // Ritorna Y finale
        return currentY;
    }
};
