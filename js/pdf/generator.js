/**
 * PDF Generator - Sistema di generazione PDF modulare
 * Mantiene backward compatibility con API esistente
 */

import { LAYOUT, CONSTANTS } from './config/index.js';
import {
    HeaderComponent,
    CustomerInfoComponent,
    ProductsTableComponent,
    TotalsComponent,
    FooterComponent
} from './components/index.js';

// Cache logo
let logoCache = null;

/**
 * Carica il logo e lo converte in base64
 */
async function loadLogo() {
    if (logoCache) return logoCache;

    try {
        const response = await fetch('Logo_nero.png');
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                logoCache = reader.result;
                resolve(logoCache);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.warn('Impossibile caricare il logo:', error);
        return null;
    }
}

/**
 * Genera PDF dell'ordine
 * @param {Object} orderData - Dati dell'ordine
 * @param {string} action - 'preview' o 'download'
 * @returns {Promise<string|void>} Blob URL se preview, void se download
 */
async function generateOrderPDF(orderData, action = 'download') {
    try {
        // Carica logo
        const logoBase64 = await loadLogo();
        if (logoBase64) {
            CONSTANTS.logos.base64 = logoBase64;
        }

        // Crea documento jsPDF
        const doc = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: LAYOUT.page.format
        });

        // Variabile per tracciare la posizione Y
        let currentY = LAYOUT.page.margin;

        // === RENDERING COMPONENTI ===

        // 1. Header (logo + info aziendale + numero ordine)
        currentY = HeaderComponent.render(doc, orderData, currentY);

        // 2. Customer Info (box con saluto personalizzato)
        currentY = CustomerInfoComponent.render(doc, orderData, currentY);

        // 3. Products Table (tabella prodotti con autotable)
        currentY = ProductsTableComponent.render(doc, orderData, currentY);

        // 4. Totals (subtotale, IVA, totale)
        currentY = TotalsComponent.render(doc, orderData, currentY);

        // 5. Footer (note + info legali + firma)
        // Il footer viene renderizzato in posizione fissa nella parte bassa
        FooterComponent.render(doc, orderData, currentY);

        // === OUTPUT ===

        if (action === 'preview') {
            // Genera blob per anteprima
            const pdfBlob = doc.output('blob');
            const blobUrl = URL.createObjectURL(pdfBlob);
            return blobUrl;
        } else {
            // Download diretto
            const fileName = `Ordine_${orderData.order_number || 'N-A'}_${new Date().getTime()}.pdf`;
            doc.save(fileName);
        }

    } catch (error) {
        console.error('Errore durante la generazione del PDF:', error);
        alert('Si è verificato un errore durante la generazione del PDF. Controlla la console per i dettagli.');
        throw error;
    }
}

// === EXPORT GLOBALE ===
// Mantiene backward compatibility con js/orders.js
window.generateOrderPDF = generateOrderPDF;

// Export anche come modulo ES6 per uso futuro
export { generateOrderPDF };
