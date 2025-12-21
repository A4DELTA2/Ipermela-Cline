export const Header = () => `
    <!-- Header - Modern Navigation -->
    <header
        class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl mb-8 p-4 md:p-6 border border-gray-200/50 sticky top-4 z-40">
        <div class="flex items-center justify-between gap-4">
            <!-- Logo & Brand -->
            <div class="flex items-center gap-3">
                <img src="Logo_nero.png" alt="Ipermela Logo" class="h-12 w-auto object-contain logo-light">
                <img src="Logo_bianco.png" alt="Ipermela Logo" class="h-12 w-auto object-contain logo-dark hidden">
            </div>

            <!-- Desktop Actions -->
            <div class="hidden md:flex items-center gap-2">
                <!-- Orders Management -->
                <button id="open-orders-v2-btn" title="Gestione Ordini"
                    class="px-4 py-2.5 flex items-center gap-2 bg-brand text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand/30 hover:-translate-y-0.5">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <span class="hidden lg:inline">Ordini</span>
                </button>

                <!-- Price Management -->
                <button id="price-management-btn" title="Gestione Prezzi"
                    class="hidden md:flex px-4 py-2.5 items-center gap-2 bg-warning dark:bg-warning-dark text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-warning/30 hover:-translate-y-0.5">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span class="hidden lg:inline">Prezzi</span>
                </button>

                <!-- Quick Add -->
                <button id="quick-add-btn" title="Aggiungi prodotto"
                    class="px-4 py-2.5 flex items-center gap-2 bg-white text-gray-900 font-semibold rounded-xl border-2 border-dashed border-brand-dark transition-all duration-300 hover:bg-brand/10 hover:border-brand-dark hover:-translate-y-0.5">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span class="hidden lg:inline">Nuovo</span>
                </button>

                <!-- Cart -->
                <button id="quick-cart-btn" title="Vai al carrello"
                    class="relative px-4 py-2.5 flex items-center gap-2 bg-info dark:bg-info-dark text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-info/30 hover:-translate-y-0.5">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span id="cart-count" class="hidden lg:inline">0</span>
                    <span
                        class="absolute -top-2 -right-2 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">0</span>
                </button>

                <!-- Dark Mode Toggle -->
                <button id="dark-mode-toggle-btn" onclick="window.toggleDarkMode()"
                    class="p-2.5 bg-gray-100 text-gray-900 rounded-xl transition-all duration-300 hover:bg-gray-200 hover:-translate-y-0.5"
                    title="Toggle Dark Mode">
                    <svg class="w-5 h-5 sun-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <svg class="w-5 h-5 moon-icon hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </button>

                <!-- Logout -->
                <button id="logout-btn"
                    class="p-2.5 bg-apple-red text-white rounded-xl transition-all duration-300 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5"
                    title="Logout">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>

            <!-- Mobile Menu Button -->
            <button id="mobile-menu-btn"
                class="md:hidden p-2.5 bg-gray-100 text-gray-900 rounded-xl transition-all duration-300 hover:bg-gray-200">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>

        <!-- Mobile Dropdown -->
        <div id="mobile-dropdown"
            class="hidden absolute top-20 right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl min-w-[280px] overflow-hidden animate-slide-down z-50 border border-gray-200 dark:border-gray-700">
            <!-- User Info -->
            <div class="px-5 py-4 bg-purple-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-apple-purple rounded-xl flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p id="user-email-mobile"
                            class="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                            utente@ipermela.it</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Operatore</p>
                    </div>
                </div>
            </div>

            <!-- Menu Items -->
            <button
                class="w-full px-5 py-4 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                data-action="open-orders">
                <div class="w-10 h-10 bg-brand rounded-xl flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                </div>
                <span class="flex-1 text-left font-medium text-gray-900 dark:text-gray-100">Gestione Ordini</span>
            </button>

            <button
                class="w-full px-5 py-4 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                data-action="price-management">
                <div class="w-10 h-10 bg-warning dark:bg-warning-dark rounded-xl flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                </div>
                <span class="flex-1 text-left font-medium text-gray-900 dark:text-gray-100">Gestione Prezzi</span>
            </button>

            <button
                class="w-full px-5 py-4 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                data-action="quick-add">
                <div class="w-10 h-10 bg-brand dark:bg-brand-darkmode rounded-xl flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <span class="flex-1 text-left font-medium text-gray-900 dark:text-gray-100">Aggiungi Prodotto</span>
            </button>

            <button
                class="w-full px-5 py-4 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                data-action="quick-cart">
                <div
                    class="w-10 h-10 bg-info dark:bg-info-dark rounded-xl flex items-center justify-center relative">
                    <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <span class="flex-1 text-left font-medium text-gray-900 dark:text-gray-100">Vai al Carrello</span>
                <span id="cart-count-mobile"
                    class="min-w-[24px] h-6 px-2 flex items-center justify-center bg-danger dark:bg-danger-dark text-white text-xs font-bold rounded-full">0</span>
            </button>

            <button onclick="window.toggleDarkMode()"
                class="w-full px-5 py-4 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                <div
                    class="w-10 h-10 bg-gray-800 dark:bg-brand-darkmode rounded-xl flex items-center justify-center">
                    <svg class="w-5 h-5 text-white sun-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <svg class="w-5 h-5 text-white moon-icon hidden" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </div>
                <span class="flex-1 text-left font-medium text-gray-900 dark:text-gray-100">Dark Mode</span>
            </button>

            <button id="mobile-logout-btn"
                class="w-full px-5 py-4 flex items-center gap-3 bg-danger dark:bg-danger-dark text-white transition-colors hover:bg-[#E53E3E] dark:hover:bg-[#FC8181]">
                <div class="w-10 h-10 bg-red-700 dark:bg-red-600 rounded-xl flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </div>
                <span class="flex-1 text-left font-semibold">Esci</span>
            </button>
        </div>
    </header>
`;