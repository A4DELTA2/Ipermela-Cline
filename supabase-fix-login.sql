-- ============================================================================
-- FIX per il problema di login - Ipermela Store
-- ============================================================================
-- Questo script risolve il problema delle policy RLS che impedivano il login

-- PROBLEMA IDENTIFICATO:
-- La policy "Only admins can view roles" impediva agli utenti normali di leggere
-- il proprio ruolo dalla tabella user_roles, causando errori durante il login.

-- SOLUZIONE:
-- Permettiamo a ogni utente di leggere il PROPRIO ruolo (ma non quello degli altri)

-- ============================================================================
-- RIMUOVI LE VECCHIE POLICY PROBLEMATICHE
-- ============================================================================

DROP POLICY IF EXISTS "Only admins can view roles" ON user_roles;
DROP POLICY IF EXISTS "Only admins can manage roles" ON user_roles;

-- ============================================================================
-- NUOVE POLICY CORRETTE
-- ============================================================================

-- Ogni utente può leggere il PROPRIO ruolo
CREATE POLICY "Users can view their own role"
ON user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Gli admin possono leggere TUTTI i ruoli
CREATE POLICY "Admins can view all roles"
ON user_roles FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    )
);

-- Solo gli admin possono creare/modificare/eliminare ruoli
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

-- ============================================================================
-- VERIFICA CHE IL TRIGGER PER I NUOVI UTENTI SIA ATTIVO
-- ============================================================================

-- Ricrea la funzione per assegnare automaticamente il ruolo 'operator' ai nuovi utenti
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_roles (user_id, role)
    VALUES (NEW.id, 'operator')
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ricrea il trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- ISTRUZIONI PER L'USO
-- ============================================================================

-- 1. Esegui questo script nell'SQL Editor di Supabase Dashboard
-- 2. Verifica che i tuoi utenti esistenti abbiano un ruolo assegnato:
--    SELECT u.email, ur.role
--    FROM auth.users u
--    LEFT JOIN user_roles ur ON u.id = ur.user_id;
--
-- 3. Se qualche utente non ha un ruolo, assegnalo manualmente:
--    INSERT INTO user_roles (user_id, role)
--    VALUES ('user-id-qui', 'operator')
--    ON CONFLICT (user_id) DO UPDATE SET role = 'operator';

-- ============================================================================
-- FINE SCRIPT
-- ============================================================================
