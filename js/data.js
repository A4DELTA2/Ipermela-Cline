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
        '512GB': 1259,
        '1TB': 1599
    },
    // iPhone 17
    4: {
        '128GB': 999,
        '256GB': 1249,
        '512GB': 1499,
        '1TB': 1759
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
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/IPHONE_17PM_SILVER.svg',
        colors: [
            { name: 'Argento', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/IPHONE_17PM_SILVER.svg' },
            { name: 'Blu Profondo', code: 'deep-blue', gradient: 'linear-gradient(135deg, #1E3A5F 0%, #0A1929 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/IPHONE_17PM_BLUE.svg' },
            { name: 'Arancione Cosmico', code: 'cosmic-orange', gradient: 'linear-gradient(135deg, #FF6B35 0%, #C44D34 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/IPHONE_17PM_CORAL.svg' }
        ],
        storage: ['256GB', '512GB', '1TB', '2TB']
    },
    {
        id: 2,
        name: 'iPhone 17 Pro',
        price: 1359,
        category: 'iphone',
        icon: '📱',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017%20Pro/IPHONE_17P_SILVER.svg',
        colors: [
            { name: 'Argento', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017%20Pro/IPHONE_17P_SILVER.svg' },
            { name: 'Blu Profondo', code: 'deep-blue', gradient: 'linear-gradient(135deg, #1E3A5F 0%, #0A1929 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017%20Pro/IPHONE_17P_BLUE.svg' },
            { name: 'Arancione Cosmico', code: 'cosmic-orange', gradient: 'linear-gradient(135deg, #FF6B35 0%, #C44D34 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017%20Pro/IPHONE_17P_CORAL.svg' }
        ],
        storage: ['256GB', '512GB', '1TB', '2TB']
    },
    {
        id: 3,
        name: 'iPhone Air',
        price: 1259,
        category: 'iphone',
        icon: '📱',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Iphone%20Air/IP_AIR_CELESTE.svg',
        colors: [
            { name: 'Blu Cielo', code: 'skyblue', gradient: 'linear-gradient(135deg, #F0F9FF 0%, #D0E9FF 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Iphone%20Air/IP_AIR_CELESTE.svg' },
            { name: 'Oro Chiaro', code: 'lightgold', gradient: 'linear-gradient(135deg, #FFFCF5 0%, #F5F0E0 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Iphone%20Air/IP_AIR_GOLD.svg' },
            { name: 'Nero Siderale', code: 'spaceblack', gradient: 'linear-gradient(135deg, #000000 0%, #1C1C1E 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Iphone%20Air/IP_AIR_BLACK.svg' },
            { name: 'Bianco Nuvola', code: 'cloudwhite', gradient: 'linear-gradient(135deg, #FCFCFC 0%, #E8E8E8 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/Iphone%20Air/IP_AIR_WHITE.svg' }
        ],
        storage: ['512GB', '1TB']
    },
    {
        id: 4,
        name: 'iPhone 17',
        price: 999,
        category: 'iphone',
        icon: '📱',
        imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017/IP_17_LAVANDA.svg',
        colors: [
            { name: 'Lavanda', code: 'lavender', gradient: 'linear-gradient(135deg, #DFCEEA 0%, #C4A8D8 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017/IP_17_LAVANDA.svg' },
            { name: 'Blu Bruma', code: 'mistblue', gradient: 'linear-gradient(135deg, #96AED1 0%, #7A93B8 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017/IP_17_AZZURRO.svg' },
            { name: 'Salvia', code: 'sage', gradient: 'linear-gradient(135deg, #A9B689 0%, #8FA070 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017/IP_17_SALVIA.svg' },
            { name: 'Nero', code: 'black', gradient: 'linear-gradient(135deg, #353839 0%, #1C1C1E 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017/IP_17_NERO.svg' },
            { name: 'Bianco', code: 'white', gradient: 'linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%)', imageUrl: 'https://prldireomgijzfppeunp.supabase.co/storage/v1/object/public/product-icons/iPhone%2017/IP_17_BIANCO.svg' }
        ],
        storage: ['128GB', '256GB', '512GB', '1TB']
    },
    {
        id: 41,
        name: 'iPhone 17 Air',
        price: 1199,
        category: 'iphone',
        icon: '📱',
        colors: [
            { name: 'Blu Cielo', code: 'skyblue', gradient: 'linear-gradient(135deg, #F0F9FF 0%, #D0E9FF 100%)' },
            { name: 'Oro Chiaro', code: 'lightgold', gradient: 'linear-gradient(135deg, #FFFCF5 0%, #F5F0E0 100%)' },
            { name: 'Nero Siderale', code: 'spaceblack', gradient: 'linear-gradient(135deg, #000000 0%, #1C1C1E 100%)' },
            { name: 'Bianco Nuvola', code: 'cloudwhite', gradient: 'linear-gradient(135deg, #FCFCFC 0%, #E8E8E8 100%)' }
        ],
        storage: ['256GB', '512GB', '1TB']
    },

    // iPhone 16 Series
    {
        id: 5,
        name: 'iPhone 16 Plus',
        price: 999,
        category: 'iphone',
        icon: '📱',
        colors: [
            { name: 'Blu Oltremare', code: 'ultramarine', gradient: 'linear-gradient(135deg, #9AADF6 0%, #7A8ED6 100%)' },
            { name: 'Verde Acqua', code: 'teal', gradient: 'linear-gradient(135deg, #B0D4D2 0%, #90B4B2 100%)' },
            { name: 'Rosa', code: 'pink', gradient: 'linear-gradient(135deg, #F2ADDA 0%, #D28DBA 100%)' },
            { name: 'Bianco', code: 'white', gradient: 'linear-gradient(135deg, #FAFAFA 0%, #E8E8E8 100%)' },
            { name: 'Nero', code: 'black', gradient: 'linear-gradient(135deg, #3C4042 0%, #1C1C1E 100%)' }
        ],
        storage: ['128GB', '256GB', '512GB']
    },
    {
        id: 6,
        name: 'iPhone 16',
        price: 899,
        category: 'iphone',
        icon: '📱',
        colors: [
            { name: 'Blu Oltremare', code: 'ultramarine', gradient: 'linear-gradient(135deg, #9AADF6 0%, #7A8ED6 100%)' },
            { name: 'Verde Acqua', code: 'teal', gradient: 'linear-gradient(135deg, #B0D4D2 0%, #90B4B2 100%)' },
            { name: 'Rosa', code: 'pink', gradient: 'linear-gradient(135deg, #F2ADDA 0%, #D28DBA 100%)' },
            { name: 'Bianco', code: 'white', gradient: 'linear-gradient(135deg, #FAFAFA 0%, #E8E8E8 100%)' },
            { name: 'Nero', code: 'black', gradient: 'linear-gradient(135deg, #3C4042 0%, #1C1C1E 100%)' }
        ],
        storage: ['128GB', '256GB', '512GB']
    },
    {
        id: 7,
        name: 'iPhone 16e',
        price: 749,
        category: 'iphone',
        icon: '📱',
        colors: [
            { name: 'Nero', code: 'black', gradient: 'linear-gradient(135deg, #3C4042 0%, #1C1C1E 100%)' },
            { name: 'Bianco', code: 'white', gradient: 'linear-gradient(135deg, #FAFAFA 0%, #E8E8E8 100%)' }
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
            { name: 'Midnight', code: 'midnight', gradient: 'linear-gradient(135deg, #1C1C1E 0%, #000000 100%)' },
            { name: 'Starlight', code: 'starlight', gradient: 'linear-gradient(135deg, #F5F5F0 0%, #E8E8E0 100%)' },
            { name: 'Silver', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)' },
            { name: 'Sky Blue', code: 'skyblue', gradient: 'linear-gradient(135deg, #87CEEB 0%, #4A90E2 100%)' }
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
            { name: 'Midnight', code: 'midnight', gradient: 'linear-gradient(135deg, #1C1C1E 0%, #000000 100%)' },
            { name: 'Starlight', code: 'starlight', gradient: 'linear-gradient(135deg, #F5F5F0 0%, #E8E8E0 100%)' },
            { name: 'Silver', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)' },
            { name: 'Sky Blue', code: 'skyblue', gradient: 'linear-gradient(135deg, #87CEEB 0%, #4A90E2 100%)' }
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
            { name: 'Nero Siderale', code: 'spaceblack', gradient: 'linear-gradient(135deg, #1C1C1E 0%, #000000 100%)' },
            { name: 'Argento', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)' }
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
            { name: 'Nero Siderale', code: 'spaceblack', gradient: 'linear-gradient(135deg, #1C1C1E 0%, #000000 100%)' },
            { name: 'Argento', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)' }
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
            { name: 'Verde', code: 'green', gradient: 'linear-gradient(135deg, #A3E7D5 0%, #7FCFBB 100%)' },
            { name: 'Giallo', code: 'yellow', gradient: 'linear-gradient(135deg, #FFE27A 0%, #F5D05A 100%)' },
            { name: 'Arancione', code: 'orange', gradient: 'linear-gradient(135deg, #FFB97A 0%, #FF9F5A 100%)' },
            { name: 'Rosa', code: 'pink', gradient: 'linear-gradient(135deg, #FFB3C8 0%, #FF93A8 100%)' },
            { name: 'Viola', code: 'purple', gradient: 'linear-gradient(135deg, #D4C5F9 0%, #B4A5D9 100%)' },
            { name: 'Blu', code: 'blue', gradient: 'linear-gradient(135deg, #9DD3FF 0%, #7DB3DF 100%)' },
            { name: 'Argento', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)' }
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
            { name: 'Verde', code: 'green', gradient: 'linear-gradient(135deg, #A3E7D5 0%, #7FCFBB 100%)' },
            { name: 'Giallo', code: 'yellow', gradient: 'linear-gradient(135deg, #FFE27A 0%, #F5D05A 100%)' },
            { name: 'Arancione', code: 'orange', gradient: 'linear-gradient(135deg, #FFB97A 0%, #FF9F5A 100%)' },
            { name: 'Rosa', code: 'pink', gradient: 'linear-gradient(135deg, #FFB3C8 0%, #FF93A8 100%)' },
            { name: 'Viola', code: 'purple', gradient: 'linear-gradient(135deg, #D4C5F9 0%, #B4A5D9 100%)' },
            { name: 'Blu', code: 'blue', gradient: 'linear-gradient(135deg, #9DD3FF 0%, #7DB3DF 100%)' },
            { name: 'Argento', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)' }
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
        imageUrl: 'https://placehold.co/600x800/2C2C2E/ffffff?text=iPad+Pro+13+M5',
        colors: [
            { name: 'Space Black', code: 'space-black', gradient: 'linear-gradient(135deg, #2C2C2E 0%, #1C1C1E 100%)', imageUrl: 'https://placehold.co/600x800/2C2C2E/ffffff?text=iPad+Pro+13+M5+Space+Black' },
            { name: 'Silver', code: 'silver', gradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)', imageUrl: 'https://placehold.co/600x800/E8E8E8/666666?text=iPad+Pro+13+M5+Silver' }
        ],
        storage: ['256GB', '512GB', '1TB', '2TB'],
        storageNotes: '1TB e 2TB: 16GB RAM + 10-core CPU | 256GB/512GB: 12GB RAM + 9-core CPU'
    },
    { id: 201, name: 'iPad Pro 11" (M5)', price: 1119, category: 'ipad', icon: '📲' },
    { id: 202, name: 'iPad Air 13"', price: 669, category: 'ipad', icon: '📲' },
    { id: 203, name: 'iPad Air 11"', price: 669, category: 'ipad', icon: '📲' },
    { id: 204, name: 'iPad 11"', price: 389, category: 'ipad', icon: '📲' },
    { id: 205, name: 'iPad mini', price: 559, category: 'ipad', icon: '📲' },

    // Accessori - AirPods
    { id: 300, name: 'AirPods Pro 3', price: 249, category: 'accessori', icon: '🎧' },
    { id: 301, name: 'AirPods 4 con ANC', price: 199, category: 'accessori', icon: '🎧' },
    { id: 302, name: 'AirPods Max', price: 579, category: 'accessori', icon: '🎧' },

    // Accessori - Apple Watch
    { id: 310, name: 'Apple Watch Series 10', price: 449, category: 'accessori', icon: '⌚' },
    { id: 311, name: 'Apple Watch SE', price: 279, category: 'accessori', icon: '⌚' },
    { id: 312, name: 'Apple Watch Ultra 2', price: 899, category: 'accessori', icon: '⌚' },

    // Accessori - Input
    { id: 320, name: 'Magic Keyboard', price: 109, category: 'accessori', icon: '⌨️' },
    { id: 321, name: 'Magic Mouse', price: 89, category: 'accessori', icon: '🖱️' },
    { id: 322, name: 'Magic Trackpad', price: 149, category: 'accessori', icon: '🖱️' },
    { id: 323, name: 'Apple Pencil Pro', price: 149, category: 'accessori', icon: '✏️' },
    { id: 324, name: 'Apple Pencil (USB-C)', price: 89, category: 'accessori', icon: '✏️' },

    // Accessori - Vari
    { id: 330, name: 'AirTag', price: 39, category: 'accessori', icon: '📍' },
    { id: 331, name: 'AirTag (Confezione da 4)', price: 129, category: 'accessori', icon: '📍' },
    { id: 332, name: 'Custodia iPhone MagSafe', price: 59, category: 'accessori', icon: '📱' },
    { id: 333, name: 'Caricatore MagSafe', price: 49, category: 'accessori', icon: '🔌' },
    { id: 334, name: 'Cavo USB-C (2m)', price: 35, category: 'accessori', icon: '🔌' },
    { id: 335, name: 'HomePod mini', price: 109, category: 'accessori', icon: '🔊' },
    { id: 336, name: 'HomePod', price: 349, category: 'accessori', icon: '🔊' }
];
