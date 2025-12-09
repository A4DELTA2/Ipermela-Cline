/**
 * Header Component - Logo e intestazione documento
 */

import { LAYOUT, STYLES, CONSTANTS } from '../config/index.js';

export const HeaderComponent = {
    render(doc, data) {
        const { margin } = LAYOUT.page;
        const { header } = LAYOUT;
        let y = header.logoY;

        // Logo (se disponibile)
        if (CONSTANTS.logos.default) {
            try {
                doc.addImage(
                    CONSTANTS.logos.default,
                    'PNG',
                    header.logoX,
                    y,
                    header.logoWidth,
                    header.logoHeight
                );
            } catch (err) {
                console.warn('Logo non disponibile, uso fallback testo');
                this.renderFallbackLogo(doc, header.logoX, y);
            }
        } else {
            this.renderFallbackLogo(doc, header.logoX, y);
        }

        // Info azienda sotto il logo
        y = header.companyInfoY;
        doc.setFontSize(STYLES.fonts.small.size);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...STYLES.colors.text);
        doc.text(CONSTANTS.company.subtitle, margin, y);
        y += 5;
        doc.text(CONSTANTS.company.locations, margin, y);

        // Linea separatore
        y = header.separatorY;
        doc.setDrawColor(...STYLES.colors.border);
        doc.setLineWidth(0.5);
        doc.line(margin, y, LAYOUT.page.width - margin, y);

        // Numero e data ordine (in alto a destra)
        y = header.orderInfoY;
        doc.setFontSize(STYLES.fonts.body.size);
        doc.setFont('helvetica', 'bold');
        doc.text(`${CONSTANTS.document.numberLabel} ${data.id}`, LAYOUT.page.width - margin - 50, y - 10);
        doc.setFont('helvetica', 'normal');
        doc.text(`${CONSTANTS.document.dateLabel} ${data.date}`, LAYOUT.page.width - margin - 50, y - 5);

        return y;
    },

    renderFallbackLogo(doc, x, y) {
        doc.setFontSize(STYLES.fonts.title.size);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...STYLES.colors.primary);
        doc.text('IPERMELA', x, y + 10);
    }
};
