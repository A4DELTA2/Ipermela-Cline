# 🍎 Ipermela Store - Sistema Gestione Ordini

Applicazione web moderna per la gestione degli ordini del negozio Ipermela Store, specializzato in prodotti Apple.
Il progetto è stato recentemente rifattorizzato passando da un'architettura monolitica a una struttura **modulare ES6** scalabile.

## 📋 Descrizione

Ipermela Store permette di gestire l'intero ciclo di vendita, dal catalogo all'ordine finale, con funzionalità avanzate quali:
- 📱 **Catalogo Completo**: iPhone, Mac, iPad e Accessori con prezzi aggiornati.
- 🛒 **Carrello Dinamico**: Calcolo automatico di subtotale, IVA (22%) e totale.
- 👥 **Gestione Ruoli**: Sistema di autenticazione con permessi differenziati (Admin, Operator, Viewer).
- 📄 **Export PDF**: Generazione professionale di preventivi/ordini in PDF (singolo o massivo).
- ☁️ **Cloud Storage**: Salvataggio sicuro di ordini e configurazioni su Supabase.
- 🎨 **Interfaccia Apple-style**: UI pulita, responsive e intuitiva.

## 🚀 Tecnologie Utilizzate

- **HTML5** - Struttura semantica
- **CSS3** - Design responsive e animazioni fluide
- **JavaScript (ES6 Modules)** - Architettura modulare moderna
- **Supabase** - Database PostgreSQL e Autenticazione
- **jsPDF** - Libreria per la generazione dei documenti PDF

## 📁 Struttura del Progetto

Il codice è organizzato in moduli specifici per garantire manutenibilità e scalabilità:

```text
Ipermela-Cline/
│
├── index.html                  # Entry point dell'applicazione
├── styles.css                  # Fogli di stile globali
├── tailwind.config.js          # Configurazione Tailwind CSS
├── vitest.config.js            # Configurazione test runner
│
├── js/                         # 📂 Moduli JavaScript (Logica Core)
│   ├── app.js                  # Main entry point e inizializzazione
│   ├── auth.js                 # Gestione utenti e permessi (Login/Logout)
│   ├── cart.js                 # Logica del carrello
│   ├── config.js               # Configurazioni Supabase e costanti IVA
│   ├── data.js                 # Database statico prodotti base
│   ├── pricing.js              # Gestione listini personalizzati
│   ├── ui.js                   # Gestione interfaccia (Toast, Modali)
│   ├── utils.js                # Funzioni di utilità (Formattazione, Date)
│   │
│   ├── orders/                 # 🆕 Modulo Orders V2 (modulare)
│   │   ├── dom.js              # Rendering UI ordini
│   │   ├── service.js          # Operazioni database
│   │   ├── state.js            # State management
│   │   └── filter.js           # Logica filtri e ricerca
│   │
│   ├── products/               # Modulo prodotti
│   │   ├── dom.js              # Rendering catalogo
│   │   └── state.js            # State prodotti
│   │
│   ├── pricing/                # Modulo gestione prezzi
│   │   ├── dom.js              # UI gestione prezzi
│   │   ├── service.js          # CRUD prezzi
│   │   └── state.js            # State pricing
│   │
│   ├── components/             # Componenti UI riutilizzabili
│   │   ├── Header.js           # Header applicazione
│   │   └── MainLayout.js       # Layout principale
│   │
│   ├── shared/                 # 🆕 Utilities condivise
│   │   ├── calculations.js     # Calcoli IVA e totali
│   │   ├── validation.js       # Validazione input
│   │   ├── notifications.js    # Helper notifiche
│   │   ├── emptyState.js       # Componenti empty state
│   │   └── README.md           # Documentazione utilities
│   │
│   └── pdf/                    # Generazione PDF
│       ├── generator.js        # Engine principale
│       ├── config/             # Configurazioni PDF
│       └── components/         # Componenti PDF (header, table, totals)
│
├── tests/                      # 🆕 Test suite (Vitest)
│   ├── setup.js                # Setup test environment
│   └── shared/                 # Test utilities condivise
│       ├── calculations.test.js
│       └── validation.test.js
│
└── supabase-setup.sql          # Script inizializzazione database

✨ Funzionalità Principali
1. Gestione Ordini e PDF
 * Creazione ordini con dati cliente.
 * Salvataggio storico nel cloud.
 * NUOVO: Pulsante "📄 PDF" per scaricare il preventivo di un singolo ordine.
 * NUOVO: Pulsante "Esporta Tutti" per report completi.

2. Catalogo e Prezzi
 * Filtri per categoria (iPhone, Mac, iPad, Accessori).
 * Ricerca testuale rapida.
 * Gestione prezzi personalizzati (solo per ruoli autorizzati).
 * Supporto per prodotti "Custom" aggiunti al volo.

3. Sicurezza
 * Login obbligatorio per accedere al sistema.
 * Row Level Security (RLS) su Supabase per proteggere i dati.
## 🛠️ Installazione e Avvio

### Prerequisiti
- Un browser moderno (Chrome, Safari, Edge)
- Un account Supabase (per il backend)
- Node.js (v18+) e npm (per sviluppo e testing)

### Setup Iniziale

1. **Clona la repository**
   ```bash
   git clone <repository-url>
   cd Ipermela-Cline
   ```

2. **Installa le dipendenze (per sviluppo)**
   ```bash
   npm install
   ```

3. **Configura Supabase**
   - Crea un progetto su [Supabase](https://supabase.com)
   - Esegui lo script `supabase-setup.sql` nel tuo progetto
   - Aggiorna le credenziali in `js/config.js`

4. **Avvia il server locale**

   **Opzione A - Visual Studio Code (Consigliata):**
   - Installa l'estensione "Live Server"
   - Clicca su "Go Live" in basso a destra

   **Opzione B - Python:**
   ```bash
   python -m http.server 8000
   ```

   **Opzione C - Node.js:**
   ```bash
   npx http-server
   ```

5. **Apri nel browser**
   - Naviga a `http://localhost:5500` (o la porta indicata)

### 🧪 Testing

Il progetto utilizza **Vitest** per i test unitari:

```bash
# Esegui tutti i test
npm test

# Esegui test in watch mode
npm run test:watch

# Esegui test con UI
npm run test:ui

# Genera coverage report
npm run test:coverage
```

**Test disponibili:**
- `tests/shared/calculations.test.js` - Test calcoli IVA e totali
- `tests/shared/validation.test.js` - Test validazione input

### 📝 Note per gli Sviluppatori

**Architettura Modulare:**
- Ogni modulo segue il pattern **State/Service/DOM**
- State = gestione dati locali
- Service = operazioni database/API
- DOM = rendering e UI

**Utilities Condivise:**
- Usa sempre i moduli in `js/shared/` per funzionalità comuni
- Documentazione completa in `js/shared/README.md`
- Non duplicare logica già presente nelle utilities

**Convenzioni di Codice:**
- Usa ES6 modules (`import`/`export`)
- JSDoc completo per tutte le funzioni esportate
- Nomi descrittivi per variabili e funzioni
- Commenti solo dove necessario (codice auto-documentante)

**IVA e Prezzi:**
- Tutti i prezzi sono **IVA inclusa (22%)**
- Usa le costanti da `config.js`: `IVA_RATE`, `IVA_MULTIPLIER`, `IVA_DISPLAY`
- Usa `calculateTotals()` da `shared/calculations.js` per i calcoli

**Git Workflow:**
- Crea un branch per ogni feature: `git checkout -b feature/nome-feature`
- Commit frequenti con messaggi descrittivi
- Testa prima di fare push
## 📦 Changelog

### v2.0.0 - Refactoring Completo (Dicembre 2025)

**🎯 Obiettivi Raggiunti:**
- ✅ Eliminati ~600+ righe di codice duplicato
- ✅ Creata architettura modulare scalabile
- ✅ Centralizzati calcoli IVA e utilities
- ✅ Aggiunto testing framework (Vitest)
- ✅ Documentazione completa

**🔄 Modifiche Principali:**

**FASE 1 - Infrastructure**
- Setup Vitest per test unitari
- Creati moduli shared: `calculations.js`, `validation.js`, `notifications.js`, `emptyState.js`
- Aggiunte costanti IVA in `config.js`

**FASE 2 - Migrazione Orders**
- Migrazione completa da Orders V1 a Orders V2
- Eliminata duplicazione (~500 righe)
- Architettura modulare: `orders/dom.js`, `orders/service.js`, `orders/state.js`, `orders/filter.js`
- Mantenuta backward compatibility con alias

**FASE 3 - Centralizzazione IVA**
- Tutti i valori hardcoded (1.22, 0.22, "22%") ora usano `config.js`
- Aggiornati: `cart.js`, `orders/dom.js`, PDF components, `MainLayout.js`
- Single source of truth per tasso IVA

**FASE 4 - Integrazione Utilities**
- `cart.js` usa `calculateTotals()` condiviso (rimosso duplicato)
- `orders/service.js` adotta notification helper
- Creato pattern riutilizzabile per notifiche

**FASE 5 - Semplificazione Funzioni**
- `renderCart()` semplificato da 93 → 23 righe
- Estratte funzioni helper: `renderEmptyCart()`, `renderCartItem()`, `updateCartItemCount()`
- Codice più leggibile e manutenibile

**FASE 6 - Rimozione Duplicazioni**
- Creato componente `emptyState` condiviso
- Eliminati ~40 righe di HTML duplicato
- Stati vuoti consistenti in `cart.js`, `orders/dom.js`, `pricing/dom.js`

**FASE 8 - Documentazione**
- README completo per `js/shared/`
- Aggiornato README principale con nuova architettura
- JSDoc completo per tutte le utilities

**🚀 Miglioramenti Tecnici:**
- Moduli ES6 puri (no bundler)
- Pattern State/Service/DOM consistente
- Separazione concerns migliorata
- Funzioni più piccole e testabili
- Dark mode support completo

**📊 Metriche:**
- Codice eliminato: ~600+ righe
- Nuovi moduli shared: 4
- File refactored: 15+
- Test coverage: utilities condivise
- Commits: 8 focused commits

---

**Versione:** 2.0.0 (Refactored)
**Ultimo aggiornamento:** Dicembre 2025
**Sviluppato per:** Ipermela Store

