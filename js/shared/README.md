# Shared Utilities

Moduli condivisi riutilizzabili per l'applicazione Ipermela Store.

## 📁 Struttura

```
js/shared/
├── calculations.js    # Calcoli IVA e totali
├── validation.js      # Validazione input utente
├── notifications.js   # Helper per notifiche UI
├── emptyState.js     # Componenti empty state
└── README.md         # Questa documentazione
```

## 🧮 calculations.js

Funzioni centralizzate per calcoli IVA e totali ordini.

### Funzioni principali

#### `calculateTotals(items)`
Calcola subtotal, IVA e totale da un array di items.

```javascript
import { calculateTotals } from './shared/calculations.js';

const items = [
  { price: 122, quantity: 2 },  // 244€
  { price: 61, quantity: 1 }     // 61€
];

const { subtotal, tax, total } = calculateTotals(items);
// subtotal: 250€ (imponibile)
// tax: 55€ (IVA 22%)
// total: 305€
```

#### `calculateSubtotal(totalWithTax)`
Calcola il subtotal (imponibile) da un totale IVA inclusa.

```javascript
const subtotal = calculateSubtotal(122); // 100€
```

#### `calculateTax(totalWithTax)`
Calcola l'IVA da un totale IVA inclusa.

```javascript
const tax = calculateTax(122); // 22€
```

#### `formatPrice(amount)`
Formatta un importo come valuta Euro.

```javascript
formatPrice(1234.56); // "1.234,56 €"
```

**Nota**: Tutti i prezzi nell'app sono **IVA inclusa** (22%). Le funzioni scorporano l'IVA per mostrare imponibile e IVA separati.

## ✅ validation.js

Funzioni per validazione input utente.

### Funzioni disponibili

```javascript
import {
  validateEmail,
  validatePhone,
  validateRequired,
  validatePrice,
  validateRange,
  validateLength
} from './shared/validation.js';

// Email
validateEmail('user@example.com'); // true
validateEmail('invalid'); // false

// Telefono (formati multipli accettati)
validatePhone('+39 123 456 7890'); // true
validatePhone('123-456-7890'); // true

// Campo obbligatorio
validateRequired('Mario Rossi'); // true
validateRequired('   '); // false

// Prezzo (numero positivo)
validatePrice(99.99); // true
validatePrice(-10); // false

// Range numerico
validateRange(5, 1, 10); // true
validateRange(15, 1, 10); // false

// Lunghezza stringa
validateLength('test', 2, 10); // true
validateLength('x', 2, 10); // false
```

## 🔔 notifications.js

Helper per mostrare notifiche UI.

### API

```javascript
import { notify } from './shared/notifications.js';

// Notifica successo
notify.success('Ordine salvato con successo!');

// Notifica errore
notify.error('Errore nel caricamento');

// Notifica informativa
notify.info('Caricamento in corso...');

// Notifica avviso
notify.warning('Attenzione: alcuni dati mancano');
```

### Funzioni individuali

```javascript
import {
  notifySuccess,
  notifyError,
  notifyInfo,
  notifyWarning
} from './shared/notifications.js';

notifySuccess('Operazione completata');
```

**Compatibilità**: Tutte le funzioni verificano che `window.showNotification` sia disponibile prima di chiamarla.

## 🗂️ emptyState.js

Componenti riutilizzabili per stati vuoti.

### Funzione generica

```javascript
import { renderEmptyState } from './shared/emptyState.js';

// Empty state personalizzato
const html = renderEmptyState({
  icon: 'cart',  // o 'orders', 'products', 'search', 'generic'
  title: 'Carrello vuoto',
  message: 'Aggiungi prodotti per iniziare',
  compact: false,  // usa meno padding
  withBorder: true // mostra bordo e background
});

// Con icona custom (SVG path)
const html = renderEmptyState({
  icon: '<path d="M12 2L2 7l10 5..."/>',
  title: 'Nessun dato'
});
```

### Helper predefiniti

```javascript
import {
  renderEmptyCart,
  renderEmptyOrders,
  renderEmptyProducts,
  renderEmptySearch
} from './shared/emptyState.js';

// Carrello vuoto
cartDiv.innerHTML = renderEmptyCart();

// Ordini non trovati
ordersDiv.innerHTML = renderEmptyOrders();

// Prodotti non trovati (contesto normale)
productsDiv.innerHTML = renderEmptyProducts();

// Prodotti non trovati (tabella)
tbody.innerHTML = renderEmptyProducts(true);

// Ricerca senza risultati
searchDiv.innerHTML = renderEmptySearch('iPhone');
```

**Dark mode**: Tutti i componenti sono compatibili con il dark mode usando classi Tailwind `dark:`.

## 🎯 Best Practices

### Import

Importa solo ciò di cui hai bisogno per ottimizzare il bundle:

```javascript
// ✅ Buono - import specifici
import { calculateTotals } from './shared/calculations.js';
import { notify } from './shared/notifications.js';

// ❌ Evitare - import tutto
import * as calculations from './shared/calculations.js';
```

### Validazione form

```javascript
import { validateRequired, validateEmail } from './shared/validation.js';
import { notify } from './shared/notifications.js';

function handleSubmit(formData) {
  if (!validateRequired(formData.name)) {
    notify.error('Il nome è obbligatorio');
    return;
  }

  if (!validateEmail(formData.email)) {
    notify.error('Email non valida');
    return;
  }

  // Procedi con il salvataggio...
}
```

### Calcoli carrello

```javascript
import { calculateTotals } from './shared/calculations.js';

function updateCart(items) {
  const { subtotal, tax, total } = calculateTotals(items);

  // Aggiorna UI
  subtotalEl.textContent = formatPrice(subtotal);
  taxEl.textContent = formatPrice(tax);
  totalEl.textContent = formatPrice(total);
}
```

## 🧪 Testing

I moduli shared hanno test completi in `tests/shared/`:

```bash
# Esegui tutti i test shared
npm test tests/shared/

# Test specifici
npm test tests/shared/calculations.test.js
npm test tests/shared/validation.test.js
```

## 📝 Dipendenze

### calculations.js
- Dipendenze: `config.js` (per `IVA_MULTIPLIER`, `IVA_RATE`)
- Usato da: `cart.js`, `orders/service.js`, `pdf/components/`

### validation.js
- Dipendenze: Nessuna
- Usato da: Form handlers, input validation

### notifications.js
- Dipendenze: `window.showNotification` (da `ui.js`)
- Usato da: `orders/service.js`, error handlers

### emptyState.js
- Dipendenze: Tailwind CSS (per styling)
- Usato da: `cart.js`, `orders/dom.js`, `pricing/dom.js`

## 🔄 Changelog

### v2.0.0 - Refactoring Completo
- ✅ Creati tutti i moduli shared
- ✅ Migrati moduli esistenti per usare utilities condivise
- ✅ Eliminati duplicati (~600+ righe di codice)
- ✅ Aggiunta documentazione completa
- ✅ Aggiunto supporto dark mode

### Prossimi sviluppi
- [ ] Shared filter utilities
- [ ] Shared database layer (CRUD generico)
- [ ] Aumentare test coverage >70%

## 💡 Contribuire

Quando aggiungi nuove utilities shared:

1. **Crea il modulo** in `js/shared/`
2. **Aggiungi JSDoc** completo per tutte le funzioni esportate
3. **Scrivi i test** in `tests/shared/`
4. **Aggiorna questo README** con esempi d'uso
5. **Migra il codice esistente** per usare la nuova utility

**Principi guida**:
- ✅ Funzioni pure quando possibile
- ✅ Zero side effects
- ✅ Gestione errori robusta
- ✅ Validazione input
- ✅ Documentazione ed esempi chiari
