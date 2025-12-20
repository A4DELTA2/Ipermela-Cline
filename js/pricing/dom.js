/**
 * Pricing DOM Module
 * Handles rendering of the price management interface
 */

import { products } from '../products/state.js';
import { originalPrices, modifiedPrices, priceFilter, priceSearchQuery } from './state.js';

/**
 * Mostra/Nasconde il modale di gestione prezzi
 */
export function togglePriceModal(show) {
    const section = document.getElementById('price-management-section');
    if (section) {
        if (show) {
            section.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            section.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
}

/**
 * Renderizza la tabella dei prezzi
 */
export function renderPriceTable() {
    const tbody = document.getElementById('price-table-body');
    if (!tbody) return;

    if (!products || !Array.isArray(products) || products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="py-16 text-center">
                    <div class="flex flex-col items-center gap-3">
                        <svg class="w-16 h-16 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-gray-500 font-semibold">Caricamento prodotti...</p>
                        <p class="text-sm text-gray-400">Attendi o ricarica la pagina</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    let filteredProducts = products;

    if (priceFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === priceFilter);
    }

    if (priceSearchQuery) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(priceSearchQuery)
        );
    }

    if (filteredProducts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="py-16 text-center">
                    <div class="flex flex-col items-center gap-3">
                        <svg class="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p class="text-gray-500 font-medium">Nessun prodotto trovato</p>
                        <p class="text-sm text-gray-400">Prova a modificare i filtri</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredProducts.map(product => {
        const originalPrice = originalPrices[product.id] || product.price || 0;
        const currentPrice = product.price || 0;
        const pendingPrice = modifiedPrices[product.id];
        const categoryInfo = getCategoryInfo(product.category);
        const hasChanges = pendingPrice !== undefined;

        return `
            <tr data-product-id="${product.id}" class="group hover:bg-orange-50/30 transition-all duration-300 ${hasChanges ? 'bg-amber-50' : ''}">
                <!-- Product Name with Icon -->
                <td class="px-4 py-4">
                    <div class="flex items-center gap-3">
                        <div class="text-3xl">${product.icon}</div>
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="font-semibold text-gray-900">${product.name}</span>
                                ${product.custom ? '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-info dark:bg-info-dark text-white">Personalizzato</span>' : ''}
                            </div>
                            ${hasChanges ? '<div class="text-xs text-amber-600 font-medium mt-1">● Modifiche in sospeso</div>' : ''}
                        </div>
                    </div>
                </td>

                <!-- Category Badge -->
                <td class="px-4 py-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${categoryInfo.color}">
                        ${categoryInfo.label}
                    </span>
                </td>

                <!-- Original Price -->
                <td class="px-4 py-4">
                    <div class="flex items-center gap-2">
                        <span class="text-gray-400 line-through text-sm">€${originalPrice.toFixed(2)}</span>
                        ${originalPrice !== currentPrice ? '<span class="text-xs text-orange-600 font-medium">Modificato</span>' : ''}
                    </div>
                </td>

                <!-- Current Price Input -->
                <td class="px-4 py-4">
                    <div class="relative inline-block">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span class="text-gray-500">€</span>
                        </div>
                        <input
                            type="number"
                            class="w-36 pl-8 pr-3 py-2.5 border-2 rounded-xl text-base font-semibold transition-all duration-300 focus:outline-none focus:ring-2 ${hasChanges ? 'border-apple-darkorange bg-amber-50 text-amber-900 focus:border-apple-darkorange focus:ring-apple-darkorange/20' : 'border-gray-200 text-gray-900 focus:border-brand-dark focus:ring-brand-dark/20'}"
                            value="${pendingPrice !== undefined ? pendingPrice : currentPrice.toFixed(2)}"
                            min="0"
                            step="0.01"
                            data-product-id="${product.id}"
                            onchange="window.pricingModule.updatePriceInput(${product.id}, this.value)"
                        />
                    </div>
                </td>

                <!-- Actions -->
                <td class="px-4 py-4">
                    <div class="flex items-center justify-center gap-2">
                        <button
                            class="px-4 py-2 bg-[#5BC77A] text-white font-medium rounded-lg transition-all duration-300 hover:opacity-90 hover:shadow-md hover:scale-105 active:scale-95 flex items-center gap-1.5"
                            onclick="window.pricingModule.savePriceChange(${product.id})"
                            title="Salva prezzo"
                        >
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span class="hidden sm:inline">Salva</span>
                        </button>
                        ${!product.custom ? `
                        <button
                            class="px-3 py-2 bg-white border-2 border-gray-200 text-gray-600 font-medium rounded-lg transition-all duration-300 hover:border-brand-dark hover:bg-brand-dark hover:text-white hover:scale-105 active:scale-95"
                            onclick="window.pricingModule.resetPrice(${product.id})"
                            title="Ripristina prezzo originale"
                        >
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                        ` : `
                        <button
                            class="px-3 py-2 bg-danger dark:bg-danger-dark text-white font-medium rounded-lg transition-all duration-300 hover:bg-red-700 hover:shadow-md hover:scale-105 active:scale-95 flex items-center gap-1.5"
                            onclick="window.pricingModule.deleteCustomProduct(${product.id})"
                            title="Elimina prodotto personalizzato"
                        >
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span class="hidden sm:inline">Elimina</span>
                        </button>
                        `}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function getCategoryInfo(category) {
    const categories = {
        'iphone': { label: 'iPhone', color: 'bg-purple-100 text-purple-700 border-purple-200' },
        'mac': { label: 'Mac', color: 'bg-blue-100 text-blue-700 border-blue-200' },
        'ipad': { label: 'iPad', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
        'accessori': { label: 'Accessori', color: 'bg-green-100 text-green-700 border-green-200' }
    };
    return categories[category] || { label: category, color: 'bg-gray-100 text-gray-700 border-gray-200' };
}