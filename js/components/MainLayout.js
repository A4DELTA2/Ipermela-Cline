import { IVA_DISPLAY } from '../config.js';

export const MainLayout = () => `
    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        <!-- Catalogo Prodotti (Full width su mobile, 2/3 su desktop) -->
        <section class="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <!-- Header with title and search -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Catalogo Prodotti</h2>

                <!-- Search Bar -->
                <div class="relative sm:w-80">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input type="text" id="search-input" placeholder="Cerca prodotti..."
                        class="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:border-apple-blue focus:bg-white focus:shadow-lg focus:shadow-apple-blue/10" />
                </div>
            </div>

            <!-- Category Filters -->
            <div class="flex flex-wrap gap-2 mb-5">
                <button
                    class="category-btn px-5 py-2.5 border-2 border-gray-200 bg-white rounded-xl font-medium text-sm text-gray-700 transition-all duration-300 hover:border-apple-blue hover:text-apple-blue hover:shadow-md active"
                    data-category="all">
                    <span>Tutti</span>
                </button>
                <button
                    class="category-btn px-5 py-2.5 border-2 border-gray-200 bg-white rounded-xl font-medium text-sm text-gray-700 transition-all duration-300 hover:border-apple-blue hover:text-apple-blue hover:shadow-md"
                    data-category="iphone">
                    <span>iPhone</span>
                </button>
                <button
                    class="category-btn px-5 py-2.5 border-2 border-gray-200 bg-white rounded-xl font-medium text-sm text-gray-700 transition-all duration-300 hover:border-apple-blue hover:text-apple-blue hover:shadow-md"
                    data-category="mac">
                    <span>Mac</span>
                </button>
                <button
                    class="category-btn px-5 py-2.5 border-2 border-gray-200 bg-white rounded-xl font-medium text-sm text-gray-700 transition-all duration-300 hover:border-apple-blue hover:text-apple-blue hover:shadow-md"
                    data-category="ipad">
                    <span>iPad</span>
                </button>
                <button
                    class="category-btn px-5 py-2.5 border-2 border-gray-200 bg-white rounded-xl font-medium text-sm text-gray-700 transition-all duration-300 hover:border-apple-blue hover:text-apple-blue hover:shadow-md"
                    data-category="accessori">
                    <span>Accessori</span>
                </button>
            </div>

            <!-- Mac Subcategories -->
            <div id="mac-subcategories" class="hidden p-4 mb-5 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <div class="flex items-center gap-2 mb-3">
                    <svg class="w-5 h-5 text-apple-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <span class="text-sm font-semibold text-apple-blue">Filtra per modello:</span>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button
                        class="subcategory-btn px-4 py-2 border-2 border-blue-200 bg-white text-apple-blue rounded-lg font-medium text-sm transition-all duration-300 hover:bg-apple-blue hover:text-white hover:shadow-md active"
                        data-subcategory="all">Tutti i Mac</button>
                    <button
                        class="subcategory-btn px-4 py-2 border-2 border-blue-200 bg-white text-apple-blue rounded-lg font-medium text-sm transition-all duration-300 hover:bg-apple-blue hover:text-white hover:shadow-md"
                        data-subcategory="macbook-air">MacBook Air</button>
                    <button
                        class="subcategory-btn px-4 py-2 border-2 border-blue-200 bg-white text-apple-blue rounded-lg font-medium text-sm transition-all duration-300 hover:bg-apple-blue hover:text-white hover:shadow-md"
                        data-subcategory="macbook-pro">MacBook Pro</button>
                    <button
                        class="subcategory-btn px-4 py-2 border-2 border-blue-200 bg-white text-apple-blue rounded-lg font-medium text-sm transition-all duration-300 hover:bg-apple-blue hover:text-white hover:shadow-md"
                        data-subcategory="imac">iMac</button>
                    <button
                        class="subcategory-btn px-4 py-2 border-2 border-blue-200 bg-white text-apple-blue rounded-lg font-medium text-sm transition-all duration-300 hover:bg-apple-blue hover:text-white hover:shadow-md"
                        data-subcategory="mac-mini">Mac mini</button>
                    <button
                        class="subcategory-btn px-4 py-2 border-2 border-blue-200 bg-white text-apple-blue rounded-lg font-medium text-sm transition-all duration-300 hover:bg-apple-blue hover:text-white hover:shadow-md"
                        data-subcategory="mac-studio">Mac Studio</button>
                </div>
            </div>

            <!-- Products Grid -->
            <!-- Lista Prodotti (Layout Verticale ad Elenco) -->
            <div id="products-grid" class="space-y-3 mb-6"></div>

            <!-- Custom Accessory Form -->
            <div
                class="custom-accessory relative overflow-hidden p-6 bg-blue-50 border-2 border-dashed border-apple-blue rounded-2xl">
                <!-- Decorative background -->
                <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-apple-blue/5 rounded-full blur-2xl">
                </div>
                <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl">
                </div>

                <div class="relative">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="flex items-center justify-center w-10 h-10 bg-apple-blue/10 rounded-xl">
                            <svg class="w-6 h-6 text-apple-blue" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-gray-900">Accessorio Personalizzato</h3>
                            <p class="text-sm text-gray-600">Aggiungi un prodotto non in catalogo</p>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-3">
                        <input type="text" id="custom-name" placeholder="Nome accessorio"
                            class="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300" />
                        <select id="custom-icon"
                            class="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300 cursor-pointer">
                            <option value="🎁">🎁</option>
                            <option value="📱">📱</option>
                            <option value="💻">💻</option>
                            <option value="🎧">🎧</option>
                            <option value="🔌">🔌</option>
                            <option value="🛡️">🛡️</option>
                            <option value="🎒">🎒</option>
                            <option value="🔧">🔧</option>
                        </select>
                        <input type="number" id="custom-price" placeholder="Prezzo (€)" min="0" step="0.01"
                            class="sm:w-40 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300" />
                        <button id="add-custom-btn"
                            class="px-6 py-3 bg-info dark:bg-info-dark text-white font-semibold rounded-xl transition-all duration-300 hover:bg-info-dark dark:hover:bg-info hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Aggiungi</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Shopping Cart (1/3 width su desktop, sticky) -->
        <section
            class="cart-section lg:col-span-1 bg-white rounded-2xl shadow-lg overflow-hidden lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-3rem)] flex flex-col">
            <!-- Cart Header -->
            <div class="bg-info dark:bg-info-dark p-6">
                <div class="flex items-center gap-3 text-white">
                    <div class="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl backdrop-blur-sm">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-xl font-bold">Ordine Corrente</h2>
                        <p class="text-sm text-white/80" id="cart-item-count">0 articoli</p>
                    </div>
                </div>
            </div>

            <!-- Cart Items -->
            <div id="cart-items" class="flex-1 p-6 space-y-3 overflow-y-auto"></div>

            <!-- Cart Summary -->
            <div class="bg-gray-50 p-6 border-t-2 border-gray-100">
                <div class="space-y-3 mb-5">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Subtotale
                        </span>
                        <span id="subtotal" class="font-semibold text-gray-900">€0.00</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                            </svg>
                            IVA (${IVA_DISPLAY})
                        </span>
                        <span id="tax" class="font-semibold text-gray-900">€0.00</span>
                    </div>
                    <div class="pt-3 border-t-2 border-gray-200">
                        <div class="flex justify-between items-center">
                            <span class="text-lg font-bold text-gray-900">Totale</span>
                            <span id="total" class="text-2xl font-bold text-apple-blue">€0.00</span>
                        </div>
                    </div>
                </div>

                <!-- Cart Actions -->
                <div class="space-y-2">
                    <button id="save-order-btn"
                        class="w-full py-3.5 bg-info dark:bg-info-dark text-white font-semibold rounded-xl transition-all duration-300 hover:opacity-90 hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Salva Ordine</span>
                    </button>
                    <button id="clear-cart-btn"
                        class="w-full py-2.5 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium rounded-xl transition-all duration-300 hover:border-danger hover:bg-danger dark:hover:bg-danger-dark hover:text-white flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Svuota Carrello</span>
                    </button>
                </div>
            </div>
        </section>
    </div>
`;