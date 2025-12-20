/**
 * Modulo Gestione Prezzi Personalizzati
 *
 * @module pricing
 * @requires config
 * @requires ui
 * @requires products
 */

import { showNotification } from './ui.js';
import { userRole } from './auth.js';
import { products } from './products/state.js';
import { renderProducts } from './products.js';

// Sub-modules
import {
    originalPrices,
    modifiedPrices,
    priceFilter,
    priceSearchQuery,
    setOriginalPrice,
    setModifiedPrice,
    removeModifiedPrice,
    removeOriginalPrice,
    resetModifiedPrices,
    setPriceFilter,
    setPriceSearchQuery
} from './pricing/state.js';

import {
    fetchProductPrices,
    updateCustomProductPriceInDb,
    upsertProductPriceInDb,
    upsertMultipleProductPricesInDb,
    deleteProductPriceFromDb,
    deleteAllProductPricesFromDb,
    deleteCustomProductFromDb
} from './pricing/service.js';

import {
    togglePriceModal,
    renderPriceTable
} from './pricing/dom.js';

// Re-export variables for backward compatibility or debugging
export { originalPrices, modifiedPrices, priceFilter, priceSearchQuery };

// ===== CONTROLLER FUNCTIONS =====

/**
 * Configura i listener per la gestione prezzi
 */
export function setupPricingEventListeners() {
    const priceManagementBtn = document.getElementById('price-management-btn');
    if (priceManagementBtn) {
        priceManagementBtn.addEventListener('click', () => openPriceManagement(window.userRole || userRole));
    }

    const closePriceBtn = document.getElementById('close-price-management');
    if (closePriceBtn) {
        closePriceBtn.addEventListener('click', closePriceManagement);
    }

    const saveAllPricesBtn = document.getElementById('save-all-prices-btn');
    if (saveAllPricesBtn) {
        saveAllPricesBtn.addEventListener('click', saveAllPrices);
    }

    const resetAllPricesBtn = document.getElementById('reset-all-prices-btn');
    if (resetAllPricesBtn) {
        resetAllPricesBtn.addEventListener('click', resetAllPrices);
    }

    const priceSearchInput = document.getElementById('price-search-input');
    if (priceSearchInput) {
        priceSearchInput.addEventListener('input', (e) => {
            updatePriceSearch(e.target.value);
        });
    }

    document.querySelectorAll('.price-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.price-category-btn').forEach(b => {
                b.classList.remove('bg-brand-dark', 'text-white', 'border-brand-dark', 'shadow-md', 'active');
                b.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
            });
            btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
            btn.classList.add('bg-brand-dark', 'text-white', 'border-brand-dark', 'shadow-md', 'active');
            updatePriceFilter(btn.dataset.category);
        });
    });
}

/**
 * Carica i prezzi personalizzati da Supabase e aggiorna lo stato
 */
export async function loadCustomPrices() {
    try {
        const data = await fetchProductPrices();

        // Inizializza i prezzi originali se non fatto
        products.forEach(p => {
            if (!originalPrices[p.id]) {
                setOriginalPrice(p.id, p.price);
            }
        });

        // Applica i prezzi personalizzati
        if (data && data.length > 0) {
            data.forEach(priceData => {
                const product = products.find(p => p.id === priceData.product_id);
                if (product) {
                    product.price = parseFloat(priceData.custom_price);
                }
            });
        }
    } catch (err) {
        console.error('Errore nel caricamento prezzi:', err);
    }
}

/**
 * Apre il modal di gestione prezzi
 */
export function openPriceManagement() {
    const currentRole = window.userRole || userRole;

    if (currentRole !== 'admin' && currentRole !== 'operator') {
        showNotification('Non hai i permessi per modificare i prezzi', 'error');
        return;
    }

    // Ricarica per sicurezza prima di aprire
    loadCustomPrices().then(() => {
        togglePriceModal(true);
        renderPriceManagement();
    });
}

/**
 * Chiude il modal di gestione prezzi
 */
export function closePriceManagement() {
    togglePriceModal(false);
    setPriceFilter('all');
    setPriceSearchQuery('');
    resetModifiedPrices();
}

/**
 * Alias per renderPriceTable
 */
export function renderPriceManagement() {
    renderPriceTable();
}

/**
 * Aggiorna il filtro di ricerca e re-renderizza
 */
export function filterPriceList(filterValue = 'all', searchValue = '') {
    setPriceFilter(filterValue);
    setPriceSearchQuery(searchValue);
    renderPriceTable();
}

export function updatePriceSearch(searchValue) {
    setPriceSearchQuery(searchValue);
    renderPriceTable();
}

export function updatePriceFilter(filterValue) {
    setPriceFilter(filterValue);
    renderPriceTable();
}

/**
 * Gestisce l'input di un nuovo prezzo (aggiorna stato locale)
 */
export function updatePriceInput(productId, value) {
    const price = parseFloat(value);
    if (!isNaN(price) && price >= 0) {
        setModifiedPrice(productId, price);
        renderPriceTable();
    }
}

/**
 * Salva il prezzo modificato per un singolo prodotto
 */
export async function savePriceChange(productId, newPrice) {
    let finalPrice = newPrice;

    // Se non passato, cerca in modifiedPrices o DOM
    if (finalPrice === undefined) {
        if (modifiedPrices[productId] !== undefined) {
            finalPrice = modifiedPrices[productId];
        } else {
            const input = document.querySelector(`input[data-product-id="${productId}"]`);
            if (input) finalPrice = parseFloat(input.value);
        }
    }

    if (finalPrice === undefined || isNaN(finalPrice) || finalPrice < 0) {
        showNotification('Inserisci un prezzo valido!', 'error');
        return false;
    }

    try {
        showNotification('Salvataggio prezzo...', 'info');
        const currentUser = window.currentUser;

        if (!currentUser || !currentUser.id) {
            showNotification('Utente non autenticato', 'error');
            return false;
        }

        const product = products.find(p => p.id === productId);
        if (!product) {
            showNotification('Prodotto non trovato', 'error');
            return false;
        }

        if (product.custom) {
            await updateCustomProductPriceInDb(productId, finalPrice);
        } else {
            await upsertProductPriceInDb(productId, finalPrice, currentUser.id);
        }

        // Aggiorna stato locale
        product.price = finalPrice;
        removeModifiedPrice(productId);
        
        renderPriceTable();
        refreshMainUI();

        showNotification('Prezzo aggiornato! ✓');
        return true;
    } catch (err) {
        showNotification(`Errore: ${err.message}`, 'error');
        return false;
    }
}

/**
 * Resetta il prezzo di un singolo prodotto all'originale
 */
export async function resetPrice(productId) {
    if (!confirm('Ripristinare il prezzo originale?')) return false;

    try {
        showNotification('Ripristino prezzo...', 'info');
        
        await deleteProductPriceFromDb(productId);

        const product = products.find(p => p.id === productId);
        if (product && originalPrices[productId]) {
            product.price = originalPrices[productId];
        }

        removeModifiedPrice(productId);
        renderPriceTable();
        refreshMainUI();

        showNotification('Prezzo ripristinato! ✓');
        return true;
    } catch (err) {
        showNotification('Errore nel ripristino', 'error');
        return false;
    }
}

/**
 * Salva tutti i prezzi modificati in una volta sola
 */
export async function saveAllPrices() {
    const changes = Object.entries(modifiedPrices);
    if (changes.length === 0) {
        showNotification('Nessuna modifica da salvare', 'info');
        return false;
    }

    if (!confirm(`Salvare ${changes.length} modifiche?`)) return false;

    try {
        showNotification('Salvataggio massivo...', 'info');
        const currentUser = window.currentUser;

        const updates = changes.map(([id, price]) => ({
            product_id: parseInt(id),
            custom_price: price,
            updated_by: currentUser.id
        }));

        await upsertMultipleProductPricesInDb(updates);

        // Aggiorna prodotti in memoria
        changes.forEach(([id, price]) => {
            const product = products.find(p => p.id === parseInt(id));
            if (product) product.price = price;
        });

        resetModifiedPrices();
        renderPriceTable();
        refreshMainUI();

        showNotification('Tutti i prezzi salvati! ✓');
        return true;
    } catch (err) {
        showNotification(`Errore: ${err.message}`, 'error');
        return false;
    }
}

/**
 * Resetta TUTTI i prezzi ai valori originali
 */
export async function resetAllPrices() {
    if (!confirm('Ripristinare TUTTI i prezzi originali? Irreversibile!')) return false;

    try {
        showNotification('Ripristino totale...', 'info');
        
        await deleteAllProductPricesFromDb();

        products.forEach(product => {
            if (originalPrices[product.id]) {
                product.price = originalPrices[product.id];
            }
        });

        resetModifiedPrices();
        renderPriceTable();
        refreshMainUI();

        showNotification('Listino ripristinato! ✓');
        return true;
    } catch (err) {
        showNotification('Errore nel ripristino totale', 'error');
        return false;
    }
}

/**
 * Elimina un prodotto custom
 */
export async function deleteCustomProduct(productId) {
    if (!confirm('Eliminare definitivamente questo prodotto?')) return false;

    try {
        showNotification('Eliminazione...', 'info');
        
        await deleteCustomProductFromDb(productId);

        // Rimuovi da array prodotti
        const idx = products.findIndex(p => p.id === productId);
        if (idx !== -1) products.splice(idx, 1);

        removeOriginalPrice(productId);
        removeModifiedPrice(productId);

        renderPriceTable();
        refreshMainUI();

        showNotification('Prodotto eliminato! ✓');
        return true;
    } catch (err) {
        showNotification(`Errore: ${err.message}`, 'error');
        return false;
    }
}

export function getProductPrice(product) {
    return product.price || 0;
}

/**
 * Helper per aggiornare la UI principale (griglia prodotti)
 */
function refreshMainUI() {
    if (typeof renderProducts === 'function') {
        renderProducts();
    } else if (typeof window.renderProducts === 'function') {
        window.renderProducts();
    }
}

// ===== ESPORTAZIONE GLOBALE =====

if (typeof window !== 'undefined') {
    window.pricingModule = {
        openPriceManagement,
        closePriceManagement,
        loadCustomPrices,
        savePriceChange,
        filterPriceList,
        updatePriceSearch,
        updatePriceFilter,
        resetAllPrices,
        getProductPrice,
        updatePriceInput,
        resetPrice,
        saveAllPrices,
        deleteCustomProduct
    };
}