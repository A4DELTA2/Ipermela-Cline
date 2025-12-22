/**
 * Products DOM Module
 * Handles rendering of product cards and UI interactions
 */

import { products, currentFilter, currentSubcategory, searchQuery } from './state.js';
import { filterProductsList, calculateConfiguredPrice, getAvailableRamOptions, getAvailableStorageOptions, buildConfigSummary } from './logic.js';
import { productPricing } from '../data.js';
import { notify } from '../shared/notifications.js';

/**
 * Renderizza la griglia dei prodotti
 */
export function renderProductsGrid() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const filteredProducts = filterProductsList(products, currentFilter, currentSubcategory, searchQuery);

    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-16">
                <div class="flex flex-col items-center gap-4">
                    <svg class="w-20 h-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <div class="text-gray-500 text-lg font-medium">Nessun prodotto trovato</div>
                    <div class="text-gray-400 text-sm">Prova a modificare i filtri di ricerca</div>
                </div>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredProducts.map(product => renderProductCard(product)).join('');
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

/**
 * Renderizza una singola card prodotto
 */
export function renderProductCard(product) {
    const categoryInfo = getCategoryInfo(product.category);
    const hasColors = product.colors && product.colors.length > 0;
    const hasStorage = product.storage && product.storage.length > 0;
    const hasConfigurations = product.configurations;
    const hasExpandableContent = true;
    
    // Usa imageUrl del prodotto o la prima immagine colore disponibile
    const displayImage = product.imageUrl || (hasColors ? product.colors[0].imageUrl : null);

    // Inizializza configurazione corrente se non esiste
    if (hasConfigurations && !product.currentConfig) {
        product.currentConfig = {
            chip: product.baseConfig?.chip || product.configurations.chip?.[0]?.name || '',
            ram: product.baseConfig?.ram || product.configurations.ram?.[0]?.size || '',
            storage: product.baseConfig?.storage || product.configurations.storage?.[0]?.size || '',
            color: hasColors ? product.colors[0].code : null
        };
    }

    const currentPrice = hasConfigurations
        ? calculateConfiguredPrice(product, product.currentConfig)
        : (product.price || product.basePrice);

    return `
    <div class="product-card bg-white rounded-3xl shadow-lg border-2 border-gray-100 hover:border-apple-blue transition-all duration-300 mb-4 overflow-hidden group" data-id="${product.id}" onclick="toggleProductCard(${product.id})">

        <div class="flex h-[120px]">
            <!-- Left Side: Image Box -->
            ${displayImage ? `
            <div class="w-28 h-full bg-gray-100 flex items-center justify-center p-3 flex-shrink-0 relative">
                 <div class="absolute inset-0 bg-gray-100 z-0"></div>
                 <img src="${displayImage}" alt="${product.name}" class="relative z-10 w-auto h-auto max-w-full max-h-full object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-300">
            </div>
            ` : `
            <div class="w-28 h-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span class="text-4xl">${product.icon}</span>
            </div>
            `}

            <!-- Right Side: Content -->
            <div class="flex-1 p-4 flex flex-col justify-between relative">
                <!-- Header: Title and Price -->
                <div class="flex justify-between items-start gap-2">
                    <div>
                        <h3 class="font-bold text-gray-900 text-lg leading-tight line-clamp-2">${product.name}</h3>
                        ${hasColors ? `<p class="text-sm text-gray-500 mt-1">${product.colors.length} colori</p>` : ''}
                    </div>
                    <div class="text-lg font-bold text-apple-blue whitespace-nowrap">€${currentPrice.toFixed(2)}</div>
                </div>

                <!-- Bottom: Expand Button -->
                <div class="flex justify-end mt-auto">
                    <button class="text-sm font-medium text-gray-400 hover:text-apple-blue transition-colors flex items-center gap-1 group-hover/text:text-apple-blue">
                        <span>${hasColors || hasStorage || hasConfigurations ? 'personalizza' : 'vedi dettagli'}</span>
                        <svg class="expand-arrow w-4 h-4 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Expanded Content Area -->
        ${hasExpandableContent ? `
        <div class="expanded-content bg-white px-5 pb-5 border-t border-gray-100">
            <div class="pt-4 space-y-5">

                ${hasColors ? `
                <div>
                    <label class="block text-sm font-semibold text-gray-800 mb-3">Colore</label>
                    <div class="flex flex-wrap gap-3">
                        ${product.colors.map((color, index) => `
                        <button
                            class="color-swatch ${index === 0 ? 'selected' : ''} w-10 h-10 rounded-full border-2 border-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 transition-all shadow-sm"
                            style="background: ${color.gradient}"
                            title="${color.name}"
                            onclick="event.stopPropagation(); selectProductColor(${product.id}, '${color.code}', '${color.imageUrl || product.imageUrl || ''}', '${color.name}')"
                        >
                            <span class="sr-only">${color.name}</span>
                        </button>
                        `).join('')}
                    </div>
                    <p class="text-xs text-gray-500 mt-2 font-medium">Selezionato: <span class="text-gray-900" id="selected-color-${product.id}">${product.colors[0].name}</span></p>
                </div>
                ` : ''}

                ${hasStorage ? `
                <div>
                    <label class="block text-sm font-semibold text-gray-800 mb-3">Archiviazione</label>
                    <div class="flex flex-wrap gap-2">
                        ${product.storage.map((storage, index) => `
                        <button
                            data-storage-btn
                            ${index === 0 ? 'data-storage-selected="true"' : ''}
                            class="px-4 py-2.5 border-2 ${index === 0 ? 'border-catalog bg-catalog dark:bg-catalog-dark text-white shadow-md hover:shadow-lg' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'} rounded-xl font-medium text-sm transition-all duration-200"
                            onclick="event.stopPropagation(); selectProductStorage(${product.id}, this)"
                        >
                            ${storage}
                        </button>
                        `).join('')}
                    </div>
                    ${product.storageNotes ? `<p class="text-xs text-gray-500 mt-2 flex items-center gap-1"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> ${product.storageNotes}</p>` : ''}
                </div>
                ` : ''}

                ${hasConfigurations ? `
                ${renderConfigurationSelectors(product)}

                <div class="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p class="text-sm text-gray-600 font-medium flex items-start gap-2">
                        <svg class="w-5 h-5 text-apple-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span><span class="text-gray-900 font-semibold">Riepilogo:</span> ${buildConfigSummary(product)}</span>
                    </p>
                </div>
                ` : ''}

                <button
                    class="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mb-3"
                    onclick="event.stopPropagation(); requestAIAdvice(${product.id})"
                    id="ai-advisor-btn-${product.id}"
                >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>✨ AI Advisor</span>
                </button>

                <button class="w-full py-4 bg-catalog dark:bg-catalog-dark text-white font-bold rounded-xl hover:opacity-90 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2" onclick="event.stopPropagation(); ${hasConfigurations ? 'addConfiguredToCart' : 'addToCart'}(${product.id})">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span class="text-lg">Aggiungi al Carrello</span>
                    ${hasConfigurations ? `<span class="bg-white/20 px-2 py-0.5 rounded text-sm font-semibold ml-1">€${currentPrice.toFixed(2)}</span>` : ''}
                </button>
            </div>
        </div>
        ` : ''}
    </div>
    `;
}

/**
 * Renderizza i selettori di configurazione per i Mac
 */
export function renderConfigurationSelectors(product) {
    if (!product.configurations) return '';

    let html = '';

    if (product.configurations.chip && product.configurations.chip.length > 1) {
        html += `
        <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Chip:</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2" id="chip-selector-${product.id}">
                ${product.configurations.chip.map(chip => {
            const isSelected = chip.name === product.currentConfig.chip;
            const chipLabel = chip.name.split('(')[0].trim();
            const chipSpecs = chip.name.match(/\((.*?)\)/)?.[1] || '';

            return `
                    <button
                        class="config-btn px-3 py-2.5 border-2 rounded-lg text-sm transition-all ${isSelected
                    ? 'border-catalog bg-catalog dark:bg-catalog-dark text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-catalog'
                }"
                        onclick="event.stopPropagation(); selectChipVariant(${product.id}, '${chip.name}')"
                        data-chip="${chip.name}"
                    >
                        <div class="font-semibold">${chipLabel}</div>
                        ${chipSpecs ? `<div class="text-xs opacity-90">${chipSpecs}</div>` : ''}
                        ${chip.priceAdjustment > 0 ? `<div class="text-xs font-bold mt-1">+€${chip.priceAdjustment}</div>` : ''}
                        ${chip.priceAdjustment < 0 ? `<div class="text-xs font-bold mt-1">-€${Math.abs(chip.priceAdjustment)}</div>` : ''}
                    </button>
                    `;
        }).join('')}
            </div>
        </div>
        `;
    }

    if (product.configurations.ram) {
        const availableRam = getAvailableRamOptions(product, product.currentConfig.chip);
        if (availableRam.length > 0) {
            html += `
        <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Memoria:</label>
            <div class="flex flex-wrap gap-2" id="ram-selector-${product.id}">
                ${availableRam.map(ram => {
                const isSelected = ram.size === product.currentConfig.ram;
                return `
                    <button
                        class="config-btn px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${isSelected
                        ? 'border-catalog bg-catalog dark:bg-catalog-dark text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-catalog'
                    }"
                        onclick="event.stopPropagation(); selectRamOption(${product.id}, '${ram.size}')"
                        data-ram="${ram.size}"
                    >
                        ${ram.size}
                        ${ram.priceAdjustment > 0 ? `<span class="text-xs ml-1">+€${ram.priceAdjustment}</span>` : ''}
                    </button>
                    `;
            }).join('')}
            </div>
        </div>
        `;
        }
    }

    if (product.configurations.storage) {
        const availableStorage = getAvailableStorageOptions(product, product.currentConfig.chip);
        if (availableStorage.length > 0) {
            html += `
        <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Storage:</label>
            <div class="flex flex-wrap gap-2" id="storage-selector-${product.id}">
                ${availableStorage.map(storage => {
                const isSelected = storage.size === product.currentConfig.storage;
                return `
                    <button
                        class="config-btn px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${isSelected
                        ? 'border-catalog bg-catalog dark:bg-catalog-dark text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-catalog'
                    }"
                        onclick="event.stopPropagation(); selectStorageOption(${product.id}, '${storage.size}')"
                        data-storage="${storage.size}"
                    >
                        ${storage.size}
                        ${storage.priceAdjustment > 0 ? `<span class="text-xs ml-1">+€${storage.priceAdjustment}</span>` : ''}
                        ${storage.priceAdjustment < 0 ? `<span class="text-xs ml-1">-€${Math.abs(storage.priceAdjustment)}</span>` : ''}
                    </button>
                    `;
            }).join('')}
            </div>
        </div>
        `;
        }
    }

    return html;
}

export function toggleProductCard(productId) {
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!card) return;

    const isExpanded = card.classList.contains('expanded');

    document.querySelectorAll('.product-card.expanded').forEach(expandedCard => {
        if (expandedCard !== card) {
            expandedCard.classList.remove('expanded');
        }
    });

    if (isExpanded) {
        card.classList.remove('expanded');
    } else {
        card.classList.add('expanded');
    }
}

export function selectProductColor(productId, colorCode, imageUrl, colorName) {
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!card) return;

    card.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.classList.remove('selected');
    });

    const clickedSwatch = Array.from(card.querySelectorAll('.color-swatch')).find(swatch =>
        swatch.getAttribute('title') === colorName
    );
    if (clickedSwatch) {
        clickedSwatch.classList.add('selected');
        clickedSwatch.setAttribute('data-image-url', imageUrl || '');
    }

    const colorText = card.querySelector(`#selected-color-${productId}`);
    if (colorText) {
        colorText.textContent = colorName;
    }

    // Update the main image with the color-specific image
    if (imageUrl) {
        const image = card.querySelector(`[data-id="${productId}"] .object-contain`);
        if (image) {
            image.style.opacity = '0';
            setTimeout(() => {
                image.src = imageUrl;
                image.style.transition = 'opacity 0.3s ease';
                image.style.opacity = '1';
            }, 300);
        }
    }
}

export function selectProductStorage(productId, storageBtn) {
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!card) return;

    card.querySelectorAll('[data-storage-btn]').forEach(btn => {
        btn.classList.remove('border-catalog', 'bg-catalog', 'dark:bg-catalog-dark', 'text-white', 'shadow-md', 'hover:shadow-lg');
        btn.classList.add('border-gray-200', 'bg-white', 'text-gray-700', 'hover:border-gray-300', 'hover:bg-gray-50');
        btn.removeAttribute('data-storage-selected');
    });

    storageBtn.classList.remove('border-gray-200', 'bg-white', 'text-gray-700', 'hover:border-gray-300', 'hover:bg-gray-50');
    storageBtn.classList.add('border-catalog', 'bg-catalog', 'dark:bg-catalog-dark', 'text-white', 'shadow-md', 'hover:shadow-lg');
    storageBtn.setAttribute('data-storage-selected', 'true');

    const storageText = storageBtn.textContent.trim();
    if (productPricing[productId] && productPricing[productId][storageText]) {
        const newPrice = productPricing[productId][storageText];

        const priceElement = card.querySelector('.text-lg.font-bold.text-apple-blue');
        if (priceElement) {
            priceElement.textContent = `€${newPrice.toFixed(2)}`;
        }

        const product = products.find(p => p.id === productId);
        if (product) {
            product.price = newPrice;
        }
    }
}

export function updatePriceDisplay(productId, newPrice) {
    const priceElement = document.querySelector(`[data-id="${productId}"] .text-lg.font-bold.text-apple-blue`);
    if (priceElement) {
        priceElement.textContent = `€${newPrice.toFixed(2)}`;
    }

    const addButton = document.querySelector(`[data-id="${productId}"] button[onclick*="addConfiguredToCart"]`);
    if (addButton) {
        const buttonText = addButton.querySelector('span:last-child');
        if (buttonText) {
            buttonText.textContent = `Aggiungi al carrello - €${newPrice.toFixed(2)}`;
        }
    }
}

export function updateConfigSelectors(productId, selectorType) {
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!card) return;

    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (selectorType === 'chip' || !selectorType) {
        card.querySelectorAll(`#chip-selector-${productId} button`).forEach(btn => {
            const isSelected = btn.dataset.chip === product.currentConfig.chip;
            btn.className = `config-btn px-3 py-2.5 border-2 rounded-lg text-sm transition-all ${isSelected
                    ? 'border-catalog bg-catalog dark:bg-catalog-dark text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-catalog'
                }`;

            // Aggiungi animazione pulse al pulsante selezionato
            if (isSelected) {
                btn.classList.add('config-btn-selected');
                setTimeout(() => btn.classList.remove('config-btn-selected'), 400);
            }
        });
    }

    if (selectorType === 'ram' || !selectorType) {
        card.querySelectorAll(`#ram-selector-${productId} button`).forEach(btn => {
            const isSelected = btn.dataset.ram === product.currentConfig.ram;
            btn.className = `config-btn px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${isSelected
                    ? 'border-catalog bg-catalog dark:bg-catalog-dark text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-catalog'
                }`;

            // Aggiungi animazione pulse al pulsante selezionato
            if (isSelected) {
                btn.classList.add('config-btn-selected');
                setTimeout(() => btn.classList.remove('config-btn-selected'), 400);
            }
        });
    }

    if (selectorType === 'storage' || !selectorType) {
        card.querySelectorAll(`#storage-selector-${productId} button`).forEach(btn => {
            const isSelected = btn.dataset.storage === product.currentConfig.storage;
            btn.className = `config-btn px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${isSelected
                    ? 'border-catalog bg-catalog dark:bg-catalog-dark text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-catalog'
                }`;

            // Aggiungi animazione pulse al pulsante selezionato
            if (isSelected) {
                btn.classList.add('config-btn-selected');
                setTimeout(() => btn.classList.remove('config-btn-selected'), 400);
            }
        });
    }
}

/**
 * Request AI advice for a product
 * @param {number} productId - Product ID
 */
export async function requestAIAdvice(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        notify.error('Prodotto non trovato');
        return;
    }

    const button = document.getElementById(`ai-advisor-btn-${productId}`);
    if (!button) return;

    // Save original content
    const originalContent = button.innerHTML;

    // Show loading state
    button.disabled = true;
    button.classList.add('opacity-75', 'cursor-not-allowed');
    button.innerHTML = `
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Caricamento...</span>
    `;

    try {
        // Import AI service dynamically
        const { getProductAdvice } = await import('../ai/service.js');

        // Get advice
        const advice = await getProductAdvice(product);

        // Show advice in modal
        showAIAdviceModal(product.name, advice);

    } catch (error) {
        console.error('[AI Advisor] Error:', error);
        // Error notification already shown by service
    } finally {
        // Restore button state
        button.disabled = false;
        button.classList.remove('opacity-75', 'cursor-not-allowed');
        button.innerHTML = originalContent;
    }
}

/**
 * Show AI advice in a modal
 * @param {string} productName - Product name
 * @param {string} advice - AI advice text
 */
function showAIAdviceModal(productName, advice) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };

    // Create modal content
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col" onclick="event.stopPropagation()">
            <!-- Header -->
            <div class="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 class="text-xl font-bold text-white">AI Advisor</h3>
                </div>
                <button onclick="this.closest('.fixed').remove()" class="text-white hover:text-gray-200 transition-colors">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Body -->
            <div class="p-6 overflow-y-auto flex-1">
                <div class="mb-4">
                    <div class="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                        ${productName}
                    </div>
                </div>
                <div class="prose prose-lg dark:prose-invert max-w-none">
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">${advice}</p>
                </div>
            </div>

            <!-- Footer -->
            <div class="bg-gray-50 dark:bg-gray-900 px-6 py-4 flex justify-end gap-3">
                <button onclick="this.closest('.fixed').remove()" class="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg">
                    Chiudi
                </button>
            </div>
        </div>
    `;

    // Add to body with animation
    document.body.appendChild(modal);
    requestAnimationFrame(() => {
        modal.style.animation = 'fadeIn 0.2s ease-out';
    });

    // Close function
    function closeModal() {
        modal.style.animation = 'fadeOut 0.2s ease-out';
        setTimeout(() => modal.remove(), 200);
    }

    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}