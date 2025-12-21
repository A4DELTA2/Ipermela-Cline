/**
 * @fileoverview Componente riutilizzabile per stati vuoti
 * @module shared/emptyState
 */

/**
 * Icone predefinite per stati vuoti comuni
 */
const ICONS = {
    cart: `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    `,
    orders: `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
    `,
    products: `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    `,
    search: `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    `,
    generic: `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    `
};

/**
 * Renderizza uno stato vuoto con icona, titolo e messaggio
 *
 * @param {Object} options - Opzioni di configurazione
 * @param {string} [options.icon='generic'] - Nome icona predefinita o SVG path custom
 * @param {string} options.title - Titolo principale
 * @param {string} [options.message] - Messaggio secondario (opzionale)
 * @param {boolean} [options.compact=false] - Usa stile compatto (meno padding)
 * @param {boolean} [options.withBorder=true] - Mostra bordo e background
 * @returns {string} HTML per lo stato vuoto
 *
 * @example
 * // Empty state per carrello
 * renderEmptyState({
 *   icon: 'cart',
 *   title: 'Carrello vuoto',
 *   message: 'Aggiungi prodotti per iniziare'
 * });
 *
 * @example
 * // Empty state compatto senza bordo
 * renderEmptyState({
 *   icon: 'search',
 *   title: 'Nessun risultato',
 *   compact: true,
 *   withBorder: false
 * });
 *
 * @example
 * // Con icona custom
 * renderEmptyState({
 *   icon: '<path d="M12 2L2 7l10 5 10-5-10-5z"/>',
 *   title: 'Nessun dato',
 *   message: 'Inizia caricando i dati'
 * });
 */
export function renderEmptyState({
    icon = 'generic',
    title,
    message = '',
    compact = false,
    withBorder = true
}) {
    // Determina quale icona usare
    const iconPath = ICONS[icon] || icon;

    // Stili responsive
    const containerClass = withBorder
        ? 'bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border'
        : '';

    const paddingClass = compact ? 'py-8' : 'py-12';

    return `
        <div class="flex flex-col items-center justify-center ${paddingClass} text-center ${containerClass}">
            <div class="w-20 h-20 bg-gray-100 dark:bg-dark-border rounded-full flex items-center justify-center mb-4">
                <svg class="w-10 h-10 text-gray-300 dark:text-dark-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    ${iconPath}
                </svg>
            </div>
            <p class="text-gray-500 dark:text-dark-muted font-medium mb-1">${title}</p>
            ${message ? `<p class="text-sm text-gray-400 dark:text-dark-muted">${message}</p>` : ''}
        </div>
    `;
}

/**
 * Renderizza uno stato vuoto per il carrello
 * @returns {string} HTML
 */
export function renderEmptyCart() {
    return renderEmptyState({
        icon: 'cart',
        title: 'Carrello vuoto',
        message: 'Aggiungi prodotti per iniziare',
        withBorder: false
    });
}

/**
 * Renderizza uno stato vuoto per ordini non trovati
 * @returns {string} HTML
 */
export function renderEmptyOrders() {
    return renderEmptyState({
        icon: 'orders',
        title: 'Nessun ordine trovato',
        message: 'Prova a modificare i filtri di ricerca'
    });
}

/**
 * Renderizza uno stato vuoto per prodotti non trovati
 * @param {boolean} [isTableContext=false] - Se true, usa formato per tabella
 * @returns {string} HTML
 */
export function renderEmptyProducts(isTableContext = false) {
    if (isTableContext) {
        // Formato per celle di tabella
        return `
            <tr>
                <td colspan="5" class="py-16 text-center">
                    ${renderEmptyState({
                        icon: 'products',
                        title: 'Nessun prodotto trovato',
                        message: 'Prova a modificare i filtri',
                        withBorder: false
                    })}
                </td>
            </tr>
        `;
    }

    return renderEmptyState({
        icon: 'products',
        title: 'Nessun prodotto trovato',
        message: 'Prova a modificare i filtri'
    });
}

/**
 * Renderizza uno stato vuoto per ricerca senza risultati
 * @param {string} [searchQuery=''] - Query di ricerca (opzionale)
 * @returns {string} HTML
 */
export function renderEmptySearch(searchQuery = '') {
    const message = searchQuery
        ? `Nessun risultato per "${searchQuery}"`
        : 'Prova con termini di ricerca diversi';

    return renderEmptyState({
        icon: 'search',
        title: 'Nessun risultato',
        message
    });
}
