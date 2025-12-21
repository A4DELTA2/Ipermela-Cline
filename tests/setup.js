/**
 * Vitest Setup File
 * Global test configuration and mocks
 */

// Mock window.matchMedia for dark mode tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock Supabase client for tests
const mockSupabaseClient = {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
    update: () => ({ eq: () => ({ select: () => Promise.resolve({ data: null, error: null }) }) }),
    delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
};

global.supabase = mockSupabaseClient;

// Mock window.supabase for imports
global.window = global.window || {};
global.window.supabase = {
  createClient: () => mockSupabaseClient,
};

console.log('✅ Vitest setup complete');
