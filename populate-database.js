/**
 * Script per popolare il database Supabase con ordini e note randomici
 *
 * Usage: node populate-database.js [numero_ordini]
 * Esempio: node populate-database.js 50
 */

import { createClient } from '@supabase/supabase-js';

// Configurazione Supabase
const SUPABASE_URL = 'https://prldireomgijzfppeunp.supabase.co';

// Usa Service Role Key da variabile d'ambiente o dalla riga di comando
// Per sicurezza, la Service Role Key deve essere fornita come variabile d'ambiente
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_SERVICE_KEY) {
    console.error('\n❌ ERRORE: Service Role Key non trovata!\n');
    console.log('📝 Per usare questo script, fornisci la Service Role Key in uno di questi modi:\n');
    console.log('   1. Variabile d\'ambiente:');
    console.log('      set SUPABASE_SERVICE_KEY=your_service_role_key && node populate-database.js 50\n');
    console.log('   2. Puoi trovare la Service Role Key in:');
    console.log('      Supabase Dashboard > Settings > API > service_role (secret)\n');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Dati di esempio
const FIRST_NAMES = [
    'Marco', 'Luca', 'Giuseppe', 'Francesco', 'Alessandro', 'Andrea', 'Matteo', 'Lorenzo', 'Davide', 'Riccardo',
    'Maria', 'Anna', 'Giulia', 'Francesca', 'Sara', 'Laura', 'Chiara', 'Elena', 'Valentina', 'Alessandra',
    'Giovanni', 'Antonio', 'Roberto', 'Paolo', 'Stefano', 'Mario', 'Luigi', 'Pietro', 'Carlo', 'Michele'
];

const LAST_NAMES = [
    'Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco',
    'Bruno', 'Gallo', 'Conti', 'De Luca', 'Mancini', 'Costa', 'Giordano', 'Rizzo', 'Lombardi', 'Moretti'
];

const PRODUCTS = [
    { id: 1, name: 'iPhone 17 Pro Max', basePrice: 1499, storage: ['256GB', '512GB', '1TB', '2TB'], colors: ['Argento', 'Blu Profondo', 'Arancione Cosmico'] },
    { id: 2, name: 'iPhone 17 Pro', basePrice: 1359, storage: ['256GB', '512GB', '1TB', '2TB'], colors: ['Argento', 'Blu Profondo', 'Arancione Cosmico'] },
    { id: 3, name: 'iPhone Air', basePrice: 1099, storage: ['256GB', '512GB', '1TB'], colors: ['Nero', 'Bianco', 'Rosa'] },
    { id: 4, name: 'iPhone 17', basePrice: 1249, storage: ['256GB', '512GB'], colors: ['Nero', 'Bianco', 'Blu'] },
    { id: 5, name: 'iPhone 16 Plus', basePrice: 999, storage: ['128GB', '256GB', '512GB'], colors: ['Nero', 'Bianco', 'Verde'] },
    { id: 6, name: 'iPhone 16', basePrice: 899, storage: ['128GB', '256GB', '512GB'], colors: ['Nero', 'Bianco', 'Rosa'] },
    { id: 7, name: 'iPhone 16e', basePrice: 749, storage: ['128GB', '256GB', '512GB'], colors: ['Nero', 'Bianco', 'Giallo'] },
    { id: 100, name: 'MacBook Air 13" M4', basePrice: 1199, storage: ['256GB', '512GB', '1TB', '2TB'], colors: ['Argento', 'Grigio Siderale'] },
    { id: 200, name: 'iPad Pro 13" M5', basePrice: 1719, storage: ['256GB', '512GB', '1TB', '2TB'], colors: ['Argento', 'Grigio Siderale'] }
];

const NOTES_TEMPLATES = [
    'Cliente richiede consegna urgente',
    'Pagamento rateale concordato',
    'Regalo di compleanno',
    'Cliente abituale - sconto applicato',
    'Richiesta fattura elettronica',
    'Consegna a domicilio',
    'Ritiro in negozio',
    'Cliente ha richiesto cover protettiva',
    'Necessita assistenza per configurazione',
    'Trade-in dispositivo precedente',
    'Estensione garanzia AppleCare+',
    'Cliente interessato ad accessori',
    '',
    '',
    '' // Note vuote sono più comuni
];

const ROAC_STATES = ['R', 'O', 'A', 'C'];

// Utility functions
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPhone() {
    const prefixes = ['320', '333', '340', '347', '348', '349', '380', '388', '389'];
    const prefix = randomElement(prefixes);
    const number = String(randomInt(1000000, 9999999));
    return `${prefix}${number}`;
}

function randomEmail(firstName, lastName) {
    const domains = ['gmail.com', 'yahoo.it', 'hotmail.it', 'libero.it', 'outlook.com', 'icloud.com'];
    const name = firstName.toLowerCase();
    const surname = lastName.toLowerCase();
    const domain = randomElement(domains);

    const formats = [
        `${name}.${surname}@${domain}`,
        `${name}${surname}@${domain}`,
        `${name}${randomInt(1, 99)}@${domain}`,
        `${name[0]}${surname}@${domain}`
    ];

    return randomElement(formats);
}

function randomDate(daysBack) {
    const now = new Date();
    const pastDate = new Date(now.getTime() - (Math.random() * daysBack * 24 * 60 * 60 * 1000));
    return pastDate.toISOString();
}

function generateOrderNumber(year, sequence) {
    return `${year}-${String(sequence).padStart(5, '0')}`;
}

function calculatePriceWithStorage(basePrice, storageIndex) {
    // Incremento prezzo basato sullo storage
    const increments = [0, 150, 300, 500]; // Per ogni tier di storage
    return basePrice + (increments[storageIndex] || 0);
}

function generateRandomItems() {
    const itemCount = randomInt(1, 4); // Da 1 a 4 prodotti per ordine
    const items = [];

    for (let i = 0; i < itemCount; i++) {
        const product = randomElement(PRODUCTS);
        const storage = randomElement(product.storage);
        const color = randomElement(product.colors);
        const storageIndex = product.storage.indexOf(storage);
        const price = calculatePriceWithStorage(product.basePrice, storageIndex);
        const quantity = randomInt(1, 2); // 1 o 2 unità

        items.push({
            id: product.id,
            variantKey: `${product.id}-${color}-${storage}`,
            name: product.name,
            price: price,
            quantity: quantity,
            color: color,
            storage: storage,
            status: randomElement(ROAC_STATES),
            status_updated_at: new Date().toISOString()
        });
    }

    return items;
}

function generateRandomOrder(orderNumber, orderId) {
    const firstName = randomElement(FIRST_NAMES);
    const lastName = randomElement(LAST_NAMES);
    const fullName = `${firstName} ${lastName}`;

    const items = generateRandomItems();
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subtotal = total / 1.22; // IVA 22%
    const tax = total - subtotal;

    const createdAt = randomDate(180); // Ultimi 6 mesi
    const sede = randomElement(['venezia', 'mestre']);
    const notes = randomElement(NOTES_TEMPLATES);

    const order = {
        id: orderId,
        date: new Date(createdAt).toLocaleString('it-IT'),
        customer_name: fullName,
        customer_email: randomEmail(firstName, lastName),
        customer_phone: randomPhone(),
        items: items,
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
        notes: notes,
        sede: sede,
        created_at: createdAt
    }

    return order;
}

async function populateDatabase(numberOfOrders = 50) {
    console.log(`\n🚀 Inizio popolazione database con ${numberOfOrders} ordini...\n`);

    const year = new Date().getFullYear();
    const orders = [];

    // Genera ID univoci basati su timestamp
    const baseId = Date.now();

    // Genera ordini
    for (let i = 1; i <= numberOfOrders; i++) {
        const orderNumber = generateOrderNumber(year, i);
        const orderId = baseId + i; // ID univoco crescente
        const order = generateRandomOrder(orderNumber, orderId);
        orders.push(order);

        if (i % 10 === 0) {
            console.log(`📝 Generati ${i}/${numberOfOrders} ordini...`);
        }
    }

    console.log(`\n✅ Tutti gli ordini generati!\n`);
    console.log(`📊 Statistiche:`);
    console.log(`   - Ordini totali: ${orders.length}`);
    console.log(`   - Totale items: ${orders.reduce((sum, o) => sum + o.items.length, 0)}`);
    console.log(`\n💾 Inserimento nel database Supabase...\n`);

    // Inserisci a batch (50 alla volta per evitare timeout)
    const batchSize = 50;
    let inserted = 0;

    for (let i = 0; i < orders.length; i += batchSize) {
        const batch = orders.slice(i, i + batchSize);

        try {
            const { data, error } = await supabase
                .from('orders')
                .insert(batch);

            if (error) {
                console.error(`❌ Errore inserimento batch ${i / batchSize + 1}:`, error.message);
                console.error('Dettagli:', error);
                throw error;
            }

            inserted += batch.length;
            console.log(`✅ Inseriti ${inserted}/${orders.length} ordini...`);

        } catch (error) {
            console.error(`❌ Errore durante l'inserimento:`, error);
            throw error;
        }
    }

    console.log(`\n🎉 Database popolato con successo!`);
    console.log(`📦 ${inserted} ordini inseriti nel database.\n`);
}

// Esegui lo script
const numberOfOrders = parseInt(process.argv[2]) || 50;

if (numberOfOrders < 1 || numberOfOrders > 500) {
    console.error('❌ Numero ordini deve essere tra 1 e 500');
    process.exit(1);
}

populateDatabase(numberOfOrders)
    .then(() => {
        console.log('✅ Script completato con successo!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Errore durante l\'esecuzione:', error);
        process.exit(1);
    });
