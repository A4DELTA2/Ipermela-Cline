-- ================================================================================
-- FIX SEMPLICE: Policy user_roles senza ricorsione
-- ================================================================================
-- SOLUZIONE: Permetti a tutti gli utenti autenticati di leggere user_roles
-- Questo è SICURO perché ogni utente può comunque vedere solo il proprio ruolo
--
-- ESEGUI QUESTO SCRIPT SU SUPABASE SQL EDITOR!
-- ================================================================================

-- Rimuovi tutte le policy esistenti
DROP POLICY IF EXISTS "Only admins can view roles" ON user_roles;
DROP POLICY IF EXISTS "Only admins can manage roles" ON user_roles;
DROP POLICY IF EXISTS "Users can view their own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON user_roles;

-- ✅ POLICY SEMPLICE: Ogni utente vede solo il proprio ruolo
CREATE POLICY "Users can read own role"
ON user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- ✅ POLICY SEMPLICE: Permetti creazione automatica ruolo
CREATE POLICY "Users can create own operator role"
ON user_roles FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = user_id AND role = 'operator'
);

-- ================================================================================
-- VERIFICA
-- ================================================================================
-- Testa il login dopo aver eseguito questo script.
-- Il login dovrebbe funzionare senza errori di ricorsione.
--
-- Query di verifica:
-- SELECT * FROM pg_policies WHERE tablename = 'user_roles';
--
-- ================================================================================
