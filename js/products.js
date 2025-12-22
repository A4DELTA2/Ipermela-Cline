/**
 * Products Module (Controller)
 * Aggregates functionality for product management, filtering, and rendering
 *
 * @module products
 */

import { defaultProducts } from './data.js';
import { showNotification } from './ui.js';
import {
    products,
    nextProductId,
    currentFilter,
    currentSubcategory,
    searchQuery,
    setProducts,
    addProduct,
    setCurrentFilter,
    setCurrentSubcategory,
    setSearchQuery
} from './products/state.js';
import {
    calculateConfiguredPrice,
    getAvailableRamOptions,
    getAvailableStorageOptions,
    buildConfigSummary
} from './products/logic.js';
import {
    fetchCustomProducts,
    insertCustomProduct
} from './products/service.js';
import {
    renderProductsGrid,
    renderProductCard,
    renderConfigurationSelectors,
    toggleProductCard,
    selectProductColor,
    selectProductStorage,
    updatePriceDisplay,
    updateConfigSelectors,
    requestAIAdvice
} from './products/dom.js';

// Re-export state and functions for other modules
export {
    products,
    nextProductId,
    currentFilter,
    currentSubcategory,
    searchQuery,
    calculateConfiguredPrice,
    getAvailableRamOptions,
    getAvailableStorageOptions,
    buildConfigSummary,
    renderProductCard,
    toggleProductCard,
    selectProductColor,
    selectProductStorage,
    updatePriceDisplay,
    updateConfigSelectors,
    requestAIAdvice
};

/**
 * Configura i listener per la gestione prodotti (ricerca, filtri, custom)
 */
export function setupProductEventListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            setSearchQuery(e.target.value);
            renderProducts();
        });
    }

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white', 'border-blue-600', 'shadow-md', 'active');
                b.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
            });
            btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
            btn.classList.add('bg-blue-600', 'text-white', 'border-blue-600', 'shadow-md', 'active');
            setCurrentFilter(btn.dataset.category);
            setCurrentSubcategory('all');
            renderProducts();
        });
    });

    // Subcategory filters (Mac only)
    document.querySelectorAll('.subcategory-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.subcategory-btn').forEach(b => {
                b.classList.remove('bg-blue-500', 'bg-apple-blue', 'text-white', 'border-blue-500', 'shadow-md', 'active');
                b.classList.add('bg-white', 'text-apple-blue', 'border-blue-200');
            });
            btn.classList.remove('bg-white', 'text-apple-blue', 'border-blue-200');
            btn.classList.add('bg-blue-500', 'text-white', 'border-blue-500', 'shadow-md', 'active');
            setCurrentSubcategory(btn.dataset.subcategory);
            renderProducts();
        });
    });

    // Custom Accessory Button
    const addCustomBtn = document.getElementById('add-custom-btn');
    if (addCustomBtn) {
        addCustomBtn.addEventListener('click', addCustomAccessory);
    }
}

/**
 * Renderizza i prodotti (wrapper per dom.js)
 */
export function renderProducts() {
    // Show/hide Mac subcategories based on current filter
    const macSubcategories = document.getElementById('mac-subcategories');
    if (macSubcategories) {
        if (currentFilter === 'mac') {
            macSubcategories.classList.remove('hidden');
        } else {
            macSubcategories.classList.add('hidden');
        }
    }

    renderProductsGrid();
}

/**
 * Carica i prodotti personalizzati da Supabase e li unisce a quelli di default
 */
export async function loadProducts() {
    try {
        const customProductsData = await fetchCustomProducts();

        if (customProductsData && customProductsData.length > 0) {
            const customProducts = customProductsData.map(p => ({
                id: p.id,
                name: p.name,
                price: parseFloat(p.price),
                category: p.category || 'accessori',
                icon: p.icon || '🎁',
                custom: true
            }));

            // Merge default products with custom products
            setProducts([...defaultProducts, ...customProducts]);
            console.log(`✓ Caricati ${customProducts.length} prodotti personalizzati`);
        } else {
            setProducts([...defaultProducts]);
        }
    } catch (err) {
        console.error('Errore imprevisto nel caricamento prodotti:', err);
        // Fallback to default products
        setProducts([...defaultProducts]);
    }
}

/**
 * Aggiunge un nuovo accessorio personalizzato
 */
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

        const newProductData = {
            id: nextProductId,
            name: name,
            price: price,
            category: 'accessori',
            icon: icon
        };

        await insertCustomProduct(newProductData);

        const newProduct = {
            ...newProductData,
            custom: true
        };

        addProduct(newProduct);

        nameInput.value = '';
        priceInput.value = '';
        iconSelect.value = '🎁';

        renderProducts();

        showNotification('Prodotto aggiunto al catalogo! ✓', 'success');
    } catch (err) {
        showNotification('Errore nel salvataggio: ' + err.message, 'error');
    }
}

// === Configuration Selection Logic (Controller glue) ===

export function selectChipVariant(productId, chipName) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.configurations) return;

    product.currentConfig.chip = chipName;

    // Auto-select valid RAM/Storage if current selection becomes invalid
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
            // Re-render all selectors to update availability and pricing
            const newHtml = renderConfigurationSelectors(product);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newHtml;

            ['chip', 'ram', 'storage'].forEach(type => {
                const selector = expandedContent.querySelector(`[id^="${type}-selector-"]`)?.parentElement;
                const newSelector = tempDiv.querySelector(`[id^="${type}-selector-"]`)?.parentElement;
                if (selector && newSelector) selector.replaceWith(newSelector);
            });

            // Trigger animations
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