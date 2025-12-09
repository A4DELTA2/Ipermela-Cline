/**
 * Layout Configuration - Coordinate e dimensioni PDF
 * Modificare questo file per cambiare il posizionamento degli elementi
 */

export const LAYOUT = {
    page: {
        format: 'a4',
        width: 210,  // mm
        height: 297, // mm
        margin: 15
    },

    header: {
        logoX: 15,
        logoY: 10,
        logoWidth: 40,
        logoHeight: 10,
        companyInfoY: 28,
        separatorY: 40,
        orderInfoY: 15
    },

    customer: {
        startY: 35,
        boxPadding: 5,
        lineHeight: 5
    },

    table: {
        startY: 68,
        columnWidths: {
            description: 100,
            quantity: 20,
            unitPrice: 30,
            total: 30
        }
    },

    totals: {
        xRight: 180,
        startX: 120,
        lineHeight: 6
    },

    footer: {
        notesStartY: 220,
        legalNotesY: 240,
        companyInfoY: 265,
        signatureY: 280
    }
};
