/**
 * @fileoverview Entry point principale dell'applicazione Ipermela Store
 * @module app
 */

// Import configurazione
import { supabase } from './config.js';

// Import autenticazione
import {
    currentUser,
    userRole,
    checkAuth,
    handleLogin,
    handleLogout,
    showLoginScreen,
    showApp,
    updateUIBasedOnRole
} from './auth.js';

// Import gestione prodotti
import {
    products,
    loadProducts,
    renderProducts,
    currentFilter,
    currentSubcategory,
    searchQuery,
    setCurrentFilter,
    setCurrentSubcategory,
    setSearchQuery,
    toggleProductCard,
    selectProductColor,
    selectProductStorage,
    addCustomAccessory,
    // Nuove funzioni per configuratore dinamico
    calculateConfiguredPrice,
    getAvailableRamOptions,
    getAvailableStorageOptions,
    selectChipVariant,
    selectRamOption,
    selectStorageOption,
    buildConfigSummary
} from './products.js';

// Import gestione carrello
import {
    cart,
    renderCart,
    clearCart,
    clearCartSilent,
    addToCart as addToCartInternal,
    addConfiguredToCart as addConfiguredToCartInternal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
} from './cart.js';

// Import gestione ordini
import {
    savedOrders,
    loadOrders,
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
    resetEditMode
} from './orders.js';

// Import gestione prezzi
import {
    loadCustomPrices,
    openPriceManagement,
    closePriceManagement,
    renderPriceManagement,
    filterPriceList,
    updatePriceSearch,
    updatePriceFilter,
    savePriceChange,
    resetPrice,
    resetAllPrices,
    saveAllPrices,
    updatePriceInput,
    priceFilter,
    priceSearchQuery
} from './pricing.js';

// Import UI
import { showNotification, initNotificationStyles, initDarkMode, toggleDarkMode, createDarkModeToggle } from './ui.js';

// Import utils
import {
    scrollToAddProduct,
    scrollToCart,
    updateCartBadge,
    setupScrollToTop
} from './utils.js';

/**
 * Flag per tracciare se l'app è già stata inizializzata
 * Previene doppie inizializzazioni dal listener auth state change
 */
let isAppInitialized = false;

/**
 * Inizializza l'applicazione dopo il login
 * 🔧 BUG FIX: Aggiunto flag per prevenire doppia inizializzazione
 */
async function initializeApp() {
    // Previeni doppia inizializzazione
    if (isAppInitialized) {
        console.log('App già inizializzata, skip...');
        return;
    }

    showNotification('Caricamento dati dal cloud...', 'info');

    try {
        // Aggiorna variabili globali dopo login (per permessi prezzi, etc.)
        window.currentUser = currentUser;
        window.userRole = userRole;

        await loadProducts();
        // Assicurati che window.products sia aggiornato prima di loadCustomPrices
        window.products = products;
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
        // Non marcare come inizializzato in caso di errore
    }
}

/**
 * Setup di tutti gli event listeners dell'applicazione
 */
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Logout buttons
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', handleLogout);
    }

    // Header buttons
    const priceManagementBtn = document.getElementById('price-management-btn');
    if (priceManagementBtn) {
        priceManagementBtn.addEventListener('click', () => openPriceManagement(userRole));
    }

    const quickAddBtn = document.getElementById('quick-add-btn');
    if (quickAddBtn) {
        quickAddBtn.addEventListener('click', scrollToAddProduct);
    }

    const quickCartBtn = document.getElementById('quick-cart-btn');
    if (quickCartBtn) {
        quickCartBtn.addEventListener('click', scrollToCart);
    }

    // Mobile menu
    setupMobileMenu();

    // Price management
    setupPriceManagement();

    // Search and filters
    setupSearchAndFilters();

    // Custom accessory
    setupCustomAccessory();

    // Order modal
    setupOrderModal();

    // PDF Preview modal
    setupPDFPreviewModal();

    // Scroll to top button
    setupScrollToTop();
}

/**
 * Setup menu mobile
 */
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDropdown = document.getElementById('mobile-dropdown');

    if (!mobileMenuBtn || !mobileDropdown) return;

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!mobileDropdown.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileDropdown.classList.add('hidden');
        }
    });

    document.querySelectorAll('[data-action]').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            mobileDropdown.classList.add('hidden');

            if (action === 'price-management') {
                openPriceManagement(userRole);
            } else if (action === 'quick-add') {
                scrollToAddProduct();
            } else if (action === 'quick-cart') {
                scrollToCart();
            }
        });
    });
}

/**
 * Setup gestione prezzi event listeners
 */
function setupPriceManagement() {
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
 * Setup ricerca e filtri prodotti
 */
function setupSearchAndFilters() {
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
}

/**
 * Setup custom accessory button
 */
function setupCustomAccessory() {
    const addCustomBtn = document.getElementById('add-custom-btn');
    if (addCustomBtn) {
        addCustomBtn.addEventListener('click', addCustomAccessory);
    }
}

/**
 * Setup modal ordini
 */
function setupOrderModal() {
    // Bottone "Salva Ordine" nel carrello - apre il modal
    const saveOrderBtn = document.getElementById('save-order-btn');
    if (saveOrderBtn) {
        saveOrderBtn.addEventListener('click', openOrderModal);
    }

    // Bottone "Conferma Ordine" nel modal - salva effettivamente
    const confirmOrderBtn = document.getElementById('confirm-order-btn');
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener('click', saveOrder);
    }

    const closeOrderBtn = document.getElementById('close-order-modal');
    if (closeOrderBtn) {
        closeOrderBtn.addEventListener('click', closeOrderModal);
    }

    // Bottone "Svuota Carrello"
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    // Bottone "Esporta CSV"
    const exportCSVBtn = document.getElementById('export-csv-btn');
    if (exportCSVBtn) {
        exportCSVBtn.addEventListener('click', exportOrdersToCSV);
    }
}

/**
 * Setup PDF Preview Modal event listeners
 */
function setupPDFPreviewModal() {
    // Close buttons
    const closePDFPreviewBtn = document.getElementById('close-pdf-preview');
    if (closePDFPreviewBtn) {
        closePDFPreviewBtn.addEventListener('click', closePDFPreview);
    }

    const closePreviewBtn = document.getElementById('close-preview-btn');
    if (closePreviewBtn) {
        closePreviewBtn.addEventListener('click', closePDFPreview);
    }

    // Download PDF button
    const downloadPDFBtn = document.getElementById('download-pdf-btn');
    if (downloadPDFBtn) {
        downloadPDFBtn.addEventListener('click', () => {
            const orderId = window.currentPreviewOrderId;
            if (orderId) {
                exportOrderPDF(orderId);
            }
        });
    }

    // Edit Order button
    const editOrderBtn = document.getElementById('edit-order-btn');
    if (editOrderBtn) {
        editOrderBtn.addEventListener('click', () => {
            const orderId = window.currentPreviewOrderId;
            if (orderId) {
                loadOrderToCart(orderId);
            }
        });
    }
}

/**
 * Espone funzioni e variabili globalmente per compatibilità con onclick inline
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

    // UI
    window.showNotification = showNotification;
    window.toggleDarkMode = toggleDarkMode;

    // Utils
    window.scrollToAddProduct = scrollToAddProduct;
    window.scrollToCart = scrollToCart;

    // State variables
    window.currentFilter = currentFilter;
    window.currentSubcategory = currentSubcategory;
    window.searchQuery = searchQuery;
    window.priceFilter = priceFilter;
    window.priceSearchQuery = priceSearchQuery;
}

/**
 * Inizializzazione al caricamento DOM
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Inizializza stili notifiche
    initNotificationStyles();

    // Inizializza Dark Mode
    initDarkMode();

    // Espone variabili globalmente
    exposeGlobals();

    // Setup event listeners
    setupEventListeners();

    // Verifica autenticazione
    await checkAuth();

    // Listener per cambiamenti autenticazione
    // 🔧 BUG FIX: Previene doppia inizializzazione con flag isAppInitialized
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

// Export per uso come modulo (se necessario)
export {
    initializeApp,
    setupEventListeners,
    exposeGlobals
};
