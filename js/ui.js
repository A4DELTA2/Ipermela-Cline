/**
 * @fileoverview Gestione UI e componenti visuali
 * @module ui
 */

/**
 * Mostra una notifica toast
 * @param {string} message - Messaggio da mostrare
 * @param {string} type - Tipo di notifica (success, info, error, warning)
 */
export function showNotification(message, type = 'success') {
    // Colori Apple Style (ottimizzati per dark mode)
    const colors = {
        success: '#30D158',  // apple.green
        info: '#0A84FF',     // apple.blue
        error: '#FF453A',    // apple.red
        warning: '#FF9F0A'   // apple.orange
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

/**
 * Toggle Dark Mode
 * Attiva/disattiva la modalità scura e salva la preferenza nel localStorage
 */
export function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');

    // Salva la preferenza nel localStorage
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

    // Notifica l'utente del cambio tema
    showNotification(
        isDarkMode ? '🌙 Dark Mode attivato' : '☀️ Light Mode attivato',
        'info'
    );

    return isDarkMode;
}

/**
 * Inizializza la modalità scura in base alle preferenze salvate
 */
export function initDarkMode() {
    // Controlla se c'è una preferenza salvata nel localStorage
    const savedTheme = localStorage.getItem('darkMode');

    // Se c'è una preferenza salvata, applicala
    if (savedTheme === 'enabled') {
        document.body.classList.add('dark-mode');
    } else if (savedTheme === 'disabled') {
        document.body.classList.remove('dark-mode');
    } else {
        // Se non c'è preferenza salvata, controlla la preferenza del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.classList.add('dark-mode');
        }
    }
}

/**
 * Crea il pulsante per il toggle del dark mode
 * @param {string} containerId - ID del container dove inserire il pulsante
 */
export function createDarkModeToggle(containerId = 'dark-mode-toggle-container') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Container ${containerId} non trovato. Impossibile creare il toggle.`);
        return;
    }

    const toggleButton = document.createElement('button');
    toggleButton.id = 'dark-mode-toggle';
    toggleButton.className = 'p-2.5 bg-gray-100 dark:bg-dark-elevated text-gray-900 dark:text-dark-text rounded-xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-dark-border';
    toggleButton.title = 'Toggle Dark Mode';
    toggleButton.innerHTML = `
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path class="sun-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            <path class="moon-icon hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
    `;

    // Aggiungi l'event listener per il toggle
    toggleButton.addEventListener('click', () => {
        const isDarkMode = toggleDarkMode();
        updateToggleIcon(toggleButton, isDarkMode);
    });

    // Imposta l'icona corretta all'avvio
    const isDarkMode = document.body.classList.contains('dark-mode');
    updateToggleIcon(toggleButton, isDarkMode);

    container.appendChild(toggleButton);
}

/**
 * Aggiorna l'icona del pulsante toggle in base al tema corrente
 * @param {HTMLElement} button - Il pulsante toggle
 * @param {boolean} isDarkMode - Se il dark mode è attivo
 */
function updateToggleIcon(button, isDarkMode) {
    const sunIcon = button.querySelector('.sun-icon');
    const moonIcon = button.querySelector('.moon-icon');

    if (isDarkMode) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
}

/**
 * Inizializza le animazioni delle notifiche
 */
export function initNotificationStyles() {
    if (document.getElementById('notification-styles')) return;

    const style = document.createElement('style');
    style.id = 'notification-styles';
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
}
