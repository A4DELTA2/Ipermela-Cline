/**
 * Footer Component - Note, informazioni legali e firma
 */

import { LAYOUT, STYLES, CONSTANTS } from '../config/index.js';

export const FooterComponent = {
    render(doc, data, startY) {
        const { margin } = LAYOUT.page;
        const { footer } = LAYOUT;
        const { colors, fonts } = STYLES;
        const { company, legal } = CONSTANTS;

        let currentY = Math.max(startY, footer.notesStartY);

        // Note ordine (se presenti)
        if (data.notes && data.notes.trim().length > 0) {
            doc.setFontSize(fonts.small.size);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...colors.text);
            doc.text('Note:', margin, currentY);
            currentY += 5;

            doc.setFont('helvetica', 'normal');
            const noteLines = doc.splitTextToSize(data.notes, 170);
            doc.text(noteLines, margin, currentY);
            currentY += (noteLines.length * 4) + 10;
        }

        // Note legali
        currentY = Math.max(currentY, footer.legalNotesY);

        doc.setFontSize(fonts.tiny.size);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(...colors.lightText);

        const legalText1 = doc.splitTextToSize(legal.message1, 170);
        doc.text(legalText1, margin, currentY);
        currentY += (legalText1.length * 3.5) + 3;

        const legalText2 = doc.splitTextToSize(legal.message2, 170);
        doc.text(legalText2, margin, currentY);
        currentY += (legalText2.length * 3.5) + 8;

        // Informazioni azienda
        currentY = Math.max(currentY, footer.companyInfoY);

        doc.setFontSize(fonts.tiny.size);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...colors.text);

        const companyInfo = [
            `${company.name} - ${company.legalForm}`,
            `${company.address}`,
            `P.IVA: ${company.piva} | C.F.: ${company.cf} | SDI: ${company.sdi}`,
            `${company.phone} | ${company.email}`
        ];

        companyInfo.forEach(line => {
            doc.text(line, margin, currentY);
            currentY += 3.5;
        });

        // Data e firma
        currentY = Math.max(currentY + 5, footer.signatureY);

        doc.setFontSize(fonts.small.size);
        doc.setFont('helvetica', 'normal');

        // Data a sinistra
        const currentDate = new Date().toLocaleDateString('it-IT');
        doc.text(`Data: ${currentDate}`, margin, currentY);

        // Firma a destra
        doc.text('Staff IPERMELA', 170, currentY, { align: 'right' });

        return currentY;
    }
};
