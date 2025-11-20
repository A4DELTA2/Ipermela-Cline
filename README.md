# 🍎 Ipermela Store - Sistema Gestione Ordini

Applicazione web per la gestione degli ordini del negozio Ipermela Store, specializzato in prodotti Apple.

## 📋 Descrizione

Ipermela Store è un'applicazione moderna e intuitiva che permette di:
- 📱 Gestire un catalogo completo di prodotti Apple (iPhone, Mac, iPad, Accessori)
- 🛒 Creare ordini con carrello dinamico
- ➕ Aggiungere accessori personalizzati al catalogo
- 💾 Salvare ordini nel cloud tramite Supabase
- 📊 Visualizzare lo storico degli ordini
- 🔍 Filtrare prodotti per categoria

## 🚀 Tecnologie Utilizzate

- **HTML5** - Struttura dell'applicazione
- **CSS3** - Stili moderni e responsive
- **JavaScript (Vanilla)** - Logica dell'applicazione
- **Supabase** - Database cloud e backend
- **Design Apple-inspired** - UI pulita e professionale

## ✨ Funzionalità Principali

### Header Intelligente
- Pulsante rapido per aggiungere prodotti
- Pulsante carrello con badge che mostra il numero di articoli
- Completamente responsive per mobile e tablet

### Catalogo Prodotti
- Oltre 30 prodotti Apple predefiniti
- Filtri per categoria (iPhone, Mac, iPad, Accessori)
- Possibilità di aggiungere accessori personalizzati
- Prezzi sempre aggiornati

### Gestione Carrello
- Aggiungi/rimuovi prodotti
- Modifica quantità
- Calcolo automatico di subtotale, IVA (22%) e totale
- Sticky sidebar per visualizzazione costante

### Salvataggio Ordini
- Salvataggio sicuro su database cloud
- Informazioni cliente (nome, email, telefono)
- Note aggiuntive opzionali
- Storico completo degli ordini

## 🛠️ Configurazione

### Prerequisiti
- Browser moderno (Chrome, Firefox, Safari, Edge)
- Connessione internet per Supabase

### Configurazione Supabase
1. I dettagli di connessione sono già configurati in `script.js`
2. Il database viene inizializzato usando `supabase-setup.sql`
3. Le tabelle `custom_products` e `orders` vengono create automaticamente

### Avvio Applicazione
1. Apri `index.html` nel tuo browser
2. L'applicazione caricherà automaticamente i dati dal cloud
3. Inizia a creare ordini!

## 📱 Responsive Design

L'applicazione è ottimizzata per:
- 🖥️ **Desktop** (1400px+) - Layout a due colonne
- 💻 **Tablet** (768px - 1024px) - Layout adattivo
- 📱 **Mobile** (fino a 768px) - Layout a colonna singola, header compatto

## 🎨 Caratteristiche UI/UX

- Design ispirato ad Apple con colori e tipografia puliti
- Animazioni fluide e transizioni smooth
- Notifiche toast per feedback immediato
- Modal eleganti per le azioni importanti
- Icone emoji per una UX moderna e friendly

## 📁 Struttura File

```
Ipermela-ordini/
├── index.html           # Struttura HTML principale
├── styles.css           # Stili e responsive design
├── script.js            # Logica JavaScript e integrazione Supabase
├── supabase-setup.sql   # Schema database Supabase
├── .gitignore          # File da escludere da Git
└── README.md           # Questa documentazione
```

## 🔐 Sicurezza

- Le chiavi Supabase sono configurate con restrizioni RLS (Row Level Security)
- Nessuna informazione sensibile memorizzata localmente
- Connessione sicura HTTPS con Supabase

## 📝 Note

- I prezzi sono in Euro (€)
- IVA calcolata al 22%
- I prodotti personalizzati vengono salvati nel database cloud
- Gli ordini includono timestamp automatico

## 🤝 Supporto

Per problemi o domande, contatta il team di sviluppo.

---

**Versione:** 1.0.0  
**Ultimo aggiornamento:** Novembre 2024  
**Sviluppato con ❤️ per Ipermela Store**
