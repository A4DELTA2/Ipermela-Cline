-- ================================================================================
-- CLEANUP OPZIONALE: Unifica le policy di gestione user_roles
-- ================================================================================
-- SCOPO: Sostituire le 3 policy separate (insert/update/delete) con 1 policy unica
-- QUANDO USARE: Solo se vuoi avere la struttura ottimale delle policy
--
-- NOTA: Questa è una pulizia OPZIONALE. Il sistema funziona anche così.
--       Esegui solo se vuoi allineare il database alla documentazione.
-- ================================================================================

-- Rimuovi le 3 policy separate per insert/update/delete
DROP POLICY IF EXISTS "Admins can insert roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON user_roles;

-- Rimuovi anche la vecchia policy "ALL" se esiste
DROP POLICY IF EXISTS "Only admins can manage roles" ON user_roles;

-- Crea 1 unica policy per tutte le operazioni di modifica
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
-- Dopo aver eseguito questo script, verifica:
--
-- SELECT policyname, cmd FROM pg_policies WHERE tablename = 'user_roles';
--
-- Dovresti vedere 3 policy:
-- 1. "Users can view their own role" (SELECT)
-- 2. "Admins can view all roles" (SELECT)
-- 3. "Only admins can manage roles" (ALL) ← Questa copre INSERT, UPDATE, DELETE
--
-- ================================================================================
