# 🎨 Colori Prodotti Apple 2025

Questo documento contiene tutti i colori ufficiali disponibili per i prodotti Apple nel 2025, raccolti da ricerche online.

---

## 📱 iPhone

### iPhone 17 Pro Max / iPhone 17 Pro
**Importante:** Per la prima volta nella storia dei modelli Pro, **non c'è alcuna variante nera o grigio scuro**!

Colori disponibili (solo 3):
- **Argento** (Silver) - `#E8E8E8` → `#C0C0C0`
- **Blu Profondo** (Deep Blue) - `#1E3A5F` → `#0A1929`
- **Arancione Cosmico** (Cosmic Orange) - `#FF6B35` → `#C44D34` ⭐ NUOVO AUDACE!

📅 Disponibilità: dal 19 settembre 2025

### iPhone 16 Plus / iPhone 16
Colori disponibili (5):
- **Nero** (Black)
- **Bianco** (White)
- **Rosa** (Pink)
- **Verde Acqua** (Teal)
- **Blu Oltremare** (Ultramarine Blue)

💾 Storage: 128GB, 256GB, 512GB

---

## 💻 Mac

### MacBook Air M4 (13" e 15")
Colori disponibili (4):
- **Midnight** (Mezzanotte) - `#1C1C1E` → `#000000`
- **Starlight** - `#F5F5F0` → `#E8E8E0`
- **Silver** (Argento) - `#E8E8E8` → `#C0C0C0`
- **Sky Blue** (Azzurro Cielo) - `#87CEEB` → `#4A90E2` ⭐ NUOVO 2025!

📝 Note:
- Sky Blue è un bellissimo azzurro metallico chiaro con gradiente dinamico
- Memoria base: 16GB (espandibile fino a 32GB)
- Storage: da 256GB fino a 2TB

### MacBook Pro 14" / 16" (M4 Pro/Max)
Colori disponibili (3):
- **Space Black** (Nero Siderale)
- **Silver** (Argento)
- **Space Gray** (Grigio Siderale)

### iMac 24" M4
Colori disponibili (7):
- **Blue** (Blu)
- **Green** (Verde)
- **Pink** (Rosa)
- **Silver** (Argento)
- **Yellow** (Giallo)
- **Orange** (Arancione)
- **Purple** (Viola)

### Mac mini M4 / M4 Pro
Colori disponibili (1):
- **Silver** (Argento)

### Mac Studio M4 Max
Colori disponibili (1):
- **Silver** (Argento)

---

## 📲 iPad

### iPad Pro 13" / 11" (M5)
Colori disponibili (2):
- **Space Black** (Nero Siderale) - `#2C2C2E` → `#1C1C1E`
- **Silver** (Argento) - `#E8E8E8` → `#C0C0C0`

💾 Storage: 256GB, 512GB, 1TB, 2TB

⚠️ **Differenze hardware per storage:**
- **256GB e 512GB**: 12GB RAM, M5 con 9-core CPU, 10-core GPU
- **1TB e 2TB**: 16GB RAM, M5 con 10-core CPU
- Nano-texture disponibile solo su modelli 1TB+

📅 Annunciato: 15 ottobre 2025 | Rilasciato: 22 ottobre 2025

### iPad Air 13" / 11"
Colori disponibili (4):
- **Space Gray** (Grigio Siderale)
- **Starlight**
- **Purple** (Viola)
- **Blue** (Blu)

### iPad 11"
Colori disponibili (4):
- **Silver** (Argento)
- **Space Gray** (Grigio Siderale)
- **Blue** (Blu)
- **Pink** (Rosa)

### iPad mini
Colori disponibili (4):
- **Space Gray** (Grigio Siderale)
- **Starlight**
- **Pink** (Rosa)
- **Purple** (Viola)

---

## 🎧 Accessori

### AirPods
- **White** (Bianco) - colore unico per tutti i modelli

### Apple Watch Series 10
Colori cassa:
- **Midnight** (Alluminio)
- **Starlight** (Alluminio)
- **Silver** (Alluminio)
- **Rose Gold** (Alluminio)
- **Natural Titanium** (Titanio)
- **Gold Titanium** (Titanio)
- **Slate Titanium** (Titanio)

### Apple Watch SE
Colori cassa:
- **Midnight** (Alluminio)
- **Starlight** (Alluminio)
- **Silver** (Alluminio)

### Apple Watch Ultra 2
Colori cassa:
- **Natural Titanium** (Titanio)
- **Black Titanium** (Titanio) - NUOVO!

---

## 📊 Implementazione Tecnica

### Struttura Dati Prodotti

```javascript
{
    id: 1,
    name: 'iPhone 17 Pro Max',
    price: 1339,
    category: 'iphone',
    icon: '📱',
    imageUrl: 'https://store.storeimages.cdn-apple.com/...',
    colors: [
        { name: 'Argento', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)' },
        { name: 'Blu Profondo', code: 'deep-blue', gradient: 'linear-gradient(135deg, #1E3A5F 0%, #0A1929 100%)' },
        { name: 'Arancione Cosmico', code: 'cosmic-orange', gradient: 'linear-gradient(135deg, #FF6B35 0%, #C44D34 100%)' }
    ],
    storage: ['256GB', '512GB', '1TB']
}
```

### Gradienti CSS per i Colori

```css
/* iPhone 17 Pro */
.silver-iphone17 {
    background: linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%);
}

.deep-blue-iphone17 {
    background: linear-gradient(135deg, #1E3A5F 0%, #0A1929 100%);
}

.cosmic-orange-iphone17 {
    background: linear-gradient(135deg, #FF6B35 0%, #C44D34 100%);
}

/* MacBook Air M4 */
.midnight-mac {
    background: linear-gradient(135deg, #1C1C1E 0%, #000000 100%);
}

.starlight-mac {
    background: linear-gradient(135deg, #F5F5F0 0%, #E8E8E0 100%);
}

.silver-mac {
    background: linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%);
}

.skyblue-mac {
    background: linear-gradient(135deg, #87CEEB 0%, #4A90E2 100%);
}

/* iPad Pro M5 */
.space-black-ipad {
    background: linear-gradient(135deg, #2C2C2E 0%, #1C1C1E 100%);
}

.silver-ipad {
    background: linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%);
}
```

---

**Ultimo aggiornamento:** 25 Novembre 2025
**Compilato da:** Claude Code Agent
