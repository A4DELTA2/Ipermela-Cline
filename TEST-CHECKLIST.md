# ✅ Checklist Test Refactoring Ipermela-Cline

## 🚀 Prima di Iniziare
- [ ] Live Server avviato (`http://localhost:5500`)
- [ ] Console browser aperta (F12)
- [ ] Nessun errore rosso nella console

---

## 🔐 Test Autenticazione

### Login
- [ ] Vai alla schermata di login
- [ ] Inserisci email e password
- [ ] Click su "Accedi"
- [ ] ✅ Login effettuato con successo
- [ ] ✅ Redirect all'app principale
- [ ] ✅ Email utente mostrata nell'header

**Se fallisce:**
- Controlla console → errori di autenticazione?
- Verifica credenziali Supabase in `js/config.js`

### Logout
- [ ] Click su pulsante Logout (desktop o mobile)
- [ ] ✅ Conferma richiesta
- [ ] ✅ Redirect a schermata login
- [ ] ✅ Carrello svuotato

---

## 📦 Test Caricamento Prodotti

### Rendering Iniziale
- [ ] Dopo login, prodotti si caricano
- [ ] ✅ Vedi griglia prodotti (iPhone, Mac, iPad, Accessori)
- [ ] ✅ Icone prodotti visualizzate
- [ ] ✅ Prezzi corretti mostrati

**Controlla nella Console:**
```javascript
console.log(window.products); // Dovrebbe mostrare array prodotti
```

### Filtri Categoria
- [ ] Click su "iPhone" → Solo iPhone mostrati
- [ ] Click su "Mac" → Solo Mac mostrati
- [ ] Click su "iPad" → Solo iPad mostrati
- [ ] Click su "Accessori" → Solo accessori
- [ ] Click su "Tutti" → Tutti i prodotti

### Ricerca
- [ ] Digita "Pro" nella barra ricerca
- [ ] ✅ Solo prodotti con "Pro" nel nome
- [ ] Cancella ricerca
- [ ] ✅ Tutti i prodotti tornano visibili

---

## 🛒 Test Carrello

### Aggiunta Prodotti Semplici (Senza Varianti)
- [ ] Click su "Aggiungi al Carrello" su un accessorio
- [ ] ✅ Notifica "Prodotto aggiunto"
- [ ] ✅ Badge carrello aggiornato (numero)
- [ ] ✅ Prodotto appare nella sezione Carrello

### Aggiunta Prodotti con Varianti (iPhone/Mac)
- [ ] Espandi card iPhone 17 Pro Max (click su card)
- [ ] Seleziona un colore (es. Blu Profondo)
- [ ] Seleziona storage (es. 512GB)
- [ ] Click "Aggiungi al Carrello"
- [ ] ✅ Prodotto aggiunto con variante corretta
- [ ] ✅ Prezzo aggiornato in base a storage

### Gestione Quantità
- [ ] Nel carrello, click su "+" (aumenta quantità)
- [ ] ✅ Quantità incrementata
- [ ] ✅ Totale aggiornato
- [ ] Click su "-" (diminuisci quantità)
- [ ] ✅ Quantità decrementata
- [ ] ✅ Se quantità = 0, prodotto rimosso

### Svuota Carrello
- [ ] Click su "Svuota Carrello"
- [ ] ✅ Conferma richiesta
- [ ] ✅ Carrello completamente vuoto
- [ ] ✅ Badge = 0

**Controlla nella Console:**
```javascript
console.log(window.cart); // Array con prodotti nel carrello
```

---

## 📋 Test Ordini

### Crea Ordine
- [ ] Aggiungi almeno 2 prodotti al carrello
- [ ] Click su "Crea Ordine"
- [ ] ✅ Modal ordine si apre
- [ ] Compila campi:
  - Nome cliente: "Mario Rossi"
  - Email: "mario@test.it"
  - Telefono: "3331234567"
  - Note: "Ordine di test"
- [ ] Click "Salva Ordine"
- [ ] ✅ Notifica "Ordine salvato"
- [ ] ✅ Modal si chiude
- [ ] ✅ Ordine appare in "Ordini Salvati"
- [ ] ✅ Carrello svuotato automaticamente

### Visualizza Ordini
- [ ] Scorri a "Ordini Salvati"
- [ ] ✅ Vedi l'ordine appena creato
- [ ] ✅ Numero ordine, data, cliente, totale visibili
- [ ] Espandi ordine (click su card)
- [ ] ✅ Dettagli prodotti mostrati

### Elimina Ordine (se hai permessi)
- [ ] Click su "Elimina" su un ordine
- [ ] ✅ Conferma richiesta
- [ ] ✅ Ordine eliminato
- [ ] ✅ Scompare dalla lista

**Nota:** Solo admin o creatore possono eliminare ordini

---

## 📄 Test Generazione PDF

### PDF Singolo Ordine
- [ ] Click su "📄 PDF" su un ordine salvato
- [ ] ✅ Notifica "Generazione PDF in corso..."
- [ ] ✅ Download PDF inizia
- [ ] Apri PDF scaricato
- [ ] ✅ Header Ipermela Store
- [ ] ✅ Info ordine corrette
- [ ] ✅ Tabella prodotti formattata
- [ ] ✅ Totali (Subtotale, IVA 22%, Totale)
- [ ] ✅ Note (se inserite)

### PDF Tutti gli Ordini
- [ ] Click su "Esporta PDF Completo" (se presente)
- [ ] ✅ Download PDF multi-pagina
- [ ] Apri PDF
- [ ] ✅ Pagina riepilogo con tutti gli ordini
- [ ] ✅ Pagine dettaglio per ogni ordine
- [ ] ✅ Totale generale calcolato

---

## 💰 Test Gestione Prezzi (Solo Admin/Operator)

### Apri Gestione Prezzi
- [ ] Click su "Gestione Prezzi" nell'header
- [ ] ✅ Modal prezzi si apre
- [ ] ✅ Tabella prodotti con prezzi visibile

**Se non vedi il pulsante:**
- Verifica ruolo utente: `console.log(window.userRole)`
- Solo `admin` o `operator` possono modificare prezzi

### Modifica Prezzo
- [ ] Cerca un prodotto (es. "iPhone 16")
- [ ] Modifica prezzo nel campo input (es. 899 → 850)
- [ ] Click su "Salva" (✓ verde)
- [ ] ✅ Notifica "Prezzo aggiornato"
- [ ] ✅ Prezzo salvato su Supabase
- [ ] Chiudi modal
- [ ] ✅ Prezzo aggiornato nella griglia prodotti

### Reset Prezzo
- [ ] Riapri Gestione Prezzi
- [ ] Click su "Reset" (🔄) sul prodotto modificato
- [ ] ✅ Conferma richiesta
- [ ] ✅ Prezzo ripristinato all'originale
- [ ] ✅ Notifica "Prezzo ripristinato"

### Filtri e Ricerca Prezzi
- [ ] Filtra per categoria (iPhone, Mac, etc.)
- [ ] ✅ Solo prodotti categoria selezionata
- [ ] Usa barra ricerca
- [ ] ✅ Filtro per nome funziona

---

## 🎨 Test UI & UX

### Card Espandibili
- [ ] Click su card prodotto (iPhone/Mac/iPad con varianti)
- [ ] ✅ Card si espande con animazione smooth
- [ ] ✅ Opzioni colori/storage/upgrades mostrate
- [ ] Click di nuovo
- [ ] ✅ Card si comprime

### Notifiche
- [ ] Esegui azioni (aggiungi al carrello, salva ordine)
- [ ] ✅ Notifiche toast appaiono in alto a destra
- [ ] ✅ Colori corretti (verde=success, blu=info, rosso=error)
- [ ] ✅ Scompaiono automaticamente dopo 3 secondi

### Mobile Menu
- [ ] Riduci larghezza finestra browser (< 768px)
- [ ] ✅ Menu hamburger appare
- [ ] Click su menu
- [ ] ✅ Dropdown si apre
- [ ] ✅ Azioni disponibili (Gestione Prezzi, Aggiungi, Carrello, Logout)
- [ ] Click fuori dal menu
- [ ] ✅ Dropdown si chiude

### Responsive
- [ ] Testa a diverse risoluzioni:
  - Desktop (1920x1080)
  - Tablet (768x1024)
  - Mobile (375x667)
- [ ] ✅ Layout si adatta correttamente
- [ ] ✅ Bottoni cliccabili
- [ ] ✅ Testo leggibile

---

## 🔍 Test Console Browser (F12)

### Nessun Errore Critico
- [ ] Apri Console (F12)
- [ ] ✅ Nessun errore rosso grave
- [ ] ✅ Solo warning minori tollerabili (se presenti)

### Moduli Caricati
- [ ] Tab "Network" → Filter "JS"
- [ ] ✅ `app.js` (200 OK)
- [ ] ✅ `config.js` (200 OK)
- [ ] ✅ `auth.js` (200 OK)
- [ ] ✅ `products.js` (200 OK)
- [ ] ✅ `cart.js` (200 OK)
- [ ] ✅ `orders.js` (200 OK)
- [ ] ✅ `pricing.js` (200 OK)
- [ ] ✅ `ui.js` (200 OK)
- [ ] ✅ `utils.js` (200 OK)
- [ ] ✅ `data.js` (200 OK)
- [ ] ✅ `generator.js` (200 OK)

### Variabili Globali Esposte
Esegui nella console:
```javascript
// Devono essere tutte definite (non undefined)
console.log(window.products);        // Array prodotti
console.log(window.cart);            // Array carrello
console.log(window.currentUser);     // Oggetto utente
console.log(window.userRole);        // Stringa ruolo
console.log(window.savedOrders);     // Array ordini
console.log(window.renderProducts);  // Function
console.log(window.renderCart);      // Function
```

---

## 🐛 Troubleshooting Comune

### Problema: "Function not defined" su click bottone
**Soluzione:**
- Controlla che `app.js` abbia eseguito `exposeGlobals()`
- Verifica in console: `console.log(window.deleteOrder)` → deve essere Function

### Problema: Moduli non caricano (404)
**Soluzione:**
- Verifica che Live Server sia avviato
- URL deve essere `http://localhost:5500`, NON `file://`
- Controlla che file esistano in `/js/`

### Problema: Login fallisce
**Soluzione:**
- Verifica credenziali Supabase in `js/config.js`
- Controlla connessione internet
- Verifica errore specifico in console

### Problema: Prezzi non si aggiornano
**Soluzione:**
- Verifica ruolo utente: `console.log(window.userRole)`
- Solo `admin` e `operator` possono modificare prezzi
- Controlla permessi tabella `product_prices` su Supabase

### Problema: PDF non scarica
**Soluzione:**
- Verifica che `generator.js` sia caricato
- Controlla console per errori jsPDF
- Verifica che browser permetta download

---

## ✅ Test Completati con Successo!

Se tutti i test sono passati:
- ✅ **Refactoring funziona perfettamente**
- ✅ **Nessuna funzionalità persa**
- ✅ **Codice è ora modulare e manutenibile**

### Prossimi Passi:
1. ✅ Backup `script.js` vecchio
2. ✅ Rimuovere file deprecati (opzionale)
3. ✅ Committare cambio su Git
4. ✅ Deploy in produzione

---

## 📊 Report Test

**Data Test**: _______________

**Tester**: _______________

**Risultato Generale**:
- [ ] ✅ Tutti i test passati
- [ ] ⚠️ Alcuni test falliti (specificare sotto)
- [ ] ❌ Test critici falliti

**Note Aggiuntive:**
```
____________________________________________
____________________________________________
____________________________________________
```

---

**🎉 Ottimo lavoro! Il refactoring è completo e testato!**
