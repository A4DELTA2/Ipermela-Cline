/**
 * Modulo Gestione Prezzi Personalizzati
 *
 * Gestisce tutti gli aspetti relativi ai prezzi personalizzati dei prodotti:
 * - Caricamento prezzi custom da Supabase
 * - Modifica e salvataggio prezzi
 * - Interfaccia di gestione prezzi
 * - Filtro e ricerca prodotti
 * - Reset prezzi
 *
 * @module pricing
 * @requires config - Per accesso a Supabase
 * @requires ui - Per notifiche utente
 * @requires ./products - Per accesso al catalogo prodotti
 */

import { supabase } from './config.js';
import { showNotification } from './ui.js';

// ===== VARIABILI ESPORTATE =====

/**
 * Oggetto contenente i prezzi originali dei prodotti
 * Mappa: productId -> originalPrice
 * @type {Object<number, number>}
 */
export let originalPrices = {};

/**
 * Oggetto contenente i prezzi modificati non ancora salvati
 * Mappa: productId -> newPrice
 * @type {Object<number, number>}
 */
export let modifiedPrices = {};

/**
 * Filtro categoria corrente per la lista prezzi
 * Valori possibili: 'all', 'iphone', 'mac', 'ipad', 'accessori'
 * @type {string}
 */
export let priceFilter = 'all';

/**
 * Query di ricerca per filtrare prodotti per nome
 * @type {string}
 */
export let priceSearchQuery = '';

// ===== FUNZIONI ESPORTATE =====

/**
 * Carica i prezzi personalizzati da Supabase
 * Inizializza anche i prezzi originali se non già presenti
 *
 * @async
 * @function loadCustomPrices
 * @returns {Promise<void>}
 * @throws {Error} Se si verificano errori nella query Supabase
 */
export async function loadCustomPrices() {
    try {
        const { data, error } = await supabase
            .from('product_prices')
            .select('*');

        if (error) {
            console.error('Errore caricamento prezzi:', error);
            return;
        }

        // Inizializza i prezzi originali
        window.products.forEach(p => {
            if (!originalPrices[p.id]) {
                originalPrices[p.id] = p.price;
            }
        });

        // Applica i prezzi personalizzati caricati
        if (data && data.length > 0) {
            data.forEach(priceData => {
                const product = window.products.find(p => p.id === priceData.product_id);
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
 * Salva un prezzo personalizzato per un singolo prodotto
 * Aggiorna il database Supabase e lo stato locale
 *
 * @async
 * @function savePriceChange
 * @param {number} productId - ID del prodotto
 * @param {number} newPrice - Nuovo prezzo da salvare
 * @returns {Promise<boolean>} true se il salvataggio ha avuto successo, false altrimenti
 *
 * @example
 * const success = await savePriceChange(1, 1299.99);
 * if (success) {
 *   console.log('Prezzo salvato con successo');
 * }
 */
export async function savePriceChange(productId, newPrice) {
    let finalPrice = newPrice;

    // Se il prezzo non è fornito, leggi dall'input
    if (finalPrice === undefined) {
        const input = document.querySelector(`input[data-product-id="${productId}"]`);
        if (input) {
            const price = parseFloat(input.value);
            if (!isNaN(price) && price >= 0) {
                finalPrice = price;
                modifiedPrices[productId] = price;
            } else {
                showNotification('Inserisci un prezzo valido!', 'error');
                return false;
            }
        }
    }

    if (finalPrice === undefined || finalPrice < 0) {
        showNotification('Inserisci un prezzo valido!', 'error');
        return false;
    }

    try {
        showNotification('Salvataggio prezzo...', 'info');

        const { error } = await supabase
            .from('product_prices')
            .upsert({
                product_id: productId,
                custom_price: finalPrice,
                updated_by: window.currentUser.id
            }, {
                onConflict: 'product_id'
            });

        if (error) {
            showNotification(`Errore nel salvataggio: ${error.message || 'Errore sconosciuto'}`, 'error');
            return false;
        }

        // Aggiorna il prodotto
        const product = window.products.find(p => p.id === productId);
        if (product) {
            product.price = finalPrice;
        }

        delete modifiedPrices[productId];
        renderPriceManagement();

        // Trigger render prodotti se disponibile
        const renderProductsFunc = window.renderProducts;
        if (typeof renderProductsFunc === 'function') {
            renderProductsFunc();
        }

        showNotification('Prezzo aggiornato! ✓');
        return true;
    } catch (err) {
        showNotification(`Errore nel salvataggio: ${err.message || 'Errore sconosciuto'}`, 'error');
        return false;
    }
}

/**
 * Apre il modal di gestione prezzi
 * Verifica i permessi utente (solo admin e operator)
 *
 * @function openPriceManagement
 * @returns {void}
 */
export function openPriceManagement() {
    console.log('💰 Tentativo apertura gestione prezzi. Ruolo corrente:', window.userRole);

    // Verifica permessi
    if (window.userRole !== 'admin' && window.userRole !== 'operator') {
        console.error('❌ Permesso negato. Ruolo:', window.userRole);
        showNotification('Non hai i permessi per modificare i prezzi', 'error');
        return;
    }

    console.log('✅ Permesso concesso - Apertura modale prezzi');
    showPriceManagementModal();
}

/**
 * Chiude il modal di gestione prezzi e resetta i filtri
 *
 * @function closePriceManagement
 * @returns {void}
 */
export function closePriceManagement() {
    const section = document.getElementById('price-management-section');
    if (section) {
        section.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Resetta filtri
    priceFilter = 'all';
    priceSearchQuery = '';
    modifiedPrices = {};
}

/**
 * Renderizza il modal di gestione prezzi con la lista prodotti
 * Carica i prezzi custom e mostra la tabella interattiva
 *
 * @async
 * @function renderPriceManagement
 * @returns {Promise<void>}
 */
export async function renderPriceManagement() {
    renderPriceTable();
}

/**
 * Filtra la lista prezzi in base a categoria e query di ricerca
 * Aggiorna e renderizza la tabella
 *
 * @function filterPriceList
 * @param {string} [filterValue='all'] - Categoria da filtrare ('all', 'iphone', 'mac', 'ipad', 'accessori')
 * @param {string} [searchValue=''] - Termine di ricerca per nome prodotto
 * @returns {void}
 *
 * @example
 * filterPriceList('iphone', 'pro');
 */
export function filterPriceList(filterValue = 'all', searchValue = '') {
    priceFilter = filterValue;
    priceSearchQuery = searchValue.toLowerCase();
    renderPriceTable();
}

/**
 * Aggiorna solo la ricerca prezzi mantenendo il filtro corrente
 * @function updatePriceSearch
 * @param {string} searchValue - Termine di ricerca
 */
export function updatePriceSearch(searchValue) {
    priceSearchQuery = searchValue.toLowerCase();
    renderPriceTable();
}

/**
 * Aggiorna solo il filtro categoria mantenendo la ricerca corrente
 * @function updatePriceFilter
 * @param {string} filterValue - Categoria da filtrare
 */
export function updatePriceFilter(filterValue) {
    priceFilter = filterValue;
    renderPriceTable();
}

/**
 * Resetta TUTTI i prezzi ai valori originali
 * Richiede conferma dell'utente (azione irreversibile)
 *
 * @async
 * @function resetAllPrices
 * @returns {Promise<boolean>} true se il reset ha avuto successo, false altrimenti
 */
export async function resetAllPrices() {
    if (!confirm('Ripristinare TUTTI i prezzi originali? Questa azione non può essere annullata!')) {
        return false;
    }

    try {
        showNotification('Ripristino prezzi...', 'info');

        const { error } = await supabase
            .from('product_prices')
            .delete()
            .neq('product_id', 0);

        if (error) {
            showNotification('Errore nel ripristino!', 'error');
            return false;
        }

        // Ripristina tutti i prezzi originali
        window.products.forEach(product => {
            if (originalPrices[product.id]) {
                product.price = originalPrices[product.id];
            }
        });

        modifiedPrices = {};
        renderPriceTable();

        // Trigger render prodotti se disponibile
        const renderProductsFunc = window.renderProducts;
        if (typeof renderProductsFunc === 'function') {
            renderProductsFunc();
        }

        showNotification('Tutti i prezzi ripristinati! ✓');
        return true;
    } catch (err) {
        showNotification('Errore nel ripristino!', 'error');
        return false;
    }
}

/**
 * Ottiene il prezzo attuale di un prodotto
 * Ritorna il prezzo personalizzato se presente, altrimenti il prezzo originale
 *
 * @function getProductPrice
 * @param {Object} product - Oggetto prodotto
 * @param {number} product.id - ID del prodotto
 * @param {number} product.price - Prezzo attuale del prodotto
 * @returns {number} Il prezzo del prodotto
 *
 * @example
 * const price = getProductPrice(productObject);
 * console.log(`Prezzo: €${price.toFixed(2)}`);
 */
export function getProductPrice(product) {
    return product.price || 0;
}

// ===== FUNZIONI INTERNE =====

/**
 * Mostra il modal di gestione prezzi
 * Carica i prezzi custom e configura l'interfaccia
 *
 * @async
 * @private
 * @returns {Promise<void>}
 */
async function showPriceManagementModal() {
    await loadCustomPrices();
    const section = document.getElementById('price-management-section');
    if (section) {
        section.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        renderPriceTable();
    }
}

/**
 * Renderizza la tabella prezzi con filtri applicati
 * Mostra i prodotti con opzioni di modifica e salvataggio
 *
 * @private
 * @returns {void}
 */
function renderPriceTable() {
    const tbody = document.getElementById('price-table-body');
    if (!tbody) return;

    // 🔧 FIX: Verifica che window.products esista e non sia vuoto
    if (!window.products || !Array.isArray(window.products) || window.products.length === 0) {
        console.warn('⚠️ window.products non disponibile o vuoto');
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

    // Filtra i prodotti
    let filteredProducts = window.products.filter(p => !p.custom);

    if (priceFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === priceFilter);
    }

    if (priceSearchQuery) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(priceSearchQuery)
        );
    }

    // Se nessun prodotto, mostra messaggio vuoto
    if (filteredProducts.length === 0) {
        tbody.innerHTML = `
    <tr>
        <td colspan="5" class="py-16 text-center">
            <div class="flex flex-col items-center gap-3">
                <svg class="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-gray-500 font-medium">Nessun prodotto trovato</p>
                <p class="text-sm text-gray-400">Prova a modificare i filtri</p>
            </div>
        </td>
    </tr>
`;
        return;
    }

    // Renderizza le righe della tabella
    tbody.innerHTML = filteredProducts.map(product => {
        // 🔧 FIX: Gestisci prodotti senza prezzo definito
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
                    <div class="font-semibold text-gray-900">${product.name}</div>
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
                <button
                    class="px-3 py-2 bg-white border-2 border-gray-200 text-gray-600 font-medium rounded-lg transition-all duration-300 hover:border-brand-dark hover:bg-brand-dark hover:text-white hover:scale-105 active:scale-95"
                    onclick="window.pricingModule.resetPrice(${product.id})"
                    title="Ripristina prezzo originale"
                >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>
        </td>
    </tr>
`;
    }).join('');
}

/**
 * Ottiene le informazioni di stile per una categoria
 *
 * @private
 * @param {string} category - Codice categoria ('iphone', 'mac', 'ipad', 'accessori')
 * @returns {Object} Oggetto con label e classi Tailwind CSS
 * @returns {string} returns.label - Etichetta categoria
 * @returns {string} returns.color - Classi Tailwind per il colore
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
 * Aggiorna il valore di un input prezzo
 * Verifica la validità e aggiorna modifiedPrices
 *
 * @private
 * @param {number} productId - ID del prodotto
 * @param {string|number} value - Nuovo valore prezzo
 * @returns {void}
 */
export function updatePriceInput(productId, value) {
    const price = parseFloat(value);
    if (!isNaN(price) && price >= 0) {
        modifiedPrices[productId] = price;
        renderPriceTable();
    }
}

/**
 * Resetta il prezzo di un singolo prodotto al valore originale
 * Richiede conferma dell'utente
 *
 * @async
 * @private
 * @param {number} productId - ID del prodotto
 * @returns {Promise<boolean>} true se il reset ha avuto successo, false altrimenti
 */
export async function resetPrice(productId) {
    if (!confirm('Ripristinare il prezzo originale per questo prodotto?')) {
        return false;
    }

    try {
        showNotification('Ripristino prezzo...', 'info');

        const { error } = await supabase
            .from('product_prices')
            .delete()
            .eq('product_id', productId);

        if (error) {
            showNotification('Errore nel ripristino!', 'error');
            return false;
        }

        const product = window.products.find(p => p.id === productId);
        if (product && originalPrices[productId]) {
            product.price = originalPrices[productId];
        }

        delete modifiedPrices[productId];
        renderPriceTable();

        // Trigger render prodotti se disponibile
        const renderProductsFunc = window.renderProducts;
        if (typeof renderProductsFunc === 'function') {
            renderProductsFunc();
        }

        showNotification('Prezzo ripristinato! ✓');
        return true;
    } catch (err) {
        showNotification('Errore nel ripristino!', 'error');
        return false;
    }
}

/**
 * Salva tutti i prezzi modificati in una singola operazione
 * Richiede conferma dell'utente
 *
 * @async
 * @private
 * @returns {Promise<boolean>} true se il salvataggio ha avuto successo, false altrimenti
 */
export async function saveAllPrices() {
    const modifiedCount = Object.keys(modifiedPrices).length;

    if (modifiedCount === 0) {
        showNotification('Non ci sono modifiche da salvare!', 'error');
        return false;
    }

    if (!confirm(`Salvare ${modifiedCount} modifiche ai prezzi?`)) {
        return false;
    }

    try {
        showNotification('Salvataggio modifiche...', 'info');

        const updates = Object.entries(modifiedPrices).map(([productId, price]) => ({
            product_id: parseInt(productId),
            custom_price: price,
            updated_by: window.currentUser.id
        }));

        const { error } = await supabase
            .from('product_prices')
            .upsert(updates, {
                onConflict: 'product_id'
            });

        if (error) {
            showNotification(`Errore nel salvataggio: ${error.message || 'Errore sconosciuto'}`, 'error');
            return false;
        }

        // Aggiorna tutti i prodotti modificati
        Object.entries(modifiedPrices).forEach(([productId, price]) => {
            const product = window.products.find(p => p.id === parseInt(productId));
            if (product) {
                product.price = price;
            }
        });

        modifiedPrices = {};
        renderPriceTable();

        // Trigger render prodotti se disponibile
        const renderProductsFunc = window.renderProducts;
        if (typeof renderProductsFunc === 'function') {
            renderProductsFunc();
        }

        showNotification(`${modifiedCount} prezzi aggiornati! ✓`);
        return true;
    } catch (err) {
        showNotification(`Errore nel salvataggio: ${err.message || 'Errore sconosciuto'}`, 'error');
        return false;
    }
}

// ===== ESPORTAZIONE MODULO GLOBALE =====

// Rendi disponibili le funzioni anche globalmente per gli onclick inline
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
        saveAllPrices
    };
}
