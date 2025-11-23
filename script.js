// ===== CONFIGURAZIONE SUPABASE =====
const SUPABASE_URL = 'https://prldireomgijzfppeunp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBybGRpcmVvbWdpanpmcHBldW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NDgwOTMsImV4cCI6MjA3OTIyNDA5M30.ur9sD-Q9iYsim4R_TcGsuEOuZNb2sMG0FuLnsrXRG5Y';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
let isAuthenticated = false;
let priceFilter = 'all';
let priceSearchQuery = '';
let originalPrices = {};
let modifiedPrices = {};

// Inizializzazione
document.addEventListener('DOMContentLoaded', async () => {
    showNotification('Caricamento dati dal cloud...', 'info');
    await loadProducts();
    renderProducts();
    renderCart();
    await renderSavedOrders();
    setupEventListeners();
    showNotification('Dati caricati! ✓', 'success');
});

// Carica prodotti personalizzati da Supabase
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
                imageUrl: p.image_url || null,
                custom: true
            }));
            
            products = [...products, ...customProducts];
            nextProductId = Math.max(...products.map(p => p.id)) + 1;
        }
    } catch (err) {
        console.error('Errore:', err);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Pulsanti Header Desktop
    document.getElementById('price-management-btn').addEventListener('click', openPriceManagement);
    document.getElementById('quick-add-btn').addEventListener('click', scrollToAddProduct);
    document.getElementById('quick-cart-btn').addEventListener('click', scrollToCart);

    // Menu Mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileDropdown.classList.toggle('show');
    });

    // Chiudi menu mobile al click fuori
    document.addEventListener('click', (e) => {
        if (!mobileDropdown.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileDropdown.classList.remove('show');
        }
    });

    // Azioni menu mobile
    document.querySelectorAll('.mobile-menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const action = item.dataset.action;
            mobileDropdown.classList.remove('show');
            
            if (action === 'price-management') {
                openPriceManagement();
            } else if (action === 'quick-add') {
                scrollToAddProduct();
            } else if (action === 'quick-cart') {
                scrollToCart();
            }
        });
    });

    // Modal autenticazione
    const authModal = document.getElementById('auth-modal');
    const authCloseBtn = document.getElementById('auth-close');
    const authSubmitBtn = document.getElementById('auth-submit-btn');
    const authPasswordInput = document.getElementById('auth-password');

    authCloseBtn.addEventListener('click', closeAuthModal);
    authSubmitBtn.addEventListener('click', checkPassword);
    authPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target === authModal) closeAuthModal();
    });

    // Gestione Prezzi
    document.getElementById('close-price-management').addEventListener('click', closePriceManagement);
    document.getElementById('save-all-prices-btn').addEventListener('click', saveAllPrices);
    document.getElementById('reset-all-prices-btn').addEventListener('click', resetAllPrices);

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
            document.querySelectorAll('.price-category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
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
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            currentSubcategory = 'all';
            
            // Mostra/nascondi sottocategorie Mac
            const macSubcategories = document.getElementById('mac-subcategories');
            if (macSubcategories) {
                macSubcategories.style.display = currentFilter === 'mac' ? 'flex' : 'none';
            }
            
            renderProducts();
        });
    });

    // Filtri sottocategorie Mac
    document.querySelectorAll('.subcategory-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.subcategory-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSubcategory = btn.dataset.subcategory;
            renderProducts();
        });
    });

    // Aggiungi accessorio personalizzato
    document.getElementById('add-custom-btn').addEventListener('click', addCustomAccessory);

    // Azioni carrello
    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
    document.getElementById('save-order-btn').addEventListener('click', openOrderModal);

    // Modal
    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeOrderModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeOrderModal();
    });

    // Conferma ordine
    document.getElementById('confirm-order-btn').addEventListener('click', saveOrder);
}

// Scroll alla sezione Aggiungi Prodotto
function scrollToAddProduct() {
    const customAccessorySection = document.querySelector('.custom-accessory');
    if (customAccessorySection) {
        customAccessorySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            document.getElementById('custom-name').focus();
        }, 500);
    }
}

// Scroll al Carrello
function scrollToCart() {
    const cartSection = document.querySelector('.cart-section');
    if (cartSection) {
        cartSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Aggiorna Badge Carrello
function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Badge desktop
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
    
    // Badge mobile
    const badgeMobile = document.getElementById('cart-count-mobile');
    if (badgeMobile) {
        badgeMobile.textContent = totalItems;
    }
}

// Renderizza Prodotti
function renderProducts() {
    const grid = document.getElementById('products-grid');
    
    let filteredProducts = products;
    
    // Filtro per categoria principale
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentFilter);
    }
    
    // Filtro per sottocategoria Mac
    if (currentFilter === 'mac' && currentSubcategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.subcategory === currentSubcategory);
    }
    
    // Filtro per ricerca
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchQuery)
        );
    }

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<div class="empty-message">Nessun prodotto trovato</div>';
        return;
    }

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            ${product.imageUrl ? 
                `<div class="product-image-container">
                    <img src="${product.imageUrl}" 
                         alt="${product.name}" 
                         class="product-image"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="product-icon-fallback" style="display: none;">${product.icon}</div>
                 </div>` 
                : 
                `<div class="product-icon">${product.icon}</div>`
            }
            <div class="product-name">${product.name}</div>
            <div class="product-price">€${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Aggiungi al Carrello
            </button>
        </div>
    `).join('');
}

// Aggiungi al Carrello
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

// Renderizza Carrello
function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-message">Carrello vuoto</div>';
        updateCartSummary(0, 0, 0);
        updateCartBadge();
        return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">€${item.price.toFixed(2)} cad.</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
            </div>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.22;
    const total = subtotal + tax;

    updateCartSummary(subtotal, tax, total);
    updateCartBadge();
}

// Aggiorna Riepilogo Carrello
function updateCartSummary(subtotal, tax, total) {
    document.getElementById('subtotal').textContent = `€${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `€${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `€${total.toFixed(2)}`;
}

// Aumenta Quantità
function increaseQuantity(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity++;
        renderCart();
    }
}

// Diminuisci Quantità
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

// Rimuovi dal Carrello
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

// Svuota Carrello
function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Sei sicuro di voler svuotare il carrello?')) {
        cart = [];
        renderCart();
        showNotification('Carrello svuotato');
    }
}

// Aggiungi Accessorio Personalizzato
async function addCustomAccessory() {
    const nameInput = document.getElementById('custom-name');
    const priceInput = document.getElementById('custom-price');
    const imageUrlInput = document.getElementById('custom-image-url');
    
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const imageUrl = imageUrlInput.value.trim();

    if (!name) {
        alert('Inserisci un nome per l\'accessorio!');
        return;
    }

    if (!price || price <= 0) {
        alert('Inserisci un prezzo valido!');
        return;
    }

    const newProduct = {
        id: nextProductId++,
        name: name,
        price: price,
        category: 'accessori',
        icon: '🎁',
        image_url: imageUrl || null
    };

    try {
        showNotification('Salvataggio sul cloud...', 'info');
        
        const { error } = await supabase
            .from('custom_products')
            .insert([newProduct]);

        if (error) {
            console.error('Errore:', error);
            alert('Errore nel salvataggio del prodotto!');
            return;
        }

        products.push({ ...newProduct, imageUrl: imageUrl || null, custom: true });

        nameInput.value = '';
        priceInput.value = '';
        imageUrlInput.value = '';

        if (currentFilter === 'all' || currentFilter === 'accessori') {
            renderProducts();
        }

        showNotification('Accessorio personalizzato aggiunto al catalogo! ✓');
    } catch (err) {
        console.error('Errore:', err);
        alert('Errore nel salvataggio!');
    }
}

// Apri Modal Ordine
function openOrderModal() {
    if (cart.length === 0) {
        alert('Il carrello è vuoto!');
        return;
    }

    document.getElementById('order-modal').style.display = 'block';
}

// Chiudi Modal Ordine
function closeOrderModal() {
    document.getElementById('order-modal').style.display = 'none';
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-email').value = '';
    document.getElementById('customer-phone').value = '';
    document.getElementById('order-notes').value = '';
}

// Salva Ordine
async function saveOrder() {
    const customerName = document.getElementById('customer-name').value.trim();
    const customerEmail = document.getElementById('customer-email').value.trim();
    const customerPhone = document.getElementById('customer-phone').value.trim();
    const notes = document.getElementById('order-notes').value.trim();

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
        customer_email: customerEmail || null,
        customer_phone: customerPhone || null,
        items: cart,
        subtotal: subtotal,
        tax: tax,
        total: total,
        notes: notes || null
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

// Renderizza Ordini Salvati
async function renderSavedOrders() {
    const ordersDiv = document.getElementById('saved-orders');

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

        if (savedOrders.length === 0) {
            ordersDiv.innerHTML = '<div class="empty-message">Nessun ordine salvato</div>';
            return;
        }

        ordersDiv.innerHTML = savedOrders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <span class="order-id">#${order.id}</span>
                    <span class="order-date">${order.date}</span>
                </div>
                <div class="order-customer">
                    <div class="customer-name">👤 ${order.customer_name}</div>
                    ${order.customer_email ? `<div>✉️ ${order.customer_email}</div>` : ''}
                    ${order.customer_phone ? `<div>📞 ${order.customer_phone}</div>` : ''}
                </div>
                <div class="order-items">
                    <strong>Prodotti:</strong>
                    <ul class="order-items-list">
                        ${order.items.map(item => `
                            <li>${item.name} (x${item.quantity}) - €${(item.price * item.quantity).toFixed(2)}</li>
                        `).join('')}
                    </ul>
                </div>
                ${order.notes ? `<div style="margin-top: 10px; color: #666;"><em>Note: ${order.notes}</em></div>` : ''}
                <div class="order-total">Totale: €${parseFloat(order.total).toFixed(2)}</div>
                <button class="delete-order-btn" onclick="deleteOrder(${order.id})">
                    Elimina Ordine
                </button>
            </div>
        `).join('');
    } catch (err) {
        console.error('Errore:', err);
        ordersDiv.innerHTML = '<div class="empty-message">Errore nel caricamento</div>';
    }
}

// Elimina Ordine
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

// Notifica
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

// ===== GESTIONE PREZZI =====

// Apri gestione prezzi
function openPriceManagement() {
    if (!isAuthenticated) {
        document.getElementById('auth-modal').style.display = 'block';
        document.getElementById('auth-password').focus();
    } else {
        showPriceManagement();
    }
}

// Chiudi modal autenticazione
function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
    document.getElementById('auth-password').value = '';
}

// Verifica password
async function checkPassword() {
    const password = document.getElementById('auth-password').value;
    const correctPassword = 'Ipermela-ordini';

    if (password === correctPassword) {
        isAuthenticated = true;
        closeAuthModal();
        await loadCustomPrices();
        showPriceManagement();
        showNotification('Accesso autorizzato! ✓');
    } else {
        alert('Password errata!');
        document.getElementById('auth-password').value = '';
        document.getElementById('auth-password').focus();
    }
}

// Mostra sezione gestione prezzi
async function showPriceManagement() {
    await loadCustomPrices();
    document.getElementById('price-management-section').style.display = 'block';
    document.body.style.overflow = 'hidden';
    renderPriceTable();
}

// Chiudi gestione prezzi
function closePriceManagement() {
    document.getElementById('price-management-section').style.display = 'none';
    document.body.style.overflow = 'auto';
    priceFilter = 'all';
    priceSearchQuery = '';
    modifiedPrices = {};
}

// Carica prezzi personalizzati da Supabase
async function loadCustomPrices() {
    try {
        const { data, error } = await supabase
            .from('product_prices')
            .select('*');

        if (error) {
            console.error('Errore caricamento prezzi:', error);
            return;
        }

        // Salva i prezzi originali
        products.forEach(p => {
            if (!originalPrices[p.id]) {
                originalPrices[p.id] = p.price;
            }
        });

        // Applica i prezzi custom
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

// Renderizza tabella prezzi
function renderPriceTable() {
    const tbody = document.getElementById('price-table-body');
    
    let filteredProducts = products.filter(p => !p.custom);
    
    // Filtro per categoria
    if (priceFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === priceFilter);
    }
    
    // Filtro per ricerca
    if (priceSearchQuery) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(priceSearchQuery)
        );
    }

    if (filteredProducts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-message">Nessun prodotto trovato</td></tr>';
        return;
    }

    tbody.innerHTML = filteredProducts.map(product => {
        const originalPrice = originalPrices[product.id] || product.price;
        const currentPrice = product.price;
        const isModified = originalPrice !== currentPrice;
        const pendingPrice = modifiedPrices[product.id];

        return `
            <tr data-product-id="${product.id}">
                <td class="price-icon">${product.icon}</td>
                <td class="price-product-name">${product.name}</td>
                <td>
                    <span class="price-original">€${originalPrice.toFixed(2)}</span>
                </td>
                <td>
                    <input 
                        type="number" 
                        class="price-input ${pendingPrice !== undefined ? 'modified' : ''}" 
                        value="${pendingPrice !== undefined ? pendingPrice : currentPrice.toFixed(2)}"
                        min="0" 
                        step="0.01"
                        data-product-id="${product.id}"
                        onchange="updatePriceInput(${product.id}, this.value)"
                    />
                </td>
                <td class="price-actions">
                    <button class="price-action-btn save-price-btn" onclick="savePrice(${product.id})">
                        Salva
                    </button>
                    <button class="price-action-btn reset-price-btn" onclick="resetPrice(${product.id})">
                        Reset
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Aggiorna prezzo temporaneo
function updatePriceInput(productId, value) {
    const price = parseFloat(value);
    if (!isNaN(price) && price >= 0) {
        modifiedPrices[productId] = price;
        renderPriceTable();
    }
}

// Salva singolo prezzo
async function savePrice(productId) {
    const newPrice = modifiedPrices[productId];
    
    if (newPrice === undefined) {
        const input = document.querySelector(`input[data-product-id="${productId}"]`);
        if (input) {
            const price = parseFloat(input.value);
            if (!isNaN(price) && price >= 0) {
                modifiedPrices[productId] = price;
            } else {
                alert('Inserisci un prezzo valido!');
                return;
            }
        }
    }

    const finalPrice = modifiedPrices[productId];
    
    if (finalPrice === undefined || finalPrice < 0) {
        alert('Inserisci un prezzo valido!');
        return;
    }

    try {
        showNotification('Salvataggio prezzo...', 'info');

        const { error } = await supabase
            .from('product_prices')
            .upsert({
                product_id: productId,
                custom_price: finalPrice
            }, {
                onConflict: 'product_id'
            });

        if (error) {
            console.error('Errore completo:', error);
            alert(`Errore nel salvataggio: ${error.message || 'Errore sconosciuto'}`);
            return;
        }

        const product = products.find(p => p.id === productId);
        if (product) {
            product.price = finalPrice;
        }

        delete modifiedPrices[productId];
        renderPriceTable();
        renderProducts();
        showNotification('Prezzo aggiornato! ✓');
    } catch (err) {
        console.error('Errore catch:', err);
        alert(`Errore nel salvataggio: ${err.message || 'Errore sconosciuto'}`);
    }
}

// Ripristina prezzo originale
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

// Salva tutti i prezzi modificati
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
            custom_price: price
        }));

        const { error } = await supabase
            .from('product_prices')
            .upsert(updates, {
                onConflict: 'product_id'
            });

        if (error) {
            console.error('Errore completo:', error);
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
        console.error('Errore catch:', err);
        alert(`Errore nel salvataggio: ${err.message || 'Errore sconosciuto'}`);
    }
}

// Ripristina tutti i prezzi originali
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
