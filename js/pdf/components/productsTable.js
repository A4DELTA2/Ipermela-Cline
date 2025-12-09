/**
 * Products Table Component - Tabella prodotti con autotable
 */

import { LAYOUT, STYLES, CONSTANTS } from '../config/index.js';

export const ProductsTableComponent = {
    render(doc, data, startY) {
        const { margin } = LAYOUT.page;

        // Prepara dati tabella
        const tableData = data.items.map(item => [
            this.formatProductName(item),
            item.quantity.toString(),
            `${item.price.toFixed(2)} €`,
            `${(item.price * item.quantity).toFixed(2)} €`
        ]);

        // Rendering con autoTable
        doc.autoTable({
            startY: startY,
            head: [[...CONSTANTS.table.headers]],
            body: tableData,
            margin: { left: margin, right: margin },

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
                lineWidth: 0.1
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
