
import { supabase } from './config.js';
import { defaultProducts, productPricing } from './data.js';
import { showNotification } from './ui.js';

export let products = [...defaultProducts];
export let nextProductId = 400;
export let currentFilter = 'all';
export let currentSubcategory = 'all';
export let searchQuery = '';

export function setCurrentFilter(filter) {
    currentFilter = filter;

    // Show/hide Mac subcategories
    const macSubcategories = document.getElementById('mac-subcategories');
    if (macSubcategories) {
        if (filter === 'mac') {
            macSubcategories.classList.remove('hidden');
        } else {
            macSubcategories.classList.add('hidden');
        }
    }
}

export function setCurrentSubcategory(subcategory) {
    currentSubcategory = subcategory;
}

export function setSearchQuery(query) {
    searchQuery = query.toLowerCase();
}

/**
 * Carica i prodotti personalizzati da Supabase
 * 🔧 BUG FIX: Aggiunta gestione errori con logging
 */
export async function loadProducts() {
    try {
        const { data, error } = await supabase
            .from('custom_products')
            .select('*');

        if (error) {
            console.error('Errore caricamento prodotti personalizzati:', error.message);
            // Non bloccare l'app, continua con i prodotti di default
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
            console.log(`✓ Caricati ${customProducts.length} prodotti personalizzati`);
        }
    } catch (err) {
        console.error('Errore imprevisto nel caricamento prodotti:', err);
        // Non mostrare notifica all'utente, solo log per debug
    }
}

export function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    let filteredProducts = products;

    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentFilter);
    }

    if (currentFilter === 'mac' && currentSubcategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.subcategory === currentSubcategory);
    }

    if (searchQuery) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(searchQuery)
        );
    }

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

function renderProductCard(product) {
    const categoryInfo = getCategoryInfo(product.category);
    const hasColors = product.colors && product.colors.length > 0;
    const hasStorage = product.storage && product.storage.length > 0;
    const hasConfigurations = product.configurations;
    const hasExpandableContent = hasColors || hasStorage || hasConfigurations || product.imageUrl;
    
    // Use the product.imageUrl if available, otherwise check for color images
    const displayImage = product.imageUrl || (hasColors ? product.colors[0].imageUrl : null);

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

    // If it's the iPhone 17 Pro Max and has the coral color, we can force the image for testing if it's not set
    // This is just a temporary check to align with the user request if the data doesn't have it yet.
    // However, ideally, the data should be updated. Assuming the user wants to see the image *here* based on the screenshot.
    // The screenshot shows the image on the left side of the card.
    
    // We'll trust the displayImage logic above, but ensure the image path is correct if passed.

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
                ${hasExpandableContent ? `
                <div class="flex justify-end mt-auto">
                    <button class="text-sm font-medium text-gray-400 hover:text-apple-blue transition-colors flex items-center gap-1 group-hover/text:text-apple-blue">
                        <span>personalizza</span>
                        <svg class="expand-arrow w-4 h-4 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                ` : ''}
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
                            class="px-4 py-2.5 border-2 ${index === 0 ? 'border-apple-darkblue bg-apple-darkblue text-white shadow-md hover:shadow-lg' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'} rounded-xl font-medium text-sm transition-all duration-200"
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

                <button class="w-full py-4 bg-gradient-to-r from-apple-blue to-indigo-600 text-white font-bold rounded-xl hover:from-apple-darkblue hover:to-indigo-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2" onclick="event.stopPropagation(); ${hasConfigurations ? 'addConfiguredToCart' : 'addToCart'}(${product.id})">
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

export async function addCustomAccessory() {
    const nameInput = document.getElementById('custom-name');
    const iconSelect = document.getElementById('custom-icon');
    const priceInput = document.getElementById('custom-price');

    if (!nameInput || !iconSelect || !priceInput) return;

    const name = nameInput.value.trim();
    const icon = iconSelect.value;
    const price = parseFloat(priceInput.value);

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

        nameInput.value = '';
        priceInput.value = '';
        iconSelect.value = '🎁';

        renderProducts();

        showNotification('Prodotto aggiunto al catalogo! ✓', 'success');
    } catch (err) {
        showNotification('Errore nel salvataggio: ' + err.message, 'error');
    }
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
        btn.classList.remove('border-apple-darkblue', 'bg-apple-darkblue', 'text-white', 'shadow-md', 'hover:shadow-lg');
        btn.classList.add('border-gray-200', 'bg-white', 'text-gray-700', 'hover:border-gray-300', 'hover:bg-gray-50');
        btn.removeAttribute('data-storage-selected');
    });

    storageBtn.classList.remove('border-gray-200', 'bg-white', 'text-gray-700', 'hover:border-gray-300', 'hover:bg-gray-50');
    storageBtn.classList.add('border-apple-darkblue', 'bg-apple-darkblue', 'text-white', 'shadow-md', 'hover:shadow-lg');
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

function extractChipTier(chipName) {
    if (!chipName) return '';

    if (chipName.includes('Max')) return chipName.split('(')[0].trim();
    if (chipName.includes('Pro')) return chipName.split('(')[0].trim();
    if (chipName.includes('Ultra')) return chipName.split('(')[0].trim();

    const match = chipName.match(/(M\d+)/);
    return match ? match[1] : '';
}

export function calculateConfiguredPrice(product, selections) {
    if (!product.configurations) return product.price || product.basePrice;

    let finalPrice = product.basePrice;

    if (product.configurations.chip && selections.chip) {
        const selectedChip = product.configurations.chip.find(c => c.name === selections.chip);
        if (selectedChip) finalPrice += selectedChip.priceAdjustment;
    }

    if (product.configurations.ram && selections.ram) {
        const selectedRam = product.configurations.ram.find(r => r.size === selections.ram);
        if (selectedRam) finalPrice += selectedRam.priceAdjustment;
    }

    if (product.configurations.storage && selections.storage) {
        const selectedStorage = product.configurations.storage.find(s => s.size === selections.storage);
        if (selectedStorage) finalPrice += selectedStorage.priceAdjustment;
    }

    return finalPrice;
}

export function getAvailableRamOptions(product, selectedChip) {
    if (!product.configurations || !product.configurations.ram) return [];

    const chipTier = extractChipTier(selectedChip);

    return product.configurations.ram.filter(ram => {
        if (!ram.availableFor) return true;
        return ram.availableFor.some(tier => chipTier.includes(tier) || tier.includes(chipTier));
    });
}

export function getAvailableStorageOptions(product, selectedChip) {
    if (!product.configurations || !product.configurations.storage) return [];

    const chipTier = extractChipTier(selectedChip);

    return product.configurations.storage.filter(storage => {
        if (!storage.minChip) return true;
        return storage.minChip.some(tier => chipTier.includes(tier) || tier.includes(chipTier));
    });
}

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

export function selectChipVariant(productId, chipName) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.configurations) return;

    product.currentConfig.chip = chipName;

    const availableRam = getAvailableRamOptions(product, chipName);
    if (!availableRam.find(r => r.size === product.currentConfig.ram)) {
        product.currentConfig.ram = availableRam[0].size;
    }

    const availableStorage = getAvailableStorageOptions(product, chipName);
    if (!availableStorage.find(s => s.size === product.currentConfig.storage)) {
        product.currentConfig.storage = availableStorage[0].size;
    }

    const newPrice = calculateConfiguredPrice(product, product.currentConfig);

    updatePriceDisplay(productId, newPrice);

    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (card && card.classList.contains('expanded')) {
        const expandedContent = card.querySelector('.expanded-content');
        if (expandedContent) {
            const newHtml = renderConfigurationSelectors(product);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newHtml;

            const chipSelector = expandedContent.querySelector('[id^="chip-selector-"]')?.parentElement;
            const ramSelector = expandedContent.querySelector('[id^="ram-selector-"]')?.parentElement;
            const storageSelector = expandedContent.querySelector('[id^="storage-selector-"]')?.parentElement;

            const newChipSelector = tempDiv.querySelector('[id^="chip-selector-"]')?.parentElement;
            const newRamSelector = tempDiv.querySelector('[id^="ram-selector-"]')?.parentElement;
            const newStorageSelector = tempDiv.querySelector('[id^="storage-selector-"]')?.parentElement;

            if (chipSelector && newChipSelector) chipSelector.replaceWith(newChipSelector);
            if (ramSelector && newRamSelector) ramSelector.replaceWith(newRamSelector);
            if (storageSelector && newStorageSelector) storageSelector.replaceWith(newStorageSelector);

            // Triggera le animazioni e aggiorna le classi sui nuovi elementi dopo il replace
            setTimeout(() => {
                updateConfigSelectors(productId, 'chip');
                updateConfigSelectors(productId, 'ram');
                updateConfigSelectors(productId, 'storage');
            }, 10);
        }
    }
}

export function selectRamOption(productId, ramSize) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.configurations) return;

    product.currentConfig.ram = ramSize;

    const newPrice = calculateConfiguredPrice(product, product.currentConfig);
    updatePriceDisplay(productId, newPrice);
    updateConfigSelectors(productId, 'ram');
}

export function selectStorageOption(productId, storageSize) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.configurations) return;

    product.currentConfig.storage = storageSize;

    const newPrice = calculateConfiguredPrice(product, product.currentConfig);
    updatePriceDisplay(productId, newPrice);
    updateConfigSelectors(productId, 'storage');
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
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-600'
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
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-600'
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
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-600'
                }`;

            // Aggiungi animazione pulse al pulsante selezionato
            if (isSelected) {
                btn.classList.add('config-btn-selected');
                setTimeout(() => btn.classList.remove('config-btn-selected'), 400);
            }
        });
    }
}

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
