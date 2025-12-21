/**
 * @fileoverview Configurazione Supabase e costanti globali
 * @module config
 */

// Configurazione Supabase
export const SUPABASE_URL = 'https://prldireomgijzfppeunp.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBybGRpcmVvbWdpanpmcHBldW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NDgwOTMsImV4cCI6MjA3OTIyNDA5M30.ur9sD-Q9iYsim4R_TcGsuEOuZNb2sMG0FuLnsrXRG5Y';

// Inizializza client Supabase
export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Costanti applicazione
export const IVA_RATE = 0.22; // 22%
export const IVA_DISPLAY = '22%';
export const IVA_MULTIPLIER = 1.22; // 1 + IVA_RATE (per calcolo totale da subtotal)
export const IVA_DIVISOR = 1.22; // Per calcolo inverso (subtotal da totale IVA inclusa)
