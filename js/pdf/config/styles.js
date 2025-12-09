/**
 * Styles Configuration - Colori e font
 * Modificare questo file per cambiare l'aspetto visivo del PDF
 */

export const STYLES = {
    colors: {
        // Colori brand Ipermela
        primary: [255, 153, 0],     // Arancione #FF9900
        secondary: [100, 100, 100], // Grigio scuro
        headerBg: [240, 240, 240],  // Grigio chiaro per sfondi
        text: [0, 0, 0],            // Nero
        lightText: [120, 120, 120], // Grigio per testi secondari
        border: [200, 200, 200]     // Grigio chiaro per bordi
    },

    fonts: {
        title: { size: 18, style: 'bold' },
        subtitle: { size: 14, style: 'bold' },
        heading: { size: 11, style: 'bold' },
        body: { size: 10, style: 'normal' },
        small: { size: 9, style: 'normal' },
        tiny: { size: 8, style: 'italic' }
    },

    table: {
        headStyles: {
            fillColor: [240, 240, 240],
            textColor: [0, 0, 0],
            fontStyle: 'bold',
            fontSize: 10,
            halign: 'left'
        },
        bodyStyles: {
            fontSize: 9,
            textColor: [0, 0, 0]
        },
        alternateRowStyles: {
            fillColor: [250, 250, 250]
        },
        columnStyles: {
            0: { cellWidth: 85, halign: 'left' },   // Descrizione
            1: { cellWidth: 20, halign: 'center' }, // Q.tà
            2: { cellWidth: 35, halign: 'right' },  // Prezzo
            3: { cellWidth: 40, halign: 'right', fontStyle: 'bold' } // Totale
        }
    }
};
