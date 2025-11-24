// ==== QUESTE SONO LE 3 MODIFICHE DA AGGIUNGERE A script.js ====

// ========================================
// MODIFICA 1: Aggiungere alla fine della funzione setupEventListeners()
// Cerca la funzione e aggiungi PRIMA della chiusura finale }
// ========================================

    // Export all orders button - PDF
    const exportAllOrdersBtn = document.getElementById('export-all-orders-btn');
    if (exportAllOrdersBtn) {
        exportAllOrdersBtn.addEventListener('click', generateAllOrdersPDF);
    }

// ========================================
// MODIFICA 2: Nella funzione renderSavedOrders()
// SOSTITU ISCI la sezione con delete-order-btn CON questo:
// ========================================

                <div class="order-actions">
                    <button class="export-pdf-btn" onclick="exportOrderPDF(${order.id})" title="Scarica PDF">
                        📄 PDF
                    </button>
                    ${canDeleteOrder(order) ? `
                        <button class="delete-order-btn" onclick="deleteOrder(${order.id})">
                            Elimina Ordine
                        </button>
                    ` : ''}
                </div>

// ========================================
// MODIFICA 3: Aggiungere DOPO la funzione deleteOrder()
// ========================================

// Wrapper per export PDF di un singolo ordine
function exportOrderPDF(orderId) {
    const order = savedOrders.find(o => o.id === orderId);
    if (order) {
        generateOrderPDF(order);
    } else {
        showNotification('Ordine non trovato!', 'error');
    }
}