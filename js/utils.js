/**
 * @fileoverview Utility functions generiche
 * @module utils
 */

/**
 * Formatta un numero come prezzo in euro
 * @param {number} price - Prezzo da formattare
 * @returns {string} Prezzo formattato (es. "€1.234,56")
 */
export function formatPrice(price) {
    return `€${parseFloat(price).toFixed(2).replace('.', ',')}`;
}

/**
 * Formatta una data in formato italiano
 * @param {string|Date} date - Data da formattare
 * @returns {string} Data formattata
 */
export function formatDate(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString('it-IT');
}

/**
 * Valida un indirizzo email
 * @param {string} email - Email da validare
 * @returns {boolean} True se l'email è valida
 */
export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Sanitizza input utente rimuovendo caratteri pericolosi
 * @param {string} str - Stringa da sanitizzare
 * @returns {string} Stringa sanitizzata
 */
export function sanitizeInput(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Debounce function per limitare chiamate ripetute
 * @param {Function} func - Funzione da eseguire
 * @param {number} wait - Millisecondi di attesa
 * @returns {Function} Funzione debounced
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Genera un ID univoco
 * @returns {string} ID univoco
 */
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Scrolla alla sezione "Aggiungi Prodotto"
 */
export function scrollToAddProduct() {
    const customAccessorySection = document.querySelector('.custom-accessory');
    if (customAccessorySection) {
        customAccessorySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            const customNameInput = document.getElementById('custom-name');
            if (customNameInput) customNameInput.focus();
        }, 500);
    }
}

/**
 * Scrolla alla sezione carrello
 */
export function scrollToCart() {
    const cartSection = document.querySelector('.cart-section');
    if (cartSection) {
        cartSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Aggiorna il badge del carrello con il numero di articoli
 * @param {Array} cart - Array del carrello
 */
export function updateCartBadge(cart) {
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

/**
 * Setup del pulsante "Scroll to Top"
 * Mostra/nasconde il pulsante in base allo scroll e gestisce il click
 */
export function setupScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (!scrollBtn) return;

    // Mostra/nascondi il pulsante in base allo scroll
    const toggleScrollButton = () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    };

    // Scrolla in cima quando si clicca il pulsante
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Ascolta eventi di scroll
    window.addEventListener('scroll', toggleScrollButton);

    // Check iniziale
    toggleScrollButton();
}