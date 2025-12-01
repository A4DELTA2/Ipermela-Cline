/**
 * @fileoverview Modulo di autenticazione - Gestisce login, logout e gestione ruoli utente
 * @module auth
 */

import { supabase } from './config.js';

// ===== VARIABILI GLOBALI =====

/**
 * Oggetto utente attualmente loggato
 * @type {Object|null}
 */
export let currentUser = null;

/**
 * Ruolo dell'utente attualmente loggato
 * @type {string|null}
 */
export let userRole = null;

// ===== FUNZIONI ESPORTATE =====

/**
 * Verifica se l'utente è già loggato al caricamento della pagina
 * Se loggato, carica il ruolo e mostra l'app principale
 * Se non loggato, mostra la schermata di login
 * @async
 * @function checkAuth
 * @returns {Promise<void>}
 */
export async function checkAuth() {
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

/**
 * Ottiene il ruolo dell'utente dalla tabella user_roles
 * Se l'utente non ha un ruolo assegnato, assegna un ruolo 'operator' di default
 * @async
 * @function getUserRole
 * @returns {Promise<void>}
 */
export async function getUserRole() {
    try {
        const { data, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', currentUser.id)
            .single();

        if (error) {
            // Se l'utente non ha un ruolo assegnato, creane uno di default
            if (error.code === 'PGRST116') { // Row not found
                const { error: insertError } = await supabase
                    .from('user_roles')
                    .insert({ user_id: currentUser.id, role: 'operator' });

                if (!insertError) {
                    userRole = 'operator';
                    window.userRole = userRole; // 🔧 FIX: Aggiorna subito window.userRole
                    console.log('✅ Ruolo creato e assegnato:', userRole);
                    return;
                }
            }

            console.error('Errore ottenimento ruolo:', error.message);
            userRole = 'operator'; // Default fallback
            window.userRole = userRole; // 🔧 FIX: Aggiorna anche in caso di errore
            return;
        }

        userRole = data?.role || 'operator';
        window.userRole = userRole; // 🔧 FIX: Aggiorna window.userRole
        console.log('✅ Ruolo caricato correttamente:', userRole);
    } catch (err) {
        console.error('Errore imprevisto durante ottenimento ruolo:', err);
        userRole = 'operator';
        window.userRole = userRole; // 🔧 FIX: Aggiorna anche in caso di errore
    }
}

/**
 * Gestisce il login dell'utente con email e password
 * Valida i campi, autentica l'utente e carica l'app
 * @async
 * @function handleLogin
 * @param {Event} e - Evento submit del form
 * @returns {Promise<void>}
 */
export async function handleLogin(e) {
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

        await getUserRole();
        showApp();
        await initializeApp();
        showNotification('Login effettuato! ✓', 'success');
    } catch (err) {
        console.error('Errore imprevisto durante login:', err);
        showNotification('Errore durante il login: ' + err.message, 'error');
    }
}

/**
 * Gestisce il logout dell'utente
 * Chiede conferma, riporta a null le variabili globali e mostra la schermata di login
 * @async
 * @function handleLogout
 * @returns {Promise<void>}
 */
export async function handleLogout() {
    if (!confirm('Sei sicuro di voler uscire?')) {
        return;
    }

    try {
        await supabase.auth.signOut();
        currentUser = null;
        userRole = null;

        // Ripulisci il carrello se disponibile (importato da altro modulo)
        if (typeof window.cart !== 'undefined') {
            window.cart = [];
        }

        showLoginScreen();
        showNotification('Logout effettuato', 'success');
    } catch (err) {
        console.error('Errore logout:', err);
        showNotification('Errore durante il logout', 'error');
    }
}

/**
 * Mostra la schermata di login e nasconde l'app principale
 * @function showLoginScreen
 * @returns {void}
 */
export function showLoginScreen() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
}

/**
 * Mostra l'app principale e nasconde la schermata di login
 * Visualizza l'email dell'utente nell'header e aggiorna l'UI in base al ruolo
 * @function showApp
 * @returns {void}
 */
export function showApp() {
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

/**
 * Aggiorna l'UI in base al ruolo dell'utente
 * Solo admin e operator possono visualizzare il pulsante di gestione prezzi
 * @function updateUIBasedOnRole
 * @returns {void}
 */
export function updateUIBasedOnRole() {
    const priceManagementBtn = document.getElementById('price-management-btn');
    const mobilePriceItem = document.querySelector('[data-action="price-management"]');

    console.log('🔐 Aggiornamento UI per ruolo:', userRole);

    // Solo admin e operator possono modificare i prezzi
    if (userRole === 'admin' || userRole === 'operator') {
        console.log('✅ Ruolo autorizzato - Mostro pulsante Prezzi');
        if (priceManagementBtn) {
            priceManagementBtn.classList.remove('hidden');
            // Aggiungi flex per mostrare correttamente il pulsante
            if (!priceManagementBtn.classList.contains('flex')) {
                priceManagementBtn.classList.add('flex');
            }
        }
        if (mobilePriceItem) mobilePriceItem.classList.remove('hidden');
    } else {
        console.log('❌ Ruolo non autorizzato - Nascondo pulsante Prezzi');
        if (priceManagementBtn) priceManagementBtn.classList.add('hidden');
        if (mobilePriceItem) mobilePriceItem.classList.add('hidden');
    }
}

// ===== FUNZIONI INTERNE (NON ESPORTATE) =====

/**
 * Inizializza l'app principale caricando i dati dal cloud
 * Carica prodotti, prezzi personalizzati, ordini salvati e renderizza l'interfaccia
 * @async
 * @function initializeApp
 * @returns {Promise<void>}
 * @private
 */
async function initializeApp() {
    showNotification('Caricamento dati dal cloud...', 'info');

    // Queste funzioni devono essere disponibili nel scope globale o importate
    if (typeof window.loadProducts === 'function') {
        await window.loadProducts();
    }
    if (typeof window.loadCustomPrices === 'function') {
        await window.loadCustomPrices();
    }
    if (typeof window.renderProducts === 'function') {
        window.renderProducts();
    }
    if (typeof window.renderCart === 'function') {
        window.renderCart();
    }
    if (typeof window.renderSavedOrders === 'function') {
        await window.renderSavedOrders();
    }

    showNotification('Dati caricati! ✓', 'success');
}

/**
 * Mostra una notifica all'utente
 * @function showNotification
 * @param {string} message - Messaggio da visualizzare
 * @param {string} type - Tipo di notifica: 'success', 'error', 'info'
 * @returns {void}
 * @private
 */
function showNotification(message, type) {
    // Usa la funzione globale se disponibile, altrimenti mostra un alert
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}
