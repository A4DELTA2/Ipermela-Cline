/**
 * @fileoverview Catalogo prodotti e listini prezzi
 * @module data
 */

/**
 * Listino prezzi per storage (IVA INCLUSA 22%)
 * @type {Object.<number, Object.<string, number>>}
 */
export const productPricing = {
    // iPhone 17 Pro Max
    1: {
        '256GB': 1499,
        '512GB': 1759,
        '1TB': 2009,
        '2TB': 2509
    },
    // iPhone 17 Pro
    2: {
        '256GB': 1359,
        '512GB': 1499,
        '1TB': 1759,
        '2TB': 2509
    },
    // iPhone Air
    3: {
        '256GB': 1099,
        '512GB': 1259,
        '1TB': 1599
    },
    // iPhone 17
    4: {
        '256GB': 1249,
        '512GB': 1499
    },
    // iPhone 16 Plus
    5: {
        '128GB': 999,
        '256GB': 1129,
        '512GB': 1499
    },
    // iPhone 16
    6: {
        '128GB': 899,
        '256GB': 1129,
        '512GB': 1359
    },
    // iPhone 16e
    7: {
        '128GB': 749,
        '256GB': 879,
        '512GB': 1129
    },
    // MacBook Air 13" M4
    100: {
        '256GB': 1199,
        '512GB': 1449,
        '1TB': 1699,
        '2TB': 1949
    },
    // iPad Pro 13" M5
    200: {
        '256GB': 1719,
        '512GB': 2009,
        '1TB': 2239,
        '2TB': 2949
    }
};

/**
 * Catalogo prodotti predefinito
 * @type {Array<Object>}
 */
export const defaultProducts = [
    // iPhone 17 Series
    {
        id: 1,
        name: 'iPhone 17 Pro Max',
        price: 1499,
        category: 'iphone',
        icon: '📱',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017%20PM/iPhone%2017%20PM-silver.png',
        colors: [
            { name: 'Argento', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017%20PM/iPhone%2017%20PM-silver.png' },
            { name: 'Blu Profondo', code: 'deep-blue', gradient: 'linear-gradient(135deg, #1E3A5F 0%, #0A1929 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017%20PM/iPhone%2017%20PM-blue.png' },
            { name: 'Arancione Cosmico', code: 'cosmic-orange', gradient: 'linear-gradient(135deg, #FF6B35 0%, #C44D34 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017%20PM/iPhone%2017%20PM-orange.png' }
        ],
        storage: ['256GB', '512GB', '1TB', '2TB']
    },
    {
        id: 2,
        name: 'iPhone 17 Pro',
        price: 1359,
        category: 'iphone',
        icon: '📱',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017%20Pro/iPhone%2017%20P-silver.png',
        colors: [
            { name: 'Argento', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017%20Pro/iPhone%2017%20P-silver.png' },
            { name: 'Blu Profondo', code: 'deep-blue', gradient: 'linear-gradient(135deg, #1E3A5F 0%, #0A1929 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017%20Pro/iPhone%2017%20P-blue.png' },
            { name: 'Arancione Cosmico', code: 'cosmic-orange', gradient: 'linear-gradient(135deg, #FF6B35 0%, #C44D34 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017%20Pro/iPhone%2017%20P-orange.png' }
        ],
        storage: ['256GB', '512GB', '1TB', '2TB']
    },
    {
        id: 3,
        name: 'iPhone Air',
        price: 1259,
        category: 'iphone',
        icon: '📱',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%20Air/iPhone%20Air-skyblue.png',
        colors: [
            { name: 'Blu Cielo', code: 'skyblue', gradient: 'linear-gradient(135deg, #F0F9FF 0%, #D0E9FF 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%20Air/iPhone%20Air-skyblue.png' },
            { name: 'Oro Chiaro', code: 'lightgold', gradient: 'linear-gradient(135deg, #FFFCF5 0%, #F5F0E0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%20Air/iPhone%20Air-lightgold.png' },
            { name: 'Nero Siderale', code: 'spaceblack', gradient: 'linear-gradient(135deg, #000000 0%, #1C1C1E 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%20Air/iPhone%20Air-black.png' },
            { name: 'Bianco Nuvola', code: 'cloudwhite', gradient: 'linear-gradient(135deg, #FCFCFC 0%, #E8E8E8 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%20Air/iPhone%20Air-cloudwhite.png' }
        ],
        storage: ['256GB', '512GB', '1TB']
    },
    {
        id: 4,
        name: 'iPhone 17',
        price: 1249,
        category: 'iphone',
        icon: '📱',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017/iPhone%2017-lavanda.png',
        colors: [
            { name: 'Lavanda', code: 'lavender', gradient: 'linear-gradient(135deg, #DFCEEA 0%, #C4A8D8 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017/iPhone%2017-lavanda.png' },
            { name: 'Blu Bruma', code: 'mistblue', gradient: 'linear-gradient(135deg, #96AED1 0%, #7A93B8 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017/iPhone%2017-azzurro.png' },
            { name: 'Salvia', code: 'sage', gradient: 'linear-gradient(135deg, #A9B689 0%, #8FA070 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017/iPhone%2017-salvia.png' },
            { name: 'Nero', code: 'black', gradient: 'linear-gradient(135deg, #353839 0%, #1C1C1E 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017/iPhone%2017-black.png' },
            { name: 'Bianco', code: 'white', gradient: 'linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017/iPhone%2017-white.png' }
        ],
        storage: ['256GB', '512GB']
    },


    // iPhone 16 Series
    {
        id: 5,
        name: 'iPhone 16 Plus',
        price: 999,
        category: 'iphone',
        icon: '📱',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016/iPhone%2016-Ultramarine.png',
        colors: [
            { name: 'Blu Oltremare', code: 'ultramarine', gradient: 'linear-gradient(135deg, #9AADF6 0%, #7A8ED6 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016/iPhone%2016-Ultramarine.png' },
            { name: 'Verde Acqua', code: 'teal', gradient: 'linear-gradient(135deg, #B0D4D2 0%, #90B4B2 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016/iPhone%2016-verde.png' },
            { name: 'Rosa', code: 'pink', gradient: 'linear-gradient(135deg, #F2ADDA 0%, #D28DBA 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016/iPhone%2016-rosa.png' },
            { name: 'Bianco', code: 'white', gradient: 'linear-gradient(135deg, #FAFAFA 0%, #E8E8E8 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016/iPhone%2016-white.png' },
            { name: 'Nero', code: 'black', gradient: 'linear-gradient(135deg, #3C4042 0%, #1C1C1E 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016/iPhone%2016-black.png' }
        ],
        storage: ['128GB', '256GB', '512GB']
    },
    {
        id: 6,
        name: 'iPhone 16',
        price: 899,
        category: 'iphone',
        icon: '📱',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016/iPhone%2016-Ultramarine.png',
        colors: [
            { name: 'Blu Oltremare', code: 'ultramarine', gradient: 'linear-gradient(135deg, #9AADF6 0%, #7A8ED6 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016/iPhone%2016-Ultramarine.png' },
            { name: 'Verde Acqua', code: 'teal', gradient: 'linear-gradient(135deg, #B0D4D2 0%, #90B4B2 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016/iPhone%2016-verde.png' },
            { name: 'Rosa', code: 'pink', gradient: 'linear-gradient(135deg, #F2ADDA 0%, #D28DBA 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016/iPhone%2016-rosa.png' },
            { name: 'Bianco', code: 'white', gradient: 'linear-gradient(135deg, #FAFAFA 0%, #E8E8E8 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016/iPhone%2016-white.png' },
            { name: 'Nero', code: 'black', gradient: 'linear-gradient(135deg, #3C4042 0%, #1C1C1E 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016/iPhone%2016-black.png' }
        ],
        storage: ['128GB', '256GB', '512GB']
    },
    {
        id: 7,
        name: 'iPhone 16e',
        price: 749,
        category: 'iphone',
        icon: '📱',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016E/iPhone%2016E-black.png',
        colors: [
            { name: 'Nero', code: 'black', gradient: 'linear-gradient(135deg, #3C4042 0%, #1C1C1E 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016E/iPhone%2016E-black.png' },
            { name: 'Bianco', code: 'white', gradient: 'linear-gradient(135deg, #FAFAFA 0%, #E8E8E8 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2016E/iPhone%2016E-white.png' }
        ],
        storage: ['128GB', '256GB', '512GB']
    },

    // ========================================
    // MacBook Air - Configuratore Dinamico
    // ========================================
    {
        id: 100,
        name: 'MacBook Air 13"',
        basePrice: 1199,
        category: 'mac',
        subcategory: 'macbook-air',
        icon: '💻',
        baseConfig: {
            chip: 'M4 (8C CPU / 8C GPU)',
            ram: '16GB',
            storage: '256GB'
        },
        configurations: {
            chip: [
                { name: 'M4 (8C CPU / 8C GPU)', priceAdjustment: 0 },
                { name: 'M4 (10C CPU / 10C GPU)', priceAdjustment: 0 }
            ],
            ram: [
                { size: '16GB', priceAdjustment: 0 },
                { size: '24GB', priceAdjustment: 250 },
                { size: '32GB', priceAdjustment: 500 }
            ],
            storage: [
                { size: '256GB', priceAdjustment: 0 },
                { size: '512GB', priceAdjustment: 250 },
                { size: '1TB', priceAdjustment: 500 },
                { size: '2TB', priceAdjustment: 1000 }
            ]
        },
        colors: [
            { name: 'Midnight', code: 'midnight', gradient: 'linear-gradient(135deg, #1C1C1E 0%, #000000 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Macbook/Air/MBA13-midnight.png' },
            { name: 'Starlight', code: 'starlight', gradient: 'linear-gradient(135deg, #F5F5F0 0%, #E8E8E0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Macbook/Air/MBA13-starlight.png' },
            { name: 'Silver', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Macbook/Air/MBA13-silver.png' },
            { name: 'Sky Blue', code: 'skyblue', gradient: 'linear-gradient(135deg, #87CEEB 0%, #4A90E2 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Macbook/Air/MBA13-skyblue.png' }
        ]
    },
    {
        id: 103,
        name: 'MacBook Air 15"',
        basePrice: 1499,
        category: 'mac',
        subcategory: 'macbook-air',
        icon: '💻',
        baseConfig: {
            chip: 'M4 (10C CPU / 10C GPU)',
            ram: '16GB',
            storage: '256GB'
        },
        configurations: {
            chip: [
                { name: 'M4 (10C CPU / 10C GPU)', priceAdjustment: 0 }
            ],
            ram: [
                { size: '16GB', priceAdjustment: 0 },
                { size: '24GB', priceAdjustment: 250 },
                { size: '32GB', priceAdjustment: 500 }
            ],
            storage: [
                { size: '256GB', priceAdjustment: 0 },
                { size: '512GB', priceAdjustment: 250 },
                { size: '1TB', priceAdjustment: 500 },
                { size: '2TB', priceAdjustment: 1000 }
            ]
        },
        colors: [
            { name: 'Midnight', code: 'midnight', gradient: 'linear-gradient(135deg, #1C1C1E 0%, #000000 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Macbook/Air/MBA15-midnight.png' },
            { name: 'Starlight', code: 'starlight', gradient: 'linear-gradient(135deg, #F5F5F0 0%, #E8E8E0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Macbook/Air/MBA15-starlight-select.png' },
            { name: 'Silver', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Macbook/Air/MBA15-silver.png' }
        ]
    },

    // ========================================
    // MacBook Pro 14" - Configuratore Dinamico
    // ========================================
    {
        id: 110,
        name: 'MacBook Pro 14"',
        basePrice: 1899,
        category: 'mac',
        subcategory: 'macbook-pro',
        icon: '💻',
        baseConfig: {
            chip: 'M5 (10C CPU / 10C GPU)',
            ram: '16GB',
            storage: '512GB'
        },
        configurations: {
            chip: [
                { name: 'M5 (10C CPU / 10C GPU)', priceAdjustment: 0 },
                { name: 'M4 Pro (12C CPU / 16C GPU)', priceAdjustment: 550 },
                { name: 'M4 Pro (14C CPU / 20C GPU)', priceAdjustment: 1050 },
                { name: 'M4 Max (14C CPU / 32C GPU)', priceAdjustment: 2050 },
                { name: 'M4 Max (16C CPU / 40C GPU)', priceAdjustment: 2550 }
            ],
            ram: [
                { size: '16GB', priceAdjustment: 0, availableFor: ['M5'] },
                { size: '24GB', priceAdjustment: 250, availableFor: ['M5', 'M4 Pro'] },
                { size: '32GB', priceAdjustment: 500, availableFor: ['M5', 'M4 Pro'] },
                { size: '36GB', priceAdjustment: 0, availableFor: ['M4 Max'] },
                { size: '48GB', priceAdjustment: 500, availableFor: ['M4 Pro', 'M4 Max'] },
                { size: '64GB', priceAdjustment: 1000, availableFor: ['M4 Max'] },
                { size: '128GB', priceAdjustment: 2000, availableFor: ['M4 Max'] }
            ],
            storage: [
                { size: '512GB', priceAdjustment: 0 },
                { size: '1TB', priceAdjustment: 250 },
                { size: '2TB', priceAdjustment: 500 },
                { size: '4TB', priceAdjustment: 1000 },
                { size: '8TB', priceAdjustment: 2000, minChip: ['M4 Max'] }
            ]
        },
        colors: [
            { name: 'Nero Siderale', code: 'spaceblack', gradient: 'linear-gradient(135deg, #1C1C1E 0%, #000000 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Macbook/Pro/MBP14-spaceblack.png' },
            { name: 'Argento', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Macbook/Pro/MBP14-silver.png' }
        ]
    },

    // ========================================
    // MacBook Pro 16" - Configuratore Dinamico
    // ========================================
    {
        id: 120,
        name: 'MacBook Pro 16"',
        basePrice: 2946,
        category: 'mac',
        subcategory: 'macbook-pro',
        icon: '💻',
        baseConfig: {
            chip: 'M4 Pro (14C CPU / 20C GPU)',
            ram: '24GB',
            storage: '512GB'
        },
        configurations: {
            chip: [
                { name: 'M4 Pro (14C CPU / 20C GPU)', priceAdjustment: 0 },
                { name: 'M4 Max (14C CPU / 32C GPU)', priceAdjustment: 1303 },
                { name: 'M4 Max (16C CPU / 40C GPU)', priceAdjustment: 1903 }
            ],
            ram: [
                { size: '24GB', priceAdjustment: 0, availableFor: ['M4 Pro'] },
                { size: '36GB', priceAdjustment: 0, availableFor: ['M4 Max'] },
                { size: '48GB', priceAdjustment: 503, availableFor: ['M4 Pro', 'M4 Max'] },
                { size: '64GB', priceAdjustment: 1000, availableFor: ['M4 Max'] },
                { size: '128GB', priceAdjustment: 2000, availableFor: ['M4 Max'] }
            ],
            storage: [
                { size: '512GB', priceAdjustment: 0 },
                { size: '1TB', priceAdjustment: 250 },
                { size: '2TB', priceAdjustment: 500 },
                { size: '4TB', priceAdjustment: 1000 },
                { size: '8TB', priceAdjustment: 2000, minChip: ['M4 Max'] }
            ]
        },
        colors: [
            { name: 'Nero Siderale', code: 'spaceblack', gradient: 'linear-gradient(135deg, #1C1C1E 0%, #000000 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Macbook/Pro/MBP16-spaceblack.png' },
            { name: 'Argento', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Macbook/Pro/MBP16-silver.png' }
        ]
    },

    // ========================================
    // iMac 24" - Configuratore Dinamico
    // ========================================
    {
        id: 130,
        name: 'iMac 24" (2 porte)',
        basePrice: 1579,
        category: 'mac',
        subcategory: 'imac',
        icon: '🖥️',
        baseConfig: {
            chip: 'M4 (8C CPU / 8C GPU)',
            ram: '16GB',
            storage: '256GB'
        },
        configurations: {
            chip: [
                { name: 'M4 (8C CPU / 8C GPU)', priceAdjustment: 0 }
            ],
            ram: [
                { size: '16GB', priceAdjustment: 0 },
                { size: '24GB', priceAdjustment: 250 },
                { size: '32GB', priceAdjustment: 500 }
            ],
            storage: [
                { size: '256GB', priceAdjustment: 0 },
                { size: '512GB', priceAdjustment: 250 },
                { size: '1TB', priceAdjustment: 500 },
                { size: '2TB', priceAdjustment: 1000 }
            ]
        },
        colors: [
            { name: 'Verde', code: 'green', gradient: 'linear-gradient(135deg, #A3E7D5 0%, #7FCFBB 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iMac/IMAC-green.png' },
            { name: 'Giallo', code: 'yellow', gradient: 'linear-gradient(135deg, #FFE27A 0%, #F5D05A 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iMac/IMAC-yellow.png' },
            { name: 'Arancione', code: 'orange', gradient: 'linear-gradient(135deg, #FFB97A 0%, #FF9F5A 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iMac/IMAC-orange.png' },
            { name: 'Rosa', code: 'pink', gradient: 'linear-gradient(135deg, #FFB3C8 0%, #FF93A8 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iMac/IMAC-pink.png' },
            { name: 'Viola', code: 'purple', gradient: 'linear-gradient(135deg, #D4C5F9 0%, #B4A5D9 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iMac/IMAC-purple.png' },
            { name: 'Blu', code: 'blue', gradient: 'linear-gradient(135deg, #9DD3FF 0%, #7DB3DF 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iMac/IMAC-blue.png' },
            { name: 'Argento', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iMac/IMAC-silver.png' }
        ]
    },
    {
        id: 131,
        name: 'iMac 24" (4 porte)',
        basePrice: 1829,
        category: 'mac',
        subcategory: 'imac',
        icon: '🖥️',
        baseConfig: {
            chip: 'M4 (10C CPU / 10C GPU)',
            ram: '16GB',
            storage: '256GB'
        },
        configurations: {
            chip: [
                { name: 'M4 (10C CPU / 10C GPU)', priceAdjustment: 0 }
            ],
            ram: [
                { size: '16GB', priceAdjustment: 0 },
                { size: '24GB', priceAdjustment: 250 },
                { size: '32GB', priceAdjustment: 500 }
            ],
            storage: [
                { size: '256GB', priceAdjustment: 0 },
                { size: '512GB', priceAdjustment: 250 },
                { size: '1TB', priceAdjustment: 500 },
                { size: '2TB', priceAdjustment: 1000 }
            ]
        },
        colors: [
            { name: 'Verde', code: 'green', gradient: 'linear-gradient(135deg, #A3E7D5 0%, #7FCFBB 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iMac/IMAC-green.png' },
            { name: 'Giallo', code: 'yellow', gradient: 'linear-gradient(135deg, #FFE27A 0%, #F5D05A 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iMac/IMAC-yellow.png' },
            { name: 'Arancione', code: 'orange', gradient: 'linear-gradient(135deg, #FFB97A 0%, #FF9F5A 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iMac/IMAC-orange.png' },
            { name: 'Rosa', code: 'pink', gradient: 'linear-gradient(135deg, #FFB3C8 0%, #FF93A8 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iMac/IMAC-pink.png' },
            { name: 'Viola', code: 'purple', gradient: 'linear-gradient(135deg, #D4C5F9 0%, #B4A5D9 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iMac/IMAC-purple.png' },
            { name: 'Blu', code: 'blue', gradient: 'linear-gradient(135deg, #9DD3FF 0%, #7DB3DF 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iMac/IMAC-blue.png' },
            { name: 'Argento', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iMac/IMAC-silver.png' }
        ]
    },

    // ========================================
    // Mac mini - Configuratore Dinamico
    // ========================================
    {
        id: 140,
        name: 'Mac mini M4',
        basePrice: 779,
        category: 'mac',
        subcategory: 'mac-mini',
        icon: '🖥️',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Mac%20Mini/mac-mini.png',
        baseConfig: {
            chip: 'M4 (10C CPU / 10C GPU)',
            ram: '16GB',
            storage: '256GB'
        },
        configurations: {
            chip: [
                { name: 'M4 (10C CPU / 10C GPU)', priceAdjustment: 0 }
            ],
            ram: [
                { size: '16GB', priceAdjustment: 0 },
                { size: '24GB', priceAdjustment: 250 },
                { size: '32GB', priceAdjustment: 500 }
            ],
            storage: [
                { size: '256GB', priceAdjustment: 0 },
                { size: '512GB', priceAdjustment: 250 },
                { size: '1TB', priceAdjustment: 500 },
                { size: '2TB', priceAdjustment: 1000 }
            ]
        }
    },
    {
        id: 143,
        name: 'Mac mini M4 Pro',
        basePrice: 1779,
        category: 'mac',
        subcategory: 'mac-mini',
        icon: '🖥️',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Mac%20Mini/mac-mini.png',
        baseConfig: {
            chip: 'M4 Pro (12C CPU / 16C GPU)',
            ram: '24GB',
            storage: '512GB'
        },
        configurations: {
            chip: [
                { name: 'M4 Pro (12C CPU / 16C GPU)', priceAdjustment: 0 },
                { name: 'M4 Pro (14C CPU / 20C GPU)', priceAdjustment: 500 }
            ],
            ram: [
                { size: '24GB', priceAdjustment: 0 },
                { size: '48GB', priceAdjustment: 500 },
                { size: '64GB', priceAdjustment: 1000 }
            ],
            storage: [
                { size: '512GB', priceAdjustment: 0 },
                { size: '1TB', priceAdjustment: 250 },
                { size: '2TB', priceAdjustment: 500 },
                { size: '4TB', priceAdjustment: 1000 },
                { size: '8TB', priceAdjustment: 2000 }
            ]
        }
    },

    // ========================================
    // Mac Studio - Configuratore Dinamico
    // ========================================
    {
        id: 150,
        name: 'Mac Studio M4 Max',
        basePrice: 2399,
        category: 'mac',
        subcategory: 'mac-studio',
        icon: '🖥️',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Mac%20Studio/mac-studio.png',
        baseConfig: {
            chip: 'M4 Max (14C CPU / 32C GPU)',
            ram: '36GB',
            storage: '512GB'
        },
        configurations: {
            chip: [
                { name: 'M4 Max (14C CPU / 32C GPU)', priceAdjustment: 0 },
                { name: 'M4 Max (16C CPU / 40C GPU)', priceAdjustment: 500 }
            ],
            ram: [
                { size: '36GB', priceAdjustment: 0 },
                { size: '48GB', priceAdjustment: 500 },
                { size: '64GB', priceAdjustment: 1000 },
                { size: '128GB', priceAdjustment: 2000 }
            ],
            storage: [
                { size: '512GB', priceAdjustment: 0 },
                { size: '1TB', priceAdjustment: 250 },
                { size: '2TB', priceAdjustment: 500 },
                { size: '4TB', priceAdjustment: 1000 },
                { size: '8TB', priceAdjustment: 2000 }
            ]
        }
    },
    {
        id: 151,
        name: 'Mac Studio M3 Ultra',
        basePrice: 4949,
        category: 'mac',
        subcategory: 'mac-studio',
        icon: '🖥️',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Mac%20Studio/mac-studio.png',
        baseConfig: {
            chip: 'M3 Ultra (28C CPU / 60C GPU)',
            ram: '96GB',
            storage: '1TB'
        },
        configurations: {
            chip: [
                { name: 'M3 Ultra (24C CPU / 60C GPU)', priceAdjustment: -500 },
                { name: 'M3 Ultra (28C CPU / 60C GPU)', priceAdjustment: 0 },
                { name: 'M3 Ultra (32C CPU / 80C GPU)', priceAdjustment: 500 }
            ],
            ram: [
                { size: '96GB', priceAdjustment: 0 },
                { size: '256GB', priceAdjustment: 3000 },
                { size: '512GB', priceAdjustment: 6000 }
            ],
            storage: [
                { size: '1TB', priceAdjustment: 0 },
                { size: '2TB', priceAdjustment: 500 },
                { size: '4TB', priceAdjustment: 1000 },
                { size: '8TB', priceAdjustment: 2000 },
                { size: '16TB', priceAdjustment: 4000 }
            ]
        }
    },

    // iPad
    {
        id: 200,
        name: 'iPad Pro 13" (M5)',
        price: 1719,
        category: 'ipad',
        icon: '📲',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Pro/ipad-pro-13inch-spaceblack.png',
        colors: [
            { name: 'Space Black', code: 'space-black', gradient: 'linear-gradient(135deg, #2C2C2E 0%, #1C1C1E 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Pro/ipad-pro-13inch-spaceblack.png' },
            { name: 'Silver', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Pro/ipad-pro-13inch-silver.png' }
        ],
        storage: ['256GB', '512GB', '1TB', '2TB'],
        storageNotes: '1TB e 2TB: 16GB RAM + 10-core CPU | 256GB/512GB: 12GB RAM + 9-core CPU'
    },
    {
        id: 201,
        name: 'iPad Pro 11" (M5)',
        price: 1119,
        category: 'ipad',
        icon: '📲',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Pro/ipad-pro-11inch-spaceblack.png',
        colors: [
            { name: 'Space Black', code: 'space-black', gradient: 'linear-gradient(135deg, #2C2C2E 0%, #1C1C1E 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Pro/ipad-pro-11inch-spaceblack.png' },
            { name: 'Silver', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Pro/ipad-pro-11inch-silver.png' }
        ],
        storage: ['256GB', '512GB', '1TB', '2TB']
    },
    {
        id: 202,
        name: 'iPad Air 13"',
        price: 669,
        category: 'ipad',
        icon: '📲',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Air/IPAD-air-11inch-blue.png',
        colors: [
            { name: 'Blu', code: 'blue', gradient: 'linear-gradient(135deg, #9DD3FF 0%, #7DB3DF 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Air/IPAD-air-11inch-blue.png' },
            { name: 'Viola', code: 'purple', gradient: 'linear-gradient(135deg, #D4C5F9 0%, #B4A5D9 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Air/IPAD-air-11inch-purple.png' },
            { name: 'Space Gray', code: 'space-gray', gradient: 'linear-gradient(135deg, #5C5C5E 0%, #3C3C3E 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Air/IPAD-air-11inch-space-gray.png' },
            { name: 'Starlight', code: 'starlight', gradient: 'linear-gradient(135deg, #F5F5F0 0%, #E8E8E0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Air/IPAD-air-11inch-starlight.png' }
        ],
        storage: ['128GB', '256GB', '512GB', '1TB']
    },
    {
        id: 203,
        name: 'iPad Air 11"',
        price: 669,
        category: 'ipad',
        icon: '📲',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Air/IPAD-air-11inch-blue.png',
        colors: [
            { name: 'Blu', code: 'blue', gradient: 'linear-gradient(135deg, #9DD3FF 0%, #7DB3DF 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Air/IPAD-air-11inch-blue.png' },
            { name: 'Viola', code: 'purple', gradient: 'linear-gradient(135deg, #D4C5F9 0%, #B4A5D9 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Air/IPAD-air-11inch-purple.png' },
            { name: 'Space Gray', code: 'space-gray', gradient: 'linear-gradient(135deg, #5C5C5E 0%, #3C3C3E 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Air/IPAD-air-11inch-space-gray.png' },
            { name: 'Starlight', code: 'starlight', gradient: 'linear-gradient(135deg, #F5F5F0 0%, #E8E8E0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Air/IPAD-air-11inch-starlight.png' }
        ],
        storage: ['128GB', '256GB', '512GB', '1TB']
    },
    {
        id: 204,
        name: 'iPad 11"',
        price: 389,
        category: 'ipad',
        icon: '📲',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/A16%2010GEN/IPAD-10th-gen-blue.png',
        colors: [
            { name: 'Blu', code: 'blue', gradient: 'linear-gradient(135deg, #9DD3FF 0%, #7DB3DF 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/A16%2010GEN/IPAD-10th-gen-blue.png' },
            { name: 'Rosa', code: 'pink', gradient: 'linear-gradient(135deg, #FFB3C8 0%, #FF93A8 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/A16%2010GEN/IPAD-10th-gen-pink.png' },
            { name: 'Silver', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/A16%2010GEN/IPAD-10th-gen-silver.png' },
            { name: 'Giallo', code: 'yellow', gradient: 'linear-gradient(135deg, #FFE27A 0%, #F5D05A 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/A16%2010GEN/IPAD-10th-gen-yellow.png' }
        ],
        storage: ['64GB', '256GB']
    },
    {
        id: 205,
        name: 'iPad mini',
        price: 559,
        category: 'ipad',
        icon: '📲',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Mini/ipad-mini-blue.png',
        colors: [
            { name: 'Blu', code: 'blue', gradient: 'linear-gradient(135deg, #9DD3FF 0%, #7DB3DF 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Mini/ipad-mini-blue.png' },
            { name: 'Viola', code: 'purple', gradient: 'linear-gradient(135deg, #D4C5F9 0%, #B4A5D9 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Mini/ipad-mini-purple.png' },
            { name: 'Space Gray', code: 'space-gray', gradient: 'linear-gradient(135deg, #5C5C5E 0%, #3C3C3E 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Mini/ipad-mini-space-gray.png' },
            { name: 'Starlight', code: 'starlight', gradient: 'linear-gradient(135deg, #F5F5F0 0%, #E8E8E0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPad/Mini/ipad-mini-starlight.png' }
        ],
        storage: ['128GB', '256GB', '512GB']
    },

    // Accessori - AirPods
    {
        id: 300,
        name: 'AirPods Pro 3',
        price: 249,
        category: 'accessori',
        icon: '🎧',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Airpods/airpods-pro-3.png'
    },
    {
        id: 301,
        name: 'AirPods 4 con ANC',
        price: 199,
        category: 'accessori',
        icon: '🎧',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Airpods/airpods-4.png'
    },
    {
        id: 302,
        name: 'AirPods Max',
        price: 579,
        category: 'accessori',
        icon: '🎧',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Airpods/airpods-max-midnight.png',
        colors: [
            { name: 'Midnight', code: 'midnight', gradient: 'linear-gradient(135deg, #1C1C1E 0%, #000000 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Airpods/airpods-max-midnight.png' },
            { name: 'Starlight', code: 'starlight', gradient: 'linear-gradient(135deg, #F5F5F0 0%, #E8E8E0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Airpods/airpods-max-starlight.png' },
            { name: 'Blu', code: 'blue', gradient: 'linear-gradient(135deg, #9DD3FF 0%, #7DB3DF 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Airpods/airpods-max-blue.png' },
            { name: 'Arancione', code: 'orange', gradient: 'linear-gradient(135deg, #FFB97A 0%, #FF9F5A 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Airpods/airpods-max-orange.png' },
            { name: 'Viola', code: 'purple', gradient: 'linear-gradient(135deg, #D4C5F9 0%, #B4A5D9 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Airpods/airpods-max-purple.png' }
        ]
    },

    // Accessori - Input
    { id: 320, name: 'Magic Keyboard', price: 109, category: 'accessori', icon: '⌨️' },
    { id: 321, name: 'Magic Mouse', price: 89, category: 'accessori', icon: '🖱️' },
    { id: 322, name: 'Magic Trackpad', price: 149, category: 'accessori', icon: '🖱️' },
    {
        id: 323,
        name: 'Apple Pencil Pro',
        price: 149,
        category: 'accessori',
        icon: '✏️',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Apple%20Pencil/apple-pencil-pro.png'
    },
    {
        id: 324,
        name: 'Apple Pencil (USB-C)',
        price: 89,
        category: 'accessori',
        icon: '✏️',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Apple%20Pencil/apple-pencil-usbc.png'
    },

    // Accessori - Vari
    { id: 330, name: 'AirTag', price: 39, category: 'accessori', icon: '📍' },
    { id: 331, name: 'AirTag (Confezione da 4)', price: 129, category: 'accessori', icon: '📍' },
    { id: 332, name: 'Custodia iPhone MagSafe', price: 59, category: 'accessori', icon: '📱' },
    { id: 333, name: 'Caricatore MagSafe', price: 49, category: 'accessori', icon: '🔌' },
    { id: 334, name: 'Cavo USB-C (2m)', price: 35, category: 'accessori', icon: '🔌' }
];
