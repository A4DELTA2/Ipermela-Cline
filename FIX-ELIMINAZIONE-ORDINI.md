# 🔧 Fix: Impossibile Eliminare Ordini (Errore RLS)

## 🐛 Problema Identificato

Quando si tenta di eliminare un ordine, l'applicazione mostra l'errore:
```
Errore nell'eliminazione dell'ordine!
infinite recursion detected in policy for relation "user_roles"
```

### Causa Tecnica

Le **Row Level Security (RLS) policies** sulla tabella `user_roles` causavano una **ricorsione infinita**:

1. Per eliminare un ordine, la policy verifica se l'utente è admin
2. Per verificare se l'utente è admin, interroga la tabella `user_roles`
3. Per accedere a `user_roles`, la policy verifica di nuovo se l'utente è admin
4. **Loop infinito** → Errore 500

Questo problema si verificava in:
- ❌ Eliminazione ordini
- ❌ Caricamento ruoli utenti
- ❌ Caricamento prezzi personalizzati
- ❌ Qualsiasi operazione che richiedeva verifica permessi

## ✅ Soluzione

Ho creato un nuovo script SQL che risolve definitivamente il problema usando **funzioni SECURITY DEFINER** che bypassano RLS:

- `auth.is_admin()` - Verifica se l'utente corrente è admin
- `auth.get_my_role()` - Ottiene il ruolo dell'utente corrente

Queste funzioni girano con privilegi elevati e non causano ricorsione.

## 📋 Come Applicare la Fix

### 1️⃣ Apri Supabase Dashboard

1. Vai su [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Seleziona il tuo progetto **Ipermela Store**
3. Nel menu laterale, clicca su **SQL Editor**

### 2️⃣ Esegui lo Script di Fix

1. Clicca su **New query**
2. Apri il file [`supabase-fix-rls-recursion.sql`](./supabase-fix-rls-recursion.sql)
3. **Copia TUTTO il contenuto** dello script
4. **Incolla** nell'editor SQL di Supabase
5. Clicca su **Run** (o premi `Ctrl+Enter`)

### 3️⃣ Verifica che la Fix sia Applicata

Esegui questa query per verificare che tutti gli utenti abbiano un ruolo:

```sql
SELECT u.email, ur.role, ur.created_at
FROM auth.users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
ORDER BY u.created_at DESC;
```

✅ **Risultato atteso**: Ogni utente deve avere un `role` assegnato (`admin` o `operator`).

### 4️⃣ Testa l'Applicazione

1. **Ricarica completamente** la pagina dell'app (Ctrl+F5)
2. Effettua il **login**
3. Prova ad **eliminare un ordine**
4. ✅ Dovrebbe funzionare senza errori!

## 🔍 Cosa è Stato Modificato

### Policy Rimosse (Causavano Ricorsione)

- ❌ `Only admins can view roles` - Ricorsione infinita
- ❌ `Only admins can manage roles` - Ricorsione infinita
- ❌ `Admins can view all roles` (vecchia versione) - Ricorsione infinita

### Nuove Policy (Senza Ricorsione)

- ✅ `Users can view their own role` - Usa `user_id = auth.uid()`
- ✅ `Admins can view all roles` - Usa `auth.is_admin()` (SECURITY DEFINER)
- ✅ `Admins can insert/update/delete roles` - Usa `auth.is_admin()`

### Policy Aggiornate su Altre Tabelle

- ✅ `orders` - Policy di eliminazione aggiornata
- ✅ `custom_products` - Policy di eliminazione aggiornata
- ✅ `product_prices` - Policy di modifica aggiornata

## 🚨 Troubleshooting

### Errore: "permission denied for schema auth"

**Soluzione**: Le funzioni `auth.is_admin()` e `auth.get_my_role()` usano lo schema `auth`. Se ricevi questo errore, potresti dover:

1. Verificare che il tuo utente Supabase abbia i permessi necessari
2. Contattare il supporto Supabase se il problema persiste

### L'errore persiste dopo aver applicato lo script

**Soluzione**:

1. Verifica che lo script sia stato eseguito **completamente** senza errori
2. **Svuota la cache** del browser (Ctrl+Shift+Delete)
3. Effettua un **hard refresh** (Ctrl+F5)
4. **Disconnetti e riconnetti** dall'applicazione
5. Controlla la console del browser per nuovi errori

### Gli ordini vengono eliminati ma non si aggiorna la lista

**Questo è un problema diverso**. Se l'ordine viene eliminato ma la lista non si aggiorna:

1. Controlla che `renderSavedOrders()` venga chiamata dopo l'eliminazione
2. Verifica che non ci siano errori nella console del browser

## 📚 Riferimenti Tecnici

- **Supabase RLS**: [https://supabase.com/docs/guides/auth/row-level-security](https://supabase.com/docs/guides/auth/row-level-security)
- **PostgreSQL SECURITY DEFINER**: [https://www.postgresql.org/docs/current/sql-createfunction.html](https://www.postgresql.org/docs/current/sql-createfunction.html)
- **Evitare ricorsione RLS**: [https://supabase.com/docs/guides/database/postgres/row-level-security#avoid-infinite-recursion](https://supabase.com/docs/guides/database/postgres/row-level-security#avoid-infinite-recursion)

## ✨ Prossimi Passi

Dopo aver applicato questa fix:

1. ✅ L'eliminazione ordini funzionerà correttamente
2. ✅ Il caricamento dei ruoli non causerà più errori
3. ✅ Il caricamento dei prezzi funzionerà correttamente
4. ✅ Tutte le operazioni con verifica permessi funzioneranno

---

**Creato**: 25 Novembre 2025
**Versione**: 1.0
**Autore**: Claude Code (Ipermela Store Team)
