/**
 * Products Table Component - Tabella prodotti con autotable
 */

import { LAYOUT, STYLES, CONSTANTS } from '../config/index.js';

export const ProductsTableComponent = {
    render(doc, data, startY) {
        const { margin } = LAYOUT.page;

        // Prepara dati tabella (prezzi sono IVA inclusa, scorporiamo per mostrare imponibile)
        const IVA_RATE = 1.22; // 22%

        const tableData = data.items.map(item => {
            const priceWithVAT = item.price; // Prezzo IVA inclusa
            const priceWithoutVAT = priceWithVAT / IVA_RATE; // Imponibile
            const totalWithVAT = priceWithVAT * item.quantity; // Totale IVA inclusa

            return [
                this.formatProductName(item),
                item.quantity.toString(),
                `${priceWithoutVAT.toFixed(2)} €`, // Prezzo unitario imponibile
                `${totalWithVAT.toFixed(2)} €` // Totale IVA inclusa
            ];
        });

        // Rendering con autoTable
        doc.autoTable({
            startY: startY,
            head: [[...CONSTANTS.table.headers]],
            body: tableData,
            margin: { left: margin, right: margin },
            tableWidth: 180, // Larghezza fissa per allineamento perfetto

            // Stili da config
            headStyles: STYLES.table.headStyles,
            bodyStyles: STYLES.table.bodyStyles,
            alternateRowStyles: STYLES.table.alternateRowStyles,

            // Layout colonne
            columnStyles: STYLES.table.columnStyles,

            // Tema
            theme: 'grid',
            styles: {
                lineColor: STYLES.colors.border,
                lineWidth: 0.1,
                cellPadding: 2
            },

            // Callback per personalizzazioni
            didDrawCell: (data) => {
                // Eventuali personalizzazioni per cella
            }
        });

        // Ritorna Y finale tabella
        return doc.lastAutoTable.finalY + 10;
    },

    formatProductName(item) {
        let name = item.displayName || item.name;

        // Aggiungi configurazione se presente
        if (item.configuration) {
            const config = [];
            if (item.configuration.chip) config.push(item.configuration.chip);
            if (item.configuration.ram) config.push(item.configuration.ram);
            if (item.configuration.storage) config.push(item.configuration.storage);
            if (item.configuration.color) config.push(item.configuration.color);

            if (config.length > 0) {
                name += `\n${config.join(' | ')}`;
            }
        } else if (item.color || item.storage) {
            // Fallback per vecchio formato
            const details = [];
            if (item.color) details.push(item.color);
            if (item.storage) details.push(item.storage);
            if (details.length > 0) {
                name += `\n${details.join(' | ')}`;
            }
        }

        return name;
    }
};
