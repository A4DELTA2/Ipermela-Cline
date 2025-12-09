/**
 * Layout Configuration - Coordinate e dimensioni PDF
 * Modificare questo file per cambiare il posizionamento degli elementi
 */

export const LAYOUT = {
    page: {
        format: 'a4',
        width: 210,  // mm
        height: 297, // mm
        margin: 20
    },

    header: {
        logoX: 20,
        logoY: 15,
        logoWidth: 50,
        logoHeight: 18,
        companyInfoY: 38,
        separatorY: 48,
        titleY: 58,
        orderInfoY: 68
    },

    customer: {
        startY: 78,
        boxPadding: 8,
        lineHeight: 6
    },

    table: {
        startY: 110,
        columnWidths: {
            description: 90,
            quantity: 25,
            unitPrice: 35,
            total: 40
        }
    },

    totals: {
        xRight: 170,
        lineHeight: 7
    },

    footer: {
        notesStartY: 230,
        legalNotesY: 250,
        companyInfoY: 270,
        signatureY: 285
    }
};
