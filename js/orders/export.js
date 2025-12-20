/**
 * Orders Export Module
 * Handles PDF and CSV export functionality
 */

import { savedOrders, currentPreviewOrderId } from './state.js';
import { showNotification } from '../ui.js';
import { showPDFPreviewModal } from './dom.js';

/**
 * Esporta un ordine in PDF
 * @param {string|number} orderId - ID Ordine
 */
export function exportOrderPDF(orderId) {
    const order = savedOrders.find(o => o.id === orderId);
    
    if (order) {
        if (typeof window.generateOrderPDF === 'function') {
            window.generateOrderPDF(order);
        } else {
            showNotification('Funzione export PDF non disponibile', 'error');
        }
    } else {
        showNotification('Ordine non trovato!', 'error');
    }
}

/**
 * Anteprima PDF
 */
export async function previewOrderPDF(orderId) {
    const order = savedOrders.find(o => o.id === orderId);
    if (!order) {
        showNotification('Ordine non trovato!', 'error');
        return;
    }

    if (!window.generateOrderPDF) {
        showNotification('Funzione PDF non disponibile', 'error');
        return;
    }

    try {
        const blobUrl = await window.generateOrderPDF(order, 'preview');
        if (!blobUrl) {
            showNotification('Errore generazione PDF', 'error');
            return;
        }

        // Importa da dom.js dinamicamente o usa window global
        // Qui usiamo la funzione esportata da dom.js
        const title = `Ordine #${order.id} - ${order.customer_name}`;
        
        // Aggiorna stato globale per altri bottoni nel modal
        import('./state.js').then(m => m.setPreviewOrderId(orderId));
        
        // Mostra modal
        import('./dom.js').then(m => m.showPDFPreviewModal(blobUrl, title));

    } catch (err) {
        console.error('Errore preview PDF:', err);
        showNotification('Errore anteprima PDF', 'error');
    }
}

/**
 * Esporta tutti gli ordini in CSV
 */
export function exportOrdersToCSV() {
    if (savedOrders.length === 0) {
        showNotification('Nessun ordine da esportare!', 'error');
        return;
    }

    try {
        showNotification('Generazione CSV...', 'info');

        const headers = [
            'ID Ordine', 'Numero', 'Data', 'Cliente', 'Email', 'Telefono', 
            'Sede', 'Prodotti', 'Quantità', 'Subtotale', 'IVA', 'Totale', 'Note'
        ];

        const sanitize = (f) => {
            if (f == null) return '';
            const s = String(f);
            if (s.includes(',') || s.includes('\n') || s.includes('"')) {
                return `"${s.replace(/"/g, '""')}"`;
            }
            return s;
        };

        const rows = savedOrders.map(order => {
            const productsStr = order.items
                .map(i => `${i.displayName || i.name} (x${i.quantity})`)
                .join('; ');
            
            const totalQty = order.items.reduce((s, i) => s + i.quantity, 0);

            return [
                order.id,
                order.order_number || '',
                order.date,
                sanitize(order.customer_name),
                sanitize(order.customer_email),
                sanitize(order.customer_phone),
                sanitize(order.sede),
                sanitize(productsStr),
                totalQty,
                parseFloat(order.subtotal).toFixed(2),
                parseFloat(order.tax).toFixed(2),
                parseFloat(order.total).toFixed(2),
                sanitize(order.notes)
            ].join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `ordini_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showNotification('CSV scaricato!', 'success');
    } catch (err) {
        console.error(err);
        showNotification('Errore export CSV', 'error');
    }
}