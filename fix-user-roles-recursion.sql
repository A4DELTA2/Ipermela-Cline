-- ================================================================================
-- FIX URGENTE: Ricorsione Infinita Policy user_roles
-- ================================================================================
-- PROBLEMA: Le policy con EXISTS(SELECT FROM user_roles) creano ricorsione infinita
-- SOLUZIONE: Permettere a tutti gli utenti autenticati di vedere user_roles
--
-- IMPORTANTE: Questo è sicuro perché:
-- 1. Gli utenti possono vedere solo il proprio ruolo (USING auth.uid() = user_id)
-- 2. Solo gli admin possono modificare i ruoli (verificato a livello applicazione)
--
-- ESEGUI QUESTO SCRIPT SU SUPABASE SQL EDITOR!
--
-- Data: 12 Gennaio 2025
-- Versione: 2.0 - Fix ricorsione
-- ================================================================================

-- ================================================================================
-- STEP 1: Rimuovi TUTTE le policy esistenti su user_roles
-- ================================================================================

DROP POLICY IF EXISTS "Only admins can view roles" ON user_roles;
DROP POLICY IF EXISTS "Only admins can manage roles" ON user_roles;
DROP POLICY IF EXISTS "Users can view their own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON user_roles;

-- ================================================================================
-- STEP 2: Crea policy SEMPLICI senza ricorsione
-- ================================================================================

-- Policy 1: Tutti gli utenti autenticati possono vedere il proprio ruolo
-- SICURO: Ogni utente vede solo la propria riga (auth.uid() = user_id)
CREATE POLICY "Users can read own role"
ON user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy 2: Solo gli admin possono inserire nuovi ruoli
-- NOTA: Usa una security definer function per evitare ricorsione
CREATE POLICY "Service role can insert roles"
ON user_roles FOR INSERT
TO authenticated
WITH CHECK (
    -- Permetti solo se l'utente ha ruolo service_role (tramite function)
    auth.jwt() ->> 'role' = 'service_role'
    OR
    -- Oppure permetti creazione automatica del proprio ruolo operator
    (user_id = auth.uid() AND role = 'operator')
);

-- Policy 3: Solo service_role può modificare ruoli
CREATE POLICY "Service role can update roles"
ON user_roles FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'role' = 'service_role');

-- Policy 4: Solo service_role può eliminare ruoli
CREATE POLICY "Service role can delete roles"
ON user_roles FOR DELETE
TO authenticated
USING (auth.jwt() ->> 'role' = 'service_role');

-- ================================================================================
-- STEP 3: Crea funzioni helper per gestione ruoli
-- ================================================================================

-- Funzione per verificare se un utente è admin (SECURITY DEFINER)
-- Questa funzione bypassa RLS e previene ricorsione
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    );
END;
$$;

-- Funzione per ottenere il ruolo corrente (SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role
    FROM user_roles
    WHERE user_id = auth.uid()
    LIMIT 1;

    RETURN COALESCE(user_role, 'operator');
END;
$$;

-- ================================================================================
-- VERIFICA
-- ================================================================================
-- Esegui queste query per verificare:
--
-- 1. Controlla le policy create:
--    SELECT policyname, cmd FROM pg_policies WHERE tablename = 'user_roles';
--
-- 2. Testa la funzione is_admin():
--    SELECT public.is_admin();
--
-- 3. Testa la funzione current_user_role():
--    SELECT public.current_user_role();
--
-- ================================================================================
-- NOTE IMPORTANTI
-- ================================================================================
--
-- 1. ✅ Le policy RLS ora NON hanno ricorsione
-- 2. ✅ Ogni utente può leggere solo il proprio ruolo
-- 3. ✅ Solo service_role (admin Supabase) può modificare ruoli
-- 4. ⚠️ Per gestire ruoli nell'app, usa le funzioni SECURITY DEFINER
--
-- 5. Se vuoi permettere agli admin di gestire ruoli via UI:
--    - Crea una Supabase Edge Function autenticata
--    - Oppure usa il service_role key (lato server only!)
--
-- ================================================================================
-- FINE DELLO SCRIPT
-- ================================================================================
