// ===== CONFIGURAZIONE SUPABASE =====
const SUPABASE_URL = 'https://prldireomgijzfppeunp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBybGRpcmVvbWdpanpmcHBldW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NDgwOTMsImV4cCI6MjA3OTIyNDA5M30.ur9sD-Q9iYsim4R_TcGsuEOuZNb2sMG0FuLnsrXRG5Y';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Catalogo Prodotti Predefiniti
let products = [
    // iPhone
    { id: 1, name: 'iPhone 15 Pro Max', price: 1489, category: 'iphone', icon: '📱' },
    { id: 2, name: 'iPhone 15 Pro', price: 1239, category: 'iphone', icon: '📱' },
    { id: 3, name: 'iPhone 15 Plus', price: 1029, category: 'iphone', icon: '📱' },
    { id: 4, name: 'iPhone 15', price: 879, category: 'iphone', icon: '📱' },
    { id: 5, name: 'iPhone 14', price: 769, category: 'iphone', icon: '📱' },
    { id: 6, name: 'iPhone SE', price: 559, category: 'iphone', icon: '📱' },
    
    // Mac
    { id: 7, name: 'MacBook Pro 16"', price: 2999, category: 'mac', icon: '💻' },
    { id: 8, name: 'MacBook Pro 14"', price: 2299, category: 'mac', icon: '💻' },
    { id: 9, name: 'MacBook Air 15"', price: 1599, category: 'mac', icon: '💻' },
    { id: 10, name: 'MacBook Air 13"', price: 1279, category: 'mac', icon: '💻' },
    { id: 11, name: 'iMac 24"', price: 1549, category: 'mac', icon: '🖥️' },
    { id: 12, name: 'Mac mini', price: 699, category: 'mac', icon: '🖥️' },
    { id: 13, name: 'Mac Studio', price: 2299, category: 'mac', icon: '🖥️' },
    { id: 14, name: 'Mac Pro', price: 7999, category: 'mac', icon: '🖥️' },
    
    // iPad
    { id: 15, name: 'iPad Pro 12.9"', price: 1469, category: 'ipad', icon: '📲' },
    { id: 16, name: 'iPad Pro 11"', price: 1069, category: 'ipad', icon: '📲' },
    { id: 17, name: 'iPad Air', price: 699, category: 'ipad', icon: '📲' },
    { id: 18, name: 'iPad', price: 439, category: 'ipad', icon: '📲' },
    { id: 19, name: 'iPad mini', price: 609, category: 'ipad', icon: '📲' },
    
    // Accessori
    { id: 20, name: 'AirPods Pro (2a gen)', price: 279, category: 'accessori', icon: '🎧' },
    { id: 21, name: 'AirPods (3a gen)', price: 199, category: 'accessori', icon: '🎧' },
    { id: 22, name: 'AirPods Max', price: 579, category: 'accessori', icon: '🎧' },
    { id: 23, name: 'Apple Watch Series 9', price: 449, category: 'accessori', icon: '⌚' },
    { id: 24, name: 'Apple Watch SE', price: 279, category: 'accessori', icon: '⌚' },
    { id: 25, name: 'Apple Watch Ultra 2', price: 899, category: 'accessori', icon: '⌚' },
    { id: 26, name: 'Magic Keyboard', price: 109, category: 'accessori', icon: '⌨️' },
    { id: 27, name: 'Magic Mouse', price: 89, category: 'accessori', icon: '🖱️' },
    { id: 28, name: 'Magic Trackpad', price: 149, category: 'accessori', icon: '🖱️' },
    { id: 29, name: 'Apple Pencil (2a gen)', price: 149, category: 'accessori', icon: '✏️' },
    { id: 30, name: 'Apple Pencil (USB-C)', price: 89, category: 'accessori', icon: '✏️' },
    { id: 31, name: 'Custodia iPhone', price: 59, category: 'accessori', icon: '📱' },
    { id: 32, name: 'Caricatore MagSafe', price: 45, category: 'accessori', icon: '🔌' },
    { id: 33, name: 'Cavo USB-C', price: 25, category: 'accessori', icon: '🔌' },
];

// Stato Applicazione
let cart = [];
let currentFilter = 'all';
let savedOrders = [];
let nextProductId = 100;

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
    // Pulsanti Header
    document.getElementById('quick-add-btn').addEventListener('click', scrollToAddProduct);
    document.getElementById('quick-cart-btn').addEventListener('click', scrollToCart);

    // Filtri categoria
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
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
        // Anima il focus sull'input
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
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = totalItems;
        // Anima il badge quando cambia
        if (totalItems > 0) {
            badge.style.transform = 'scale(1.3)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// Renderizza Prodotti
function renderProducts() {
    const grid = document.getElementById('products-grid');
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<div class="empty-message">Nessun prodotto in questa categoria</div>';
        return;
    }

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-icon">${product.icon}</div>
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
    
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);

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
        icon: '🎁'
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

        products.push({ ...newProduct, custom: true });

        // Reset form
        nameInput.value = '';
        priceInput.value = '';

        // Aggiorna visualizzazione
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
    // Reset form
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

        // Reset
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

    // Crea elemento notifica
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

    // Rimuovi dopo 3 secondi
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
