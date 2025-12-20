/**
 * Orders DOM Module
 * Handles rendering and UI interactions
 */

import { savedOrders, editingState } from './state.js';
import { userRole, currentUser } from '../auth.js';

/**
 * Renderizza la lista degli ordini nel DOM
 */
export function renderOrdersList() {
    const ordersDiv = document.getElementById('saved-orders');
    if (!ordersDiv) return;

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

    ordersDiv.innerHTML = savedOrders.map(order => generateOrderCardHtml(order)).join('');
}

/**
 * Genera l'HTML per una card ordine
 */
function generateOrderCardHtml(order) {
    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
    const canDelete = userRole === 'admin' || order.created_by === currentUser?.id;

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
                ${canDelete ? `
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
}

/**
 * Apre il modal degli ordini (nuovo o modifica)
 */
export function openOrderModalLogic() {
    const modal = document.getElementById('order-modal');
    if (!modal) return;

    modal.classList.remove('hidden');
    modal.classList.add('flex', 'items-center', 'justify-center');

    // Se siamo in edit mode, pre-compila i campi
    if (editingState.isEditing && editingState.orderData) {
        fillOrderForm(editingState.orderData);
        updateModalTitle(`Modifica Ordine #${editingState.orderId}`);
    } else {
        updateModalTitle('Completa Ordine');
    }

    // Focus sul primo campo
    setTimeout(() => {
        const input = document.getElementById('customer-name');
        if (input) input.focus();
    }, 100);
}

/**
 * Chiude il modal degli ordini
 */
export function closeOrderModalLogic() {
    const modal = document.getElementById('order-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex', 'items-center', 'justify-center');
    }
    clearOrderForm();
}

/**
 * Compila il form con i dati dell'ordine
 */
function fillOrderForm(data) {
    setValue('customer-name', data.customer_name);
    setValue('customer-email', data.customer_email);
    setValue('customer-phone', data.customer_phone);
    setValue('order-notes', data.notes);

    if (data.sede) {
        const radio = document.querySelector(`input[name="order-sede"][value="${data.sede}"]`);
        if (radio) radio.checked = true;
    }
}

/**
 * Pulisce il form
 */
export function clearOrderForm() {
    setValue('customer-name', '');
    setValue('customer-email', '');
    setValue('customer-phone', '');
    setValue('order-notes', '');

    document.querySelectorAll('input[name="order-sede"]').forEach(r => r.checked = false);
}

function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value || '';
}

function updateModalTitle(title) {
    const modal = document.getElementById('order-modal');
    const h2 = modal?.querySelector('h2');
    if (h2) {
        if (title.includes('Modifica')) {
            h2.innerHTML = `
                <div class="flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>${title}</span>
                </div>
            `;
        } else {
            h2.textContent = title;
        }
    }
}

/**
 * Mostra il modal di anteprima PDF
 */
export function showPDFPreviewModal(blobUrl, title) {
    const modal = document.getElementById('pdf-preview-modal');
    const iframe = document.getElementById('pdf-preview-iframe');
    const info = document.getElementById('preview-order-info');

    if (!modal || !iframe) return;

    if (info) info.textContent = title;
    iframe.src = blobUrl;

    modal.classList.remove('hidden');
    modal.classList.add('flex', 'items-center', 'justify-center');
}

/**
 * Chiude il modal di anteprima PDF
 */
export function hidePDFPreviewModal() {
    const modal = document.getElementById('pdf-preview-modal');
    const iframe = document.getElementById('pdf-preview-iframe');

    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex', 'items-center', 'justify-center');
    }
    if (iframe) iframe.src = '';
}