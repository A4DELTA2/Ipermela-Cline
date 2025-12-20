/**
 * Products Logic Module
 * Handles price calculations, filtering, and configuration rules
 */

/**
 * Calcola il prezzo di un prodotto in base alla configurazione
 * @param {Object} product - Il prodotto base
 * @param {Object} selections - Le selezioni (chip, ram, storage)
 * @returns {number} Prezzo finale
 */
export function calculateConfiguredPrice(product, selections) {
    if (!product.configurations) return product.price || product.basePrice;

    let finalPrice = product.basePrice;

    if (product.configurations.chip && selections.chip) {
        const selectedChip = product.configurations.chip.find(c => c.name === selections.chip);
        if (selectedChip) finalPrice += selectedChip.priceAdjustment;
    }

    if (product.configurations.ram && selections.ram) {
        const selectedRam = product.configurations.ram.find(r => r.size === selections.ram);
        if (selectedRam) finalPrice += selectedRam.priceAdjustment;
    }

    if (product.configurations.storage && selections.storage) {
        const selectedStorage = product.configurations.storage.find(s => s.size === selections.storage);
        if (selectedStorage) finalPrice += selectedStorage.priceAdjustment;
    }

    return finalPrice;
}

/**
 * Estrae il tier del chip (M4, M4 Pro, M4 Max) dal nome completo
 */
function extractChipTier(chipName) {
    if (!chipName) return '';
    if (chipName.includes('Max')) return chipName.split('(')[0].trim();
    if (chipName.includes('Pro')) return chipName.split('(')[0].trim();
    if (chipName.includes('Ultra')) return chipName.split('(')[0].trim();
    const match = chipName.match(/(M\d+)/);
    return match ? match[1] : '';
}

/**
 * Ottiene le opzioni RAM disponibili per un determinato chip
 */
export function getAvailableRamOptions(product, selectedChip) {
    if (!product.configurations || !product.configurations.ram) return [];
    const chipTier = extractChipTier(selectedChip);
    return product.configurations.ram.filter(ram => {
        if (!ram.availableFor) return true;
        return ram.availableFor.some(tier => chipTier.includes(tier) || tier.includes(chipTier));
    });
}

/**
 * Ottiene le opzioni Storage disponibili per un determinato chip
 */
export function getAvailableStorageOptions(product, selectedChip) {
    if (!product.configurations || !product.configurations.storage) return [];
    const chipTier = extractChipTier(selectedChip);
    return product.configurations.storage.filter(storage => {
        if (!storage.minChip) return true;
        return storage.minChip.some(tier => chipTier.includes(tier) || tier.includes(chipTier));
    });
}

/**
 * Filtra l'array dei prodotti in base ai criteri correnti
 */
export function filterProductsList(allProducts, filter, subcategory, search) {
    let filtered = allProducts;

    if (filter !== 'all') {
        filtered = filtered.filter(p => p.category === filter);
    }

    if (filter === 'mac' && subcategory !== 'all') {
        filtered = filtered.filter(p => p.subcategory === subcategory);
    }

    if (search) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
    }

    return filtered;
}

/**
 * Costruisce una stringa di riepilogo della configurazione
 */
export function buildConfigSummary(product) {
    const parts = [product.name];
    if (product.currentConfig) {
        if (product.currentConfig.chip) parts.push(product.currentConfig.chip);
        if (product.currentConfig.ram) parts.push(product.currentConfig.ram);
        if (product.currentConfig.storage) parts.push(product.currentConfig.storage);
        if (product.currentConfig.color) {
            const colorName = typeof product.currentConfig.color === 'string'
                ? product.currentConfig.color
                : product.currentConfig.color.name;
            parts.push(colorName);
        }
    }
    return parts.join(' • ');
}