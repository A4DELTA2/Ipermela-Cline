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

        let currentY = Math.max(startY + 10, footer.notesStartY);

        // Note legali condensate
        doc.setFontSize(7);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100, 100, 100);

        // Messaggio pagamento
        const allLegalText = `${legal.message1} ${legal.message2}`;
        const legalLines1 = doc.splitTextToSize(allLegalText, LAYOUT.page.width - 2 * margin);
        doc.text(legalLines1, margin, currentY);
        currentY += legalLines1.length * 2.5 + 2;

        // Altri messaggi legali
        const legalText3 = doc.splitTextToSize(legal.message3 + ' ' + legal.message4, LAYOUT.page.width - 2 * margin);
        doc.text(legalText3, margin, currentY);
        currentY += legalText3.length * 2.5 + 2;

        const legalText5 = doc.splitTextToSize(legal.message5 + ' ' + legal.message6, LAYOUT.page.width - 2 * margin);
        doc.text(legalText5, margin, currentY);
        currentY += legalText5.length * 2.5 + 2;

        const legalText7 = doc.splitTextToSize(legal.message7, LAYOUT.page.width - 2 * margin);
        doc.text(legalText7, margin, currentY);
        currentY += legalText7.length * 2.5 + 5;

        // Informazioni azienda
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);

        const companyInfo = [
            `${company.name} - ${company.legalForm}`,
            `${company.address}`,
            `P.IVA: ${company.piva} | C.F.: ${company.cf} | SDI: ${company.sdi}`,
            `Tel: ${company.phone} | ${company.email}`
        ];

        companyInfo.forEach(line => {
            doc.text(line, margin, currentY);
            currentY += 3;
        });

        // Data e firma
        currentY += 3;

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');

        // Data a sinistra
        const currentDate = new Date().toLocaleDateString('it-IT');
        doc.text(`Data: ${currentDate}`, margin, currentY);

        // Firma a destra
        doc.text('Staff IPERMELA', LAYOUT.page.width - margin, currentY, { align: 'right' });

        return currentY;
    }
};
