/**
 * Apple Product Images Helper
 * Funzioni utility per gestire immagini prodotti Apple nell'app Ipermela Store
 * 
 * @author Ipermela Store
 * @version 1.0.0
 * @date 2025-11-25
 */

// Database immagini prodotti Apple
const APPLE_IMAGES = {
  // Base URLs per diversi tipi di immagini
  CDN: {
    store: 'https://store.storeimages.cdn-apple.com',
    website: 'https://www.apple.com',
    appleid: 'https://appleid.cdn-apple.com/static/deviceImages-10.0'
  },

  // Configurazioni dimensioni immagini
  SIZES: {
    small: { width: 800, height: 600, quality: 80 },
    medium: { width: 1280, height: 960, quality: 90 },
    large: { width: 1920, height: 1440, quality: 95 },
    xlarge: { width: 2560, height: 1920, quality: 95 }
  },

  // Database prodotti con URL immagini
  PRODUCTS: {
    // iPhone 16 Series
    'iphone-16-plus-black': {
      name: 'iPhone 16 Plus Black',
      color: 'Black',
      hex: '#1C1C1E',
      url: 'https://www.apple.com/v/iphone-16/c/images/overview/hero/hero_iphone_16_plus_black__xlarge.jpg',
      thumbnail: 'https://placehold.co/400x500/1C1C1E/ffffff?text=iPhone+16+Plus+Black'
    },
    'iphone-16-plus-white': {
      name: 'iPhone 16 Plus White',
      color: 'White',
      hex: '#F5F5F0',
      url: 'https://www.apple.com/v/iphone-16/c/images/overview/hero/hero_iphone_16_plus_white__xlarge.jpg',
      thumbnail: 'https://placehold.co/400x500/F5F5F0/666666?text=iPhone+16+Plus+White'
    },
    'iphone-16-plus-pink': {
      name: 'iPhone 16 Plus Pink',
      color: 'Pink',
      hex: '#FFB6C1',
      url: 'https://www.apple.com/v/iphone-16/c/images/overview/hero/hero_iphone_16_plus_pink__xlarge.jpg',
      thumbnail: 'https://placehold.co/400x500/FFB6C1/ffffff?text=iPhone+16+Plus+Pink'
    },
    'iphone-16-plus-teal': {
      name: 'iPhone 16 Plus Teal',
      color: 'Teal',
      hex: '#008B8B',
      url: 'https://www.apple.com/v/iphone-16/c/images/overview/hero/hero_iphone_16_plus_teal__xlarge.jpg',
      thumbnail: 'https://placehold.co/400x500/008B8B/ffffff?text=iPhone+16+Plus+Teal'
    },
    'iphone-16-plus-ultramarine': {
      name: 'iPhone 16 Plus Ultramarine',
      color: 'Ultramarine',
      hex: '#120A8F',
      url: 'https://www.apple.com/v/iphone-16/c/images/overview/hero/hero_iphone_16_plus_ultramarine__xlarge.jpg',
      thumbnail: 'https://placehold.co/400x500/120A8F/ffffff?text=iPhone+16+Plus+Ultramarine'
    },

    // iPhone 16
    'iphone-16-black': {
      name: 'iPhone 16 Black',
      color: 'Black',
      hex: '#1C1C1E',
      url: 'https://www.apple.com/v/iphone-16/c/images/overview/hero/hero_iphone_16_black__xlarge.jpg',
      thumbnail: 'https://placehold.co/400x500/1C1C1E/ffffff?text=iPhone+16+Black'
    },

    // MacBook Air M4
    'macbook-air-13-m4-midnight': {
      name: 'MacBook Air 13" M4 Midnight',
      color: 'Midnight',
      hex: '#191970',
      url: 'https://www.apple.com/v/macbook-air-m4/a/images/overview/hero/hero_macbook_air_13_midnight__xlarge.jpg',
      thumbnail: 'https://placehold.co/800x600/191970/ffffff?text=MacBook+Air+13+M4+Midnight'
    },
    'macbook-air-13-m4-starlight': {
      name: 'MacBook Air 13" M4 Starlight',
      color: 'Starlight',
      hex: '#F5F5F0',
      url: 'https://www.apple.com/v/macbook-air-m4/a/images/overview/hero/hero_macbook_air_13_starlight__xlarge.jpg',
      thumbnail: 'https://placehold.co/800x600/F5F5F0/666666?text=MacBook+Air+13+M4+Starlight'
    },
    'macbook-air-13-m4-silver': {
      name: 'MacBook Air 13" M4 Silver',
      color: 'Silver',
      hex: '#E8E8E8',
      url: 'https://www.apple.com/v/macbook-air-m4/a/images/overview/hero/hero_macbook_air_13_silver__xlarge.jpg',
      thumbnail: 'https://placehold.co/800x600/E8E8E8/666666?text=MacBook+Air+13+M4+Silver'
    },
    'macbook-air-13-m4-sky-blue': {
      name: 'MacBook Air 13" M4 Sky Blue',
      color: 'Sky Blue',
      hex: '#87CEEB',
      url: 'https://www.apple.com/v/macbook-air-m4/a/images/overview/hero/hero_macbook_air_13_sky_blue__xlarge.jpg',
      thumbnail: 'https://placehold.co/800x600/87CEEB/ffffff?text=MacBook+Air+13+M4+Sky+Blue'
    },

    // iPad Pro M5
    'ipad-pro-13-m5-space-black': {
      name: 'iPad Pro 13" M5 Space Black',
      color: 'Space Black',
      hex: '#2C2C2E',
      url: 'https://www.apple.com/v/ipad-pro/ak/images/overview/hero/hero_ipad_pro_13_space_black__xlarge.jpg',
      thumbnail: 'https://placehold.co/600x800/2C2C2E/ffffff?text=iPad+Pro+13+M5+Space+Black'
    },
    'ipad-pro-13-m5-silver': {
      name: 'iPad Pro 13" M5 Silver',
      color: 'Silver',
      hex: '#E8E8E8',
      url: 'https://www.apple.com/v/ipad-pro/ak/images/overview/hero/hero_ipad_pro_13_silver__xlarge.jpg',
      thumbnail: 'https://placehold.co/600x800/E8E8E8/666666?text=iPad+Pro+13+M5+Silver'
    }
  }
};

/**
 * Genera URL immagine con parametri dimensione e qualità
 * @param {string} baseUrl - URL base dell'immagine
 * @param {string} size - Dimensione: 'small', 'medium', 'large', 'xlarge'
 * @param {string} format - Formato: 'jpeg', 'png', 'webp'
 * @returns {string} URL completo con parametri
 */
function generateImageUrl(baseUrl, size = 'medium', format = 'jpeg') {
  if (!baseUrl) return '';
  
  const dimensions = APPLE_IMAGES.SIZES[size] || APPLE_IMAGES.SIZES.medium;
  const params = new URLSearchParams({
    wid: dimensions.width,
    hei: dimensions.height,
    fmt: format,
    qlt: dimensions.quality
  });
  
  // Se l'URL già contiene parametri, non aggiungere altri
  if (baseUrl.includes('?')) {
    return baseUrl;
  }
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Ottiene URL immagine prodotto per chiave
 * @param {string} productKey - Chiave prodotto (es: 'iphone-16-plus-black')
 * @param {string} size - Dimensione immagine
 * @param {boolean} useThumbnail - Usa thumbnail placeholder
 * @returns {string} URL immagine
 */
function getProductImage(productKey, size = 'medium', useThumbnail = false) {
  const product = APPLE_IMAGES.PRODUCTS[productKey];
  
  if (!product) {
    console.warn(`Prodotto non trovato: ${productKey}`);
    return getPlaceholderImage('generic', size);
  }
  
  if (useThumbnail && product.thumbnail) {
    return product.thumbnail;
  }
  
  return generateImageUrl(product.url, size);
}

/**
 * Ottiene immagine placeholder
 * @param {string} type - Tipo dispositivo: 'iphone', 'macbook', 'ipad', 'generic'
 * @param {string} size - Dimensione
 * @returns {string} URL placeholder
 */
function getPlaceholderImage(type = 'generic', size = 'medium') {
  const dimensions = APPLE_IMAGES.SIZES[size];
  const baseUrl = 'https://placehold.co';
  
  const placeholders = {
    iphone: `${baseUrl}/${dimensions.width}x${dimensions.height}/1C1C1E/ffffff?text=iPhone`,
    macbook: `${baseUrl}/${dimensions.width}x${dimensions.height}/191970/ffffff?text=MacBook`,
    ipad: `${baseUrl}/${dimensions.width}x${dimensions.height}/2C2C2E/ffffff?text=iPad`,
    generic: `${baseUrl}/${dimensions.width}x${dimensions.height}/E8E8E8/666666?text=Apple+Product`
  };
  
  return placeholders[type] || placeholders.generic;
}

/**
 * Carica immagine con fallback
 * @param {string} imageUrl - URL immagine principale
 * @param {string} fallbackUrl - URL fallback
 * @returns {Promise<string>} URL immagine caricata con successo
 */
async function loadImageWithFallback(imageUrl, fallbackUrl) {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    if (response.ok) {
      return imageUrl;
    }
    console.warn(`Immagine non disponibile: ${imageUrl}, uso fallback`);
    return fallbackUrl;
  } catch (error) {
    console.error(`Errore caricamento immagine: ${error.message}`);
    return fallbackUrl;
  }
}

/**
 * Imposta immagine con lazy loading e fallback
 * @param {HTMLImageElement} imgElement - Elemento img
 * @param {string} productKey - Chiave prodotto
 * @param {string} size - Dimensione
 */
function setProductImageWithFallback(imgElement, productKey, size = 'medium') {
  const imageUrl = getProductImage(productKey, size);
  const fallbackUrl = getProductImage(productKey, size, true); // usa thumbnail
  
  // Lazy loading
  imgElement.loading = 'lazy';
  
  // Imposta placeholder iniziale
  imgElement.src = fallbackUrl;
  imgElement.alt = APPLE_IMAGES.PRODUCTS[productKey]?.name || 'Apple Product';
  
  // Carica immagine ad alta qualità
  loadImageWithFallback(imageUrl, fallbackUrl)
    .then(finalUrl => {
      imgElement.src = finalUrl;
      imgElement.classList.add('image-loaded');
    })
    .catch(error => {
      console.error('Errore caricamento immagine:', error);
      imgElement.classList.add('image-error');
    });
}

/**
 * Ottiene tutti i prodotti per categoria
 * @param {string} category - Categoria: 'iphone', 'macbook', 'ipad'
 * @returns {Array} Array di oggetti prodotto
 */
function getProductsByCategory(category) {
  const results = [];
  
  for (const [key, product] of Object.entries(APPLE_IMAGES.PRODUCTS)) {
    if (key.toLowerCase().includes(category.toLowerCase())) {
      results.push({
        key: key,
        ...product
      });
    }
  }
  
  return results;
}

/**
 * Ottiene colore prodotto da hex
 * @param {string} hex - Codice hex colore
 * @returns {Object|null} Oggetto prodotto o null
 */
function getProductByColor(hex) {
  for (const [key, product] of Object.entries(APPLE_IMAGES.PRODUCTS)) {
    if (product.hex.toLowerCase() === hex.toLowerCase()) {
      return {
        key: key,
        ...product
      };
    }
  }
  return null;
}

/**
 * Genera srcset per immagini responsive
 * @param {string} productKey - Chiave prodotto
 * @returns {string} Attributo srcset
 */
function generateSrcSet(productKey) {
  const product = APPLE_IMAGES.PRODUCTS[productKey];
  if (!product) return '';
  
  const sizes = ['small', 'medium', 'large', 'xlarge'];
  const srcset = sizes.map(size => {
    const url = generateImageUrl(product.url, size);
    const width = APPLE_IMAGES.SIZES[size].width;
    return `${url} ${width}w`;
  });
  
  return srcset.join(', ');
}

/**
 * Precarica immagini critiche
 * @param {Array<string>} productKeys - Array di chiavi prodotto
 * @param {string} size - Dimensione
 */
function preloadImages(productKeys, size = 'small') {
  productKeys.forEach(key => {
    const url = getProductImage(key, size);
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Ottiene colore esadecimale prodotto
 * @param {string} productKey - Chiave prodotto
 * @returns {string} Codice hex colore
 */
function getProductColorHex(productKey) {
  const product = APPLE_IMAGES.PRODUCTS[productKey];
  return product?.hex || '#E8E8E8';
}

/**
 * Cerca prodotti per nome o colore
 * @param {string} searchTerm - Termine di ricerca
 * @returns {Array} Array di prodotti trovati
 */
function searchProducts(searchTerm) {
  const term = searchTerm.toLowerCase();
  const results = [];
  
  for (const [key, product] of Object.entries(APPLE_IMAGES.PRODUCTS)) {
    if (
      product.name.toLowerCase().includes(term) ||
      product.color.toLowerCase().includes(term) ||
      key.toLowerCase().includes(term)
    ) {
      results.push({
        key: key,
        ...product
      });
    }
  }
  
  return results;
}

// ===== INTEGRAZIONE CON APP IPERMELA STORE =====

/**
 * Aggiorna immagine prodotto nella card
 * Usa questa funzione quando l'utente seleziona un colore
 * @param {number} productId - ID prodotto
 * @param {string} colorCode - Codice colore selezionato
 */
function updateProductCardImage(productId, colorCode) {
  const imageElement = document.querySelector(`#product-image-${productId}`);
  if (!imageElement) return;
  
  // Genera chiave prodotto da ID e colore
  // Esempio: productId 1 (iPhone 16 Plus) + colorCode 'black' = 'iphone-16-plus-black'
  const productKey = generateProductKey(productId, colorCode);
  
  setProductImageWithFallback(imageElement, productKey, 'medium');
}

/**
 * Genera chiave prodotto da ID e colore
 * @param {number} productId - ID prodotto dall'app
 * @param {string} colorCode - Codice colore
 * @returns {string} Chiave prodotto
 */
function generateProductKey(productId, colorCode) {
  // Mapping ID prodotto -> nome base
  const productMapping = {
    1: 'iphone-17-pro-max',
    2: 'iphone-17-pro',
    5: 'iphone-16-plus',
    6: 'iphone-16',
    100: 'macbook-air-13-m4',
    200: 'ipad-pro-13-m5'
  };
  
  const baseName = productMapping[productId];
  if (!baseName) return 'generic';
  
  // Converti codice colore in formato chiave
  const colorKey = colorCode.toLowerCase().replace(/\s+/g, '-');
  
  return `${baseName}-${colorKey}`;
}

/**
 * Inizializza immagini prodotti all'avvio app
 * Chiama questa funzione in initializeApp()
 */
function initializeProductImages() {
  console.log('🖼️ Inizializzazione immagini prodotti Apple...');
  
  // Precarica immagini prodotti più popolari
  const popularProducts = [
    'iphone-16-plus-ultramarine',
    'iphone-16-black',
    'macbook-air-13-m4-midnight',
    'ipad-pro-13-m5-space-black'
  ];
  
  preloadImages(popularProducts, 'small');
  
  console.log('✅ Immagini prodotti inizializzate');
}

// Export per utilizzo come modulo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    APPLE_IMAGES,
    generateImageUrl,
    getProductImage,
    getPlaceholderImage,
    loadImageWithFallback,
    setProductImageWithFallback,
    getProductsByCategory,
    getProductByColor,
    generateSrcSet,
    preloadImages,
    getProductColorHex,
    searchProducts,
    updateProductCardImage,
    generateProductKey,
    initializeProductImages
  };
}

// ===== ESEMPIO DI UTILIZZO =====

/*
// 1. Inizializza all'avvio app (in script.js)
document.addEventListener('DOMContentLoaded', () => {
  initializeProductImages();
  // ... resto del codice
});

// 2. Quando l'utente seleziona un colore (in selectProductColor)
function selectProductColor(productId, colorCode, imageUrl, colorName) {
  // ... codice esistente ...
  
  // Aggiorna immagine usando helper
  updateProductCardImage(productId, colorCode);
}

// 3. Renderizzare prodotti con immagini
function renderProducts() {
  products.forEach(product => {
    const productKey = generateProductKey(product.id, 'black'); // colore default
    const imageUrl = getProductImage(productKey, 'medium');
    
    // Usa imageUrl nel template HTML
  });
}

// 4. Lazy loading automatico
const img = document.createElement('img');
setProductImageWithFallback(img, 'iphone-16-plus-black', 'large');
document.body.appendChild(img);

// 5. Ricerca prodotti
const results = searchProducts('midnight');
console.log(results); // Trova tutti i prodotti Midnight

// 6. Filtra per categoria
const macbooks = getProductsByCategory('macbook');
console.log(macbooks); // Tutti i MacBook disponibili
*/
