# 📄 Istruzioni per Implementare Export PDF

## ✅ Cosa è già stato fatto

1. ✅ Aggiunta libreria jsPDF in `index.html`
2. ✅ Creato file `pdf-generator.js` con tutte le funzioni PDF
3. ✅ Aggiunto pulsante "Esporta Tutti gli Ordini in PDF"
4. ✅ Il file pdf-generator.js è già collegato in `index.html`

---

## 🔧 Modifiche da fare in VS Code

### 📝 PASSO 1: Modifica `script.js`

Apri il file `script.js` e trova la funzione `setupEventListeners()` (circa linea 200).

**ALLA FINE della funzione** (prima della chiusura `}`), **AGGIUNGI**:

```javascript
    // Export all orders button
    const exportAllOrdersBtn = document.getElementById('export-all-orders-btn');
    if (exportAllOrdersBtn) {
        exportAllOrdersBtn.addEventListener('click', generateAllOrdersPDF);
    }
```

---

### 📝 PASSO 2: Modifica funzione `renderSavedOrders()`

Cerca la funzione `renderSavedOrders()` nel file `script.js` (circa linea 800).

Trova la parte dove genera l'HTML per ogni ordine, cerca questa riga:

```javascript
${canDeleteOrder(order) ? `
    <button class="delete-order-btn" onclick="deleteOrder(${order.id})">
        Elimina Ordine
    </button>
` : ''}
```

**SOSTITUISCILA con**:

```javascript
<div class="order-actions">
    <button class="export-pdf-btn" onclick="exportOrderPDF(${order.id})" title="Scarica PDF">
        📄 PDF
    </button>
    ${canDeleteOrder(order) ? `
        <button class="delete-order-btn" onclick="deleteOrder(${order.id})">
            Elimina Ordine
        </button>
    ` : ''}
</div>
```

---

### 📝 PASSO 3: Aggiungi funzione helper `exportOrderPDF()`

**DOPO** la funzione `deleteOrder()` nel file `script.js`, **AGGIUNGI**:

```javascript
// Wrapper per export PDF di un singolo ordine
function exportOrderPDF(orderId) {
    const order = savedOrders.find(o => o.id === orderId);
    if (order) {
        generateOrderPDF(order);
    } else {
        showNotification('Ordine non trovato!', 'error');
    }
}
```

---

### 🎨 PASSO 4: Aggiungi stili CSS

Apri il file `styles.css` e **ALLA FINE del file**, **AGGIUNGI**:

```css
/* ===== STILI PDF EXPORT ===== */

.orders-toolbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    padding: 0 10px;
}

.btn-export-all {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-export-all:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-export-all:active {
    transform: translateY(0);
}

.order-actions {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    flex-wrap: wrap;
}

.export-pdf-btn {
    background: #007aff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    flex: 0 0 auto;
}

.export-pdf-btn:hover {
    background: #0051d5;
    transform: scale(1.05);
}

.delete-order-btn {
    flex: 1;
}

/* Responsive */
@media (max-width: 768px) {
    .orders-toolbar {
        justify-content: center;
    }
    
    .btn-export-all {
        width: 100%;
        max-width: 300px;
    }
    
    .order-actions {
        flex-direction: column;
    }
    
    .export-pdf-btn,
    .delete-order-btn {
        width: 100%;
    }
}
```

---

## ✅ Come testare

1. Salva tutte le modifiche
2. Apri `index.html` con Live Server o nel browser
3. Fai login
4. Nella sezione "Ordini Salvati":
   - Dovresti vedere il pulsante "📄 Esporta Tutti gli Ordini in PDF" in alto
   - Ogni ordine dovrebbe avere un pulsante "📄 PDF" accanto a "Elimina Ordine"
5. Clicca su "📄 PDF" per un ordine → Scarica il PDF singolo
6. Clicca su "📄 Esporta Tutti" → Scarica un PDF con tutti gli ordini

---

## 🎨 Caratteristiche dei PDF generati

### PDF Singolo Ordine:
- Logo Ipermela in alto
- Info azienda
- Numero ordine e data
- Dati cliente (nome, email, telefono)
- Tabella prodotti con quantità e prezzi
- Subtotale, IVA, Totale
- Note (se presenti)
- Footer professionale

### PDF Tutti gli Ordini:
- Logo Ipermela
- Tabella riepilogo con tutti gli ordini
- Totale generale
- Dettaglio completo di ogni ordine (una pagina per ordine)
- Formato professionale pronto per stampa o invio

---

## 🐛 Troubleshooting

**Problema**: "generateOrderPDF is not defined"
- **Soluzione**: Assicurati che `pdf-generator.js` sia caricato nell'HTML (già fatto)

**Problema**: Il logo non appare nei PDF
- **Soluzione**: Verifica che il file `_logo_ipermela_nero.png` sia nella root del progetto

**Problema**: I pulsanti PDF non appaiono
- **Soluzione**: Controlla di aver aggiunto gli stili CSS e modificato la funzione `renderSavedOrders()`

---

## 🚀 Dopo il test locale

Quando tutto funziona:

```bash
git add .
git commit -m "Aggiunta funzionalità export PDF ordini"
git push origin feature/pdf-export
```

Poi mergi su main e Netlify deploya automaticamente!

---

## 📌 Note importanti

- Il logo viene caricato automaticamente all'avvio dell'app
- I PDF sono generati completamente lato client (nessun server necessario)
- I PDF includono IVA 22% automaticamente
- I file hanno nomi automatici tipo: `Ordine_12345_Mario_Rossi.pdf`
- Per l'export multiplo: `Tutti_gli_ordini_2025-11-24.pdf`

---

Se hai problemi, fammi sapere! 😊