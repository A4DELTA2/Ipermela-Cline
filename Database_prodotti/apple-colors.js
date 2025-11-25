/**
 * APPLE OFFICIAL COLORS DATABASE
 * Version: 1.0
 * Last Updated: Novembre 2025
 * 
 * Database completo dei colori ufficiali Apple per prodotti 2024-2025
 * Pronto per l'integrazione in Ipermela Store
 */

const APPLE_COLORS = {
    // ========================================
    // iPhone 17 Pro / Pro Max
    // ========================================
    iphone17Pro: {
        productName: 'iPhone 17 Pro / Pro Max',
        material: 'Aluminum unibody',
        year: 2025,
        colors: [
            {
                id: 'cosmic-orange',
                name: 'Cosmic Orange',
                officialName: 'Cosmic Orange',
                description: 'Arancione fluorescente audace con sfumature calde',
                hex: '#FF6B35',
                gradient: 'linear-gradient(135deg, #FF6B35 0%, #C44D34 100%)',
                imageUrl: 'https://placehold.co/600x800/FF6B35/ffffff?text=iPhone+17+Pro+Max+Cosmic+Orange',
                notes: 'Primo colore vivace per i modelli Pro in anni',
                popular: true
            },
            {
                id: 'deep-blue',
                name: 'Deep Blue',
                officialName: 'Deep Blue',
                description: 'Blu profondo e ricco, simile a Mood Indigo',
                hex: '#1E3A5F',
                gradient: 'linear-gradient(135deg, #1E3A5F 0%, #0A1929 100%)',
                imageUrl: 'https://placehold.co/600x800/1E3A5F/ffffff?text=iPhone+17+Pro+Max+Deep+Blue',
                notes: 'Sostituisce i blu più chiari delle generazioni precedenti'
            },
            {
                id: 'silver',
                name: 'Silver',
                officialName: 'Silver',
                description: 'Finitura argentata metallica classica',
                hex: '#E8E8E8',
                gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)',
                imageUrl: 'https://placehold.co/600x800/E8E8E8/666666?text=iPhone+17+Pro+Max+Silver',
                notes: 'Colore base professionale'
            }
        ]
    },

    // ========================================
    // iPhone 17
    // ========================================
    iphone17: {
        productName: 'iPhone 17',
        material: 'Aluminum with glass back',
        year: 2025,
        colors: [
            {
                id: 'black',
                name: 'Black',
                officialName: 'Black',
                description: 'Grigio scuro molto profondo, quasi nero',
                hex: '#1C1C1E',
                gradient: 'linear-gradient(135deg, #1C1C1E 0%, #000000 100%)',
                imageUrl: 'https://placehold.co/600x800/1C1C1E/ffffff?text=iPhone+17+Black',
                notes: 'Non nero puro, più grigio antracite'
            },
            {
                id: 'white',
                name: 'White',
                officialName: 'White',
                description: 'Bianco pulito con leggera sfumatura calda',
                hex: '#F5F5F0',
                gradient: 'linear-gradient(135deg, #F5F5F0 0%, #FFFFFF 100%)',
                imageUrl: 'https://placehold.co/600x800/F5F5F0/666666?text=iPhone+17+White',
                notes: 'Scelta senza tempo'
            },
            {
                id: 'lavender',
                name: 'Lavender',
                officialName: 'Lavender',
                description: 'Viola/lavanda chiaro',
                hex: '#E6D5E8',
                gradient: 'linear-gradient(135deg, #E6D5E8 0%, #D4C5F9 100%)',
                imageUrl: 'https://placehold.co/600x800/E6D5E8/666666?text=iPhone+17+Lavender',
                notes: 'Ritorna dopo iPhone 14',
                popular: true
            },
            {
                id: 'light-blue',
                name: 'Light Blue',
                officialName: 'Light Blue',
                description: 'Blu pastello morbido',
                hex: '#A8D8EA',
                gradient: 'linear-gradient(135deg, #A8D8EA 0%, #87CEEB 100%)',
                imageUrl: 'https://placehold.co/600x800/A8D8EA/666666?text=iPhone+17+Light+Blue',
                notes: 'Più ricco dell\'iPhone 15'
            },
            {
                id: 'sage',
                name: 'Sage',
                officialName: 'Sage',
                description: 'Verde tenue con sfumature grigie',
                hex: '#9CAF88',
                gradient: 'linear-gradient(135deg, #9CAF88 0%, #8B9A7A 100%)',
                imageUrl: 'https://placehold.co/600x800/9CAF88/ffffff?text=iPhone+17+Sage',
                notes: 'Verde naturale e discreto'
            },
            {
                id: 'steel-gray',
                name: 'Steel Gray',
                officialName: 'Steel Gray',
                description: 'Grigio medio moderno',
                hex: '#8B8D8F',
                gradient: 'linear-gradient(135deg, #8B8D8F 0%, #6D6E70 100%)',
                imageUrl: 'https://placehold.co/600x800/8B8D8F/ffffff?text=iPhone+17+Steel+Gray',
                notes: 'Nuova versione di Space Gray'
            }
        ]
    },

    // ========================================
    // iPhone 17 Air
    // ========================================
    iphone17Air: {
        productName: 'iPhone 17 Air',
        material: 'Ultra-thin aluminum design (5.5mm, 145g)',
        year: 2025,
        colors: [
            {
                id: 'sky-blue',
                name: 'Sky Blue',
                officialName: 'Sky Blue',
                description: 'Blu chiaro e arioso',
                hex: '#87CEEB',
                gradient: 'linear-gradient(135deg, #87CEEB 0%, #4A90E2 100%)',
                imageUrl: 'https://placehold.co/600x800/87CEEB/ffffff?text=iPhone+17+Air+Sky+Blue',
                notes: 'Enfatizza la leggerezza del dispositivo',
                popular: true
            },
            {
                id: 'gardenia',
                name: 'Gardenia',
                officialName: 'Gardenia',
                description: 'Crema/beige morbido',
                hex: '#F5E6D3',
                gradient: 'linear-gradient(135deg, #F5E6D3 0%, #E8D5C0 100%)',
                imageUrl: 'https://placehold.co/600x800/F5E6D3/666666?text=iPhone+17+Air+Gardenia',
                notes: 'Tono neutro caldo ed elegante'
            },
            {
                id: 'black',
                name: 'Black',
                officialName: 'Black',
                hex: '#1C1C1E',
                gradient: 'linear-gradient(135deg, #1C1C1E 0%, #000000 100%)',
                imageUrl: 'https://placehold.co/600x800/1C1C1E/ffffff?text=iPhone+17+Air+Black'
            },
            {
                id: 'white',
                name: 'White',
                officialName: 'White',
                hex: '#FFFFFF',
                gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F0 100%)',
                imageUrl: 'https://placehold.co/600x800/FFFFFF/666666?text=iPhone+17+Air+White'
            }
        ]
    },

    // ========================================
    // iPhone 16 / 16 Plus
    // ========================================
    iphone16: {
        productName: 'iPhone 16 / iPhone 16 Plus',
        material: 'Aluminum with glass back',
        year: 2024,
        colors: [
            {
                id: 'black',
                name: 'Black',
                officialName: 'Black',
                hex: '#1C1C1E',
                gradient: 'linear-gradient(135deg, #1C1C1E 0%, #000000 100%)',
                imageUrl: 'https://placehold.co/600x800/1C1C1E/ffffff?text=iPhone+16+Plus+Black',
                notes: 'Colore più venduto tradizionalmente'
            },
            {
                id: 'white',
                name: 'White',
                officialName: 'White',
                hex: '#F5F5F0',
                gradient: 'linear-gradient(135deg, #F5F5F0 0%, #FFFFFF 100%)',
                imageUrl: 'https://placehold.co/600x800/F5F5F0/666666?text=iPhone+16+Plus+White',
                notes: 'Ritorna dopo assenza su iPhone 15'
            },
            {
                id: 'pink',
                name: 'Pink',
                officialName: 'Pink',
                hex: '#FFB6C1',
                gradient: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
                imageUrl: 'https://placehold.co/600x800/FFB6C1/ffffff?text=iPhone+16+Plus+Pink',
                notes: 'Colore più appariscente della lineup',
                popular: true
            },
            {
                id: 'teal',
                name: 'Teal',
                officialName: 'Teal',
                hex: '#008B8B',
                gradient: 'linear-gradient(135deg, #008B8B 0%, #006666 100%)',
                imageUrl: 'https://placehold.co/600x800/008B8B/ffffff?text=iPhone+16+Plus+Teal',
                notes: 'Perfetto per estetica acqua/mare'
            },
            {
                id: 'ultramarine',
                name: 'Ultramarine',
                officialName: 'Ultramarine',
                hex: '#120A8F',
                gradient: 'linear-gradient(135deg, #120A8F 0%, #000080 100%)',
                imageUrl: 'https://placehold.co/600x800/120A8F/ffffff?text=iPhone+16+Plus+Ultramarine',
                notes: 'Colore più popolare del 2024',
                popular: true
            }
        ]
    },

    // ========================================
    // iPhone 16 Pro / Pro Max
    // ========================================
    iphone16Pro: {
        productName: 'iPhone 16 Pro / Pro Max',
        material: 'Grade 5 Titanium',
        year: 2024,
        colors: [
            {
                id: 'black-titanium',
                name: 'Black Titanium',
                officialName: 'Black Titanium',
                hex: '#1C1C1E',
                gradient: 'linear-gradient(135deg, #1C1C1E 0%, #000000 100%)',
                imageUrl: 'https://placehold.co/600x800/1C1C1E/ffffff?text=iPhone+16+Pro+Black+Titanium',
                notes: 'Più scuro della generazione precedente'
            },
            {
                id: 'natural-titanium',
                name: 'Natural Titanium',
                officialName: 'Natural Titanium',
                hex: '#E0E0E0',
                gradient: 'linear-gradient(135deg, #E0E0E0 0%, #C0C0C0 100%)',
                imageUrl: 'https://placehold.co/600x800/E0E0E0/666666?text=iPhone+16+Pro+Natural+Titanium',
                notes: 'Opzione neutrale più popolare',
                popular: true
            },
            {
                id: 'white-titanium',
                name: 'White Titanium',
                officialName: 'White Titanium',
                hex: '#F5F5F5',
                gradient: 'linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%)',
                imageUrl: 'https://placehold.co/600x800/F5F5F5/666666?text=iPhone+16+Pro+White+Titanium',
                notes: 'Bianco più brillante con sfumature fredde'
            },
            {
                id: 'desert-titanium',
                name: 'Desert Titanium',
                officialName: 'Desert Titanium',
                hex: '#D4B896',
                gradient: 'linear-gradient(135deg, #D4B896 0%, #C4A880 100%)',
                imageUrl: 'https://placehold.co/600x800/D4B896/666666?text=iPhone+16+Pro+Desert+Titanium',
                notes: 'Colore signature 2024',
                popular: true
            }
        ]
    },

    // ========================================
    // MacBook Air M4
    // ========================================
    macbookAirM4: {
        productName: 'MacBook Air 13" & 15" (M4)',
        material: 'Recycled aluminum unibody',
        year: 2025,
        sizes: ['13-inch', '15-inch'],
        colors: [
            {
                id: 'midnight',
                name: 'Midnight',
                officialName: 'Midnight',
                hex: '#191970',
                gradient: 'linear-gradient(135deg, #191970 0%, #0A0A28 100%)',
                imageUrl: 'https://placehold.co/800x600/191970/ffffff?text=MacBook+Air+M4+Midnight',
                notes: 'Colore più popolare, può mostrare impronte',
                popular: true
            },
            {
                id: 'starlight',
                name: 'Starlight',
                officialName: 'Starlight',
                hex: '#F5F5DC',
                gradient: 'linear-gradient(135deg, #F5F5DC 0%, #E8E8D0 100%)',
                imageUrl: 'https://placehold.co/800x600/F5F5DC/666666?text=MacBook+Air+M4+Starlight',
                notes: 'Oro champagne/oro rosa elegante'
            },
            {
                id: 'silver',
                name: 'Silver',
                officialName: 'Silver',
                hex: '#E8E8E8',
                gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)',
                imageUrl: 'https://placehold.co/800x600/E8E8E8/666666?text=MacBook+Air+M4+Silver',
                notes: 'Colore Mac classico'
            },
            {
                id: 'sky-blue',
                name: 'Sky Blue',
                officialName: 'Sky Blue',
                hex: '#87CEEB',
                gradient: 'linear-gradient(135deg, #87CEEB 0%, #4A90E2 100%)',
                imageUrl: 'https://placehold.co/800x600/87CEEB/ffffff?text=MacBook+Air+M4+Sky+Blue',
                notes: 'NUOVO 2025! Lanciato Marzo 2025',
                popular: true,
                isNew: true
            }
        ]
    },

    // ========================================
    // iPad Pro M5
    // ========================================
    iPadProM5: {
        productName: 'iPad Pro 11" & 13" (M5)',
        material: 'Ultra-thin aluminum unibody',
        year: 2025,
        sizes: ['11-inch (5.3mm)', '13-inch (5.1mm)'],
        colors: [
            {
                id: 'space-black',
                name: 'Space Black',
                officialName: 'Space Black',
                hex: '#2C2C2E',
                gradient: 'linear-gradient(135deg, #2C2C2E 0%, #1C1C1E 100%)',
                imageUrl: 'https://placehold.co/600x800/2C2C2E/ffffff?text=iPad+Pro+13+M5+Space+Black',
                notes: 'Disponibile in vetro standard e nano-texture'
            },
            {
                id: 'silver',
                name: 'Silver',
                officialName: 'Silver',
                hex: '#E8E8E8',
                gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)',
                imageUrl: 'https://placehold.co/600x800/E8E8E8/666666?text=iPad+Pro+13+M5+Silver',
                notes: 'Disponibile in vetro standard e nano-texture'
            }
        ]
    }
};

/**
 * Utility Functions
 */

// Ottieni tutti i colori per un prodotto specifico
function getProductColors(productKey) {
    return APPLE_COLORS[productKey]?.colors || [];
}

// Cerca un colore per nome attraverso tutti i prodotti
function findColorByName(colorName) {
    const results = [];
    for (const [productKey, product] of Object.entries(APPLE_COLORS)) {
        const color = product.colors?.find(c => 
            c.name.toLowerCase() === colorName.toLowerCase() ||
            c.officialName.toLowerCase() === colorName.toLowerCase()
        );
        if (color) {
            results.push({
                product: product.productName,
                productKey,
                color
            });
        }
    }
    return results;
}

// Ottieni tutti i colori popolari
function getPopularColors() {
    const popular = [];
    for (const [productKey, product] of Object.entries(APPLE_COLORS)) {
        if (product.colors) {
            product.colors
                .filter(c => c.popular)
                .forEach(color => {
                    popular.push({
                        product: product.productName,
                        productKey,
                        color
                    });
                });
        }
    }
    return popular;
}

// Ottieni colori per anno
function getColorsByYear(year) {
    const colors = [];
    for (const [productKey, product] of Object.entries(APPLE_COLORS)) {
        if (product.year === year && product.colors) {
            colors.push({
                product: product.productName,
                productKey,
                colors: product.colors
            });
        }
    }
    return colors;
}

// Genera CSS class name da ID colore
function getColorClassName(productKey, colorId) {
    return `color-${productKey.toLowerCase()}-${colorId}`;
}

/**
 * Export per uso in moduli
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        APPLE_COLORS,
        getProductColors,
        findColorByName,
        getPopularColors,
        getColorsByYear,
        getColorClassName
    };
}

/**
 * Esempio di utilizzo:
 * 
 * // Ottieni tutti i colori iPhone 17 Pro
 * const iphone17ProColors = getProductColors('iphone17Pro');
 * 
 * // Trova tutti i prodotti con colore "Silver"
 * const silverProducts = findColorByName('Silver');
 * 
 * // Ottieni colori popolari
 * const popular = getPopularColors();
 * 
 * // Genera nome classe CSS
 * const className = getColorClassName('iphone16', 'ultramarine');
 * // risultato: 'color-iphone16-ultramarine'
 */
