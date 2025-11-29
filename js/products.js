/**
 * @fileoverview Gestione completa dei prodotti: catalogo, filtri, rendering e custom products
 * @module products
 * @requires config.js - Configurazione Supabase
 * @requires data.js - Catalogo predefinito e listini prezzi
 * @requires ui.js - Funzioni UI e notifiche
 */

import { supabase } from './config.js';
import { defaultProducts, productPricing } from './data.js';
import { showNotification } from './ui.js';

/**
 * Array di prodotti (predefiniti + custom da Supabase)
 * @type {Array<Object>}
 */
export let products = [...defaultProducts];

/**
 * ID progressivo per i prossimi prodotti custom
 * @type {number}
 */
export let nextProductId = 400;

/**
 * Filtro categoria attuale
 * @type {string}
 */
export let currentFilter = 'all';

/**
 * Filtro sottocategoria Mac attuale
 * @type {string}
 */
export let currentSubcategory = 'all';

/**
 * Query di ricerca attuale
 * @type {string}
 */
export let searchQuery = '';

/**
 * Imposta il filtro categoria e ri-renderizza i prodotti
 * @param {string} filter - Categoria da filtrare
 * @returns {void}
 */
export function setCurrentFilter(filter) {
    currentFilter = filter;
}

/**
 * Imposta il filtro sottocategoria e ri-renderizza i prodotti
 * @param {string} subcategory - Sottocategoria da filtrare
 * @returns {void}
 */
export function setCurrentSubcategory(subcategory) {
    currentSubcategory = subcategory;
}

/**
 * Imposta la query di ricerca e ri-renderizza i prodotti
 * @param {string} query - Termine di ricerca
 * @returns {void}
 */
export function setSearchQuery(query) {
    searchQuery = query.toLowerCase();
}

/**
 * Carica i prodotti custom da Supabase e li aggiunge al catalogo
 * @async
 * @returns {Promise<void>}
 */
export async function loadProducts() {
    try {
        const { data, error } = await supabase
            .from('custom_products')
            .select('*');

        if (error) {
            return;
        }

        if (data && data.length > 0) {
            const customProducts = data.map(p => ({
                id: p.id,
                name: p.name,
                price: parseFloat(p.price),
                category: p.category || 'accessori',
                icon: p.icon || '🎁',
                custom: true
            }));

            products = [...products, ...customProducts];
            nextProductId = Math.max(...products.map(p => p.id)) + 1;
        }
    } catch (err) {
        // Silent catch - errore caricamento non critico
    }
}

/**
 * Rendering della griglia prodotti con filtri e ricerca applicati
 * @function
 * @returns {void}
 */
export function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    let filteredProducts = products;

    // Applica filtro categoria
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentFilter);
    }

    // Applica filtro sottocategoria Mac
    if (currentFilter === 'mac' && currentSubcategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.subcategory === currentSubcategory);
    }

    // Applica ricerca per nome
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(searchQuery)
        );
    }

    // Nessun prodotto trovato
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

    // Rendering delle card prodotto
    grid.innerHTML = filteredProducts.map(product => renderProductCard(product)).join('');
}

/**
 * Recupera informazioni categoria (label, colori CSS)
 * @param {string} category - Categoria del prodotto
 * @returns {Object} Oggetto con label e colori CSS
 */
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
 * Mappa colori di sfondo icona per categoria
 * @type {Object.<string, string>}
 */
const iconBgMap = {
    'iphone': 'bg-purple-100',
    'mac': 'bg-blue-100',
    'ipad': 'bg-indigo-100',
    'accessori': 'bg-green-100'
};

/**
 * Rendering della singola card prodotto con opzioni espandibili
 * @param {Object} product - Oggetto prodotto
 * @returns {string} HTML della card prodotto
 */
function renderProductCard(product) {
    const categoryInfo = getCategoryInfo(product.category);
    const hasColors = product.colors && product.colors.length > 0;
    const hasStorage = product.storage && product.storage.length > 0;
    const hasConfigurations = product.configurations;  // Nuovo sistema configuratore
    const hasExpandableContent = hasColors || hasStorage || hasConfigurations || product.imageUrl;
    const iconBg = iconBgMap[product.category] || 'bg-gray-100';

    // Inizializza currentConfig se ha configurations ma non currentConfig
    if (hasConfigurations && !product.currentConfig) {
        product.currentConfig = {
            chip: product.baseConfig?.chip || product.configurations.chip?.[0]?.name || '',
            ram: product.baseConfig?.ram || product.configurations.ram?.[0]?.size || '',
            storage: product.baseConfig?.storage || product.configurations.storage?.[0]?.size || '',
            color: hasColors ? product.colors[0].code : null
        };
    }

    // Calcola prezzo corrente (dinamico per configurazioni, fisso per altri)
    const currentPrice = hasConfigurations
        ? calculateConfiguredPrice(product, product.currentConfig)
        : (product.price || product.basePrice);

    return `
    <div class="product-card bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-apple-blue transition-all duration-300 mb-3" data-id="${product.id}">

        <!-- Header Card (Sempre Visibile) -->
        <div class="p-4 cursor-pointer" onclick="toggleProductCard(${product.id})">
            <div class="flex items-center justify-between gap-4">

                <!-- Info Prodotto -->
                <div class="flex items-center gap-4 flex-1 min-w-0">
                    <!-- Icon/Emoji -->
                    <div class="flex-shrink-0 w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center">
                        <span class="text-2xl">${product.icon}</span>
                    </div>

                    <!-- Nome e Categoria -->
                    <div class="flex-1 min-w-0">
                        <h3 class="font-bold text-gray-900 text-base md:text-lg break-words leading-tight">${product.name}</h3>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${categoryInfo.color}">
                                ${categoryInfo.label}
                            </span>
                            ${hasColors ? `<span class="text-xs text-gray-500">• ${product.colors.length} colori</span>` : ''}
                        </div>
                    </div>
                </div>

                <!-- Prezzo e Freccia -->
                <div class="flex items-center gap-3">
                    <div class="text-right">
                        <div class="text-xl md:text-2xl font-bold text-apple-blue">€${currentPrice.toFixed(2)}</div>
                    </div>

                    ${hasExpandableContent ? `
                    <!-- Freccia espansione -->
                    <button class="expand-arrow p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">
                        <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    ` : `
                    <!-- Quick Add Button -->
                    <button class="px-4 py-2 bg-apple-blue text-white rounded-xl hover:bg-apple-darkblue transition-all" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                    `}
                </div>
            </div>
        </div>

        ${hasExpandableContent ? `
        <!-- Contenuto Espandibile -->
        <div class="expanded-content px-4 pb-4">
            <div class="border-t-2 border-gray-100 pt-4">

                ${hasColors ? `
                <!-- Selettore Colori -->
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Scegli il colore:</label>
                    <div class="flex flex-wrap gap-2">
                        ${product.colors.map((color, index) => `
                        <button
                            class="color-swatch ${index === 0 ? 'selected' : ''} w-10 h-10 rounded-full border-2 border-gray-300"
                            style="background: ${color.gradient}"
                            title="${color.name}"
                            onclick="event.stopPropagation(); selectProductColor(${product.id}, '${color.code}', '${color.imageUrl || product.imageUrl || ''}', '${color.name}')"
                        >
                            <span class="sr-only">${color.name}</span>
                        </button>
                        `).join('')}
                    </div>
                    <p class="text-xs text-gray-500 mt-2">Colore selezionato: <span class="font-semibold" id="selected-color-${product.id}">${product.colors[0].name}</span></p>
                </div>
                ` : ''}

                ${hasStorage ? `
                <!-- Configurazione Storage -->
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Capacità:</label>
                    <div class="flex flex-wrap gap-2">
                        ${product.storage.map((storage, index) => `
                        <button
                            data-storage-btn
                            ${index === 0 ? 'data-storage-selected="true"' : ''}
                            class="px-4 py-2 border-2 ${index === 0 ? 'border-apple-blue bg-apple-blue text-white' : 'border-gray-200 bg-white text-gray-700'} rounded-lg font-medium text-sm hover:border-apple-blue transition-all"
                            onclick="event.stopPropagation(); selectProductStorage(${product.id}, this)"
                        >
                            ${storage}
                        </button>
                        `).join('')}
                    </div>
                    ${product.storageNotes ? `<p class="text-xs text-gray-500 mt-2">💡 ${product.storageNotes}</p>` : ''}
                </div>
                ` : ''}

                ${hasConfigurations ? `
                <!-- Nuove Configurazioni (chip, RAM, storage) -->
                ${renderConfigurationSelectors(product)}

                <!-- Riassunto Configurazione -->
                <div class="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p class="text-sm text-gray-700 font-medium">
                        <span class="text-gray-500">Configurazione:</span> ${buildConfigSummary(product)}
                    </p>
                </div>
                ` : ''}

                <!-- Pulsante Aggiungi -->
                <button class="w-full py-3 bg-gradient-to-r from-apple-blue to-indigo-600 text-white font-bold rounded-xl hover:from-apple-darkblue hover:to-indigo-700 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2" onclick="event.stopPropagation(); ${hasConfigurations ? 'addConfiguredToCart' : 'addToCart'}(${product.id})">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Aggiungi al carrello${hasConfigurations ? ` - €${currentPrice.toFixed(2)}` : ''}</span>
                </button>
            </div>
        </div>
        ` : ''}
    </div>
    `;
}

/**
 * Aggiunge un prodotto accessorio custom da Supabase
 * @async
 * @returns {Promise<void>}
 */
export async function addCustomAccessory() {
    const nameInput = document.getElementById('custom-name');
    const iconSelect = document.getElementById('custom-icon');
    const priceInput = document.getElementById('custom-price');

    if (!nameInput || !iconSelect || !priceInput) return;

    const name = nameInput.value.trim();
    const icon = iconSelect.value;
    const price = parseFloat(priceInput.value);

    // Validazione
    if (!name) {
        showNotification('Inserisci il nome del prodotto!', 'error');
        nameInput.focus();
        return;
    }

    if (!price || price <= 0) {
        showNotification('Inserisci un prezzo valido!', 'error');
        priceInput.focus();
        return;
    }

    try {
        showNotification('Salvataggio prodotto...', 'info');

        // Salva su Supabase
        const { data, error } = await supabase
            .from('custom_products')
            .insert([{
                id: nextProductId,
                name: name,
                price: price,
                category: 'accessori',
                icon: icon
            }])
            .select();

        if (error) {
            showNotification('Errore nel salvataggio del prodotto!', 'error');
            return;
        }

        // Aggiungi al catalogo locale
        const newProduct = {
            id: nextProductId,
            name: name,
            price: price,
            category: 'accessori',
            icon: icon,
            custom: true
        };

        products.push(newProduct);
        nextProductId++;

        // Pulisci i campi
        nameInput.value = '';
        priceInput.value = '';
        iconSelect.value = '🎁';

        // Renderizza il catalogo
        renderProducts();

        showNotification('Prodotto aggiunto al catalogo! ✓', 'success');
    } catch (err) {
        showNotification('Errore nel salvataggio: ' + err.message, 'error');
    }
}

/**
 * Toggle espansione/compressione card prodotto
 * @param {number} productId - ID del prodotto
 * @returns {void}
 */
export function toggleProductCard(productId) {
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!card) return;

    const isExpanded = card.classList.contains('expanded');

    if (isExpanded) {
        card.classList.remove('expanded');
    } else {
        card.classList.add('expanded');
    }
}

/**
 * Seleziona colore prodotto e aggiorna immagine nella card
 * @param {number} productId - ID del prodotto
 * @param {string} colorCode - Codice colore
 * @param {string} imageUrl - URL immagine colore
 * @param {string} colorName - Nome colore visualizzato
 * @returns {void}
 */
export function selectProductColor(productId, colorCode, imageUrl, colorName) {
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!card) return;

    // Rimuovi selected da tutti i color swatches della card
    card.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.classList.remove('selected');
    });

    // Aggiungi selected al colore cliccato
    const clickedSwatch = Array.from(card.querySelectorAll('.color-swatch')).find(swatch =>
        swatch.getAttribute('title') === colorName
    );
    if (clickedSwatch) {
        clickedSwatch.classList.add('selected');
        clickedSwatch.setAttribute('data-image-url', imageUrl || '');
    }

    // Aggiorna testo colore selezionato
    const colorText = card.querySelector(`#selected-color-${productId}`);
    if (colorText) {
        colorText.textContent = colorName;
    }

    // Aggiorna immagine se disponibile
    if (imageUrl) {
        const image = card.querySelector(`#product-image-${productId}`);
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

/**
 * Seleziona storage prodotto e aggiorna prezzo se disponibile nel listino
 * @param {number} productId - ID del prodotto
 * @param {HTMLElement} storageBtn - Bottone storage cliccato
 * @returns {void}
 */
export function selectProductStorage(productId, storageBtn) {
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!card) return;

    // Rimuovi selected da tutti i bottoni storage della card
    card.querySelectorAll('[data-storage-btn]').forEach(btn => {
        btn.classList.remove('border-apple-blue', 'bg-apple-blue', 'text-white');
        btn.classList.add('border-gray-200', 'bg-white', 'text-gray-700');
        btn.removeAttribute('data-storage-selected');
    });

    // Aggiungi selected al bottone cliccato
    storageBtn.classList.remove('border-gray-200', 'bg-white', 'text-gray-700');
    storageBtn.classList.add('border-apple-blue', 'bg-apple-blue', 'text-white');
    storageBtn.setAttribute('data-storage-selected', 'true');

    // Aggiorna prezzo se disponibile nel listino
    const storageText = storageBtn.textContent.trim();
    if (productPricing[productId] && productPricing[productId][storageText]) {
        const newPrice = productPricing[productId][storageText];

        // Aggiorna prezzo nel header della card
        const priceElement = card.querySelector('.text-xl.md\\:text-2xl.font-bold.text-apple-blue');
        if (priceElement) {
            priceElement.textContent = `€${newPrice.toFixed(2)}`;
        }

        // Aggiorna anche nel prodotto (per addToCart)
        const product = products.find(p => p.id === productId);
        if (product) {
            product.price = newPrice;
        }
    }
}

// ============================================
// NUOVE FUNZIONI PER CONFIGURATORE DINAMICO
// ============================================

/**
 * Estrae il tier del chip da una stringa (M4, M4 Pro, M4 Max, M5, ecc.)
 * @param {string} chipName - Nome completo del chip
 * @returns {string} Tier del chip
 */
function extractChipTier(chipName) {
    if (!chipName) return '';

    if (chipName.includes('Max')) return chipName.split('(')[0].trim();  // "M4 Max"
    if (chipName.includes('Pro')) return chipName.split('(')[0].trim();  // "M4 Pro"
    if (chipName.includes('Ultra')) return chipName.split('(')[0].trim();  // "M3 Ultra"

    // M4, M5, ecc.
    const match = chipName.match(/(M\d+)/);
    return match ? match[1] : '';
}

/**
 * Calcola il prezzo finale basato sulle selezioni di configurazione
 * @param {Object} product - Prodotto con campo configurations
 * @param {Object} selections - { chip, ram, storage }
 * @returns {number} Prezzo calcolato
 */
export function calculateConfiguredPrice(product, selections) {
    if (!product.configurations) return product.price || product.basePrice;

    let finalPrice = product.basePrice;

    // Aggiungi adjustment per chip
    if (product.configurations.chip && selections.chip) {
        const selectedChip = product.configurations.chip.find(c => c.name === selections.chip);
        if (selectedChip) finalPrice += selectedChip.priceAdjustment;
    }

    // Aggiungi adjustment per RAM
    if (product.configurations.ram && selections.ram) {
        const selectedRam = product.configurations.ram.find(r => r.size === selections.ram);
        if (selectedRam) finalPrice += selectedRam.priceAdjustment;
    }

    // Aggiungi adjustment per storage
    if (product.configurations.storage && selections.storage) {
        const selectedStorage = product.configurations.storage.find(s => s.size === selections.storage);
        if (selectedStorage) finalPrice += selectedStorage.priceAdjustment;
    }

    return finalPrice;
}

/**
 * Filtra le opzioni RAM disponibili per un chip selezionato
 * @param {Object} product - Prodotto con configurations
 * @param {string} selectedChip - Chip attualmente selezionato
 * @returns {Array} Opzioni RAM disponibili
 */
export function getAvailableRamOptions(product, selectedChip) {
    if (!product.configurations || !product.configurations.ram) return [];

    const chipTier = extractChipTier(selectedChip);

    return product.configurations.ram.filter(ram => {
        if (!ram.availableFor) return true;  // Disponibile per tutti
        return ram.availableFor.some(tier => chipTier.includes(tier) || tier.includes(chipTier));
    });
}

/**
 * Filtra le opzioni storage disponibili per un chip selezionato
 * @param {Object} product - Prodotto con configurations
 * @param {string} selectedChip - Chip attualmente selezionato
 * @returns {Array} Opzioni storage disponibili
 */
export function getAvailableStorageOptions(product, selectedChip) {
    if (!product.configurations || !product.configurations.storage) return [];

    const chipTier = extractChipTier(selectedChip);

    return product.configurations.storage.filter(storage => {
        if (!storage.minChip) return true;  // Disponibile per tutti
        return storage.minChip.some(tier => chipTier.includes(tier) || tier.includes(chipTier));
    });
}

/**
 * Renderizza i selettori di configurazione (chip, RAM, storage)
 * @param {Object} product - Prodotto con configurations
 * @returns {string} HTML dei selettori
 */
export function renderConfigurationSelectors(product) {
    if (!product.configurations) return '';

    let html = '';

    // Chip Selector
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
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-600'
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

    // RAM Selector
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
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-blue-600'
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

    // Storage Selector
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
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-blue-600'
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

/**
 * Seleziona una variante chip e aggiorna configurazione/prezzo
 * @param {number} productId - ID prodotto
 * @param {string} chipName - Nome chip selezionato
 * @returns {void}
 */
export function selectChipVariant(productId, chipName) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.configurations) return;

    // Aggiorna configurazione chip
    product.currentConfig.chip = chipName;

    // Verifica se RAM corrente è ancora disponibile per questo chip
    const availableRam = getAvailableRamOptions(product, chipName);
    if (!availableRam.find(r => r.size === product.currentConfig.ram)) {
        // Auto-seleziona prima RAM disponibile
        product.currentConfig.ram = availableRam[0].size;
    }

    // Verifica se storage corrente è ancora disponibile per questo chip
    const availableStorage = getAvailableStorageOptions(product, chipName);
    if (!availableStorage.find(s => s.size === product.currentConfig.storage)) {
        // Auto-seleziona primo storage disponibile
        product.currentConfig.storage = availableStorage[0].size;
    }

    // Ricalcola prezzo
    const newPrice = calculateConfiguredPrice(product, product.currentConfig);

    // Aggiorna UI
    updatePriceDisplay(productId, newPrice);

    // Re-renderizza selettori (potrebbero essere cambiate opzioni disponibili)
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (card && card.classList.contains('expanded')) {
        const selectorsContainer = card.querySelector('.expanded-content .border-t-2');
        if (selectorsContainer) {
            const newHtml = renderConfigurationSelectors(product);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newHtml;

            // Sostituisci solo i selettori, non tutto il contenuto
            const chipSelector = selectorsContainer.querySelector('[id^="chip-selector-"]')?.parentElement;
            const ramSelector = selectorsContainer.querySelector('[id^="ram-selector-"]')?.parentElement;
            const storageSelector = selectorsContainer.querySelector('[id^="storage-selector-"]')?.parentElement;

            const newChipSelector = tempDiv.querySelector('[id^="chip-selector-"]')?.parentElement;
            const newRamSelector = tempDiv.querySelector('[id^="ram-selector-"]')?.parentElement;
            const newStorageSelector = tempDiv.querySelector('[id^="storage-selector-"]')?.parentElement;

            if (chipSelector && newChipSelector) chipSelector.replaceWith(newChipSelector);
            if (ramSelector && newRamSelector) ramSelector.replaceWith(newRamSelector);
            if (storageSelector && newStorageSelector) storageSelector.replaceWith(newStorageSelector);
        }
    }
}

/**
 * Seleziona un'opzione RAM e aggiorna prezzo
 * @param {number} productId - ID prodotto
 * @param {string} ramSize - Size RAM selezionata
 * @returns {void}
 */
export function selectRamOption(productId, ramSize) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.configurations) return;

    product.currentConfig.ram = ramSize;

    const newPrice = calculateConfiguredPrice(product, product.currentConfig);
    updatePriceDisplay(productId, newPrice);
    updateConfigSelectors(productId, 'ram');
}

/**
 * Seleziona un'opzione storage e aggiorna prezzo
 * @param {number} productId - ID prodotto
 * @param {string} storageSize - Size storage selezionato
 * @returns {void}
 */
export function selectStorageOption(productId, storageSize) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.configurations) return;

    product.currentConfig.storage = storageSize;

    const newPrice = calculateConfiguredPrice(product, product.currentConfig);
    updatePriceDisplay(productId, newPrice);
    updateConfigSelectors(productId, 'storage');
}

/**
 * Aggiorna il display del prezzo nella card
 * @param {number} productId - ID prodotto
 * @param {number} newPrice - Nuovo prezzo da mostrare
 * @returns {void}
 */
export function updatePriceDisplay(productId, newPrice) {
    const priceElement = document.querySelector(`[data-id="${productId}"] .text-xl.md\\:text-2xl.font-bold.text-apple-blue`);
    if (priceElement) {
        priceElement.textContent = `€${newPrice.toFixed(2)}`;
    }

    // Aggiorna anche nel bottone "Aggiungi al carrello"
    const addButton = document.querySelector(`[data-id="${productId}"] button[onclick*="addConfiguredToCart"]`);
    if (addButton) {
        const buttonText = addButton.querySelector('span:last-child');
        if (buttonText) {
            buttonText.textContent = `Aggiungi al carrello - €${newPrice.toFixed(2)}`;
        }
    }
}

/**
 * Aggiorna lo stato visivo dei selettori di configurazione
 * @param {number} productId - ID prodotto
 * @param {string} selectorType - Tipo di selettore ('chip', 'ram', 'storage')
 * @returns {void}
 */
export function updateConfigSelectors(productId, selectorType) {
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!card) return;

    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (selectorType === 'chip' || !selectorType) {
        card.querySelectorAll(`#chip-selector-${productId} button`).forEach(btn => {
            const isSelected = btn.dataset.chip === product.currentConfig.chip;
            btn.className = `config-btn px-3 py-2.5 border-2 rounded-lg text-sm transition-all ${isSelected
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-600'
                }`;
        });
    }

    if (selectorType === 'ram' || !selectorType) {
        card.querySelectorAll(`#ram-selector-${productId} button`).forEach(btn => {
            const isSelected = btn.dataset.ram === product.currentConfig.ram;
            btn.className = `config-btn px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${isSelected
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-600'
                }`;
        });
    }

    if (selectorType === 'storage' || !selectorType) {
        card.querySelectorAll(`#storage-selector-${productId} button`).forEach(btn => {
            const isSelected = btn.dataset.storage === product.currentConfig.storage;
            btn.className = `config-btn px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${isSelected
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-600'
                }`;
        });
    }
}

/**
 * Costruisce un testo riassuntivo della configurazione
 * @param {Object} product - Prodotto con currentConfig
 * @returns {string} Testo riassuntivo
 */
export function buildConfigSummary(product) {
    const parts = [product.name];

    if (product.currentConfig) {
        if (product.currentConfig.chip) parts.push(product.currentConfig.chip);
        if (product.currentConfig.ram) parts.push(product.currentConfig.ram);
        if (product.currentConfig.storage) parts.push(product.currentConfig.storage);
        if (product.currentConfig.color) {
            const colorName = typeof product.currentConfig.color === 'string'
                ? product.currentConfig.color
                : product.currentConfig.color.name;
            parts.push(colorName);
        }
    }

    return parts.join(' • ');
}

// ============================================
// FINE FUNZIONI CONFIGURATORE DINAMICO
// ============================================

