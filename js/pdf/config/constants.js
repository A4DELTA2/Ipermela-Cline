/**
 * Constants Configuration - Testi fissi e costanti
 * Modificare questo file per cambiare i testi del PDF
 */

export const CONSTANTS = {
    company: {
        name: 'IPERMELA STORE SRL',
        legalForm: 'S.R.L.',
        subtitle: 'Apple Premium Reseller',
        locations: 'Thiene (VI) - Cassola (VI)',
        address: 'Via del Terziario 14, 36016 Thiene (VI)',
        addressThiene: 'THIENE - Via del Terziario 14 - 36016 Thiene VI',
        addressCassola: 'BASSANO - Via Valsugana 102/C - 36022 Cassola VI',
        phoneThiene: 'Tel. 0445.1716261',
        phoneCassola: 'Tel. 0424.1633100',
        phone: '0445.1716261',
        faxThiene: 'Fax 0445.1711155',
        faxCassola: 'Fax 0445.1711155',
        web: 'www.ipermelastore.com',
        email: 'info@ipermelastore.com',
        piva: '03850010244',
        cf: '03850010244',
        sdi: 'SUBM70N',
        vat: 'P.IVA e C.F. 03850010244',
        capital: 'Capitale Sociale euro 10.000'
    },

    document: {
        numberLabel: 'N.',
        dateLabel: 'Data:'
    },

    table: {
        headers: ['Descrizione', 'Q.tà', 'Prezzo', 'Totale'],
        emptyMessage: 'Nessun prodotto'
    },

    totals: {
        totalLabel: 'Totale:'
    },

    customer: {
        greetingPrefix: 'Gentile,',
        greetingSuffix: ', il materiale da lei ordinato,',
        message1: 'salvo configurazioni personalizzate, è disponibile presso i magazzini dei nostri fornitori.'
    },

    legal: {
        message1: 'Per ottimizzare e/o accelerare i tempi di consegna la invitiamo ad effettuare il bonifico di € 0,00 IVA',
        message2: 'compresa presso il conto: IT15B3609201600200988112265',
        message3: 'Al ricevimento del pagamento sarà nostra cura contattarvi per fissare l\'appuntamento per l\'eventuale attivazione',
        message4: 'e per il ritiro della merce.',
        message5: 'Si fa presente che in caso di pagamento anticipato, trattandosi di caparra, nel caso in cui il cliente annulli',
        message6: 'l\'ordine, la stessa caparra sarà trattenuta da Ipermela Store srl a titolo di risarcimento danno.',
        message7: 'Cogliamo anche l\'occasione per chiedervi, in caso di fatturazione, Ragione sociale, indirizzo e Partita Iva.'
    },

    footer: {
        location1: 'Thiene, ',
        signature: 'Staff IPERMELA'
    },

    logos: {
        default: null, // Caricato dinamicamente
        base64: null   // Fallback
    }
};