/**
 * @fileoverview Wrapper condiviso per notifiche UI
 * @module shared/notifications
 */

/**
 * Mostra una notifica di successo
 *
 * @param {string} message - Messaggio da mostrare
 *
 * @example
 * notify.success('Ordine salvato con successo!');
 */
export function notifySuccess(message) {
  if (typeof window.showNotification === 'function') {
    window.showNotification(message, 'success');
  }
}

/**
 * Mostra una notifica di errore
 *
 * @param {string} message - Messaggio da mostrare
 *
 * @example
 * notify.error('Errore nel salvataggio dell\'ordine');
 */
export function notifyError(message) {
  if (typeof window.showNotification === 'function') {
    window.showNotification(message, 'error');
  }
}

/**
 * Mostra una notifica informativa/loading
 *
 * @param {string} message - Messaggio da mostrare
 *
 * @example
 * notify.info('Caricamento in corso...');
 */
export function notifyInfo(message) {
  if (typeof window.showNotification === 'function') {
    window.showNotification(message, 'info');
  }
}

/**
 * Mostra una notifica di avviso
 *
 * @param {string} message - Messaggio da mostrare
 *
 * @example
 * notify.warning('Attenzione: alcuni dati mancano');
 */
export function notifyWarning(message) {
  if (typeof window.showNotification === 'function') {
    window.showNotification(message, 'warning');
  }
}

/**
 * Oggetto helper con metodi di notifica
 * Fornisce un'API pulita per mostrare notifiche
 *
 * @example
 * import { notify } from './shared/notifications.js';
 *
 * notify.success('Operazione completata!');
 * notify.error('Si è verificato un errore');
 * notify.info('Caricamento...');
 * notify.warning('Attenzione!');
 */
export const notify = {
  success: notifySuccess,
  error: notifyError,
  info: notifyInfo,
  warning: notifyWarning
};
