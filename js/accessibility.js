/**
 * ACCESSIBILITY MANAGER
 * Gestisce focus trap, ARIA updates, keyboard navigation
 * WCAG 2.1 AA Compliance
 *
 * @module accessibility
 */

/**
 * Focus Trap per Modal
 * Intrappola il focus all'interno di un elemento (es. modal)
 */
class FocusTrap {
    constructor(element) {
        this.element = element;
        this.focusableElements = null;
        this.firstFocusable = null;
        this.lastFocusable = null;
        this.previousActiveElement = null;
    }

    /**
     * Attiva il focus trap
     */
    activate() {
        // Salva l'elemento attivo corrente
        this.previousActiveElement = document.activeElement;

        // Trova tutti gli elementi focusabili
        this.updateFocusableElements();

        // Sposta focus sul primo elemento
        if (this.firstFocusable) {
            this.firstFocusable.focus();
        }

        // Aggiungi event listener
        this.element.addEventListener('keydown', this.handleKeyDown);
    }

    /**
     * Disattiva il focus trap
     */
    deactivate() {
        // Rimuovi event listener
        this.element.removeEventListener('keydown', this.handleKeyDown);

        // Ripristina focus precedente
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
        }
    }

    /**
     * Aggiorna lista elementi focusabili
     */
    updateFocusableElements() {
        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ].join(', ');

        this.focusableElements = Array.from(
            this.element.querySelectorAll(focusableSelectors)
        );

        this.firstFocusable = this.focusableElements[0];
        this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
    }

    /**
     * Gestisce navigazione con Tab
     */
    handleKeyDown = (e) => {
        if (e.key !== 'Tab') return;

        // Shift + Tab (indietro)
        if (e.shiftKey) {
            if (document.activeElement === this.firstFocusable) {
                e.preventDefault();
                this.lastFocusable.focus();
            }
        }
        // Tab (avanti)
        else {
            if (document.activeElement === this.lastFocusable) {
                e.preventDefault();
                this.firstFocusable.focus();
            }
        }
    }
}

/**
 * Gestione ARIA Live Regions
 * Per annunci screen reader dinamici
 */
class AriaLiveAnnouncer {
    constructor() {
        this.politeRegion = null;
        this.assertiveRegion = null;
        this.init();
    }

    /**
     * Inizializza le live regions
     */
    init() {
        // Crea regione "polite" (non interrompe screen reader)
        this.politeRegion = document.createElement('div');
        this.politeRegion.setAttribute('role', 'status');
        this.politeRegion.setAttribute('aria-live', 'polite');
        this.politeRegion.setAttribute('aria-atomic', 'true');
        this.politeRegion.className = 'sr-only';
        document.body.appendChild(this.politeRegion);

        // Crea regione "assertive" (interrompe screen reader)
        this.assertiveRegion = document.createElement('div');
        this.assertiveRegion.setAttribute('role', 'alert');
        this.assertiveRegion.setAttribute('aria-live', 'assertive');
        this.assertiveRegion.setAttribute('aria-atomic', 'true');
        this.assertiveRegion.className = 'sr-only';
        document.body.appendChild(this.assertiveRegion);
    }

    /**
     * Annuncia un messaggio in modo educato
     * @param {string} message - Messaggio da annunciare
     */
    announcePolite(message) {
        this.politeRegion.textContent = '';
        setTimeout(() => {
            this.politeRegion.textContent = message;
        }, 100);
    }

    /**
     * Annuncia un messaggio in modo assertivo (urgente)
     * @param {string} message - Messaggio da annunciare
     */
    announceAssertive(message) {
        this.assertiveRegion.textContent = '';
        setTimeout(() => {
            this.assertiveRegion.textContent = message;
        }, 100);
    }
}

/**
 * Keyboard Navigation Manager
 * Gestisce navigazione con frecce, Esc, Enter
 */
class KeyboardNavigationManager {
    /**
     * Gestisce chiusura modal con ESC
     * @param {HTMLElement} modal - Elemento modal
     * @param {Function} closeCallback - Funzione di chiusura
     */
    static enableModalEscapeClose(modal, closeCallback) {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeCallback();
                document.removeEventListener('keydown', handleEscape);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return handleEscape; // Ritorna per poter rimuovere listener dopo
    }

    /**
     * Gestisce navigazione in un menu con frecce
     * @param {HTMLElement} menu - Container menu
     * @param {string} itemSelector - Selector per items
     */
    static enableArrowNavigation(menu, itemSelector = '[role="menuitem"]') {
        const items = Array.from(menu.querySelectorAll(itemSelector));

        menu.addEventListener('keydown', (e) => {
            const currentIndex = items.indexOf(document.activeElement);

            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % items.length;
                    items[nextIndex].focus();
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
                    items[prevIndex].focus();
                    break;

                case 'Home':
                    e.preventDefault();
                    items[0].focus();
                    break;

                case 'End':
                    e.preventDefault();
                    items[items.length - 1].focus();
                    break;
            }
        });
    }

    /**
     * Gestisce color swatches con tastiera
     * @param {HTMLElement} container - Container swatches
     */
    static enableColorSwatchKeyboard(container) {
        const swatches = Array.from(container.querySelectorAll('.color-swatch'));

        swatches.forEach((swatch, index) => {
            // Rendi focusabile
            if (!swatch.hasAttribute('tabindex')) {
                swatch.setAttribute('tabindex', '0');
            }

            // Aggiungi role se manca
            if (!swatch.hasAttribute('role')) {
                swatch.setAttribute('role', 'button');
            }

            // Gestisci Enter e Space per selezione
            swatch.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    swatch.click();
                }
            });
        });

        // Abilita navigazione frecce
        this.enableArrowNavigation(container, '.color-swatch');
    }
}

/**
 * Contrast Checker
 * Verifica contrasto colori runtime
 */
class ContrastChecker {
    /**
     * Calcola luminosità relativa
     * @param {number} r - Rosso (0-255)
     * @param {number} g - Verde (0-255)
     * @param {number} b - Blu (0-255)
     * @returns {number} - Luminosità relativa (0-1)
     */
    static getRelativeLuminance(r, g, b) {
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    /**
     * Calcola rapporto di contrasto
     * @param {string} color1 - Colore 1 (hex)
     * @param {string} color2 - Colore 2 (hex)
     * @returns {number} - Rapporto contrasto
     */
    static getContrastRatio(color1, color2) {
        const rgb1 = this.hexToRgb(color1);
        const rgb2 = this.hexToRgb(color2);

        const l1 = this.getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
        const l2 = this.getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);

        return (lighter + 0.05) / (darker + 0.05);
    }

    /**
     * Converte hex in RGB
     * @param {string} hex - Colore hex
     * @returns {{r: number, g: number, b: number}}
     */
    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    /**
     * Verifica se il contrasto passa WCAG AA
     * @param {number} ratio - Rapporto contrasto
     * @param {string} level - 'normal' o 'large'
     * @returns {boolean}
     */
    static passesWCAG_AA(ratio, level = 'normal') {
        return level === 'large' ? ratio >= 3 : ratio >= 4.5;
    }

    /**
     * Verifica se il contrasto passa WCAG AAA
     * @param {number} ratio - Rapporto contrasto
     * @param {string} level - 'normal' o 'large'
     * @returns {boolean}
     */
    static passesWCAG_AAA(ratio, level = 'normal') {
        return level === 'large' ? ratio >= 4.5 : ratio >= 7;
    }
}

/**
 * Form Accessibility Manager
 * Gestisce validazione accessibile e messaggi errore
 */
class FormAccessibilityManager {
    /**
     * Associa messaggio errore a un campo
     * @param {HTMLInputElement} input - Campo input
     * @param {string} errorMessage - Messaggio errore
     */
    static setFieldError(input, errorMessage) {
        // Imposta aria-invalid
        input.setAttribute('aria-invalid', 'true');

        // Trova o crea container errore
        let errorElement = document.getElementById(`${input.id}-error`);
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.id = `${input.id}-error`;
            errorElement.className = 'field-error';
            errorElement.setAttribute('role', 'alert');
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }

        // Imposta messaggio
        errorElement.textContent = errorMessage;

        // Collega errore al campo
        input.setAttribute('aria-describedby', errorElement.id);

        // Annuncia errore
        window.ariaAnnouncer?.announceAssertive(errorMessage);
    }

    /**
     * Rimuovi errore da campo
     * @param {HTMLInputElement} input - Campo input
     */
    static clearFieldError(input) {
        input.setAttribute('aria-invalid', 'false');
        input.removeAttribute('aria-describedby');

        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.remove();
        }
    }

    /**
     * Valida form con feedback accessibile
     * @param {HTMLFormElement} form - Form da validare
     * @returns {boolean} - Form valido
     */
    static validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.setFieldError(field, 'Questo campo è obbligatorio');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        if (!isValid) {
            // Focus primo campo con errore
            const firstError = form.querySelector('[aria-invalid="true"]');
            if (firstError) {
                firstError.focus();
            }
        }

        return isValid;
    }
}

/**
 * Inizializzazione globale
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inizializza ARIA Announcer globale
    window.ariaAnnouncer = new AriaLiveAnnouncer();

    // Aggiungi skip link se non esiste
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Salta al contenuto principale';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Assicurati che il main content abbia id
    const mainContent = document.querySelector('main') || document.querySelector('#app') || document.querySelector('#root');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }

    // Abilita navigazione tastiera per color swatches
    const colorContainers = document.querySelectorAll('.color-palette, .color-grid');
    colorContainers.forEach(container => {
        KeyboardNavigationManager.enableColorSwatchKeyboard(container);
    });
});

// Export per uso globale
window.FocusTrap = FocusTrap;
window.AriaLiveAnnouncer = AriaLiveAnnouncer;
window.KeyboardNavigationManager = KeyboardNavigationManager;
window.ContrastChecker = ContrastChecker;
window.FormAccessibilityManager = FormAccessibilityManager;
