/**
 * Cart Module - Gestione completa del carrello
 * Fornisce funzionalità per aggiungere, rimuovere, modificare e renderizzare articoli nel carrello
 */

import { showNotification } from './ui.js';
import { updateCartBadge, scrollToCart } from './utils.js';
import { calculateTotals } from './shared/calculations.js';
import { renderEmptyCart as renderEmptyCartState } from './shared/emptyState.js';

// ===== VARIABILI ESPORTATE =====

/**
 * Array del carrello contenente gli articoli
 * Ogni articolo ha: id, variantKey, name, price, quantity, color (opzionale), storage (opzionale), imageUrl (opzionale)
 * @type {Array<Object>}
 */
export let cart = [];

// ===== FUNZIONI ESPORTATE =====

/**
 * Configura i listener per il carrello
 */
export function setupCartEventListeners() {
    // Bottone "Svuota Carrello"
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
}

/**
 * Aggiunge un prodotto al carrello con gestione varianti (colore/storage)
 * Se il prodotto con stesse varianti esiste già, incrementa la quantità
 *
 * @param {number} productId - ID del prodotto da aggiungere
 * @param {Array<Object>} products - Array dei prodotti disponibili
 * @returns {void}
 */
export function addToCart(productId, products) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Leggi colore e storage selezionati dalla card (se disponibili)
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    let selectedColor = null;
    let selectedStorage = null;
    let selectedImageUrl = null;

    if (card) {
        // Trova colore selezionato
        const selectedColorSwatch = card.querySelector('.color-swatch.selected');
        if (selectedColorSwatch) {
            selectedColor = selectedColorSwatch.getAttribute('title');
            const colorImageUrl = selectedColorSwatch.getAttribute('data-image-url');
            if (colorImageUrl) selectedImageUrl = colorImageUrl;
        }

        // Trova storage selezionato
        const selectedStorageBtn = card.querySelector('[data-storage-selected="true"]');
        if (selectedStorageBtn) {
            selectedStorage = selectedStorageBtn.textContent.trim();
        }
    }

    // Crea chiave univoca per varianti (stesso prodotto, colore/storage diverso)
    const variantKey = `${productId}-${selectedColor || 'default'}-${selectedStorage || 'default'}`;

    const existingItem = cart.find(item => item.variantKey === variantKey);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const cartItem = {
            id: product.id,
            variantKey: variantKey,
            name: product.name,
            price: product.price,
            quantity: 1
        };

        // Aggiungi info varianti se disponibili
        if (selectedColor) cartItem.color = selectedColor;
        if (selectedStorage) cartItem.storage = selectedStorage;
        if (selectedImageUrl) cartItem.imageUrl = selectedImageUrl;

        cart.push(cartItem);
    }

    renderCart();
    updateCartBadge(cart);
    showNotification('Prodotto aggiunto al carrello!', 'success');
}

/**
 * Aggiunge un prodotto configurato (con chip, RAM, storage) al carrello
 * Usato per i prodotti Mac con sistema di configurazione dinamica
 *
 * @param {number} productId - ID del prodotto da aggiungere
 * @param {Array<Object>} products - Array dei prodotti disponibili
 * @returns {void}
 */
export function addConfiguredToCart(productId, products) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.configurations || !product.currentConfig) {
        // Fallback a addToCart normale se non ha configurazioni
        return addToCart(productId, products);
    }

    const config = product.currentConfig;

    // Importa calculateConfiguredPrice da products.js
    // (Nota: questo sarà disponibile dopo che esponiamo le funzioni in app.js)
    const finalPrice = window.calculateConfiguredPrice
        ? window.calculateConfiguredPrice(product, config)
        : product.basePrice;

    // Crea chiave univoca per variante configurata
    const variantKey = `${productId}-${config.chip || 'default'}-${config.ram || 'default'}-${config.storage || 'default'}-${config.color || 'default'}`;

    // Costruisci nome display completo
    const displayParts = [product.name];
    if (config.chip) displayParts.push(config.chip);
    if (config.ram) displayParts.push(config.ram);
    if (config.storage) displayParts.push(config.storage);
    const displayName = displayParts.join(', ');

    // Controlla se stessa configurazione già nel carrello
    const existingItem = cart.find(item => item.variantKey === variantKey);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const cartItem = {
            id: product.id,
            variantKey: variantKey,
            name: product.name,
            displayName: displayName,
            price: finalPrice,
            quantity: 1,
            configuration: {
                chip: config.chip,
                ram: config.ram,
                storage: config.storage,
                color: config.color
            }
        };

        cart.push(cartItem);
    }

    renderCart();
    updateCartBadge(cart);
    showNotification('Prodotto configurato aggiunto al carrello!', 'success');
}

/**
 * Rimuove un prodotto dal carrello per variantKey
 *
 * @param {string} variantKey - Chiave univoca della variante da rimuovere
 * @returns {void}
 */
export function removeFromCart(variantKey) {
    cart = cart.filter(item => item.variantKey !== variantKey);
    renderCart();
    updateCartBadge(cart);
}

/**
 * Aumenta la quantità di un articolo nel carrello
 *
 * @param {string} variantKey - Chiave univoca della variante
 * @returns {void}
 */
export function increaseQuantity(variantKey) {
    const item = cart.find(i => i.variantKey === variantKey);
    if (item) {
        item.quantity++;
        renderCart();
        updateCartBadge(cart);
    }
}

/**
 * Diminuisce la quantità di un articolo nel carrello
 * Se la quantità raggiunge 0, rimuove l'articolo dal carrello
 *
 * @param {string} variantKey - Chiave univoca della variante
 * @returns {void}
 */
export function decreaseQuantity(variantKey) {
    const item = cart.find(i => i.variantKey === variantKey);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            removeFromCart(variantKey);
        }
        renderCart();
        updateCartBadge(cart);
    }
}

/**
 * Svuota completamente il carrello dopo conferma dell'utente
 *
 * @returns {void}
 */
export function clearCart() {
    if (cart.length === 0) {
        showNotification('Il carrello è già vuoto', 'info');
        return;
    }

    if (confirm('Sei sicuro di voler svuotare il carrello?')) {
        clearCartSilent();
        showNotification('Carrello svuotato', 'success');
    }
}

/**
 * Svuota il carrello senza conferma (per uso interno, es. dopo salvataggio ordine)
 *
 * @returns {void}
 */
export function clearCartSilent() {
    cart.length = 0; // Svuota l'array mantenendo il riferimento
    window.cart = cart; // Sincronizza con window

    // Reset edit mode quando si svuota il carrello
    if (typeof window.orders?.resetEditMode === 'function') {
        window.orders.resetEditMode();
    }

    renderCart();
    updateCartBadge(cart);
}

/**
 * Renderizza un singolo item del carrello
 * @param {Object} item - Articolo del carrello
 * @returns {string} HTML per l'item
 */
function renderCartItem(item) {
    return `
        <div class="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-100 transition-all duration-300 hover:border-apple-blue hover:shadow-md">
            <!-- Remove button (absolute top-right) -->
            <button
                type="button"
                class="btn btn-icon btn-danger absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 rounded-lg transition-all duration-300 hover:bg-apple-red hover:text-white hover:border-apple-red hover:scale-110 opacity-0 group-hover:opacity-100"
                onclick="window.removeFromCart('${item.variantKey}')"
                aria-label="Rimuovi ${item.displayName || item.name} dal carrello"
            >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Product Info -->
            <div class="mb-3 pr-6">
                <div class="font-semibold text-gray-900 mb-1 text-sm line-clamp-2">${item.displayName || item.name}</div>

                ${item.configuration ? `
                <!-- Configurazione completa (per prodotti configurati) -->
                <div class="text-xs text-gray-600 space-y-0.5 mb-2">
                    ${item.configuration.chip ? `<div>• Chip: ${item.configuration.chip}</div>` : ''}
                    ${item.configuration.ram ? `<div>• RAM: ${item.configuration.ram}</div>` : ''}
                    ${item.configuration.storage ? `<div>• Storage: ${item.configuration.storage}</div>` : ''}
                    ${item.configuration.color ? `<div>• Colore: ${item.configuration.color}</div>` : ''}
                </div>
                ` : `
                <!-- Varianti semplici (per prodotti non configurati) -->
                ${item.color ? `<div class="text-xs text-gray-600 mb-1">🎨 ${item.color}</div>` : ''}
                ${item.storage ? `<div class="text-xs text-gray-600 mb-1">💾 ${item.storage}</div>` : ''}
                `}

                <div class="flex items-baseline gap-2">
                    <span class="text-xs text-gray-500">€${item.price.toFixed(2)}</span>
                    <span class="text-xs text-gray-400">× ${item.quantity}</span>
                    <span class="text-sm font-bold text-apple-blue ml-auto">€${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>

            <!-- Quantity Controls -->
            <div class="flex items-center gap-2">
                <button
                    type="button"
                    class="flex-1 h-9 flex items-center justify-center bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-bold transition-all duration-300 hover:border-apple-blue hover:bg-apple-blue hover:text-white active:scale-95"
                    onclick="window.decreaseQuantity('${item.variantKey}')"
                    aria-label="Diminuisci quantità di ${item.displayName || item.name}"
                >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M20 12H4" />
                    </svg>
                </button>
                <div class="flex items-center justify-center min-w-[60px] h-9 bg-white border-2 border-gray-200 rounded-lg">
                    <span class="font-bold text-gray-900">${item.quantity}</span>
                </div>
                <button
                    type="button"
                    class="flex-1 h-9 flex items-center justify-center bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-bold transition-all duration-300 hover:border-apple-blue hover:bg-apple-blue hover:text-white active:scale-95"
                    onclick="window.increaseQuantity('${item.variantKey}')"
                    aria-label="Aumenta quantità di ${item.displayName || item.name}"
                >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </div>
    `;
}

/**
 * Aggiorna il contatore articoli nel carrello
 * @param {number} totalItems - Numero totale di articoli
 */
function updateCartItemCount(totalItems) {
    const cartItemCount = document.getElementById('cart-item-count');
    if (cartItemCount) {
        cartItemCount.textContent = `${totalItems} ${totalItems === 1 ? 'articolo' : 'articoli'}`;
    }
}

/**
 * Renderizza il carrello nell'elemento DOM #cart-items
 * Mostra tutti gli articoli con controlli di quantità, oppure messaggio vuoto
 * Aggiorna anche i totali (subtotale, IVA, totale)
 *
 * @returns {void}
 */
export function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    if (!cartItemsDiv) return;

    // Update item count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    updateCartItemCount(totalItems);

    // Handle empty cart
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = renderEmptyCartState();
        updateCartSummary(0, 0, 0);
        updateCartBadge(cart);
        return;
    }

    // Render cart items
    cartItemsDiv.innerHTML = cart.map(renderCartItem).join('');

    // Update totals
    const { subtotal, tax, total } = calculateTotals(cart);
    updateCartSummary(subtotal, tax, total);
    updateCartBadge(cart);
}

/**
 * Aggiorna i totali visualizzati nel DOM
 *
 * @param {number} subtotal - Subtotale
 * @param {number} tax - Importo IVA
 * @param {number} total - Totale
 * @returns {void}
 */
export function updateCartSummary(subtotal, tax, total) {
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `€${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `€${total.toFixed(2)}`;
}

/**
 * Restituisce un oggetto riepilogativo del carrello
 *
 * @returns {Object} Oggetto con proprietà:
 *   - items: Array degli articoli nel carrello
 *   - itemCount: Numero totale di articoli (somma delle quantità)
 *   - subtotal: Subtotale
 *   - tax: Importo IVA (22%)
 *   - total: Totale
 */
export function getCartSummary() {
    const { subtotal, tax, total } = calculateTotals(cart);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
        items: [...cart],
        itemCount,
        subtotal,
        tax,
        total
    };
}