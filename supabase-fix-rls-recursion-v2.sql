-- ============================================================================
-- FIX DEFINITIVO per il problema di ricorsione infinita nelle policy RLS
-- VERSIONE 2 - Usa schema PUBLIC (non auth)
-- ============================================================================
-- Problema: Le policy su user_roles causavano ricorsione infinita perché
-- per verificare se un utente è admin, interrogavano user_roles stessa.
--
-- Soluzione: Usare funzioni SECURITY DEFINER nello schema public
-- ============================================================================

-- ============================================================================
-- STEP 1: Rimuovere TUTTE le policy problematiche su user_roles
-- ============================================================================

DROP POLICY IF EXISTS "Only admins can view roles" ON user_roles;
DROP POLICY IF EXISTS "Only admins can manage roles" ON user_roles;
DROP POLICY IF EXISTS "Users can view their own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON user_roles;

-- ============================================================================
-- STEP 2: Creare funzioni helper SECURITY DEFINER nello schema PUBLIC
-- ============================================================================

-- Funzione per verificare se l'utente corrente è admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Funzione per ottenere il ruolo dell'utente corrente
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT AS $$
BEGIN
    RETURN (
        SELECT role FROM public.user_roles
        WHERE user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 3: Creare nuove policy SENZA ricorsione
-- ============================================================================

-- Ogni utente può vedere solo il PROPRIO ruolo
CREATE POLICY "Users can view their own role"
ON user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Gli admin possono vedere TUTTI i ruoli (usando la funzione SECURITY DEFINER)
CREATE POLICY "Admins can view all roles"
ON user_roles FOR SELECT
TO authenticated
USING (public.is_admin());

-- Gli admin possono inserire nuovi ruoli
CREATE POLICY "Admins can insert roles"
ON user_roles FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- Gli admin possono aggiornare ruoli esistenti
CREATE POLICY "Admins can update roles"
ON user_roles FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Gli admin possono eliminare ruoli
CREATE POLICY "Admins can delete roles"
ON user_roles FOR DELETE
TO authenticated
USING (public.is_admin());

-- ============================================================================
-- STEP 4: Aggiornare le policy su orders per usare la funzione helper
-- ============================================================================

-- Rimuovi la vecchia policy che causava problemi
DROP POLICY IF EXISTS "Admins can delete any order" ON orders;

-- Ricrea usando la funzione SECURITY DEFINER
CREATE POLICY "Admins can delete any order"
ON orders FOR DELETE
TO authenticated
USING (public.is_admin());

-- ============================================================================
-- STEP 5: Aggiornare le policy su custom_products
-- ============================================================================

DROP POLICY IF EXISTS "Admins can delete any custom product" ON custom_products;

CREATE POLICY "Admins can delete any custom product"
ON custom_products FOR DELETE
TO authenticated
USING (public.is_admin());

-- ============================================================================
-- STEP 6: Aggiornare le policy su product_prices
-- ============================================================================

DROP POLICY IF EXISTS "Authorized users can modify prices" ON product_prices;

CREATE POLICY "Authorized users can modify prices"
ON product_prices FOR ALL
TO authenticated
USING (
    public.is_admin() OR
    public.get_my_role() = 'operator'
)
WITH CHECK (
    public.is_admin() OR
    public.get_my_role() = 'operator'
);

-- ============================================================================
-- STEP 7: Assicurarsi che il trigger per nuovi utenti funzioni
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'operator')
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- STEP 8: Assegna ruolo 'operator' a tutti gli utenti che non ne hanno uno
-- ============================================================================

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'operator'
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.user_roles)
ON CONFLICT (user_id) DO NOTHING;

-- ============================================================================
-- VERIFICA FINALE
-- ============================================================================

-- Esegui questa query per verificare che tutto funzioni:
SELECT u.email, ur.role, ur.created_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
ORDER BY u.created_at DESC;

-- ============================================================================
-- ISTRUZIONI FINALI
-- ============================================================================

-- 1. Se vedi questo risultato senza errori, la fix è stata applicata!
-- 2. Ricarica la pagina dell'applicazione (Ctrl+F5)
-- 3. Prova ad eliminare un ordine - dovrebbe funzionare!

-- ============================================================================
-- FINE SCRIPT
-- ============================================================================
