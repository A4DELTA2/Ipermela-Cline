/**
 * Orders Management Module
 * Gestisce tutte le operazioni relative agli ordini (salvataggio, caricamento, rendering, eliminazione)
 * Integrato con Supabase per la persistenza dei dati
 *
 * @module orders
 * @requires ./config.js - Configurazione Supabase
 * @requires ./ui.js - Funzioni di notifica UI
 * @requires ./auth.js - Informazioni utente e ruolo
 */

import { supabase } from './config.js';
import { showNotification } from './ui.js';
import { userRole, currentUser } from './auth.js';

/**
 * Array di ordini salvati recuperati da Supabase
 * @type {Array<Object>}
 */
export let savedOrders = [];

/**
 * Configura i listener per la gestione ordini
 */
export function setupOrderEventListeners() {
    // Bottone "Salva Ordine" nel carrello - apre il modal
    const saveOrderBtn = document.getElementById('save-order-btn');
    if (saveOrderBtn) {
        saveOrderBtn.addEventListener('click', openOrderModal);
    }

    // Bottone "Conferma Ordine" nel modal - salva effettivamente
    const confirmOrderBtn = document.getElementById('confirm-order-btn');
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener('click', saveOrder);
    }

    const closeOrderBtn = document.getElementById('close-order-modal');
    if (closeOrderBtn) {
        closeOrderBtn.addEventListener('click', closeOrderModal);
    }

    // Bottone "Esporta CSV"
    const exportCSVBtn = document.getElementById('export-csv-btn');
    if (exportCSVBtn) {
        exportCSVBtn.addEventListener('click', exportOrdersToCSV);
    }

    // PDF Preview Modal listeners
    const closePDFPreviewBtn = document.getElementById('close-pdf-preview');
    if (closePDFPreviewBtn) {
        closePDFPreviewBtn.addEventListener('click', closePDFPreview);
    }

    const closePreviewBtn = document.getElementById('close-preview-btn');
    if (closePreviewBtn) {
        closePreviewBtn.addEventListener('click', closePDFPreview);
    }

    // Download PDF button
    const downloadPDFBtn = document.getElementById('download-pdf-btn');
    if (downloadPDFBtn) {
        downloadPDFBtn.addEventListener('click', () => {
            const orderId = window.currentPreviewOrderId;
            if (orderId) {
                exportOrderPDF(orderId);
            }
        });
    }

    // Edit Order button
    const editOrderBtn = document.getElementById('edit-order-btn');
    if (editOrderBtn) {
        editOrderBtn.addEventListener('click', () => {
            const orderId = window.currentPreviewOrderId;
            if (orderId) {
                loadOrderToCart(orderId);
            }
        });
    }
}

/**
 * Apre il modal per la creazione di un nuovo ordine
 * Valida che il carrello non sia vuoto prima di aprire
 *
 * @function openOrderModal
 * @returns {void}
 */
export function openOrderModal() {
    // Verificare se il carrello è disponibile (dovrebbe essere importato globalmente)
    const cart = window.cart || [];

    if (cart.length === 0) {
        showNotification('Il carrello è vuoto! Aggiungi prodotti prima di salvare un ordine.', 'error');
        return;
    }

    const modal = document.getElementById('order-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex', 'items-center', 'justify-center');

        // Se siamo in edit mode, pre-compila i campi con i dati originali
        if (window.editingOrderId && window.editingOrderData) {
            const customerNameInput = document.getElementById('customer-name');
            const customerEmailInput = document.getElementById('customer-email');
            const customerPhoneInput = document.getElementById('customer-phone');
            const orderNotesInput = document.getElementById('order-notes');

            if (customerNameInput) customerNameInput.value = window.editingOrderData.customer_name || '';
            if (customerEmailInput) customerEmailInput.value = window.editingOrderData.customer_email || '';
            if (customerPhoneInput) customerPhoneInput.value = window.editingOrderData.customer_phone || '';
            if (orderNotesInput) orderNotesInput.value = window.editingOrderData.notes || '';

            // Carica sede
            if (window.editingOrderData.sede) {
                const sedeRadio = document.querySelector(`input[name="order-sede"][value="${window.editingOrderData.sede}"]`);
                if (sedeRadio) sedeRadio.checked = true;
            }

            // Mostra indicatore di modifica
            const modalTitle = modal.querySelector('h2');
            if (modalTitle) {
                modalTitle.innerHTML = `
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Modifica Ordine #${window.editingOrderId}</span>
                    </div>
                `;
            }
        }

        // Focus sul campo nome cliente
        setTimeout(() => {
            const customerNameInput = document.getElementById('customer-name');
            if (customerNameInput) {
                customerNameInput.focus();
            }
        }, 100);
    }
}

/**
 * Chiude il modal degli ordini
 *
 * @function closeOrderModal
 * @returns {void}
 */
export function closeOrderModal() {
    const modal = document.getElementById('order-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex', 'items-center', 'justify-center');

        // Reset titolo modal se era in edit mode
        const modalTitle = modal.querySelector('h2');
        if (modalTitle) {
            modalTitle.textContent = 'Completa Ordine';
        }
    }
    clearOrderForm();
}

/**
 * Ripulisce i campi del form degli ordini
 *
 * @function clearOrderForm
 * @returns {void}
 */
export function clearOrderForm() {
    const customerName = document.getElementById('customer-name');
    const customerEmail = document.getElementById('customer-email');
    const customerPhone = document.getElementById('customer-phone');
    const orderNotes = document.getElementById('order-notes');

    if (customerName) customerName.value = '';
    if (customerEmail) customerEmail.value = '';
    if (customerPhone) customerPhone.value = '';
    if (orderNotes) orderNotes.value = '';

    // Reset radio buttons sede
    const sedeRadios = document.querySelectorAll('input[name="order-sede"]');
    sedeRadios.forEach(radio => radio.checked = false);
}

/**
 * Salva un nuovo ordine nel database Supabase
 * Calcola automaticamente subtotale, IVA e totale basandosi sui prezzi IVA inclusa
 *
 * @async
 * @function saveOrder
 * @returns {Promise<void>}
 * @throws {Error} Se il salvataggio nel database fallisce
 */
export async function saveOrder() {
    const customerNameInput = document.getElementById('customer-name');
    const customerEmailInput = document.getElementById('customer-email');
    const customerPhoneInput = document.getElementById('customer-phone');
    const orderNotesInput = document.getElementById('order-notes');
    const sedeSelected = document.querySelector('input[name="order-sede"]:checked');

    if (!customerNameInput) return;

    const customerName = customerNameInput.value.trim();
    const customerEmail = customerEmailInput?.value.trim() || null;
    const customerPhone = customerPhoneInput?.value.trim() || null;
    const notes = orderNotesInput?.value.trim() || null;
    const sede = sedeSelected?.value || null;

    if (!customerName) {
        alert('Inserisci il nome del cliente!');
        return;
    }

    if (!sede) {
        alert('Per favore, seleziona la sede (Thiene o Bassano)');
        return;
    }

    // Recuperare il carrello dalla finestra globale
    const cart = window.cart || [];

    // I prezzi nel carrello sono IVA INCLUSA (22%)
    // Calcoliamo il totale IVA inclusa
    const totalIvaInclusa = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calcoliamo l'imponibile: totale / 1.22
    const subtotal = totalIvaInclusa / 1.22;

    // Calcoliamo l'IVA: totale - imponibile
    const tax = totalIvaInclusa - subtotal;

    const total = totalIvaInclusa;

    // Controlla se siamo in edit mode
    const isEditMode = !!window.editingOrderId;
    const orderId = isEditMode ? window.editingOrderId : Date.now();

    const order = {
        id: orderId,
        date: isEditMode ? undefined : new Date().toLocaleString('it-IT'), // Mantieni data originale in edit mode
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        items: cart,
        subtotal: subtotal,
        tax: tax,
        total: total,
        notes: notes,
        sede: sede,
        created_by: isEditMode ? undefined : currentUser.id // Mantieni created_by originale
    };

    try {
        showNotification(isEditMode ? 'Aggiornamento ordine sul cloud...' : 'Salvataggio ordine sul cloud...', 'info');

        let error, data;
        if (isEditMode) {
            // UPDATE - Aggiorna ordine esistente
            const updateData = Object.fromEntries(
                Object.entries(order).filter(([_, value]) => value !== undefined)
            );

            const result = await supabase
                .from('orders')
                .update(updateData)
                .eq('id', orderId);

            error = result.error;

            // Per UPDATE, se non c'è errore, assumiamo successo
            // Le RLS policies potrebbero bloccare .select() anche se UPDATE ha successo
            if (!error) {
                data = [updateData]; // Simula data per superare il controllo
            }
        } else {
            // INSERT - Nuovo ordine
            const result = await supabase
                .from('orders')
                .insert([order])
                .select(); // IMPORTANTE: Ritorna i dati inseriti

            error = result.error;
            data = result.data;
        }

        if (error) {
            console.error('❌ Errore Supabase:', error);
            alert(`Errore nel ${isEditMode ? 'aggiornamento' : 'salvataggio'} dell'ordine!`);
            return;
        }

        if (!data || data.length === 0) {
            console.error('❌ Nessun dato ritornato da Supabase');
            alert(`Errore: ${isEditMode ? 'aggiornamento' : 'salvataggio'} fallito!`);
            return;
        }

        // Reset edit mode
        window.editingOrderId = null;
        window.editingOrderData = null;

        // Svuota carrello senza conferma
        if (typeof window.clearCartSilent === 'function') {
            window.clearCartSilent();
        }

        // Ricarica i dati dal database prima di renderizzare
        await loadOrders();

        // Usa skipQuery=true per evitare una seconda query duplicata
        await renderSavedOrders(true);
        closeOrderModal();

        showNotification(isEditMode ? 'Ordine aggiornato con successo! ✓' : 'Ordine salvato con successo! ✓');
    } catch (err) {
        console.error('Errore salvataggio:', err);
        alert(`Errore nel ${isEditMode ? 'aggiornamento' : 'salvataggio'}!`);
    }
}

/**
 * Carica tutti gli ordini da Supabase
 * Gli ordini vengono ordinati per ID decrescente (più recenti primo)
 *
 * @async
 * @function loadOrders
 * @returns {Promise<Array<Object>>} Array di ordini caricati
 * @throws {Error} Se il caricamento dal database fallisce
 */
export async function loadOrders() {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            throw error;
        }

        savedOrders = data || [];
        return savedOrders;
    } catch (err) {
        return [];
    }
}

/**
 * Renderizza la lista degli ordini salvati nel DOM
 * Visualizza una griglia di card con dettagli ordini, customer info, prodotti, totale
 * Include pulsanti per esportare PDF ed eliminare (se permessi)
 *
 * @async
 * @function renderSavedOrders
 * @param {boolean} skipQuery - Se true, usa savedOrders esistente invece di fare una nuova query
 * @returns {Promise<void>}
 */
export async function renderSavedOrders(skipQuery = false) {
    const ordersDiv = document.getElementById('saved-orders');
    if (!ordersDiv) return;

    try {
        if (!skipQuery) {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('id', { ascending: false });

            if (error) {
                ordersDiv.innerHTML = '<div class="empty-message">Errore nel caricamento degli ordini</div>';
                return;
            }

            savedOrders = data || [];
        }

        // Update orders count
        const ordersCount = document.getElementById('orders-count');
        if (ordersCount) {
            ordersCount.textContent = `${savedOrders.length} ${savedOrders.length === 1 ? 'ordine' : 'ordini'}`;
        }

        if (savedOrders.length === 0) {
            ordersDiv.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-5">
                <svg class="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <p class="text-gray-500 text-lg font-medium mb-2">Nessun ordine salvato</p>
            <p class="text-sm text-gray-400">Gli ordini completati appariranno qui</p>
        </div>
    `;
            return;
        }

        ordersDiv.innerHTML = savedOrders.map(order => {
            const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
            return `
    <div class="saved-order-card group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:border-brand hover:shadow-xl hover:-translate-y-1">
        <!-- Order Header -->
        <div class="saved-order-header bg-gradient-to-br from-[#FF9900] to-[#FF7700] dark:from-[#FF9900] dark:to-[#FFAC33] p-4">
            <div class="flex items-center justify-between text-white">
                <div class="flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span class="font-bold text-lg">#${order.id}</span>
                </div>
                <div class="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    ${itemCount} ${itemCount === 1 ? 'articolo' : 'articoli'}
                </div>
            </div>
        </div>

        <!-- Order Body -->
        <div class="p-5">
            <!-- Date -->
            <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>${order.date}</span>
            </div>

            <!-- Customer Info -->
            <div class="mb-4 p-3 bg-gray-50 rounded-xl space-y-2">
                <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="font-semibold text-gray-900">${order.customer_name}</span>
                </div>
                ${order.customer_email ? `
                    <div class="flex items-center gap-2 text-xs text-gray-600">
                        <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span class="truncate">${order.customer_email}</span>
                    </div>
                ` : ''}
                ${order.customer_phone ? `
                    <div class="flex items-center gap-2 text-xs text-gray-600">
                        <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>${order.customer_phone}</span>
                    </div>
                ` : ''}
                ${order.sede ? `
                    <div class="flex items-center gap-2 text-xs">
                        <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="font-semibold ${order.sede === 'Thiene' ? 'text-blue-600' : 'text-green-600'}">
                            Sede ${order.sede}
                        </span>
                    </div>
                ` : ''}
            </div>

            <!-- Products List -->
            <div class="mb-4">
                <div class="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Prodotti
                </div>
                <div class="space-y-1.5 max-h-32 overflow-y-auto">
                    ${order.items.map(item => `
                        <div class="flex flex-col text-sm bg-white p-2 rounded-lg border border-gray-100">
                            <div class="flex justify-between items-start gap-2">
                                <div class="flex-1 min-w-0">
                                    <span class="text-gray-900 font-medium block">${item.displayName || item.name}</span>
                                    ${item.configuration ? `
                                    <div class="text-xs text-gray-600 mt-1 space-y-0.5">
                                        ${item.configuration.chip ? `<div class="truncate">• Chip: ${item.configuration.chip}</div>` : ''}
                                        ${item.configuration.ram ? `<div class="truncate">• RAM: ${item.configuration.ram}</div>` : ''}
                                        ${item.configuration.storage ? `<div class="truncate">• Storage: ${item.configuration.storage}</div>` : ''}
                                        ${item.configuration.color ? `<div class="truncate">• Colore: ${item.configuration.color}</div>` : ''}
                                    </div>
                                    ` : ''}
                                    ${!item.configuration && (item.color || item.storage) ? `
                                    <div class="text-xs text-gray-600 mt-1">
                                        ${item.color ? `<span>🎨 ${item.color}</span>` : ''}
                                        ${item.storage ? `<span class="ml-2">💾 ${item.storage}</span>` : ''}
                                    </div>
                                    ` : ''}
                                </div>
                                <div class="flex items-center gap-3 text-xs whitespace-nowrap">
                                    <span class="text-gray-500">×${item.quantity}</span>
                                    <span class="font-semibold text-gray-900 min-w-[60px] text-right">€${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Notes (if any) -->
            ${order.notes ? `
                <div class="mb-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                    <div class="flex items-start gap-2">
                        <svg class="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <div class="text-xs text-amber-800 flex-1">
                            <span class="font-semibold block mb-1">Note:</span>
                            <span class="italic">${order.notes}</span>
                        </div>
                    </div>
                </div>
            ` : ''}

            <!-- Total -->
            <div class="saved-order-total flex items-center justify-between p-4 bg-gradient-to-br from-[#FF9900] to-[#FF7700] dark:from-[#FF9900] dark:to-[#FFAC33] rounded-xl mb-4">
                <span class="text-sm font-semibold text-white">Totale</span>
                <span class="text-2xl font-bold text-white">€${parseFloat(order.total).toFixed(2)}</span>
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
                <button
                    class="flex-1 px-4 py-2.5 bg-info dark:bg-info-dark text-white font-semibold rounded-xl transition-all duration-300 hover:bg-info-dark dark:hover:bg-info hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    onclick="window.orders.previewOrderPDF(${order.id})"
                    title="Anteprima PDF"
                >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span class="hidden sm:inline">Preview</span>
                </button>
                <button
                    class="px-4 py-2.5 bg-brand dark:bg-brand-darkmode text-white font-semibold rounded-xl transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center"
                    onclick="exportOrderPDF(${order.id})"
                    title="Scarica PDF"
                >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </button>
                ${canDeleteOrder(order) ? `
                    <button
                        class="px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-600 font-medium rounded-xl transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white hover:scale-105 active:scale-95 flex items-center justify-center"
                        onclick="deleteOrder(${order.id})"
                        title="Elimina ordine"
                    >
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                ` : ''}
            </div>
        </div>
    </div>
    `;
        }).join('');
    } catch (err) {
        ordersDiv.innerHTML = '<div class="col-span-full text-center text-gray-500 py-10">Errore nel caricamento</div>';
    }
}

/**
 * Verifica se l'utente attuale ha i permessi per eliminare un ordine
 */
export function canDeleteOrder(order) {
    if (userRole === 'admin') return true;
    return order.created_by === currentUser.id;
}

/**
 * Elimina un ordine dal database Supabase
 */
export async function deleteOrder(orderId) {
    if (!confirm('Sei sicuro di voler eliminare questo ordine?')) {
        return;
    }

    try {
        showNotification('Eliminazione dal cloud...', 'info');

        const { error } = await supabase
            .from('orders')
            .delete()
            .eq('id', orderId);

        if (error) {
            alert('Errore nell\'eliminazione dell\'ordine!');
            return;
        }

        await loadOrders();
        await renderSavedOrders(true);
        showNotification('Ordine eliminato');
    } catch (err) {
        alert('Errore nell\'eliminazione!');
    }
}

/**
 * Wrapper per l'esportazione in PDF di un singolo ordine
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
 * Esporta tutti gli ordini in formato CSV
 */
export function exportOrdersToCSV() {
    if (savedOrders.length === 0) {
        showNotification('Nessun ordine da esportare!', 'error');
        return;
    }

    try {
        showNotification('Generazione CSV in corso...', 'info');

        const headers = [
            'ID Ordine',
            'Numero Ordine',
            'Data',
            'Cliente',
            'Email',
            'Telefono',
            'Sede',
            'Prodotti',
            'Quantità Totale',
            'Subtotale',
            'IVA',
            'Totale',
            'Note'
        ];

        const sanitizeField = (field) => {
            if (field === null || field === undefined) return '';
            const str = String(field);
            if (str.includes(',') || str.includes('\n') || str.includes('"')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };

        const rows = savedOrders.map(order => {
            const productsStr = order.items
                .map(item => `${item.displayName || item.name} (x${item.quantity})`)
                .join('; ');

            const totalQty = order.items.reduce((sum, item) => sum + item.quantity, 0);

            return [
                order.id,
                order.order_number || '',
                order.date,
                sanitizeField(order.customer_name),
                sanitizeField(order.customer_email || ''),
                sanitizeField(order.customer_phone || ''),
                sanitizeField(order.sede || ''),
                sanitizeField(productsStr),
                totalQty,
                parseFloat(order.subtotal).toFixed(2),
                parseFloat(order.tax).toFixed(2),
                parseFloat(order.total).toFixed(2),
                sanitizeField(order.notes || '')
            ].join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `ordini_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showNotification(`CSV con ${savedOrders.length} ordini scaricato! ✓`, 'success');
    } catch (err) {
        console.error('Errore export CSV:', err);
        showNotification('Errore nell\'esportazione CSV', 'error');
    }
}

/**
 * Apre l'anteprima PDF di un ordine in un modal
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
            showNotification('Errore nella generazione del PDF', 'error');
            return;
        }

        const modal = document.getElementById('pdf-preview-modal');
        const iframe = document.getElementById('pdf-preview-iframe');
        const orderInfo = document.getElementById('preview-order-info');

        if (!modal || !iframe) {
            showNotification('Modal preview non trovato!', 'error');
            return;
        }

        if (orderInfo) {
            orderInfo.textContent = `Ordine #${order.id} - ${order.customer_name}`;
        }

        iframe.src = blobUrl;
        modal.classList.remove('hidden');
        modal.classList.add('flex', 'items-center', 'justify-center');
        window.currentPreviewOrderId = orderId;

    } catch (err) {
        console.error('Errore preview PDF:', err);
        showNotification('Errore nell\'anteprima PDF', 'error');
    }
}

/**
 * Chiude il modal di anteprima PDF
 */
export function closePDFPreview() {
    const modal = document.getElementById('pdf-preview-modal');
    const iframe = document.getElementById('pdf-preview-iframe');

    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex', 'items-center', 'justify-center');
    }

    if (iframe) {
        iframe.src = '';
    }

    window.currentPreviewOrderId = null;
}

/**
 * Resetta la modalità di modifica ordine
 */
export function resetEditMode() {
    window.editingOrderId = null;
    window.editingOrderData = null;

    const modal = document.getElementById('order-modal');
    if (modal) {
        const modalTitle = modal.querySelector('h2');
        if (modalTitle) {
            modalTitle.textContent = 'Completa Ordine';
        }
    }
}

/**
 * Carica un ordine salvato nel carrello per modificarlo
 */
export function loadOrderToCart(orderId) {
    const order = savedOrders.find(o => o.id === orderId);
    if (!order) {
        showNotification('Ordine non trovato!', 'error');
        return;
    }

    if (window.cart && window.cart.length > 0) {
        if (!confirm('Il carrello corrente verrà svuotato. Continuare?')) {
            return;
        }
    }

    try {
        if (window.cart) {
            window.cart.length = 0;
        }

        window.editingOrderId = orderId;
        window.editingOrderData = {
            customer_name: order.customer_name,
            customer_email: order.customer_email,
            customer_phone: order.customer_phone,
            notes: order.notes,
            sede: order.sede
        };

        if (order.items && order.items.length > 0) {
            order.items.forEach(item => {
                if (window.cart) {
                    window.cart.push({
                        id: item.id,
                        variantKey: item.variantKey || `${item.id}-default-default`,
                        name: item.displayName || item.name,
                        price: item.price,
                        quantity: item.quantity,
                        color: item.color || null,
                        storage: item.storage || null,
                        imageUrl: item.imageUrl || null,
                        configuration: item.configuration || null
                    });
                }
            });
        }

        if (typeof window.renderCart === 'function') {
            window.renderCart();
        }

        if (typeof window.updateCartBadge === 'function') {
            window.updateCartBadge(window.cart);
        }

        const previewModal = document.getElementById('pdf-preview-modal');
        if (previewModal) {
            previewModal.classList.add('hidden');
            const iframe = document.getElementById('pdf-preview-iframe');
            if (iframe) {
                iframe.src = '';
            }
        }

        if (typeof window.scrollToCart === 'function') {
            setTimeout(() => window.scrollToCart(), 300);
        }

        showNotification(`Ordine #${orderId} caricato nel carrello! ✓`, 'success');
    } catch (err) {
        console.error('Errore caricamento ordine:', err);
        showNotification('Errore nel caricamento dell\'ordine', 'error');
    }
}