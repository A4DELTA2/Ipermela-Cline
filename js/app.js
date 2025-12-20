/**
 * @fileoverview Entry point principale dell'applicazione Ipermela Store
 * @module app
 */

// Import configurazione
import { supabase } from './config.js';

// Import UI Components
import { LoginScreen } from './components/LoginScreen.js';
import { Header } from './components/Header.js';
import { MainLayout } from './components/MainLayout.js';
import { Modals } from './components/Modals.js';

// Import moduli funzionali
import {
    currentUser,
    userRole,
    checkAuth,
    handleLogout,
    showLoginScreen,
    setupAuthEventListeners
} from './auth.js';

import {
    products,
    loadProducts,
    renderProducts,
    toggleProductCard,
    selectProductColor,
    selectProductStorage,
    addCustomAccessory,
    calculateConfiguredPrice,
    getAvailableRamOptions,
    getAvailableStorageOptions,
    selectChipVariant,
    selectRamOption,
    selectStorageOption,
    buildConfigSummary,
    setupProductEventListeners
} from './products.js';

import {
    cart,
    renderCart,
    clearCart,
    clearCartSilent,
    addToCart as addToCartInternal,
    addConfiguredToCart as addConfiguredToCartInternal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setupCartEventListeners
} from './cart.js';

import {
    savedOrders,
    renderSavedOrders,
    openOrderModal,
    closeOrderModal,
    saveOrder,
    deleteOrder,
    exportOrderPDF,
    exportOrdersToCSV,
    previewOrderPDF,
    loadOrderToCart,
    closePDFPreview,
    resetEditMode,
    setupOrderEventListeners
} from './orders.js';

import {
    loadCustomPrices,
    openPriceManagement,
    closePriceManagement,
    filterPriceList,
    updatePriceSearch,
    updatePriceFilter,
    savePriceChange,
    resetPrice,
    resetAllPrices,
    saveAllPrices,
    updatePriceInput,
    deleteCustomProduct,
    getProductPrice,
    setupPricingEventListeners
} from './pricing.js';

import {
    showNotification,
    initNotificationStyles,
    initDarkMode,
    toggleDarkMode,
    setupUIEventListeners
} from './ui.js';

import {
    scrollToAddProduct,
    scrollToCart,
    updateCartBadge
} from './utils.js';

/**
 * Flag per tracciare se l'app è già stata inizializzata
 * Previene doppie inizializzazioni dal listener auth state change
 */
let isAppInitialized = false;

/**
 * Renderizza l'intera applicazione nel DOM
 */
function renderApplication() {
    const root = document.getElementById('root');
    if (!root) return;

    root.innerHTML = `
        ${LoginScreen()}
        <div id="app-container" class="container mx-auto px-4 py-6 max-w-7xl" style="display: none;">
            ${Header()}
            ${MainLayout()}
        </div>
        ${Modals()}
    `;
}

/**
 * Inizializza l'applicazione dopo il login
 */
async function initializeApp() {
    // Previeni doppia inizializzazione
    if (isAppInitialized) {
        return;
    }

    showNotification('Caricamento dati dal cloud...', 'info');

    try {
        // Aggiorna variabili globali dopo login (per permessi prezzi, etc.)
        window.currentUser = currentUser;
        window.userRole = userRole;

        await loadProducts();
        window.products = products; // Assicura che sia globale per pricing.js
        await loadCustomPrices();
        renderProducts();
        renderCart();
        await renderSavedOrders();

        // Marca come inizializzato solo dopo successo
        isAppInitialized = true;
        showNotification('Dati caricati! ✓', 'success');
    } catch (err) {
        console.error('Errore inizializzazione:', err);
        showNotification('Errore nel caricamento dei dati', 'error');
    }
}

// Espone la funzione di inizializzazione globalmente per auth.js
window.initializeApp = initializeApp;

/**
 * Setup di tutti gli event listeners dell'applicazione
 * Delega ai moduli specifici
 */
function setupAllEventListeners() {
    setupAuthEventListeners();
    setupProductEventListeners();
    setupCartEventListeners();
    setupOrderEventListeners();
    setupPricingEventListeners();
    setupUIEventListeners();
}

/**
 * Espone funzioni e variabili globalmente per compatibilità con onclick inline (Legacy)
 */
function exposeGlobals() {
    // Auth
    window.currentUser = currentUser;
    window.userRole = userRole;
    window.handleLogout = handleLogout;

    // Products
    window.products = products;
    window.renderProducts = renderProducts;
    window.loadProducts = loadProducts;
    window.toggleProductCard = toggleProductCard;
    window.selectProductColor = selectProductColor;
    window.selectProductStorage = selectProductStorage;
    window.addCustomAccessory = addCustomAccessory;
    
    // Nuove funzioni configuratore dinamico
    window.calculateConfiguredPrice = calculateConfiguredPrice;
    window.getAvailableRamOptions = getAvailableRamOptions;
    window.getAvailableStorageOptions = getAvailableStorageOptions;
    window.selectChipVariant = selectChipVariant;
    window.selectRamOption = selectRamOption;
    window.selectStorageOption = selectStorageOption;
    window.buildConfigSummary = buildConfigSummary;

    // Cart
    window.cart = cart;
    window.renderCart = renderCart;
    window.clearCart = clearCart;
    window.clearCartSilent = clearCartSilent;
    window.updateCartBadge = updateCartBadge;
    window.addToCart = (productId) => addToCartInternal(productId, window.products);
    window.addConfiguredToCart = (productId) => addConfiguredToCartInternal(productId, window.products);
    window.removeFromCart = removeFromCart;
    window.increaseQuantity = increaseQuantity;
    window.decreaseQuantity = decreaseQuantity;

    // Orders
    window.savedOrders = savedOrders;
    window.openOrderModal = openOrderModal;
    window.closeOrderModal = closeOrderModal;
    window.saveOrder = saveOrder;
    window.deleteOrder = deleteOrder;
    window.exportOrderPDF = exportOrderPDF;
    window.renderSavedOrders = renderSavedOrders;

    // Orders - New Features (exposed as window.orders object for ES Module scope)
    window.orders = {
        exportOrdersToCSV,
        previewOrderPDF,
        loadOrderToCart,
        closePDFPreview,
        exportOrderPDF,
        deleteOrder,
        resetEditMode
    };

    // Pricing
    window.openPriceManagement = () => openPriceManagement(userRole);
    window.closePriceManagement = closePriceManagement;
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

    // UI
    window.showNotification = showNotification;
    window.toggleDarkMode = toggleDarkMode;

    // Utils
    window.scrollToAddProduct = scrollToAddProduct;
    window.scrollToCart = scrollToCart;
}

/**
 * Inizializzazione al caricamento DOM
 */
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Render App Layout
    renderApplication();

    // 2. Inizializza stili notifiche e dark mode
    initNotificationStyles();
    initDarkMode();

    // 3. Espone variabili globalmente
    exposeGlobals();

    // 4. Setup event listeners (ORA GLI ELEMENTI ESISTONO)
    setupAllEventListeners();

    // 5. Verifica autenticazione
    await checkAuth();

    // Listener per cambiamenti autenticazione
    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT') {
            isAppInitialized = false; // Reset flag al logout
            window.cart = [];
            showLoginScreen();
        } else if (event === 'SIGNED_IN' && session && !isAppInitialized) {
            // Inizializza solo se non già inizializzato
            window.currentUser = session.user;
            await initializeApp();
        }
    });
});