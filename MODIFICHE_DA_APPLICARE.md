# MODIFICHE DA APPLICARE

## Hai 2 modi per procedere:

### OPZIONE A (FACILE): Copia-incolla manuale 
### OPZIONE B (AUTOMATICO): Scarica i file già modificati

---

# OPZIONE A: Copia-Incolla Manuale

## 1️⃣ MODIFICA: script.js

### Modifica 1: Event Listener (circa linea 500)
**Trova** la funzione `setupEventListeners()`, vai alla fine (cerca `confirm Order`)
**Aggiungi PRIMA della chiusura finale }:**

```javascript
    // Export all orders button - PDF
    const exportAllOrdersBtn = document.getElementById('export-all-orders-btn');
    if (exportAllOrdersBtn) {
        exportAllOrdersBtn.addEventListener('click', generateAllOrdersPDF);
    }
```

---

### Modifica 2: Pulsanti PDF (cerca "delete-order-btn" circa linea 850)
**Trova questo codice:**
```javascript
                ${canDeleteOrder(order) ? `
                    <button class="delete-order-btn" onclick="deleteOrder(${order.id})">
                        Elimina Ordine
                    </button>
                ` : ''}
```

**SOSTITUISCI con:**
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

### Modifica 3: Funzione helper (dopo deleteOrder, circa linea 920)
**Dopo la funzione `async function deleteOrder()` aggiungi:**

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

## 2️⃣ MODIFICA: styles.css

**Vai alla FINE del file** (dopo `}` finale) e **aggiungi:**

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

/* Responsive PDF Export */
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

# OPZIONE B: File già modificati (più veloce)

Puoi scaricare i file già modificati qui:
- I file modificati sono nella PR #2 su GitHub
- Oppure segui l'opzione A per fare le modifiche manualmente

---

## ✅ Dopo le modifiche:

1. Salva entrambi i file
2. Testa in locale con Live Server
3. Se tutto funziona:
```bash
git add .
git commit -m "Aggiunto export PDF"
git push origin feature/pdf-export
```
4. Mergi la PR su main
5. Netlify deploya automaticamente!

---

## 🧪 Come testare:

1. Apri l'app in locale
2. Fai login
3. Vai su "Ordini Salvati"
4. Dovresti vedere:
   - Pulsante "📄 Esporta Tutti gli Ordini in PDF" in alto
   - Pulsante "📄 PDF" su ogni ordine
5. Clicca e scarica i PDF!

---

**IMPORTANTE**: I PDF includeranno il logo Ipermela automaticamente!
