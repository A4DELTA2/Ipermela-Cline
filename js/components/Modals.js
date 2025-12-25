export const Modals = () => `
    <!-- Order Modal -->
    <div id="order-modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in">
            <!-- Modal Header -->
            <div class="bg-success dark:bg-success-dark p-6">
                <div class="flex items-center justify-between text-white">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
                            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold">Completa Ordine</h2>
                            <p class="text-sm text-white/80">Inserisci i dati del cliente</p>
                        </div>
                    </div>
                    <button id="close-order-modal"
                        class="close w-10 h-10 flex items-center justify-center bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-95">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Modal Body -->
            <div class="p-8">
                <div class="modal-form space-y-4">
                    <!-- Customer Name -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Nome Cliente <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input type="text" id="customer-name" placeholder="Es: Mario Rossi" required
                                class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-300" />
                        </div>
                    </div>

                    <!-- Customer Email -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Email Cliente
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input type="email" id="customer-email" placeholder="Es: mario.rossi@email.com"
                                class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-300" />
                        </div>
                    </div>

                    <!-- Customer Phone -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Telefono
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <input type="tel" id="customer-phone" placeholder="Es: +39 123 456 7890"
                                class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-300" />
                        </div>
                    </div>

                    <!-- Order Notes -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Note Ordine
                        </label>
                        <div class="relative">
                            <div class="absolute top-3 left-4 pointer-events-none">
                                <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                            </div>
                            <textarea id="order-notes" placeholder="Note aggiuntive sull'ordine (opzionale)..."
                                class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl resize-none text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 min-h-[100px] transition-all duration-300"></textarea>
                        </div>
                    </div>

                    <!-- Sede Selection -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-3">
                            Sede <span class="text-red-500">*</span>
                        </label>
                        <div class="flex gap-4">
                            <!-- Radio Thiene -->
                            <label class="flex-1 relative cursor-pointer">
                                <input type="radio" name="order-sede" id="order-sede-thiene" value="Thiene" required
                                    class="peer sr-only">
                                <div class="w-full py-3 px-4 border-2 border-gray-200 rounded-xl text-center font-medium text-gray-700
                                            peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700
                                            hover:border-gray-300 transition-all duration-200">
                                    <svg class="w-5 h-5 inline-block mr-2 text-gray-400 peer-checked:text-green-600"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Thiene
                                </div>
                            </label>

                            <!-- Radio Bassano -->
                            <label class="flex-1 relative cursor-pointer">
                                <input type="radio" name="order-sede" id="order-sede-bassano" value="Bassano" required
                                    class="peer sr-only">
                                <div class="w-full py-3 px-4 border-2 border-gray-200 rounded-xl text-center font-medium text-gray-700
                                            peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700
                                            hover:border-gray-300 transition-all duration-200">
                                    <svg class="w-5 h-5 inline-block mr-2 text-gray-400 peer-checked:text-green-600"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Bassano
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Confirm Button -->
                    <button id="confirm-order-btn"
                        class="w-full py-3.5 bg-success dark:bg-success-dark text-white font-semibold rounded-xl transition-all duration-300 hover:bg-success-dark dark:hover:bg-success hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mt-6">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Conferma Ordine</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- PDF Preview Modal -->
    <div id="pdf-preview-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] p-4">
        <div
            class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] overflow-hidden animate-fade-in flex flex-col">
            <!-- Modal Header -->
            <div class="bg-brand dark:bg-brand-darkmode p-4 flex-shrink-0">
                <div class="flex items-center justify-between text-white">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl backdrop-blur-sm">
                            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold">Anteprima PDF Ordine</h2>
                            <p class="text-sm text-white/80" id="preview-order-info">Caricamento...</p>
                        </div>
                    </div>
                    <button id="close-pdf-preview"
                        class="w-10 h-10 flex items-center justify-center bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-95">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- PDF Iframe Container -->
            <div class="flex-1 overflow-hidden bg-gray-100">
                <iframe id="pdf-preview-iframe" class="w-full h-full border-0"></iframe>
            </div>

            <!-- Modal Footer Actions -->
            <div class="bg-gray-50 p-4 border-t-2 border-gray-200 flex-shrink-0">
                <div class="flex flex-col sm:flex-row gap-3">
                    <button id="download-pdf-btn"
                        class="flex-1 px-6 py-3 bg-brand dark:bg-brand-darkmode text-white font-semibold rounded-xl transition-all duration-300 hover:bg-brand-dark dark:hover:bg-brand hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Scarica PDF</span>
                    </button>
                    <button id="edit-order-btn"
                        class="flex-1 px-6 py-3 bg-info dark:bg-info-dark text-white font-semibold rounded-xl transition-all duration-300 hover:bg-info-dark dark:hover:bg-info hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Modifica Ordine</span>
                    </button>
                    <button id="close-preview-btn"
                        class="px-6 py-3 bg-white border-2 border-gray-200 text-gray-600 font-medium rounded-xl transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Chiudi</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Price Management Section -->
    <div id="price-management-section"
        class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto p-4">
        <div class="bg-white max-w-7xl mx-auto rounded-2xl shadow-2xl overflow-hidden my-8 animate-fade-in">

            <!-- Header with gradient -->
            <div class="bg-warning dark:bg-warning-dark p-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
                            <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-white">Gestione Prezzi</h2>
                            <p class="text-sm text-[#F5F5F7]">Modifica i prezzi del catalogo</p>
                        </div>
                    </div>
                    <button id="close-price-management"
                        class="px-5 py-2.5 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white hover:text-orange-600 hover:scale-105 active:scale-95 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Chiudi</span>
                    </button>
                </div>
            </div>

            <!-- Controls -->
            <div class="p-6 space-y-4 bg-gray-50 border-b-2 border-gray-200">
                <!-- Search Bar -->
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input type="text" id="price-search-input" placeholder="Cerca prodotto per nome..."
                        class="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/20 transition-all duration-300" />
                </div>

                <!-- Category Filters -->
                <div class="flex flex-wrap gap-2">
                    <button
                        class="price-category-btn px-5 py-2.5 border-2 border-gray-200 bg-white rounded-xl font-medium text-sm transition-all duration-300 hover:border-brand-dark hover:shadow-md active"
                        data-category="all">
                        <span>Tutti</span>
                    </button>
                    <button
                        class="price-category-btn px-5 py-2.5 border-2 border-gray-200 bg-white rounded-xl font-medium text-sm transition-all duration-300 hover:border-brand-dark hover:shadow-md"
                        data-category="iphone">
                        <span>iPhone</span>
                    </button>
                    <button
                        class="price-category-btn px-5 py-2.5 border-2 border-gray-200 bg-white rounded-xl font-medium text-sm transition-all duration-300 hover:border-brand-dark hover:shadow-md"
                        data-category="mac">
                        <span>Mac</span>
                    </button>
                    <button
                        class="price-category-btn px-5 py-2.5 border-2 border-gray-200 bg-white rounded-xl font-medium text-sm transition-all duration-300 hover:border-brand-dark hover:shadow-md"
                        data-category="ipad">
                        <span>iPad</span>
                    </button>
                    <button
                        class="price-category-btn px-5 py-2.5 border-2 border-gray-200 bg-white rounded-xl font-medium text-sm transition-all duration-300 hover:border-brand-dark hover:shadow-md"
                        data-category="accessori">
                        <span>Accessori</span>
                    </button>
                </div>
            </div>

            <!-- Price Table -->
            <div class="overflow-x-auto max-h-[500px] overflow-y-auto">
                <table id="price-table" class="w-full">
                    <thead class="bg-gray-100 sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th
                                class="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">
                                Prodotto</th>
                            <th
                                class="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">
                                Categoria</th>
                            <th
                                class="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">
                                Prezzo Originale</th>
                            <th
                                class="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">
                                Prezzo Attuale</th>
                            <th
                                class="px-4 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">
                                Azioni</th>
                        </tr>
                    </thead>
                    <tbody id="price-table-body" class="bg-white divide-y divide-gray-100">
                        <!-- Populated dynamically -->
                    </tbody>
                </table>
            </div>

            <!-- Footer Actions -->
            <div class="p-6 bg-gray-50 border-t-2 border-gray-200">
                <div class="flex flex-col sm:flex-row gap-3">
                    <button id="save-all-prices-btn"
                        class="flex-1 py-3.5 bg-success dark:bg-success-dark text-white font-semibold rounded-xl transition-all duration-300 hover:bg-success-dark dark:hover:bg-success hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        <span>Salva Tutte le Modifiche</span>
                    </button>
                    <button id="reset-all-prices-btn"
                        class="flex-1 py-3.5 bg-danger dark:bg-danger-dark text-white font-semibold rounded-xl transition-all duration-300 hover:bg-danger-dark dark:hover:bg-danger hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Ripristina Tutti gli Originali</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Scroll to Top Button -->
    <button id="scroll-to-top" title="Scroll to top" aria-label="Scroll to top">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
    </button>
`;