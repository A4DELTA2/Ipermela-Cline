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
│
├── js/                         # 📂 Moduli JavaScript (Logica Core)
│   ├── app.js                  # Main entry point e inizializzazione
│   ├── auth.js                 # Gestione utenti e permessi (Login/Logout)
│   ├── cart.js                 # Logica del carrello
│   ├── config.js               # Configurazioni Supabase e costanti
│   ├── data.js                 # Database statico prodotti base
│   ├── orders.js               # Gestione CRUD ordini su Cloud
│   ├── pricing.js              # Gestione listini personalizzati
│   ├── products.js             # Rendering e filtro prodotti
│   ├── ui.js                   # Gestione interfaccia (Toast, Modali)
│   ├── utils.js                # Funzioni di utilità (Formattazione, Date)
│   │
│   └── pdf/
│       └── generator.js        # Motore di generazione PDF
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
🛠️ Installazione e Avvio
⚠️ Importante: Poiché il progetto utilizza ES6 Modules, non è possibile aprire direttamente il file index.html dal file system. È necessario un server web locale.
Prerequisiti
 * Un browser moderno (Chrome, Safari, Edge).
 * Un account Supabase (per il backend).
Come avviare in locale
 * Clona o scarica la repository.
 * Avvia un server locale. Puoi usare uno dei seguenti metodi:
   Opzione A (Visual Studio Code - Consigliata):
   * Installa l'estensione "Live Server".
   * Clicca su "Go Live" in basso a destra.
   Opzione B (Python):
   # Nella cartella del progetto
python -m http.server 8000

   Opzione C (Node.js):
   npx http-server

 * Apri il browser all'indirizzo indicato (es. http://localhost:5500 o http://localhost:8000).
📝 Note per gli Sviluppatori
 * Il file script.js presente nella root è DEPRECATO e mantenuto solo come backup storico. Non modificarlo.
 * Tutte le modifiche vanno apportate ai file dentro la cartella js/.
 * Per aggiornare la logica dei PDF, modificare js/pdf/generator.js.
Versione: 2.0.0 (Refactored)

Ultimo aggiornamento: Dicembre 2025
Sviluppato per Ipermela Store

