# 🚀 Quick Start - Fix Bug Login Ipermela Store

**Problema:** Errore login utenti non-admin + errore "policy already exists"

**Soluzione:** Script di migrazione veloce

---

## ⚡ ISTRUZIONI RAPIDE (2 minuti)

### Step 1: Esegui lo Script di Migrazione

1. **Apri Supabase Dashboard**
   - Vai su: https://supabase.com/dashboard
   - Seleziona il tuo progetto Ipermela

2. **SQL Editor**
   - Sidebar → SQL Editor → New Query

3. **Copia e Incolla**
   - Apri il file: [`migrate-user-roles-fix.sql`](migrate-user-roles-fix.sql)
   - Copia TUTTO il contenuto
   - Incolla nell'editor SQL

4. **Esegui**
   - Clicca il pulsante **Run** (o CTRL+Enter)
   - Attendi 2-3 secondi
   - ✅ Dovresti vedere "Success"

### Step 2: Verifica

1. **Controlla le Policy**
   ```sql
   SELECT policyname FROM pg_policies WHERE tablename = 'user_roles';
   ```

   Dovresti vedere:
   - `Users can view their own role`
   - `Admins can view all roles`
   - `Only admins can manage roles`

2. **Testa il Login**
   - Apri l'app Ipermela Store
   - Fai login con un utente operator
   - ✅ Dovrebbe funzionare!

---

## 📁 File Disponibili

| File | Quando Usarlo |
|------|---------------|
| **migrate-user-roles-fix.sql** | ⚡ ORA - Fix veloce database esistente |
| **supabase-setup.sql** (v1.2.0) | 🔄 FUTURO - Setup completo nuove installazioni |
| **fix-rls-policy.sql** | ⚠️ DEPRECATO - Non usare se hai errori |

---

## ❓ Problemi?

### Errore: "permission denied"
- Assicurati di essere loggato come owner del progetto Supabase
- Verifica di avere i permessi di amministratore

### Errore: "relation user_roles does not exist"
- La tabella non esiste ancora
- Esegui prima lo script completo: `supabase-setup.sql`

### Login ancora non funziona
1. Verifica che l'utente abbia un ruolo in `user_roles`:
   ```sql
   SELECT * FROM user_roles;
   ```

2. Se manca, crea il ruolo:
   ```sql
   INSERT INTO user_roles (user_id, role)
   VALUES ('USER_ID_QUI', 'operator');
   ```

---

## 📚 Documentazione Completa

Per dettagli completi su tutti i bug corretti:
- Leggi: [`BUGFIX-2025-01-12.md`](BUGFIX-2025-01-12.md)

---

**🎉 Fatto! Il bug è risolto!**

*Ultima modifica: 12 Gennaio 2025*
