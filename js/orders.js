/**
 * Orders Module (Controller)
 * Aggregates functionality from sub-modules
 */

import { savedOrders, setSavedOrders, editingState, setEditingState, resetEditingState, currentPreviewOrderId } from './orders/state.js';
import { fetchOrdersFromDb, createOrderInDb, updateOrderInDb, deleteOrderFromDb } from './orders/service.js';
import { renderOrdersList, openOrderModalLogic, closeOrderModalLogic, clearOrderForm, hidePDFPreviewModal } from './orders/dom.js';
import { exportOrderPDF, exportOrdersToCSV, previewOrderPDF } from './orders/export.js';
import { showNotification } from './ui.js';
import { currentUser } from './auth.js';
import { cart, clearCartSilent } from './cart.js';

// Export state for other modules
export { savedOrders };

// ===== SETUP LISTENERS =====

export function setupOrderEventListeners() {
    const saveOrderBtn = document.getElementById('save-order-btn');
    if (saveOrderBtn) saveOrderBtn.addEventListener('click', openOrderModal);

    const confirmOrderBtn = document.getElementById('confirm-order-btn');
    if (confirmOrderBtn) confirmOrderBtn.addEventListener('click', saveOrder);

    const closeOrderBtn = document.getElementById('close-order-modal');
    if (closeOrderBtn) closeOrderBtn.addEventListener('click', closeOrderModal);

    const exportCSVBtn = document.getElementById('export-csv-btn');
    if (exportCSVBtn) exportCSVBtn.addEventListener('click', exportOrdersToCSV);

    // PDF Preview listeners
    const closePDFPreviewBtn = document.getElementById('close-pdf-preview');
    if (closePDFPreviewBtn) closePDFPreviewBtn.addEventListener('click', closePDFPreview);

    const closePreviewBtn = document.getElementById('close-preview-btn');
    if (closePreviewBtn) closePreviewBtn.addEventListener('click', closePDFPreview);

    const downloadPDFBtn = document.getElementById('download-pdf-btn');
    if (downloadPDFBtn) {
        downloadPDFBtn.addEventListener('click', () => {
            if (currentPreviewOrderId) exportOrderPDF(currentPreviewOrderId);
        });
    }

    const editOrderBtn = document.getElementById('edit-order-btn');
    if (editOrderBtn) {
        editOrderBtn.addEventListener('click', () => {
            if (currentPreviewOrderId) loadOrderToCart(currentPreviewOrderId);
        });
    }
}

// ===== CORE LOGIC =====

export function openOrderModal() {
    if (!cart || cart.length === 0) {
        showNotification('Il carrello è vuoto!', 'error');
        return;
    }
    openOrderModalLogic();
}

export function closeOrderModal() {
    closeOrderModalLogic();
}

export async function loadOrders() {
    try {
        const orders = await fetchOrdersFromDb();
        setSavedOrders(orders);
        return orders;
    } catch (err) {
        console.error('Error loading orders:', err);
        setSavedOrders([]);
        return [];
    }
}

export async function renderSavedOrders(skipQuery = false) {
    if (!skipQuery) {
        await loadOrders();
    }
    renderOrdersList();
}

export async function saveOrder() {
    const customerName = document.getElementById('customer-name')?.value.trim();
    const customerEmail = document.getElementById('customer-email')?.value.trim();
    const customerPhone = document.getElementById('customer-phone')?.value.trim();
    const notes = document.getElementById('order-notes')?.value.trim();
    const sede = document.querySelector('input[name="order-sede"]:checked')?.value;

    if (!customerName) return alert('Inserisci il nome del cliente!');
    if (!sede) return alert('Seleziona la sede!');

    // Calculate totals from cart
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subtotal = total / 1.22;
    const tax = total - subtotal;

    const orderData = {
        date: editingState.isEditing ? undefined : new Date().toLocaleString('it-IT'),
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        items: cart,
        subtotal: subtotal,
        tax: tax,
        total: total,
        notes: notes,
        sede: sede,
        created_by: editingState.isEditing ? undefined : currentUser.id
    };

    try {
        showNotification(editingState.isEditing ? 'Aggiornamento...' : 'Salvataggio...', 'info');

        if (editingState.isEditing) {
            // Remove undefined fields
            const updates = Object.fromEntries(
                Object.entries(orderData).filter(([_, v]) => v !== undefined)
            );
            await updateOrderInDb(editingState.orderId, updates);
        } else {
            // New order
            const newId = Date.now();
            await createOrderInDb({ ...orderData, id: newId });
        }

        resetEditingState();
        clearCartSilent();
        
        await loadOrders();
        renderOrdersList();
        closeOrderModal();
        
        showNotification(editingState.isEditing ? 'Ordine aggiornato!' : 'Ordine salvato!');

    } catch (err) {
        console.error('Save error:', err);
        showNotification('Errore nel salvataggio!', 'error');
    }
}

export async function deleteOrder(orderId) {
    if (!confirm('Eliminare ordine?')) return;

    try {
        showNotification('Eliminazione...', 'info');
        await deleteOrderFromDb(orderId);
        await loadOrders();
        renderOrdersList();
        showNotification('Ordine eliminato');
    } catch (err) {
        console.error('Delete error:', err);
        showNotification('Errore eliminazione', 'error');
    }
}

export function loadOrderToCart(orderId) {
    const order = savedOrders.find(o => o.id === orderId);
    if (!order) return showNotification('Ordine non trovato', 'error');

    if (cart.length > 0 && !confirm('Svuotare carrello corrente?')) return;

    try {
        // Clear cart array locally
        cart.length = 0;
        
        // Add items
        if (order.items) {
            order.items.forEach(item => {
                cart.push({
                    id: item.id,
                    variantKey: item.variantKey || `${item.id}-default`,
                    name: item.displayName || item.name,
                    price: item.price,
                    quantity: item.quantity,
                    color: item.color,
                    storage: item.storage,
                    imageUrl: item.imageUrl,
                    configuration: item.configuration
                });
            });
        }

        setEditingState(order.id, order);
        
        // Update UI
        if (window.renderCart) window.renderCart();
        if (window.updateCartBadge) window.updateCartBadge(cart);
        if (window.scrollToCart) setTimeout(() => window.scrollToCart(), 300);
        
        closePDFPreview();
        showNotification(`Ordine #${orderId} caricato!`, 'success');

    } catch (err) {
        console.error(err);
        showNotification('Errore caricamento', 'error');
    }
}

export function resetEditMode() {
    resetEditingState();
    const modal = document.getElementById('order-modal');
    if (modal) {
        const h2 = modal.querySelector('h2');
        if (h2) h2.textContent = 'Completa Ordine';
    }
}

export function closePDFPreview() {
    hidePDFPreviewModal();
    import('./state.js').then(m => m.setPreviewOrderId(null));
}

// Re-export specific functions for external use
export { 
    exportOrderPDF, 
    exportOrdersToCSV, 
    previewOrderPDF 
};