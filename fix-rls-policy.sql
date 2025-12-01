-- ================================================================================
-- FIX URGENTE: Policy RLS Circolare per user_roles
-- ================================================================================
-- Questo script corregge il Bug #1 CRITICO che impediva il login utenti non-admin
--
-- ATTENZIONE: Se ricevi l'errore "policy already exists", significa che le policy
-- esistono già nel database. In questo caso, usa invece il file:
--    migrate-user-roles-fix.sql
-- che rimuove prima le policy esistenti e poi le ricrea.
--
-- ESEGUI QUESTO SCRIPT SU SUPABASE SQL EDITOR per risolvere il problema!
--
-- Data: 12 Gennaio 2025
-- Versione: 1.0 (Deprecato - usa migrate-user-roles-fix.sql)
-- ================================================================================

-- Rimuovi le vecchie policy problematiche
DROP POLICY IF EXISTS "Only admins can view roles" ON user_roles;
DROP POLICY IF EXISTS "Only admins can manage roles" ON user_roles;

-- ================================================================================
-- NUOVE POLICY CORRETTE
-- ================================================================================

-- 1. Ogni utente può vedere il PROPRIO ruolo (necessario per getUserRole())
CREATE POLICY "Users can view their own role"
ON user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 2. Gli admin possono vedere TUTTI i ruoli
CREATE POLICY "Admins can view all roles"
ON user_roles FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    )
);

-- 3. Solo gli admin possono inserire/modificare/eliminare ruoli
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
-- Dopo aver eseguito questo script, verifica che le policy siano corrette:

-- SELECT * FROM pg_policies WHERE tablename = 'user_roles';

-- Dovresti vedere 3 policy:
-- 1. "Users can view their own role" (SELECT)
-- 2. "Admins can view all roles" (SELECT)
-- 3. "Only admins can manage roles" (ALL)

-- ================================================================================
-- TEST
-- ================================================================================
-- Testa il login con un utente operator:
-- 1. Vai su Authentication > Users
-- 2. Verifica che l'utente abbia un ruolo in user_roles
-- 3. Prova a fare login dall'app
-- 4. Dovrebbe funzionare! ✅

-- ================================================================================
-- FINE DELLO SCRIPT
-- ================================================================================
