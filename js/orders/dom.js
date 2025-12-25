/**
 * Orders V2 - DOM Rendering
 * Rendering UI e gestione eventi DOM
 */

import {
    filters,
    pagination,
    orders,
    isLoading,
    viewMode,
    currentOrder,
    ROAC_STATUS,
    ORDER_STATUS,
    PAYMENT_METHODS,
    SEARCH_SCOPES,
    generatePeriodOptions,
    calculateOrderStatus,
    countItemsByStatus,
    setViewMode,
    setIsLoading,
    setCurrentOrder
} from './state.js';

import { updateFiltersFromForm, getCurrentPeriodValue, resetAllFilters } from './filter.js';
import { fetchOrders, fetchOrderById, updateItemStatus } from './service.js';
import { IVA_DISPLAY } from '../config.js';
import { renderEmptyOrders } from '../shared/emptyState.js';

// ============================================================================
// MAIN CONTAINER
// ============================================================================

/**
 * Renderizza il container principale del modulo Orders V2
 */
export function renderOrdersModule() {
    const container = document.getElementById('orders-v2-module');
    if (!container) {
        console.warn('[OrdersV2] Container #orders-v2-module non trovato');
        return;
    }

    container.innerHTML = `
        <div class="min-h-screen bg-gray-50 dark:bg-dark-bg" role="dialog" aria-modal="true" aria-labelledby="orders-v2-heading">
            <!-- Header -->
            <div class="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border sticky top-0 z-40">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                        <div class="flex items-center gap-3">
                            <button
                                id="orders-v2-back-btn"
                                type="button"
                                class="btn btn-icon p-2 hover:bg-gray-100 dark:hover:bg-dark-elevated rounded-lg transition-colors"
                                aria-label="Torna al catalogo">
                                <svg class="w-5 h-5 text-gray-600 dark:text-dark-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                </svg>
                            </button>
                            <h1 id="orders-v2-heading" class="text-xl font-semibold text-gray-900 dark:text-dark-text">Gestione Ordini</h1>
                        </div>
                        <button
                            id="orders-v2-refresh-btn"
                            type="button"
                            class="btn btn-icon p-2 hover:bg-gray-100 dark:hover:bg-dark-elevated rounded-lg transition-colors"
                            aria-label="Aggiorna lista ordini">
                            <svg class="w-5 h-5 text-gray-600 dark:text-dark-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Content Area -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <!-- Filter Bar -->
                <div id="orders-v2-filter-bar"></div>

                <!-- Stats Bar (optional) -->
                <div id="orders-v2-stats" class="mb-4"></div>

                <!-- Orders List / Detail View -->
                <div id="orders-v2-content">
                    <div id="orders-v2-list"></div>
                    <div id="orders-v2-detail" class="hidden"></div>
                </div>

                <!-- Pagination -->
                <div id="orders-v2-pagination" class="mt-6"></div>
            </div>
        </div>
    `;

    // Render sub-components
    renderFilterBar();
    renderOrdersList();
}

// ============================================================================
// FILTER BAR
// ============================================================================

/**
 * Renderizza la barra filtri
 */
export function renderFilterBar() {
    const container = document.getElementById('orders-v2-filter-bar');
    if (!container) return;

    const periodOptions = generatePeriodOptions(24);
    const currentPeriod = getCurrentPeriodValue();
    const isAllPeriods = !filters.month || !filters.year;

    container.innerHTML = `
        <form id="orders-v2-filter-form" class="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border p-4 mb-6">
            <!-- Mobile: Stacked Layout -->
            <div class="flex flex-col gap-4 lg:hidden">
                <!-- Search Row -->
                <div class="flex gap-2">
                    <div class="flex-1 relative">
                        <input
                            type="text"
                            name="searchText"
                            value="${filters.searchText}"
                            placeholder="Cerca ordini..."
                            class="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg text-sm focus:ring-2 focus:ring-brand focus:border-transparent text-gray-900 dark:text-dark-text"
                        />
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                    <select
                        name="searchScope"
                        class="px-3 py-2.5 bg-gray-50 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg text-sm text-gray-900 dark:text-dark-text"
                    >
                        ${Object.entries(SEARCH_SCOPES).map(([key, scope]) => `
                            <option value="${scope.value}" ${filters.searchScope === scope.value ? 'selected' : ''}>
                                ${scope.label}
                            </option>
                        `).join('')}
                    </select>
                </div>

                <!-- Filters Row -->
                <div class="grid grid-cols-2 gap-2">
                    <!-- Periodo -->
                    <select
                        name="period"
                        class="px-3 py-2.5 bg-gray-50 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg text-sm text-gray-900 dark:text-dark-text"
                    >
                        <option value="all" ${isAllPeriods ? 'selected' : ''}>Tutti i periodi</option>
                        ${periodOptions.map(opt => `
                            <option value="${opt.month}-${opt.year}" ${!isAllPeriods && currentPeriod === `${opt.month}-${opt.year}` ? 'selected' : ''}>
                                ${opt.label}
                            </option>
                        `).join('')}
                    </select>

                    <!-- Stato -->
                    <select
                        name="status"
                        class="px-3 py-2.5 bg-gray-50 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg text-sm text-gray-900 dark:text-dark-text"
                    >
                        <option value="all" ${filters.status === 'all' ? 'selected' : ''}>Tutti</option>
                        <option value="open" ${filters.status === 'open' ? 'selected' : ''}>Aperti</option>
                        <option value="closed" ${filters.status === 'closed' ? 'selected' : ''}>Chiusi</option>
                        <option value="cancelled" ${filters.status === 'cancelled' ? 'selected' : ''}>Annullati</option>
                    </select>

                    <!-- Pagamento -->
                    <select
                        name="paymentMethod"
                        class="col-span-2 px-3 py-2.5 bg-gray-50 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg text-sm text-gray-900 dark:text-dark-text"
                    >
                        ${Object.entries(PAYMENT_METHODS).map(([key, method]) => `
                            <option value="${method.value}" ${filters.paymentMethod === method.value ? 'selected' : ''}>
                                ${method.label}
                            </option>
                        `).join('')}
                    </select>
                </div>

                <!-- Actions Row -->
                <div class="flex gap-2">
                    <button
                        type="submit"
                        class="flex-1 px-4 py-2.5 bg-brand hover:bg-brand-dark text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        Applica Filtri
                    </button>
                    <button
                        type="button"
                        id="orders-v2-reset-filters"
                        class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-dark-elevated dark:hover:bg-dark-border text-gray-700 dark:text-dark-text rounded-lg text-sm font-medium transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <!-- Desktop: Single Row Layout -->
            <div class="hidden lg:flex items-center gap-3">
                <!-- Search -->
                <div class="flex-1 flex gap-2">
                    <div class="flex-1 relative">
                        <input
                            type="text"
                            name="searchText"
                            value="${filters.searchText}"
                            placeholder="Cerca ordini..."
                            class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg text-sm focus:ring-2 focus:ring-brand focus:border-transparent text-gray-900 dark:text-dark-text"
                        />
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                    <select
                        name="searchScope"
                        class="px-3 py-2 bg-gray-50 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg text-sm text-gray-900 dark:text-dark-text min-w-[140px]"
                    >
                        ${Object.entries(SEARCH_SCOPES).map(([key, scope]) => `
                            <option value="${scope.value}" ${filters.searchScope === scope.value ? 'selected' : ''}>
                                ${scope.label}
                            </option>
                        `).join('')}
                    </select>
                </div>

                <!-- Separator -->
                <div class="w-px h-8 bg-gray-200 dark:bg-dark-border"></div>

                <!-- Period -->
                <select
                    name="period"
                    class="px-3 py-2 bg-gray-50 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg text-sm text-gray-900 dark:text-dark-text min-w-[160px]"
                >
                    <option value="all" ${isAllPeriods ? 'selected' : ''}>Tutti i periodi</option>
                    ${periodOptions.map(opt => `
                        <option value="${opt.month}-${opt.year}" ${!isAllPeriods && currentPeriod === `${opt.month}-${opt.year}` ? 'selected' : ''}>
                            ${opt.label}
                        </option>
                    `).join('')}
                </select>

                <!-- Status -->
                <select
                    name="status"
                    class="px-3 py-2 bg-gray-50 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg text-sm text-gray-900 dark:text-dark-text min-w-[120px]"
                >
                    <option value="all" ${filters.status === 'all' ? 'selected' : ''}>Tutti</option>
                    <option value="open" ${filters.status === 'open' ? 'selected' : ''}>Aperti</option>
                    <option value="closed" ${filters.status === 'closed' ? 'selected' : ''}>Chiusi</option>
                    <option value="cancelled" ${filters.status === 'cancelled' ? 'selected' : ''}>Annullati</option>
                </select>

                <!-- Payment -->
                <select
                    name="paymentMethod"
                    class="px-3 py-2 bg-gray-50 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg text-sm text-gray-900 dark:text-dark-text min-w-[130px]"
                >
                    ${Object.entries(PAYMENT_METHODS).map(([key, method]) => `
                        <option value="${method.value}" ${filters.paymentMethod === method.value ? 'selected' : ''}>
                            ${method.label}
                        </option>
                    `).join('')}
                </select>

                <!-- Separator -->
                <div class="w-px h-8 bg-gray-200 dark:bg-dark-border"></div>

                <!-- Actions -->
                <button
                    type="submit"
                    class="px-4 py-2 bg-brand hover:bg-brand-dark text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                >
                    Cerca
                </button>
                <button
                    type="button"
                    id="orders-v2-reset-filters-desktop"
                    class="px-3 py-2 text-gray-500 hover:text-gray-700 dark:text-dark-muted dark:hover:text-dark-text transition-colors"
                    title="Reset filtri"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </form>
    `;
}

// ============================================================================
// ORDERS LIST
// ============================================================================

/**
 * Renderizza la lista ordini
 */
export function renderOrdersList() {
    // Usa gli ordini dallo state globale
    const currentOrders = window.ordersState?.orders || orders || [];
    renderOrdersListWithState(currentOrders);
}

/**
 * Renderizza la lista ordini con gli ordini passati come parametro
 * @param {Array} ordersList - Lista ordini
 * @param {boolean} loading - Se true, mostra stato di caricamento
 */
function renderOrdersListWithState(ordersList, loading = false) {
    const container = document.getElementById('orders-v2-list');
    console.log('[OrdersV2] Container found:', !!container, 'Orders:', ordersList?.length, 'Loading:', loading);
    if (!container) {
        console.error('[OrdersV2] Container #orders-v2-list NOT FOUND!');
        return;
    }

    if (loading) {
        container.innerHTML = renderLoadingState();
        return;
    }

    if (!ordersList || ordersList.length === 0) {
        container.innerHTML = renderEmptyOrders();
        return;
    }

    // Desktop Table
    const tableHtml = `
        <div class="hidden lg:block bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-50 dark:bg-dark-elevated border-b border-gray-200 dark:border-dark-border">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">ID</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Data</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Cliente</th>
                        <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Totale</th>
                        <th class="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Stato</th>
                        <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Azioni</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-dark-border">
                    ${ordersList.map(order => renderOrderTableRow(order)).join('')}
                </tbody>
            </table>
        </div>
    `;

    // Mobile Cards
    const cardsHtml = `
        <div class="lg:hidden space-y-3">
            ${ordersList.map(order => renderOrderCard(order)).join('')}
        </div>
    `;

    container.innerHTML = tableHtml + cardsHtml;
}

/**
 * Renderizza una riga della tabella ordini
 */
function renderOrderTableRow(order) {
    const status = calculateOrderStatus(order.items);
    const statusBadge = renderStatusBadge(status, order.cancelled);
    const roacCounts = countItemsByStatus(order.items);

    // Usa 'date' o 'created_at' a seconda di cosa è disponibile
    const orderDate = order.date || order.created_at;
    const formattedDate = orderDate ? new Date(orderDate).toLocaleDateString('it-IT', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }) : 'N/D';

    const formattedTotal = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(order.total || 0);

    return `
        <tr class="hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors cursor-pointer" data-order-id="${order.id}">
            <td class="px-4 py-4">
                <span class="font-mono text-sm font-medium text-gray-900 dark:text-dark-text">
                    ${order.order_number || `#${order.id}`}
                </span>
            </td>
            <td class="px-4 py-4 text-sm text-gray-600 dark:text-dark-muted">
                ${formattedDate}
            </td>
            <td class="px-4 py-4">
                <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-900 dark:text-dark-text">${order.customer_name || 'N/D'}</span>
                    ${order.customer_email ? `<span class="text-xs text-gray-500 dark:text-dark-muted">${order.customer_email}</span>` : ''}
                </div>
            </td>
            <td class="px-4 py-4 text-right">
                <span class="text-sm font-semibold text-gray-900 dark:text-dark-text">${formattedTotal}</span>
            </td>
            <td class="px-4 py-4 text-center">
                ${statusBadge}
                <div class="flex justify-center gap-1 mt-1">
                    ${renderRoacMiniCounts(roacCounts)}
                </div>
            </td>
            <td class="px-4 py-4 text-right">
                <div class="flex justify-end gap-1">
                    <button
                        class="p-2 text-gray-400 hover:text-brand hover:bg-brand/10 rounded-lg transition-colors order-view-btn"
                        data-order-id="${order.id}"
                        title="Visualizza"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                    </button>
                    <button
                        class="p-2 text-gray-400 hover:text-info hover:bg-info/10 rounded-lg transition-colors order-pdf-btn"
                        data-order-id="${order.id}"
                        title="PDF"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

/**
 * Renderizza una card ordine per mobile
 */
function renderOrderCard(order) {
    const status = calculateOrderStatus(order.items);
    const statusBadge = renderStatusBadge(status, order.cancelled);
    const roacCounts = countItemsByStatus(order.items);

    // Usa 'date' o 'created_at' a seconda di cosa è disponibile
    const orderDate = order.date || order.created_at;
    const formattedDate = orderDate ? new Date(orderDate).toLocaleDateString('it-IT', {
        day: '2-digit',
        month: 'short'
    }) : 'N/D';

    const formattedTotal = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(order.total || 0);

    return `
        <div class="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border p-4 order-card" data-order-id="${order.id}">
            <div class="flex items-start justify-between mb-3">
                <div>
                    <span class="font-mono text-sm font-semibold text-gray-900 dark:text-dark-text">
                        ${order.order_number || `#${order.id}`}
                    </span>
                    <span class="ml-2 text-xs text-gray-500 dark:text-dark-muted">${formattedDate}</span>
                </div>
                ${statusBadge}
            </div>

            <div class="mb-3">
                <div class="font-medium text-gray-900 dark:text-dark-text">${order.customer_name || 'Cliente N/D'}</div>
                ${order.customer_phone ? `
                    <a href="tel:${order.customer_phone}" class="text-sm text-brand hover:underline">${order.customer_phone}</a>
                ` : ''}
            </div>

            <div class="flex items-center justify-between">
                <div class="flex gap-1">
                    ${renderRoacMiniCounts(roacCounts)}
                </div>
                <div class="flex items-center gap-3">
                    <span class="font-semibold text-gray-900 dark:text-dark-text">${formattedTotal}</span>
                    <button class="p-2 text-brand hover:bg-brand/10 rounded-lg transition-colors order-view-btn" data-order-id="${order.id}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================================================
// STATUS BADGES
// ============================================================================

/**
 * Renderizza badge stato ordine
 */
function renderStatusBadge(status, cancelled = false) {
    if (cancelled) {
        return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Annullato
        </span>`;
    }

    const badges = {
        [ORDER_STATUS.OPEN]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        [ORDER_STATUS.CLOSED]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    };

    const labels = {
        [ORDER_STATUS.OPEN]: 'Aperto',
        [ORDER_STATUS.CLOSED]: 'Chiuso'
    };

    return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[status] || badges[ORDER_STATUS.OPEN]}">
        ${labels[status] || 'Aperto'}
    </span>`;
}

/**
 * Renderizza mini contatori ROAC
 */
function renderRoacMiniCounts(counts) {
    const colors = {
        R: 'bg-blue-500',
        O: 'bg-yellow-500',
        A: 'bg-green-500',
        C: 'bg-gray-400'
    };

    return Object.entries(counts)
        .filter(([_, count]) => count > 0)
        .map(([status, count]) => `
            <span class="inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold text-white ${colors[status]}" title="${ROAC_STATUS[status].label}">
                ${count}
            </span>
        `).join('');
}

// ============================================================================
// EMPTY & LOADING STATES
// ============================================================================

function renderLoadingState() {
    return `
        <div class="flex flex-col items-center justify-center py-12">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-brand"></div>
            <p class="mt-4 text-gray-500 dark:text-dark-muted">Caricamento ordini...</p>
        </div>
    `;
}

// ============================================================================
// EVENT LISTENERS SETUP
// ============================================================================

/**
 * Setup degli event listeners per il modulo
 */
export function setupEventListeners() {
    // Open Orders V2 button (in main layout)
    document.addEventListener('click', (e) => {
        if (e.target.closest('#open-orders-v2-btn')) {
            e.preventDefault();
            showOrdersV2Module();
            // Load orders when opening
            loadOrdersOnOpen();
        }
    });

    // Filter form submit
    document.addEventListener('submit', async (e) => {
        if (e.target.id === 'orders-v2-filter-form') {
            e.preventDefault();
            updateFiltersFromForm(e.target);

            setIsLoading(true);
            renderOrdersListWithState([], true);

            try {
                const loadedOrders = await fetchOrders();
                renderOrdersListWithState(loadedOrders || [], false);
            } catch (error) {
                console.error('[OrdersV2] Errore filtro:', error);
                renderOrdersListWithState([], false);
            } finally {
                setIsLoading(false);
            }
        }
    });

    // Reset filters
    document.addEventListener('click', async (e) => {
        if (e.target.id === 'orders-v2-reset-filters' || e.target.id === 'orders-v2-reset-filters-desktop' || e.target.closest('#orders-v2-reset-filters-desktop')) {
            resetAllFilters();
            renderFilterBar();

            setIsLoading(true);
            renderOrdersListWithState([], true);

            try {
                const loadedOrders = await fetchOrders();
                renderOrdersListWithState(loadedOrders || [], false);
            } catch (error) {
                console.error('[OrdersV2] Errore reset:', error);
                renderOrdersListWithState([], false);
            } finally {
                setIsLoading(false);
            }
        }
    });

    // Refresh button
    document.addEventListener('click', async (e) => {
        if (e.target.closest('#orders-v2-refresh-btn')) {
            setIsLoading(true);
            renderOrdersListWithState([], true);

            try {
                const loadedOrders = await fetchOrders();
                renderOrdersListWithState(loadedOrders || [], false);
            } catch (error) {
                console.error('[OrdersV2] Errore refresh:', error);
                renderOrdersListWithState([], false);
            } finally {
                setIsLoading(false);
            }
        }
    });

    // Back button
    document.addEventListener('click', (e) => {
        if (e.target.closest('#orders-v2-back-btn')) {
            hideOrdersV2Module();
        }
    });

    // View order detail
    document.addEventListener('click', async (e) => {
        const viewBtn = e.target.closest('.order-view-btn');
        const orderCard = e.target.closest('.order-card');
        const orderRow = e.target.closest('tr[data-order-id]');

        let orderId = null;

        if (viewBtn) {
            orderId = viewBtn.dataset.orderId;
        } else if (orderCard && !e.target.closest('button') && !e.target.closest('a')) {
            orderId = orderCard.dataset.orderId;
        } else if (orderRow && !e.target.closest('button')) {
            orderId = orderRow.dataset.orderId;
        }

        if (orderId) {
            await openOrderDetail(orderId);
        }
    });
}

// ============================================================================
// ORDER DETAIL VIEW
// ============================================================================

/**
 * Apre la vista dettaglio ordine
 */
async function openOrderDetail(orderId) {
    setIsLoading(true);

    try {
        const order = await fetchOrderById(orderId);
        setCurrentOrder(order);
        setViewMode('detail');
        renderOrderDetail(order);
    } catch (error) {
        console.error('[OrdersV2] Errore apertura dettaglio:', error);
        // Show error notification
    } finally {
        setIsLoading(false);
    }
}

/**
 * Renderizza il dettaglio ordine completo con gestione ROAC
 */
function renderOrderDetail(order) {
    const listEl = document.getElementById('orders-v2-list');
    const detailEl = document.getElementById('orders-v2-detail');
    const filterBar = document.getElementById('orders-v2-filter-bar');

    if (listEl) listEl.classList.add('hidden');
    if (filterBar) filterBar.classList.add('hidden');

    if (!detailEl) return;

    detailEl.classList.remove('hidden');

    const status = calculateOrderStatus(order.items);
    const statusBadge = renderStatusBadgeDetail(status, order.cancelled);
    const roacCounts = countItemsByStatus(order.items);

    // Usa 'date' o 'created_at' a seconda di cosa è disponibile
    const orderDate = order.date || order.created_at;
    const formattedDate = orderDate ? new Date(orderDate).toLocaleDateString('it-IT', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }) : 'Data non disponibile';

    const formattedTotal = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(order.total || 0);

    const formattedSubtotal = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(order.subtotal || 0);

    const formattedTax = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(order.tax || 0);

    detailEl.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border p-4 sm:p-6">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <button id="orders-v2-back-to-list" class="p-2 hover:bg-gray-100 dark:hover:bg-dark-elevated rounded-lg transition-colors">
                            <svg class="w-5 h-5 text-gray-600 dark:text-dark-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>
                        <div>
                            <div class="flex items-center gap-3">
                                <h2 class="text-xl font-bold text-gray-900 dark:text-dark-text font-mono">
                                    ${order.order_number || `#${order.id}`}
                                </h2>
                                ${statusBadge}
                            </div>
                            <p class="text-sm text-gray-500 dark:text-dark-muted mt-1">${formattedDate}</p>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex flex-wrap gap-2">
                        <button class="order-action-btn px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-dark-elevated dark:hover:bg-dark-border text-gray-700 dark:text-dark-text rounded-lg text-sm font-medium transition-colors flex items-center gap-2" data-action="print" data-order-id="${order.id}">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                            </svg>
                            Stampa
                        </button>
                        ${!order.cancelled ? `
                            <button class="order-action-btn px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2" data-action="cancel" data-order-id="${order.id}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                                Annulla
                            </button>
                        ` : `
                            <button class="order-action-btn px-4 py-2 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2" data-action="restore" data-order-id="${order.id}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                </svg>
                                Ripristina
                            </button>
                        `}
                    </div>
                </div>

                <!-- ROAC Summary -->
                <div class="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-dark-border">
                    ${renderRoacSummaryBadges(roacCounts)}
                </div>
            </div>

            <!-- Customer Info -->
            <div class="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border p-4 sm:p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    Dati Cliente
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label class="text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wider">Nome</label>
                        <p class="text-gray-900 dark:text-dark-text font-medium mt-1">${order.customer_name || 'N/D'}</p>
                    </div>
                    ${order.customer_email ? `
                        <div>
                            <label class="text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wider">Email</label>
                            <a href="mailto:${order.customer_email}" class="block text-brand hover:underline font-medium mt-1">${order.customer_email}</a>
                        </div>
                    ` : ''}
                    ${order.customer_phone ? `
                        <div>
                            <label class="text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wider">Telefono</label>
                            <a href="tel:${order.customer_phone}" class="block text-brand hover:underline font-medium mt-1">${order.customer_phone}</a>
                        </div>
                    ` : ''}
                    ${order.tax_id ? `
                        <div>
                            <label class="text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wider">P.IVA</label>
                            <p class="text-gray-900 dark:text-dark-text font-mono mt-1">${order.tax_id}</p>
                        </div>
                    ` : ''}
                    ${order.fiscal_code ? `
                        <div>
                            <label class="text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wider">Codice Fiscale</label>
                            <p class="text-gray-900 dark:text-dark-text font-mono mt-1">${order.fiscal_code}</p>
                        </div>
                    ` : ''}
                    ${order.sede ? `
                        <div>
                            <label class="text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wider">Sede Ritiro</label>
                            <p class="text-gray-900 dark:text-dark-text font-medium mt-1">${order.sede}</p>
                        </div>
                    ` : ''}
                </div>
                ${order.notes ? `
                    <div class="mt-4 pt-4 border-t border-gray-100 dark:border-dark-border">
                        <label class="text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wider">Note</label>
                        <p class="text-gray-700 dark:text-dark-muted mt-1 whitespace-pre-wrap">${order.notes}</p>
                    </div>
                ` : ''}
            </div>

            <!-- Products Table -->
            <div class="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
                <div class="p-4 sm:p-6 border-b border-gray-100 dark:border-dark-border">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text flex items-center gap-2">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                            </svg>
                            Prodotti (${(order.items || []).length})
                        </h3>
                        ${!order.cancelled ? `
                            <button id="mark-all-next-status" class="px-3 py-1.5 bg-brand/10 hover:bg-brand/20 text-brand rounded-lg text-sm font-medium transition-colors">
                                Avanza tutti →
                            </button>
                        ` : ''}
                    </div>
                </div>

                <!-- Desktop Table -->
                <div class="hidden lg:block overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 dark:bg-dark-elevated">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Prodotto</th>
                                <th class="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Qtà</th>
                                <th class="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Prezzo</th>
                                <th class="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Totale</th>
                                <th class="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Stato ROAC</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 dark:divide-dark-border">
                            ${(order.items || []).map((item, index) => renderProductRowDesktop(item, index, order.id, order.cancelled)).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Mobile Cards -->
                <div class="lg:hidden divide-y divide-gray-100 dark:divide-dark-border">
                    ${(order.items || []).map((item, index) => renderProductRowMobile(item, index, order.id, order.cancelled)).join('')}
                </div>
            </div>

            <!-- Totals & Payment -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Payment Method -->
                <div class="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border p-4 sm:p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                        </svg>
                        Metodo di Pagamento
                    </h3>
                    <div class="flex items-center gap-3">
                        ${renderPaymentMethodBadge(order.payment_method)}
                    </div>
                </div>

                <!-- Totals -->
                <div class="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border p-4 sm:p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                        Riepilogo
                    </h3>
                    <div class="space-y-2">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500 dark:text-dark-muted">Subtotale</span>
                            <span class="text-gray-900 dark:text-dark-text font-medium">${formattedSubtotal}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500 dark:text-dark-muted">IVA (${IVA_DISPLAY})</span>
                            <span class="text-gray-900 dark:text-dark-text font-medium">${formattedTax}</span>
                        </div>
                        <div class="flex justify-between pt-3 border-t border-gray-100 dark:border-dark-border">
                            <span class="text-lg font-bold text-gray-900 dark:text-dark-text">Totale</span>
                            <span class="text-xl font-bold text-brand">${formattedTotal}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Setup detail event listeners
    setupDetailEventListeners(order);
}

/**
 * Renderizza una riga prodotto per desktop
 */
function renderProductRowDesktop(item, index, orderId, isCancelled) {
    const itemStatus = item.status || 'R';
    const statusInfo = ROAC_STATUS[itemStatus] || ROAC_STATUS.R;

    const formattedPrice = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(item.price || 0);

    const formattedTotal = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format((item.price || 0) * (item.quantity || 1));

    return `
        <tr class="hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors">
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <span class="text-2xl">${item.icon || '📦'}</span>
                    <div>
                        <p class="font-medium text-gray-900 dark:text-dark-text">${item.name || 'Prodotto'}</p>
                        ${item.configSummary ? `<p class="text-xs text-gray-500 dark:text-dark-muted mt-0.5">${item.configSummary}</p>` : ''}
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 text-center text-gray-600 dark:text-dark-muted">
                ${item.quantity || 1}
            </td>
            <td class="px-6 py-4 text-right text-gray-600 dark:text-dark-muted">
                ${formattedPrice}
            </td>
            <td class="px-6 py-4 text-right font-medium text-gray-900 dark:text-dark-text">
                ${formattedTotal}
            </td>
            <td class="px-6 py-4">
                <div class="flex justify-center">
                    ${isCancelled ? renderRoacBadgeStatic(itemStatus) : renderRoacSelector(itemStatus, index, orderId)}
                </div>
            </td>
        </tr>
    `;
}

/**
 * Renderizza una card prodotto per mobile
 */
function renderProductRowMobile(item, index, orderId, isCancelled) {
    const itemStatus = item.status || 'R';

    const formattedPrice = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(item.price || 0);

    const formattedTotal = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format((item.price || 0) * (item.quantity || 1));

    return `
        <div class="p-4">
            <div class="flex items-start gap-3 mb-3">
                <span class="text-2xl">${item.icon || '📦'}</span>
                <div class="flex-1">
                    <p class="font-medium text-gray-900 dark:text-dark-text">${item.name || 'Prodotto'}</p>
                    ${item.configSummary ? `<p class="text-xs text-gray-500 dark:text-dark-muted mt-0.5">${item.configSummary}</p>` : ''}
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="text-sm text-gray-500 dark:text-dark-muted">
                    ${item.quantity || 1} × ${formattedPrice} = <span class="font-medium text-gray-900 dark:text-dark-text">${formattedTotal}</span>
                </div>
                ${isCancelled ? renderRoacBadgeStatic(itemStatus) : renderRoacSelector(itemStatus, index, orderId)}
            </div>
        </div>
    `;
}

/**
 * Renderizza il selettore stato ROAC per un item
 */
function renderRoacSelector(currentStatus, itemIndex, orderId) {
    const statuses = ['R', 'O', 'A', 'C'];

    return `
        <div class="roac-selector inline-flex rounded-lg border border-gray-200 dark:border-dark-border overflow-hidden" data-item-index="${itemIndex}" data-order-id="${orderId}">
            ${statuses.map(status => {
                const info = ROAC_STATUS[status];
                const isActive = status === currentStatus;
                const bgColors = {
                    R: isActive ? 'bg-blue-500 text-white' : 'bg-white dark:bg-dark-card text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20',
                    O: isActive ? 'bg-yellow-500 text-white' : 'bg-white dark:bg-dark-card text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
                    A: isActive ? 'bg-green-500 text-white' : 'bg-white dark:bg-dark-card text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20',
                    C: isActive ? 'bg-gray-500 text-white' : 'bg-white dark:bg-dark-card text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/20'
                };

                return `
                    <button
                        class="roac-status-btn px-3 py-1.5 text-xs font-bold transition-colors ${bgColors[status]}"
                        data-status="${status}"
                        title="${info.label}"
                    >
                        ${status}
                    </button>
                `;
            }).join('')}
        </div>
    `;
}

/**
 * Renderizza badge ROAC statico (per ordini annullati)
 */
function renderRoacBadgeStatic(status) {
    const info = ROAC_STATUS[status] || ROAC_STATUS.R;
    const colors = {
        R: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        O: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        A: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        C: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    };

    return `
        <span class="px-3 py-1.5 rounded-lg text-xs font-bold ${colors[status]}">
            ${status} - ${info.label}
        </span>
    `;
}

/**
 * Renderizza badge stato ordine nel dettaglio
 */
function renderStatusBadgeDetail(status, cancelled = false) {
    if (cancelled) {
        return `<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Annullato
        </span>`;
    }

    const badges = {
        [ORDER_STATUS.OPEN]: {
            class: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>'
        },
        [ORDER_STATUS.CLOSED]: {
            class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>'
        }
    };

    const labels = {
        [ORDER_STATUS.OPEN]: 'Aperto',
        [ORDER_STATUS.CLOSED]: 'Chiuso'
    };

    const badge = badges[status] || badges[ORDER_STATUS.OPEN];
    const label = labels[status] || 'Aperto';

    return `<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badge.class}">
        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">${badge.icon}</svg>
        ${label}
    </span>`;
}

/**
 * Renderizza i badge riassuntivi ROAC
 */
function renderRoacSummaryBadges(counts) {
    const badges = [];

    Object.entries(ROAC_STATUS).forEach(([code, info]) => {
        if (counts[code] > 0) {
            const colors = {
                R: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                O: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
                A: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                C: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
            };

            badges.push(`
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg ${colors[code]}">
                    <span class="text-lg">${info.icon}</span>
                    <span class="font-bold">${counts[code]}</span>
                    <span class="text-sm">${info.label}</span>
                </div>
            `);
        }
    });

    return badges.join('') || '<span class="text-gray-500 dark:text-dark-muted">Nessun prodotto</span>';
}

/**
 * Renderizza il badge metodo di pagamento
 */
function renderPaymentMethodBadge(method) {
    const methods = {
        bonifico: { label: 'Bonifico Bancario', icon: '🏦', class: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' },
        contanti: { label: 'Contanti', icon: '💵', class: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' },
        pos: { label: 'POS / Carta', icon: '💳', class: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' },
        finanziamento: { label: 'Finanziamento', icon: '📋', class: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' },
        permuta: { label: 'Permuta', icon: '🔄', class: 'bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400' }
    };

    const info = methods[method] || { label: method || 'Non specificato', icon: '❓', class: 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400' };

    return `
        <div class="flex items-center gap-3 px-4 py-3 rounded-xl ${info.class}">
            <span class="text-2xl">${info.icon}</span>
            <span class="font-medium">${info.label}</span>
        </div>
    `;
}

/**
 * Setup event listeners per la vista dettaglio
 */
function setupDetailEventListeners(order) {
    // Back to list
    document.getElementById('orders-v2-back-to-list')?.addEventListener('click', () => {
        backToList();
    });

    // ROAC status change
    document.querySelectorAll('.roac-status-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const selector = e.target.closest('.roac-selector');
            const itemIndex = parseInt(selector.dataset.itemIndex);
            const orderId = selector.dataset.orderId;
            const newStatus = e.target.dataset.status;

            await handleStatusChange(orderId, itemIndex, newStatus);
        });
    });

    // Mark all next status
    document.getElementById('mark-all-next-status')?.addEventListener('click', async () => {
        await handleMarkAllNextStatus(order);
    });

    // Order actions (print, cancel, restore)
    document.querySelectorAll('.order-action-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const action = btn.dataset.action;
            const orderId = btn.dataset.orderId;

            await handleOrderAction(action, orderId);
        });
    });
}

/**
 * Gestisce il cambio stato di un item
 */
async function handleStatusChange(orderId, itemIndex, newStatus) {
    try {
        const updatedOrder = await updateItemStatus(orderId, itemIndex, newStatus);
        setCurrentOrder(updatedOrder);
        renderOrderDetail(updatedOrder);

        // Show notification
        const statusInfo = ROAC_STATUS[newStatus];
        if (window.showNotification) {
            window.showNotification(`Stato aggiornato: ${statusInfo.icon} ${statusInfo.label}`, 'success');
        }
    } catch (error) {
        console.error('[OrdersV2] Errore cambio stato:', error);
        if (window.showNotification) {
            window.showNotification('Errore nel cambio stato', 'error');
        }
    }
}

/**
 * Avanza tutti gli item al prossimo stato
 */
async function handleMarkAllNextStatus(order) {
    const statusOrder = ['R', 'O', 'A', 'C'];
    const items = order.items || [];

    // Find the lowest status and advance all to next
    let lowestIndex = 3;
    items.forEach(item => {
        const idx = statusOrder.indexOf(item.status || 'R');
        if (idx < lowestIndex) lowestIndex = idx;
    });

    const nextStatus = statusOrder[Math.min(lowestIndex + 1, 3)];

    try {
        const { updateAllItemsStatus } = await import('./service.js');
        const updatedOrder = await updateAllItemsStatus(order.id, nextStatus);
        setCurrentOrder(updatedOrder);
        renderOrderDetail(updatedOrder);

        const statusInfo = ROAC_STATUS[nextStatus];
        if (window.showNotification) {
            window.showNotification(`Tutti i prodotti: ${statusInfo.icon} ${statusInfo.label}`, 'success');
        }
    } catch (error) {
        console.error('[OrdersV2] Errore avanzamento stati:', error);
        if (window.showNotification) {
            window.showNotification('Errore nell\'avanzamento stati', 'error');
        }
    }
}

/**
 * Gestisce le azioni ordine (stampa, annulla, ripristina)
 */
async function handleOrderAction(action, orderId) {
    switch (action) {
        case 'print':
            // Use existing PDF export
            if (window.exportOrderPDF) {
                window.exportOrderPDF(orderId);
            } else if (window.orders?.exportOrderPDF) {
                window.orders.exportOrderPDF(orderId);
            }
            break;

        case 'cancel':
            if (confirm('Sei sicuro di voler annullare questo ordine?')) {
                try {
                    const { cancelOrder } = await import('./service.js');
                    const updatedOrder = await cancelOrder(orderId);
                    setCurrentOrder(updatedOrder);
                    renderOrderDetail(updatedOrder);
                    if (window.showNotification) {
                        window.showNotification('Ordine annullato', 'warning');
                    }
                } catch (error) {
                    console.error('[OrdersV2] Errore annullamento:', error);
                }
            }
            break;

        case 'restore':
            try {
                const { restoreOrder } = await import('./service.js');
                const updatedOrder = await restoreOrder(orderId);
                setCurrentOrder(updatedOrder);
                renderOrderDetail(updatedOrder);
                if (window.showNotification) {
                    window.showNotification('Ordine ripristinato', 'success');
                }
            } catch (error) {
                console.error('[OrdersV2] Errore ripristino:', error);
            }
            break;
    }
}

/**
 * Torna alla lista ordini
 */
async function backToList() {
    setViewMode('list');
    setCurrentOrder(null);

    const listEl = document.getElementById('orders-v2-list');
    const detailEl = document.getElementById('orders-v2-detail');
    const filterBar = document.getElementById('orders-v2-filter-bar');

    if (listEl) listEl.classList.remove('hidden');
    if (detailEl) detailEl.classList.add('hidden');
    if (filterBar) filterBar.classList.remove('hidden');

    // Refresh list to show updated data
    renderOrdersListWithState([], true);
    try {
        const loadedOrders = await fetchOrders();
        renderOrdersListWithState(loadedOrders || [], false);
    } catch (error) {
        console.error('[OrdersV2] Errore back to list:', error);
        renderOrdersListWithState([], false);
    }
}

// ============================================================================
// MODULE VISIBILITY
// ============================================================================

// Store FocusTrap instance globally for this module
let ordersModuleFocusTrap = null;

/**
 * Mostra il modulo Orders V2
 */
export function showOrdersV2Module() {
    // Ensure container exists
    let module = document.getElementById('orders-v2-module');
    if (!module) {
        module = document.createElement('div');
        module.id = 'orders-v2-module';
        document.body.insertBefore(module, document.body.firstChild);
    }

    const mainContent = document.getElementById('app-container');

    if (module) module.classList.remove('hidden');
    if (mainContent) mainContent.style.display = 'none';

    renderOrdersModule();

    // Accessibility: Focus trap activation
    if (typeof window.FocusTrap !== 'undefined') {
        ordersModuleFocusTrap = new window.FocusTrap(module);
        ordersModuleFocusTrap.activate();
    }

    // Accessibility: ESC key to close
    if (typeof window.KeyboardNavigationManager !== 'undefined') {
        window.KeyboardNavigationManager.enableModalEscapeClose(module, hideOrdersV2Module);
    }

    // Accessibility: ARIA announcement
    if (typeof window.ariaAnnouncer !== 'undefined') {
        window.ariaAnnouncer.announcePolite('Modulo Gestione Ordini aperto');
    }
}

/**
 * Nasconde il modulo Orders V2
 */
export function hideOrdersV2Module() {
    const module = document.getElementById('orders-v2-module');
    const mainContent = document.getElementById('app-container');

    // Accessibility: Deactivate focus trap
    if (ordersModuleFocusTrap) {
        ordersModuleFocusTrap.deactivate();
        ordersModuleFocusTrap = null;
    }

    // Accessibility: ARIA announcement
    if (typeof window.ariaAnnouncer !== 'undefined') {
        window.ariaAnnouncer.announcePolite('Modulo Gestione Ordini chiuso');
    }

    if (module) module.classList.add('hidden');
    if (mainContent) mainContent.style.display = '';
}

// Flag per evitare chiamate multiple
let isLoadingOrders = false;

/**
 * Carica gli ordini all'apertura del modulo
 */
async function loadOrdersOnOpen() {
    // Evita chiamate multiple simultanee
    if (isLoadingOrders) return;
    isLoadingOrders = true;

    setIsLoading(true);
    renderOrdersListWithState([], true);  // Mostra loading

    try {
        const loadedOrders = await fetchOrders();
        console.log('[OrdersV2] Rendering orders:', loadedOrders?.length || 0);
        renderOrdersListWithState(loadedOrders || [], false);
    } catch (error) {
        console.error('[OrdersV2] Errore caricamento ordini:', error);
        renderOrdersListWithState([], false);
    } finally {
        setIsLoading(false);
        isLoadingOrders = false;
    }
}

// ============================================================================
// GLOBAL EXPOSURE
// ============================================================================

if (typeof window !== 'undefined') {
    window.ordersDom = {
        renderOrdersModule,
        renderFilterBar,
        renderOrdersList,
        showOrdersV2Module,
        hideOrdersV2Module,
        setupEventListeners
    };
}
