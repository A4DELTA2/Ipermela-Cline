-- ================================================================================
-- MIGRAZIONE URGENTE: Fix Policy RLS user_roles
-- ================================================================================
-- PROBLEMA: Bug critico che impedisce il login degli utenti non-admin
-- CAUSA: Policy circolare che blocca la lettura del proprio ruolo
-- SOLUZIONE: Permettere a ogni utente di leggere il proprio ruolo
--
-- ESEGUI QUESTO SCRIPT SU SUPABASE SQL EDITOR PER RISOLVERE IL BUG!
--
-- Data: 12 Gennaio 2025
-- Versione: 1.1.0
-- ================================================================================

-- ================================================================================
-- STEP 1: Rimuovi le policy problematiche esistenti
-- ================================================================================

DROP POLICY IF EXISTS "Only admins can view roles" ON user_roles;
DROP POLICY IF EXISTS "Only admins can manage roles" ON user_roles;

-- ================================================================================
-- STEP 2: Crea le 3 nuove policy corrette
-- ================================================================================

-- Policy 1: Ogni utente può vedere il PROPRIO ruolo
-- Questa è la FIX principale! Permette a getUserRole() di funzionare per tutti
CREATE POLICY "Users can view their own role"
ON user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy 2: Gli admin possono vedere TUTTI i ruoli
-- Permette agli admin di gestire ruoli di altri utenti
CREATE POLICY "Admins can view all roles"
ON user_roles FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    )
);

-- Policy 3: Solo gli admin possono modificare i ruoli
-- Protegge la tabella user_roles da modifiche non autorizzate
CREATE POLICY "Only admins can manage roles"
ON user_roles FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    )
);

-- ================================================================================
-- VERIFICA
-- ================================================================================
-- Esegui questa query per verificare che le policy siano state create correttamente:
--
-- SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'user_roles';
--
-- Dovresti vedere 3 policy:
-- 1. "Users can view their own role" (SELECT)
-- 2. "Admins can view all roles" (SELECT)
-- 3. "Only admins can manage roles" (ALL)

-- ================================================================================
-- TEST
-- ================================================================================
-- Dopo aver eseguito questo script:
--
-- 1. Vai su Authentication > Users nel pannello Supabase
-- 2. Verifica che gli utenti abbiano un ruolo assegnato in user_roles
-- 3. Prova a fare login dall'app con un utente operator
-- 4. Il login dovrebbe funzionare! ✓
--
-- Se il login funziona, il bug è risolto!

-- ================================================================================
-- NOTA IMPORTANTE
-- ================================================================================
-- Questo script modifica SOLO le policy di user_roles.
-- Non tocca le altre tabelle (orders, custom_products, product_prices)
-- che continuano a funzionare normalmente con le loro policy esistenti.

-- ================================================================================
-- FINE DELLO SCRIPT
-- ================================================================================
