export const LoginScreen = () => `
    <!-- Schermata di Login - Modern Split Design -->
    <div id="login-screen" class="fixed inset-0 z-50 overflow-hidden">
        <!-- Split Layout -->
        <div class="flex h-full w-full">
            <!-- Left Side - Branding (Hidden on mobile) -->
            <div class="hidden lg:flex lg:w-1/2 lg:min-w-[50%] bg-orange-50 dark:bg-dark-bg relative overflow-hidden">
                <!-- Animated Background Pattern -->
                <div class="absolute inset-0 opacity-20">
                    <div
                        class="absolute top-20 left-20 w-72 h-72 bg-brand rounded-full mix-blend-multiply filter blur-3xl animate-pulse">
                    </div>
                    <div class="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                        style="animation-delay: 1s"></div>
                </div>

                <!-- Content -->
                <div
                    class="relative z-10 flex flex-col justify-center items-center w-full p-12 text-gray-800 dark:text-dark-text">
                    <div class="text-center mb-12 animate-fade-in">
                        <div class="mb-8 flex justify-center">
                            <img src="Logo_nero.png" alt="Ipermela Logo"
                                class="h-32 w-auto object-contain drop-shadow-2xl logo-light">
                            <img src="Logo_bianco.png" alt="Ipermela Logo"
                                class="h-32 w-auto object-contain drop-shadow-2xl logo-dark hidden">
                        </div>
                        <h1 class="text-4xl font-bold mb-4 tracking-tight text-gray-900 dark:text-dark-text">Sistema
                            Gestione Ordini</h1>
                    </div>

                    <!-- Features -->
                    <div class="mt-12 space-y-6 max-w-md">
                        <div class="flex items-center gap-4 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-2xl p-4 animate-slide-in shadow-sm border border-gray-200 dark:border-dark-border"
                            style="animation-delay: 0.2s">
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-brand/10 dark:bg-brand/20 rounded-xl flex items-center justify-center">
                                <span class="text-2xl">📦</span>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900 dark:text-dark-text">Gestione Ordini</h3>
                                <p class="text-sm text-gray-600 dark:text-dark-muted">Organizza i tuoi ordini in modo
                                    efficiente</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-2xl p-4 animate-slide-in shadow-sm border border-gray-200 dark:border-dark-border"
                            style="animation-delay: 0.4s">
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-brand/10 dark:bg-brand/20 rounded-xl flex items-center justify-center">
                                <span class="text-2xl">💰</span>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900 dark:text-dark-text">Gestione Prezzi</h3>
                                <p class="text-sm text-gray-600 dark:text-dark-muted">Controlla e aggiorna i prezzi in
                                    tempo reale</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-2xl p-4 animate-slide-in shadow-sm border border-gray-200 dark:border-dark-border"
                            style="animation-delay: 0.6s">
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-brand/10 dark:bg-brand/20 rounded-xl flex items-center justify-center">
                                <span class="text-2xl">📊</span>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900 dark:text-dark-text">Report & Analytics</h3>
                                <p class="text-sm text-gray-600 dark:text-dark-muted">Esporta dati e genera report PDF
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Side - Login Form -->
            <div class="w-full lg:w-1/2 lg:min-w-[50%] flex items-center justify-center p-8 bg-gray-50 dark:bg-dark-bg">
                <div class="w-full max-w-md">
                    <!-- Mobile Logo (Visible only on mobile) -->
                    <div class="lg:hidden text-center mb-8 animate-fade-in">
                        <div class="mb-4 flex justify-center">
                            <img src="Logo_nero.png" alt="Ipermela Logo" class="h-20 w-auto object-contain logo-light">
                            <img src="Logo_bianco.png" alt="Ipermela Logo"
                                class="h-20 w-auto object-contain logo-dark hidden">
                        </div>
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">Sistema Gestione Ordini</h1>
                    </div>

                    <!-- Login Card -->
                    <div class="bg-white dark:bg-dark-card rounded-3xl shadow-2xl p-8 lg:p-10 animate-slide-in">
                        <div class="mb-8">
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Bentornato!</h2>
                            <p class="text-gray-600 dark:text-dark-muted">Accedi per continuare</p>
                        </div>

                        <form id="login-form" class="space-y-6">
                            <!-- Email Input -->
                            <div class="space-y-2">
                                <label for="login-email"
                                    class="block text-sm font-semibold text-gray-900 dark:text-dark-text">
                                    Indirizzo Email
                                </label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg class="h-5 w-5 text-gray-400 dark:text-dark-muted" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <input type="email" id="login-email" placeholder="tuaemail@ipermela.it" required
                                        autocomplete="email"
                                        class="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-dark-bg border-2 border-gray-200 dark:border-dark-border rounded-xl text-base text-gray-900 dark:text-dark-text transition-all duration-300 focus:outline-none focus:border-brand dark:focus:border-brand focus:bg-white dark:focus:bg-dark-elevated focus:ring-4 focus:ring-brand/10" />
                                </div>
                            </div>

                            <!-- Password Input -->
                            <div class="space-y-2">
                                <label for="login-password"
                                    class="block text-sm font-semibold text-gray-900 dark:text-dark-text">
                                    Password
                                </label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg class="h-5 w-5 text-gray-400 dark:text-dark-muted" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input type="password" id="login-password" placeholder="••••••••" required
                                        autocomplete="current-password"
                                        class="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-dark-bg border-2 border-gray-200 dark:border-dark-border rounded-xl text-base text-gray-900 dark:text-dark-text transition-all duration-300 focus:outline-none focus:border-brand dark:focus:border-brand focus:bg-white dark:focus:bg-dark-elevated focus:ring-4 focus:ring-brand/10" />
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" class="relative w-full group">
                                <div
                                    class="absolute -inset-0.5 bg-brand-dark rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300">
                                </div>
                                <div
                                    class="relative w-full py-4 bg-brand-dark text-white font-semibold rounded-xl text-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-lg shadow-brand-dark/30">
                                    <span>Accedi</span>
                                    <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            </button>
                        </form>

                        <!-- Footer -->
                        <div class="mt-8 pt-6 border-t border-gray-200 dark:border-dark-border">
                            <div
                                class="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-dark-muted">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Accesso sicuro con Supabase Auth</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;