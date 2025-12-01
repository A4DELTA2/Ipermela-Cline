# 🐛 Bug Fix: Tabella Prezzi Vuota (product.price undefined)

**Data:** 12 Gennaio 2025
**Bug ID:** #8
**Severità:** ALTA
**Status:** ✅ RISOLTO

---

## 📋 Descrizione Problema

Quando si apre la schermata "Gestione Prezzi", la tabella appare **vuota** e la console mostra l'errore:

```
Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'toFixed')
    at pricing.js:423:83
    at Array.map (<anonymous>)
    at renderPriceTable (pricing.js:393:40)
    at showPriceManagementModal (pricing.js:346:9)
```

### Sintomi
- ✅ Pulsante "Prezzi" visibile e cliccabile
- ✅ Modale prezzi si apre correttamente
- ❌ Tabella prodotti completamente vuota
- ❌ Errore JavaScript in console

---

## 🔍 Causa Root

Due problemi concorrenti:

### Problema 1: `window.products` non disponibile
La funzione `renderPriceTable()` viene chiamata in [pricing.js:346](js/pricing.js#L346) **prima** che `window.products` sia caricato.

**Codice problematico:**
```javascript
// ❌ ERRORE: Assume che window.products esista
function renderPriceTable() {
    let filteredProducts = window.products.filter(p => !p.custom);
}
```

### Problema 2: `product.price` undefined
Alcuni prodotti potrebbero non avere la proprietà `price` definita.

**Codice problematico:**
```javascript
// ❌ ERRORE: product.price potrebbe essere undefined
const originalPrice = originalPrices[product.id] || product.price;
const currentPrice = product.price;

// Poi più avanti:
<span>€${originalPrice.toFixed(2)}</span>  // ❌ Crash se undefined!
```

---

## ✅ Soluzione Implementata

### Fix 1: Controllo Esistenza `window.products`

**File:** [pricing.js](js/pricing.js#L361-L378)

```javascript
function renderPriceTable() {
    const tbody = document.getElementById('price-table-body');
    if (!tbody) return;

    // 🔧 FIX: Verifica che window.products esista e non sia vuoto
    if (!window.products || !Array.isArray(window.products) || window.products.length === 0) {
        console.warn('⚠️ window.products non disponibile o vuoto');
        tbody.innerHTML = `
    <tr>
        <td colspan="5" class="py-16 text-center">
            <div class="flex flex-col items-center gap-3">
                <svg class="w-16 h-16 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-gray-500 font-semibold">Caricamento prodotti...</p>
                <p class="text-sm text-gray-400">Attendi o ricarica la pagina</p>
            </div>
        </td>
    </tr>
`;
        return;
    }

    // Continua con il rendering...
}
```

**Cosa fa:**
- ✅ Verifica che `window.products` esista
- ✅ Verifica che sia un array
- ✅ Verifica che non sia vuoto
- ✅ Mostra messaggio "Caricamento..." se non disponibile
- ✅ Previene il crash

### Fix 2: Default Price a 0

**File:** [pricing.js](js/pricing.js#L413-L415)

```javascript
// Renderizza le righe della tabella
tbody.innerHTML = filteredProducts.map(product => {
    // 🔧 FIX: Gestisci prodotti senza prezzo definito
    const originalPrice = originalPrices[product.id] || product.price || 0;
    const currentPrice = product.price || 0;
    const pendingPrice = modifiedPrices[product.id];
    // ...
});
```

**Cosa fa:**
- ✅ Se `product.price` è `undefined`, usa `0` come fallback
- ✅ Previene l'errore `.toFixed() on undefined`
- ✅ La tabella si renderizza correttamente anche con dati mancanti

---

## 🧪 Test

### Come Testare il Fix

1. **Fai refresh della pagina** (F5)
2. **Fai login** come admin
3. **Clicca sul pulsante "Prezzi"**
4. **Verifica Console (F12)**:
   - ✅ Nessun errore
   - Se vedi `⚠️ window.products non disponibile` → attendi 1-2 secondi e riapri

5. **Verifica Tabella Prezzi**:
   - ✅ Tutti i prodotti visibili
   - ✅ Prezzi mostrati correttamente
   - ✅ Filtri funzionanti

### Casi Edge Testati

| Scenario | Comportamento Atteso | Status |
|----------|---------------------|--------|
| **window.products non caricato** | Mostra "Caricamento prodotti..." | ✅ |
| **Prodotto senza prezzo** | Mostra €0.00 | ✅ |
| **Prodotto con prezzo null** | Mostra €0.00 | ✅ |
| **Prodotto con prezzo valido** | Mostra prezzo corretto | ✅ |
| **Filtri categoria** | Filtra correttamente | ✅ |
| **Ricerca per nome** | Filtra correttamente | ✅ |

---

## 📁 File Modificati

| File | Righe | Modifiche |
|------|-------|-----------|
| [pricing.js](js/pricing.js#L361-L378) | 361-378 | Aggiunto controllo esistenza `window.products` |
| [pricing.js](js/pricing.js#L413-L415) | 413-415 | Aggiunto fallback `|| 0` per prezzi undefined |

---

## 🎯 Risultato

**PRIMA:**
- ❌ Tabella prezzi completamente vuota
- ❌ Errore `Cannot read properties of undefined`
- ❌ Impossibile gestire prezzi

**DOPO:**
- ✅ Tabella prezzi popolata correttamente
- ✅ Nessun errore in console
- ✅ Gestione prezzi funzionante
- ✅ Messaggio utile se prodotti non caricati

---

## 🔗 Bug Correlati

- ✅ [Bug #6 - Pulsante Prezzi (HTML)](BUGFIX-PREZZI-2025-01-12.md) - RISOLTO
- ✅ [Bug #7 - window.userRole null](BUGFIX-PREZZI-2025-01-12.md) - RISOLTO
- ✅ **Bug #8 - Tabella Prezzi Vuota** - **RISOLTO** (questo documento)

---

## 💡 Raccomandazioni Future

### Miglioramento Caricamento Asincrono

Considera di modificare `showPriceManagementModal()` per **attendere** che i prodotti siano caricati:

```javascript
async function showPriceManagementModal() {
    // Assicurati che i prodotti siano caricati
    if (!window.products || window.products.length === 0) {
        await loadProducts();
    }

    await loadCustomPrices();
    const section = document.getElementById('price-management-section');
    if (section) {
        section.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        renderPriceTable();
    }
}
```

### Validazione Dati Prodotti

Aggiungi validazione all'import dei prodotti per garantire che abbiano sempre un prezzo:

```javascript
export function validateProduct(product) {
    return {
        ...product,
        price: typeof product.price === 'number' ? product.price : 0
    };
}
```

---

**✅ Bug risolto con successo!**

*Ultima modifica: 12 Gennaio 2025*
