// ===== CONFIGURAZIONE SUPABASE =====
const SUPABASE_URL = 'https://prldireomgijzfppeunp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBybGRpcmVvbWdpanpmcHBldW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NDgwOTMsImV4cCI6MjA3OTIyNDA5M30.ur9sD-Q9iYsim4R_TcGsuEOuZNb2sMG0FuLnsrXRG5Y';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== VARIABILI GLOBALI =====
let currentUser = null;
let userRole = null;

// Catalogo Prodotti Predefiniti
let products = [
    // iPhone 17 Series
    { id: 1, name: 'iPhone 17 Pro Max', price: 1339, category: 'iphone', icon: '📱' },
    { id: 2, name: 'iPhone 17 Pro', price: 1339, category: 'iphone', icon: '📱' },
    { id: 3, name: 'iPhone Air', price: 1239, category: 'iphone', icon: '📱' },
    { id: 4, name: 'iPhone 17', price: 979, category: 'iphone', icon: '📱' },

    // iPhone 16 Series
    { id: 5, name: 'iPhone 16 Plus', price: 879, category: 'iphone', icon: '📱' },
    { id: 6, name: 'iPhone 16', price: 879, category: 'iphone', icon: '📱' },
    { id: 7, name: 'iPhone 16e', price: 729, category: 'iphone', icon: '📱' },

    // MacBook Air - M4
    { id: 100, name: 'MacBook Air 13" M4 - 10C CPU/8C GPU, 16GB, 256GB', price: 1199, category: 'mac', subcategory: 'macbook-air', icon: '💻' },
    { id: 101, name: 'MacBook Air 13" M4 - 10C CPU/10C GPU, 16GB, 512GB', price: 1449, category: 'mac', subcategory: 'macbook-air', icon: '💻' },
    { id: 102, name: 'MacBook Air 13" M4 - 10C CPU/10C GPU, 24GB, 512GB', price: 1699, category: 'mac', subcategory: 'macbook-air', icon: '💻' },
    { id: 103, name: 'MacBook Air 15" M4 - 10C CPU/10C GPU, 16GB, 256GB', price: 1499, category: 'mac', subcategory: 'macbook-air', icon: '💻' },
    { id: 104, name: 'MacBook Air 15" M4 - 10C CPU/10C GPU, 16GB, 512GB', price: 1749, category: 'mac', subcategory: 'macbook-air', icon: '💻' },
    { id: 105, name: 'MacBook Air 15" M4 - 10C CPU/10C GPU, 24GB, 512GB', price: 1999, category: 'mac', subcategory: 'macbook-air', icon: '💻' },

    // MacBook Pro 14" - M5 e M4 PRO/MAX
    { id: 110, name: 'MacBook Pro 14" M5 - 10C CPU/10C GPU, 16GB, 512GB', price: 1899, category: 'mac', subcategory: 'macbook-pro', icon: '💻' },
    { id: 111, name: 'MacBook Pro 14" M5 - 10C CPU/10C GPU, 16GB, 1TB', price: 2149, category: 'mac', subcategory: 'macbook-pro', icon: '💻' },
    { id: 112, name: 'MacBook Pro 14" M5 - 10C CPU/10C GPU, 24GB, 1TB', price: 2399, category: 'mac', subcategory: 'macbook-pro', icon: '💻' },
    { id: 113, name: 'MacBook Pro 14" M4 PRO - 12C CPU/16C GPU, 24GB, 512GB', price: 2449, category: 'mac', subcategory: 'macbook-pro', icon: '💻' },
    { id: 114, name: 'MacBook Pro 14" M4 PRO - 14C CPU/20C GPU, 24GB, 1TB', price: 2949, category: 'mac', subcategory: 'macbook-pro', icon: '💻' },
    { id: 115, name: 'MacBook Pro 14" M4 MAX - 14C CPU/32C GPU, 36GB, 1TB', price: 3949, category: 'mac', subcategory: 'macbook-pro', icon: '💻' },

    // MacBook Pro 16" - M4 PRO/MAX
    { id: 120, name: 'MacBook Pro 16" M4 PRO - 14C CPU/20C GPU, 24GB, 512GB', price: 2946, category: 'mac', subcategory: 'macbook-pro', icon: '💻' },
    { id: 121, name: 'MacBook Pro 16" M4 PRO - 14C CPU/20C GPU, 48GB, 512GB', price: 3449, category: 'mac', subcategory: 'macbook-pro', icon: '💻' },
    { id: 122, name: 'MacBook Pro 16" M4 MAX - 14C CPU/32C GPU, 36GB, 1TB', price: 4249, category: 'mac', subcategory: 'macbook-pro', icon: '💻' },
    { id: 123, name: 'MacBook Pro 16" M4 MAX - 16C CPU/40C GPU, 48GB, 1TB', price: 4849, category: 'mac', subcategory: 'macbook-pro', icon: '💻' },

    // iMac 24" - M4
    { id: 130, name: 'iMac 24" M4 - 8C CPU/8C GPU, 16GB, 256GB', price: 1579, category: 'mac', subcategory: 'imac', icon: '🖥️' },
    { id: 131, name: 'iMac 24" M4 - 10C CPU/10C GPU, 16GB, 256GB', price: 1829, category: 'mac', subcategory: 'imac', icon: '🖥️' },
    { id: 132, name: 'iMac 24" M4 - 10C CPU/10C GPU, 16GB, 512GB', price: 2079, category: 'mac', subcategory: 'imac', icon: '🖥️' },
    { id: 133, name: 'iMac 24" M4 - 10C CPU/10C GPU, 24GB, 512GB', price: 2329, category: 'mac', subcategory: 'imac', icon: '🖥️' },

    // Mac mini - M4
    { id: 140, name: 'Mac mini M4 - 10C CPU/10C GPU, 16GB, 256GB', price: 779, category: 'mac', subcategory: 'mac-mini', icon: '🖥️' },
    { id: 141, name: 'Mac mini M4 - 10C CPU/10C GPU, 16GB, 512GB', price: 1029, category: 'mac', subcategory: 'mac-mini', icon: '🖥️' },
    { id: 142, name: 'Mac mini M4 - 10C CPU/10C GPU, 24GB, 512GB', price: 1279, category: 'mac', subcategory: 'mac-mini', icon: '🖥️' },
    { id: 143, name: 'Mac mini M4 PRO - 12C CPU/16C GPU, 24GB, 512GB', price: 1779, category: 'mac', subcategory: 'mac-mini', icon: '🖥️' },

    // Mac Studio
    { id: 150, name: 'Mac Studio M4 MAX - 14C CPU/32C GPU, 36GB, 512GB', price: 2399, category: 'mac', subcategory: 'mac-studio', icon: '🖥️' },
    { id: 151, name: 'Mac Studio M3 ULTRA - 28C CPU/60C GPU, 96GB, 1TB', price: 4949, category: 'mac', subcategory: 'mac-studio', icon: '🖥️' },

    // iPad
    { id: 200, name: 'iPad Pro 13" (M5)', price: 1119, category: 'ipad', icon: '📲' },
    { id: 201, name: 'iPad Pro 11" (M5)', price: 1119, category: 'ipad', icon: '📲' },
    { id: 202, name: 'iPad Air 13"', price: 669, category: 'ipad', icon: '📲' },
    { id: 203, name: 'iPad Air 11"', price: 669, category: 'ipad', icon: '📲' },
    { id: 204, name: 'iPad 11"', price: 389, category: 'ipad', icon: '📲' },
    { id: 205, name: 'iPad mini', price: 559, category: 'ipad', icon: '📲' },

    // Accessori - AirPods
    { id: 300, name: 'AirPods Pro 3', price: 249, category: 'accessori', icon: '🎧' },
    { id: 301, name: 'AirPods 4 con ANC', price: 199, category: 'accessori', icon: '🎧' },
    { id: 302, name: 'AirPods Max', price: 579, category: 'accessori', icon: '🎧' },

    // Accessori - Apple Watch
    { id: 310, name: 'Apple Watch Series 10', price: 449, category: 'accessori', icon: '⌚' },
    { id: 311, name: 'Apple Watch SE', price: 279, category: 'accessori', icon: '⌚' },
    { id: 312, name: 'Apple Watch Ultra 2', price: 899, category: 'accessori', icon: '⌚' },

    // Accessori - Input
    { id: 320, name: 'Magic Keyboard', price: 109, category: 'accessori', icon: '⌨️' },
    { id: 321, name: 'Magic Mouse', price: 89, category: 'accessori', icon: '🖱️' },
    { id: 322, name: 'Magic Trackpad', price: 149, category: 'accessori', icon: '🖱️' },
    { id: 323, name: 'Apple Pencil Pro', price: 149, category: 'accessori', icon: '✏️' },
    { id: 324, name: 'Apple Pencil (USB-C)', price: 89, category: 'accessori', icon: '✏️' },

    // Accessori - Vari
    { id: 330, name: 'AirTag', price: 39, category: 'accessori', icon: '📍' },
    { id: 331, name: 'AirTag (Confezione da 4)', price: 129, category: 'accessori', icon: '📍' },
    { id: 332, name: 'Custodia iPhone MagSafe', price: 59, category: 'accessori', icon: '📱' },
    { id: 333, name: 'Caricatore MagSafe', price: 49, category: 'accessori', icon: '🔌' },
    { id: 334, name: 'Cavo USB-C (2m)', price: 35, category: 'accessori', icon: '🔌' },
    { id: 335, name: 'HomePod mini', price: 109, category: 'accessori', icon: '🔊' },
    { id: 336, name: 'HomePod', price: 349, category: 'accessori', icon: '🔊' },
];

// Stato Applicazione
let cart = [];
let currentFilter = 'all';
let currentSubcategory = 'all';
let searchQuery = '';
let savedOrders = [];
let nextProductId = 400;
let priceFilter = 'all';
let priceSearchQuery = '';
let originalPrices = {};
let modifiedPrices = {};

// ===== AUTENTICAZIONE =====

// Verifica se l'utente è già loggato al caricamento della pagina
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        currentUser = session.user;
        await getUserRole();
        showApp();
        await initializeApp();
    } else {
        showLoginScreen();
    }
}

// Ottieni il ruolo dell'utente
async function getUserRole() {
    try {
        const { data, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', currentUser.id)
            .single();

        if (error) {
            console.error('Errore ottenimento ruolo:', error);
            console.error('Dettagli errore:', error.message, error.details, error.hint);

            // Se l'utente non ha un ruolo assegnato, creane uno di default
            if (error.code === 'PGRST116') { // Row not found
                console.log('Ruolo non trovato, assegno ruolo operator di default');
                const { error: insertError } = await supabase
                    .from('user_roles')
                    .insert({ user_id: currentUser.id, role: 'operator' });

                if (!insertError) {
                    userRole = 'operator';
                    console.log('Ruolo operator assegnato con successo');
                    return;
                }
            }

            userRole = 'operator'; // Default fallback
            return;
        }

        userRole = data?.role || 'operator';
        console.log('Ruolo utente:', userRole);
    } catch (err) {
        console.error('Errore imprevisto durante ottenimento ruolo:', err);
        userRole = 'operator';
    }
}

// Login con email e password
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showNotification('Inserisci email e password!', 'error');
        return;
    }

    try {
        showNotification('Autenticazione in corso...', 'info');

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error('Errore login:', error);

            // Fornisci messaggi di errore più specifici
            let errorMessage = 'Credenziali non valide!';
            if (error.message.includes('Email not confirmed')) {
                errorMessage = 'Email non ancora confermata. Controlla la tua casella di posta.';
            } else if (error.message.includes('Invalid login credentials')) {
                errorMessage = 'Email o password non corretti. Riprova.';
            } else if (error.message.includes('Too many requests')) {
                errorMessage = 'Troppi tentativi. Attendi qualche minuto e riprova.';
            } else if (error.message) {
                errorMessage = error.message;
            }

            showNotification(errorMessage, 'error');
            return;
        }

        if (!data.user) {
            console.error('Nessun utente restituito dopo il login');
            showNotification('Errore durante il login. Riprova.', 'error');
            return;
        }

        currentUser = data.user;
        console.log('Login effettuato con successo. User ID:', currentUser.id);

        await getUserRole();
        showApp();
        await initializeApp();
        showNotification('Login effettuato! ✓', 'success');
    } catch (err) {
        console.error('Errore imprevisto durante login:', err);
        showNotification('Errore durante il login: ' + err.message, 'error');
    }
}

// Logout
async function handleLogout() {
    if (!confirm('Sei sicuro di voler uscire?')) {
        return;
    }

    try {
        await supabase.auth.signOut();
        currentUser = null;
        userRole = null;
        cart = [];
        showLoginScreen();
        showNotification('Logout effettuato', 'success');
    } catch (err) {
        console.error('Errore logout:', err);
        showNotification('Errore durante il logout', 'error');
    }
}

// Mostra schermata di login
function showLoginScreen() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
}

// Mostra app principale
function showApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';

    // Mostra email utente nell'header
    const userEmailSpan = document.getElementById('user-email');
    if (userEmailSpan && currentUser) {
        userEmailSpan.textContent = currentUser.email;
    }

    // Mostra/nascondi pulsante gestione prezzi in base al ruolo
    updateUIBasedOnRole();
}

// Aggiorna UI in base al ruolo utente
function updateUIBasedOnRole() {
    const priceManagementBtn = document.getElementById('price-management-btn');
    const mobilePriceItem = document.querySelector('[data-action="price-management"]');

    // Solo admin e operator possono modificare i prezzi
    if (userRole === 'admin' || userRole === 'operator') {
        if (priceManagementBtn) priceManagementBtn.classList.remove('hidden');
        if (mobilePriceItem) mobilePriceItem.classList.remove('hidden');
    } else {
        if (priceManagementBtn) priceManagementBtn.classList.add('hidden');
        if (mobilePriceItem) mobilePriceItem.classList.add('hidden');
    }
}

// Inizializzazione App (dopo il login)
async function initializeApp() {
    showNotification('Caricamento dati dal cloud...', 'info');
    await loadProducts();
    await loadCustomPrices();
    renderProducts();
    renderCart();
    await renderSavedOrders();
    showNotification('Dati caricati! ✓', 'success');
}

// ===== INIZIALIZZAZIONE =====
document.addEventListener('DOMContentLoaded', async () => {
    setupEventListeners();
    await checkAuth();

    // Ascolta i cambiamenti di autenticazione
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
            showLoginScreen();
        } else if (event === 'SIGNED_IN' && session) {
            currentUser = session.user;
            getUserRole().then(() => {
                showApp();
                initializeApp();
            });
        }
    });
});

// ===== CARICA PRODOTTI =====
async function loadProducts() {
    try {
        const { data, error } = await supabase
            .from('custom_products')
            .select('*');

        if (error) {
            console.error('Errore caricamento prodotti:', error);
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
        console.error('Errore:', err);
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Mobile logout
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', handleLogout);
    }

    // Pulsanti Header Desktop
    const priceManagementBtn = document.getElementById('price-management-btn');
    if (priceManagementBtn) {
        priceManagementBtn.addEventListener('click', openPriceManagement);
    }

    const quickAddBtn = document.getElementById('quick-add-btn');
    if (quickAddBtn) {
        quickAddBtn.addEventListener('click', scrollToAddProduct);
    }

    const quickCartBtn = document.getElementById('quick-cart-btn');
    if (quickCartBtn) {
        quickCartBtn.addEventListener('click', scrollToCart);
    }

    // Menu Mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDropdown = document.getElementById('mobile-dropdown');

    if (mobileMenuBtn && mobileDropdown) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileDropdown.classList.toggle('hidden');
        });

        // Chiudi menu mobile al click fuori
        document.addEventListener('click', (e) => {
            if (!mobileDropdown.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileDropdown.classList.add('hidden');
            }
        });

        // Azioni menu mobile
        document.querySelectorAll('[data-action]').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = item.dataset.action;
                mobileDropdown.classList.add('hidden');

                if (action === 'price-management') {
                    openPriceManagement();
                } else if (action === 'quick-add') {
                    scrollToAddProduct();
                } else if (action === 'quick-cart') {
                    scrollToCart();
                }
            });
        });
    }

    // Gestione Prezzi
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

    // Ricerca gestione prezzi
    const priceSearchInput = document.getElementById('price-search-input');
    if (priceSearchInput) {
        priceSearchInput.addEventListener('input', (e) => {
            priceSearchQuery = e.target.value.toLowerCase();
            renderPriceTable();
        });
    }

    // Filtri categoria gestione prezzi
    document.querySelectorAll('.price-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.price-category-btn').forEach(b => {
                b.classList.remove('bg-orange-500', 'text-white', 'border-orange-500', 'shadow-md');
                b.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
            });
            btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
            btn.classList.add('bg-orange-500', 'text-white', 'border-orange-500', 'shadow-md');
            priceFilter = btn.dataset.category;
            renderPriceTable();
        });
    });

    // Barra di ricerca
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderProducts();
        });
    }

    // Filtri categoria principale
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('bg-apple-blue', 'text-white', 'border-apple-blue');
                b.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
            });
            btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
            btn.classList.add('bg-apple-blue', 'text-white', 'border-apple-blue');
            currentFilter = btn.dataset.category;
            currentSubcategory = 'all';

            const macSubcategories = document.getElementById('mac-subcategories');
            if (macSubcategories) {
                if (currentFilter === 'mac') {
                    macSubcategories.classList.remove('hidden');
                } else {
                    macSubcategories.classList.add('hidden');
                }
            }

            renderProducts();
        });
    });

    // Filtri sottocategorie Mac
    document.querySelectorAll('.subcategory-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.subcategory-btn').forEach(b => {
                b.classList.remove('bg-apple-blue', 'text-white', 'border-apple-blue', 'shadow-md');
                b.classList.add('bg-white', 'text-apple-blue', 'border-blue-200');
            });
            btn.classList.remove('bg-white', 'text-apple-blue', 'border-blue-200');
            btn.classList.add('bg-apple-blue', 'text-white', 'border-apple-blue', 'shadow-md');
            currentSubcategory = btn.dataset.subcategory;
            renderProducts();
        });
    });

    // Aggiungi accessorio personalizzato
    const addCustomBtn = document.getElementById('add-custom-btn');
    if (addCustomBtn) {
        addCustomBtn.addEventListener('click', addCustomAccessory);
    }

    // Azioni carrello
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    const saveOrderBtn = document.getElementById('save-order-btn');
    if (saveOrderBtn) {
        saveOrderBtn.addEventListener('click', openOrderModal);
    }

    // Modal ordine
    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeOrderModal);
    }

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeOrderModal();
        });
    }

    // Conferma ordine
    const confirmOrderBtn = document.getElementById('confirm-order-btn');
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener('click', saveOrder);
    }

    // Export all orders button - PDF
    const exportAllOrdersBtn = document.getElementById('export-all-orders-btn');
    if (exportAllOrdersBtn) {
        exportAllOrdersBtn.addEventListener('click', generateAllOrdersPDF);
    }
}

// ===== UTILITY FUNCTIONS =====

function scrollToAddProduct() {
    const customAccessorySection = document.querySelector('.custom-accessory');
    if (customAccessorySection) {
        customAccessorySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            const customNameInput = document.getElementById('custom-name');
            if (customNameInput) customNameInput.focus();
        }, 500);
    }
}

function scrollToCart() {
    const cartSection = document.querySelector('.cart-section');
    if (cartSection) {
        cartSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = totalItems;
        if (totalItems > 0) {
            badge.style.transform = 'scale(1.3)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 200);
        }
    }

    const badgeMobile = document.getElementById('cart-count-mobile');
    if (badgeMobile) {
        badgeMobile.textContent = totalItems;
    }
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
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

    const getCategoryInfo = (category) => {
        const categories = {
            'iphone': { label: 'iPhone', color: 'bg-purple-100 text-purple-700 border-purple-200' },
            'mac': { label: 'Mac', color: 'bg-blue-100 text-blue-700 border-blue-200' },
            'ipad': { label: 'iPad', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
            'accessori': { label: 'Accessori', color: 'bg-green-100 text-green-700 border-green-200' }
        };
        return categories[category] || { label: category, color: 'bg-gray-100 text-gray-700 border-gray-200' };
    };

    grid.innerHTML = filteredProducts.map(product => {
        const categoryInfo = getCategoryInfo(product.category);
        return `
        <div class="group relative bg-white rounded-2xl overflow-hidden border-2 border-gray-100 transition-all duration-300 hover:border-apple-blue hover:shadow-2xl hover:-translate-y-1" data-id="${product.id}">
            <!-- Category Badge -->
            <div class="absolute top-3 left-3 z-10">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${categoryInfo.color} backdrop-blur-sm bg-opacity-90">
                    ${categoryInfo.label}
                </span>
            </div>

            <!-- Product Image/Icon Area -->
            <div class="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center h-48 group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300">
                <div class="text-7xl transform group-hover:scale-110 transition-transform duration-300">
                    ${product.icon}
                </div>
                <!-- Quick View Badge on Hover -->
                <div class="absolute inset-0 bg-apple-blue/0 group-hover:bg-apple-blue/5 transition-all duration-300"></div>
            </div>

            <!-- Product Info -->
            <div class="p-5">
                <!-- Product Name -->
                <h3 class="font-semibold text-gray-900 mb-3 min-h-[2.5rem] line-clamp-2 text-base leading-tight">
                    ${product.name}
                </h3>

                <!-- Price and Action -->
                <div class="flex items-center justify-between gap-3 mb-3">
                    <div class="flex flex-col">
                        <span class="text-xs text-gray-500 mb-0.5">Prezzo</span>
                        <span class="text-2xl font-bold text-apple-blue">€${product.price.toFixed(2)}</span>
                    </div>
                    <button
                        class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-apple-blue text-white rounded-xl transition-all duration-300 hover:bg-apple-darkblue hover:scale-110 hover:shadow-lg active:scale-95"
                        onclick="addToCart(${product.id})"
                        title="Aggiungi al carrello"
                    >
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>

                <!-- Full Width Add Button (visible on mobile/tablet) -->
                <button
                    class="w-full py-2.5 bg-gradient-to-r from-apple-blue to-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 hover:from-apple-darkblue hover:to-indigo-700 hover:shadow-lg flex items-center justify-center gap-2 lg:hidden"
                    onclick="addToCart(${product.id})"
                >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Aggiungi al carrello</span>
                </button>
            </div>
        </div>
        `;
    }).join('');
}

// ===== CARRELLO =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    renderCart();
    showNotification('Prodotto aggiunto al carrello! ✓');
}

function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    if (!cartItemsDiv) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartItemCount = document.getElementById('cart-item-count');
    if (cartItemCount) {
        cartItemCount.textContent = `${totalItems} ${totalItems === 1 ? 'articolo' : 'articoli'}`;
    }

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <p class="text-gray-500 font-medium mb-1">Carrello vuoto</p>
                <p class="text-sm text-gray-400">Aggiungi prodotti per iniziare</p>
            </div>
        `;
        updateCartSummary(0, 0, 0);
        updateCartBadge();
        return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-100 transition-all duration-300 hover:border-apple-blue hover:shadow-md">
            <!-- Remove button (absolute top-right) -->
            <button
                class="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-white border border-gray-200 text-gray-400 rounded-lg transition-all duration-300 hover:bg-apple-red hover:text-white hover:border-apple-red hover:scale-110 opacity-0 group-hover:opacity-100"
                onclick="removeFromCart(${item.id})"
                title="Rimuovi"
            >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Product Info -->
            <div class="mb-3 pr-6">
                <div class="font-semibold text-gray-900 mb-1 text-sm line-clamp-2">${item.name}</div>
                <div class="flex items-baseline gap-2">
                    <span class="text-xs text-gray-500">€${item.price.toFixed(2)}</span>
                    <span class="text-xs text-gray-400">× ${item.quantity}</span>
                    <span class="text-sm font-bold text-apple-blue ml-auto">€${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>

            <!-- Quantity Controls -->
            <div class="flex items-center gap-2">
                <button
                    class="flex-1 h-9 flex items-center justify-center bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-bold transition-all duration-300 hover:border-apple-blue hover:bg-apple-blue hover:text-white active:scale-95"
                    onclick="decreaseQuantity(${item.id})"
                >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M20 12H4" />
                    </svg>
                </button>
                <div class="flex items-center justify-center min-w-[60px] h-9 bg-white border-2 border-gray-200 rounded-lg">
                    <span class="font-bold text-gray-900">${item.quantity}</span>
                </div>
                <button
                    class="flex-1 h-9 flex items-center justify-center bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-bold transition-all duration-300 hover:border-apple-blue hover:bg-apple-blue hover:text-white active:scale-95"
                    onclick="increaseQuantity(${item.id})"
                >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.22;
    const total = subtotal + tax;

    updateCartSummary(subtotal, tax, total);
    updateCartBadge();
}

function updateCartSummary(subtotal, tax, total) {
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `€${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `€${total.toFixed(2)}`;
}

function increaseQuantity(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity++;
        renderCart();
    }
}

function decreaseQuantity(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            removeFromCart(productId);
        }
        renderCart();
    }
}

// ===== GESTIONE ORDINI =====

function clearOrderForm() {
    const modal = document.getElementById('order-modal');
    if (modal) {
        modal.classList.add('hidden');
    }

    const customerName = document.getElementById('customer-name');
    const customerEmail = document.getElementById('customer-email');
    const customerPhone = document.getElementById('customer-phone');
    const orderNotes = document.getElementById('order-notes');

    if (customerName) customerName.value = '';
    if (customerEmail) customerEmail.value = '';
    if (customerPhone) customerPhone.value = '';
    if (orderNotes) orderNotes.value = '';
}

async function saveOrder() {
    const customerNameInput = document.getElementById('customer-name');
    const customerEmailInput = document.getElementById('customer-email');
    const customerPhoneInput = document.getElementById('customer-phone');
    const orderNotesInput = document.getElementById('order-notes');

    if (!customerNameInput) return;

    const customerName = customerNameInput.value.trim();
    const customerEmail = customerEmailInput?.value.trim() || null;
    const customerPhone = customerPhoneInput?.value.trim() || null;
    const notes = orderNotesInput?.value.trim() || null;

    if (!customerName) {
        alert('Inserisci il nome del cliente!');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.22;
    const total = subtotal + tax;

    const orderId = Date.now();
    const order = {
        id: orderId,
        date: new Date().toLocaleString('it-IT'),
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        items: cart,
        subtotal: subtotal,
        tax: tax,
        total: total,
        notes: notes,
        created_by: currentUser.id
    };

    try {
        showNotification('Salvataggio ordine sul cloud...', 'info');

        const { error } = await supabase
            .from('orders')
            .insert([order]);

        if (error) {
            console.error('Errore:', error);
            alert('Errore nel salvataggio dell\'ordine!');
            return;
        }

        cart = [];
        renderCart();
        await renderSavedOrders();
        closeOrderModal();

        showNotification('Ordine salvato con successo! ✓');
    } catch (err) {
        console.error('Errore:', err);
        alert('Errore nel salvataggio!');
    }
}

async function renderSavedOrders() {
    const ordersDiv = document.getElementById('saved-orders');
    if (!ordersDiv) return;

    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            console.error('Errore:', error);
            ordersDiv.innerHTML = '<div class="empty-message">Errore nel caricamento degli ordini</div>';
            return;
        }

        savedOrders = data || [];

        // Update orders count
        const ordersCount = document.getElementById('orders-count');
        if (ordersCount) {
            ordersCount.textContent = `${savedOrders.length} ${savedOrders.length === 1 ? 'ordine' : 'ordini'}`;
        }

        if (savedOrders.length === 0) {
            ordersDiv.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-5">
                <svg class="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <p class="text-gray-500 text-lg font-medium mb-2">Nessun ordine salvato</p>
            <p class="text-sm text-gray-400">Gli ordini completati appariranno qui</p>
        </div>
    `;
            return;
        }

        ordersDiv.innerHTML = savedOrders.map(order => {
            const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
            return `
    <div class="group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:border-purple-400 hover:shadow-xl hover:-translate-y-1">
        <!-- Order Header -->
        <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div class="flex items-center justify-between text-white">
                <div class="flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span class="font-bold text-lg">#${order.id}</span>
                </div>
                <div class="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    ${itemCount} ${itemCount === 1 ? 'articolo' : 'articoli'}
                </div>
            </div>
        </div>

        <!-- Order Body -->
        <div class="p-5">
            <!-- Date -->
            <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>${order.date}</span>
            </div>

            <!-- Customer Info -->
            <div class="mb-4 p-3 bg-gray-50 rounded-xl space-y-2">
                <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="font-semibold text-gray-900">${order.customer_name}</span>
                </div>
                ${order.customer_email ? `
                    <div class="flex items-center gap-2 text-xs text-gray-600">
                        <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span class="truncate">${order.customer_email}</span>
                    </div>
                ` : ''}
                ${order.customer_phone ? `
                    <div class="flex items-center gap-2 text-xs text-gray-600">
                        <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>${order.customer_phone}</span>
                    </div>
                ` : ''}
            </div>

            <!-- Products List -->
            <div class="mb-4">
                <div class="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Prodotti
                </div>
                <div class="space-y-1.5 max-h-32 overflow-y-auto">
                    ${order.items.map(item => `
                        <div class="flex justify-between items-center text-sm bg-white p-2 rounded-lg border border-gray-100">
                            <span class="text-gray-700 truncate flex-1">${item.name}</span>
                            <div class="flex items-center gap-3 text-xs">
                                <span class="text-gray-500">×${item.quantity}</span>
                                <span class="font-semibold text-gray-900 min-w-[60px] text-right">€${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Notes (if any) -->
            ${order.notes ? `
                <div class="mb-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                    <div class="flex items-start gap-2">
                        <svg class="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <div class="text-xs text-amber-800 flex-1">
                            <span class="font-semibold block mb-1">Note:</span>
                            <span class="italic">${order.notes}</span>
                        </div>
                    </div>
                </div>
            ` : ''}

            <!-- Total -->
            <div class="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-purple-200 mb-4">
                <span class="text-sm font-semibold text-gray-700">Totale</span>
                <span class="text-2xl font-bold text-purple-600">€${parseFloat(order.total).toFixed(2)}</span>
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
                <button
                    class="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    onclick="exportOrderPDF(${order.id})"
                    title="Scarica PDF"
                >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>PDF</span>
                </button>
                ${canDeleteOrder(order) ? `
                    <button
                        class="px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-600 font-medium rounded-xl transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white hover:scale-105 active:scale-95 flex items-center justify-center"
                        onclick="deleteOrder(${order.id})"
                        title="Elimina ordine"
                    >
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                ` : ''}
            </div>
        </div>
    </div>
    `;
        }).join('');
    } catch (err) {
        console.error('Errore:', err);
        ordersDiv.innerHTML = '<div class="col-span-full text-center text-gray-500 py-10">Errore nel caricamento</div>';
    }
}

// Controlla se l'utente può eliminare l'ordine
function canDeleteOrder(order) {
    // Admin può eliminare tutto
    if (userRole === 'admin') return true;
    // Gli altri utenti possono eliminare solo i propri ordini
    return order.created_by === currentUser.id;
}

async function deleteOrder(orderId) {
    if (!confirm('Sei sicuro di voler eliminare questo ordine?')) {
        return;
    }

    try {
        showNotification('Eliminazione dal cloud...', 'info');

        const { error } = await supabase
            .from('orders')
            .delete()
            .eq('id', orderId);

        if (error) {
            console.error('Errore:', error);
            alert('Errore nell\'eliminazione dell\'ordine!');
            return;
        }

        await renderSavedOrders();
        showNotification('Ordine eliminato');
    } catch (err) {
        console.error('Errore:', err);
        alert('Errore nell\'eliminazione!');
    }
}

// Wrapper per export PDF di un singolo ordine
function exportOrderPDF(orderId) {
    const order = savedOrders.find(o => o.id === orderId);
    if (order) {
        generateOrderPDF(order);
    } else {
        showNotification('Ordine non trovato!', 'error');
    }
}

// ===== GESTIONE PREZZI =====

function openPriceManagement() {
    // Solo admin e operator possono modificare i prezzi
    if (userRole !== 'admin' && userRole !== 'operator') {
        showNotification('Non hai i permessi per modificare i prezzi', 'error');
        return;
    }

    showPriceManagement();
}

async function showPriceManagement() {
    await loadCustomPrices();
    const section = document.getElementById('price-management-section');
    if (section) {
        section.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        renderPriceTable();
    }
}

function closePriceManagement() {
    const section = document.getElementById('price-management-section');
    if (section) {
        section.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    priceFilter = 'all';
    priceSearchQuery = '';
    modifiedPrices = {};
}

async function loadCustomPrices() {
    try {
        const { data, error } = await supabase
            .from('product_prices')
            .select('*');

        if (error) {
            console.error('Errore caricamento prezzi:', error);
            return;
        }

        products.forEach(p => {
            if (!originalPrices[p.id]) {
                originalPrices[p.id] = p.price;
            }
        });

        if (data && data.length > 0) {
            data.forEach(priceData => {
                const product = products.find(p => p.id === priceData.product_id);
                if (product) {
                    product.price = parseFloat(priceData.custom_price);
                }
            });
        }
    } catch (err) {
        console.error('Errore:', err);
    }
}

function renderPriceTable() {
    const tbody = document.getElementById('price-table-body');
    if (!tbody) return;

    let filteredProducts = products.filter(p => !p.custom);

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

    const getCategoryInfo = (category) => {
        const categories = {
            'iphone': { label: 'iPhone', color: 'bg-purple-100 text-purple-700 border-purple-200' },
            'mac': { label: 'Mac', color: 'bg-blue-100 text-blue-700 border-blue-200' },
            'ipad': { label: 'iPad', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
            'accessori': { label: 'Accessori', color: 'bg-green-100 text-green-700 border-green-200' }
        };
        return categories[category] || { label: category, color: 'bg-gray-100 text-gray-700 border-gray-200' };
    };

    tbody.innerHTML = filteredProducts.map(product => {
        const originalPrice = originalPrices[product.id] || product.price;
        const currentPrice = product.price;
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
                    class="w-36 pl-8 pr-3 py-2.5 border-2 rounded-xl text-base font-semibold transition-all duration-300 focus:outline-none focus:ring-2 ${hasChanges ? 'border-amber-400 bg-amber-50 text-amber-900 focus:border-amber-500 focus:ring-amber-500/20' : 'border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-orange-500/20'}"
                    value="${pendingPrice !== undefined ? pendingPrice : currentPrice.toFixed(2)}"
                    min="0"
                    step="0.01"
                    data-product-id="${product.id}"
                    onchange="updatePriceInput(${product.id}, this.value)"
                />
            </div>
        </td>

        <!-- Actions -->
        <td class="px-4 py-4">
            <div class="flex items-center justify-center gap-2">
                <button
                    class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg transition-all duration-300 hover:from-green-600 hover:to-emerald-700 hover:shadow-md hover:scale-105 active:scale-95 flex items-center gap-1.5"
                    onclick="savePrice(${product.id})"
                    title="Salva prezzo"
                >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="hidden sm:inline">Salva</span>
                </button>
                <button
                    class="px-3 py-2 bg-white border-2 border-gray-200 text-gray-600 font-medium rounded-lg transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white hover:scale-105 active:scale-95"
                    onclick="resetPrice(${product.id})"
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

function updatePriceInput(productId, value) {
    const price = parseFloat(value);
    if (!isNaN(price) && price >= 0) {
        modifiedPrices[productId] = price;
        renderPriceTable();
    }
}

async function savePrice(productId) {
    let newPrice = modifiedPrices[productId];

    if (newPrice === undefined) {
        const input = document.querySelector(`input[data-product-id="${productId}"]`);
        if (input) {
            const price = parseFloat(input.value);
            if (!isNaN(price) && price >= 0) {
                newPrice = price;
                modifiedPrices[productId] = price;
            } else {
                alert('Inserisci un prezzo valido!');
                return;
            }
        }
    }

    if (newPrice === undefined || newPrice < 0) {
        alert('Inserisci un prezzo valido!');
        return;
    }

    try {
        showNotification('Salvataggio prezzo...', 'info');

        const { error } = await supabase
            .from('product_prices')
            .upsert({
                product_id: productId,
                custom_price: newPrice,
                updated_by: currentUser.id
            }, {
                onConflict: 'product_id'
            });

        if (error) {
            console.error('Errore:', error);
            alert(`Errore nel salvataggio: ${error.message || 'Errore sconosciuto'}`);
            return;
        }

        const product = products.find(p => p.id === productId);
        if (product) {
            product.price = newPrice;
        }

        delete modifiedPrices[productId];
        renderPriceTable();
        renderProducts();
        showNotification('Prezzo aggiornato! ✓');
    } catch (err) {
        console.error('Errore:', err);
        alert(`Errore nel salvataggio: ${err.message || 'Errore sconosciuto'}`);
    }
}

async function resetPrice(productId) {
    if (!confirm('Ripristinare il prezzo originale per questo prodotto?')) {
        return;
    }

    try {
        showNotification('Ripristino prezzo...', 'info');

        const { error } = await supabase
            .from('product_prices')
            .delete()
            .eq('product_id', productId);

        if (error) {
            console.error('Errore:', error);
            alert('Errore nel ripristino!');
            return;
        }

        const product = products.find(p => p.id === productId);
        if (product && originalPrices[productId]) {
            product.price = originalPrices[productId];
        }

        delete modifiedPrices[productId];
        renderPriceTable();
        renderProducts();
        showNotification('Prezzo ripristinato! ✓');
    } catch (err) {
        console.error('Errore:', err);
        alert('Errore nel ripristino!');
    }
}

async function saveAllPrices() {
    const modifiedCount = Object.keys(modifiedPrices).length;

    if (modifiedCount === 0) {
        alert('Non ci sono modifiche da salvare!');
        return;
    }

    if (!confirm(`Salvare ${modifiedCount} modifiche ai prezzi?`)) {
        return;
    }

    try {
        showNotification('Salvataggio modifiche...', 'info');

        const updates = Object.entries(modifiedPrices).map(([productId, price]) => ({
            product_id: parseInt(productId),
            custom_price: price,
            updated_by: currentUser.id
        }));

        const { error } = await supabase
            .from('product_prices')
            .upsert(updates, {
                onConflict: 'product_id'
            });

        if (error) {
            console.error('Errore:', error);
            alert(`Errore nel salvataggio: ${error.message || 'Errore sconosciuto'}`);
            return;
        }

        Object.entries(modifiedPrices).forEach(([productId, price]) => {
            const product = products.find(p => p.id === parseInt(productId));
            if (product) {
                product.price = price;
            }
        });

        modifiedPrices = {};
        renderPriceTable();
        renderProducts();
        showNotification(`${modifiedCount} prezzi aggiornati! ✓`);
    } catch (err) {
        console.error('Errore:', err);
        alert(`Errore nel salvataggio: ${err.message || 'Errore sconosciuto'}`);
    }
}

async function resetAllPrices() {
    if (!confirm('Ripristinare TUTTI i prezzi originali? Questa azione non può essere annullata!')) {
        return;
    }

    try {
        showNotification('Ripristino prezzi...', 'info');

        const { error } = await supabase
            .from('product_prices')
            .delete()
            .neq('product_id', 0);

        if (error) {
            console.error('Errore:', error);
            alert('Errore nel ripristino!');
            return;
        }

        products.forEach(product => {
            if (originalPrices[product.id]) {
                product.price = originalPrices[product.id];
            }
        });

        modifiedPrices = {};
        renderPriceTable();
        renderProducts();
        showNotification('Tutti i prezzi ripristinati! ✓');
    } catch (err) {
        console.error('Errore:', err);
        alert('Errore nel ripristino!');
    }
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'success') {
    const colors = {
        success: '#34c759',
        info: '#007aff',
        error: '#ff3b30'
    };

    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
position: fixed;
top: 20px;
right: 20px;
background: ${colors[type] || colors.success};
color: white;
padding: 15px 25px;
border-radius: 10px;
box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
z-index: 10000;
font-weight: 600;
animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Stili animazione
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
from {
    transform: translateX(400px);
    opacity: 0;
}
to {
    transform: translateX(0);
    opacity: 1;
}
    }
    @keyframes slideOut {
from {
    transform: translateX(0);
    opacity: 1;
}
to {
    transform: translateX(400px);
    opacity: 0;
}
    }
`;
        document.head.appendChild(style);