# 🔄 Istruzioni Reset dopo Fix Policy

## Problema
Dopo aver eseguito `fix-user-roles-simple.sql`, l'app potrebbe ancora mostrare errori perché:
- La sessione Supabase è ancora attiva con i vecchi permessi
- Il browser ha in cache la vecchia configurazione
- Il ruolo non è stato ricaricato

## ✅ Soluzione: Hard Reset

### Step 1: Logout dall'App
1. Clicca sul pulsante **Logout** nell'header
2. Dovresti tornare alla schermata di login

### Step 2: Clear Browser Cache (IMPORTANTE!)
**Chrome/Edge:**
- Premi `Ctrl + Shift + Delete`
- Seleziona "Cached images and files"
- Seleziona "Cookies and other site data"
- Clicca "Clear data"

**Oppure Hard Reload:**
- Premi `Ctrl + Shift + R` (Windows)
- Oppure `Ctrl + F5`

### Step 3: Verifica Policy su Supabase
Prima di fare login, verifica che le policy siano corrette:

1. Vai su **Supabase Dashboard**
2. **SQL Editor** → New Query
3. Esegui:
   ```sql
   SELECT policyname, cmd
   FROM pg_policies
   WHERE tablename = 'user_roles'
   ORDER BY policyname;
   ```

**Dovresti vedere:**
```
policyname                          | cmd
------------------------------------+--------
Users can create own operator role  | INSERT
Users can read own role             | SELECT
```

Se vedi ancora le vecchie policy con "Admins can view all roles", **riesegui** `fix-user-roles-simple.sql`!

### Step 4: Login di Nuovo
1. Fai login con le tue credenziali
2. Apri la **Console del Browser** (F12)
3. Verifica i log:

**Se funziona, dovresti vedere:**
```
🔐 Aggiornamento UI per ruolo: admin
✅ Ruolo autorizzato - Mostro pulsante Prezzi
```

**Se NON funziona, vedrai:**
```
Errore ottenimento ruolo: infinite recursion detected...
```

### Step 5: Se Ancora Non Funziona

Se dopo il logout/login vedi ancora l'errore di ricorsione infinita, significa che le policy non sono state aggiornate correttamente.

**Soluzione:**
1. Vai su **Supabase Dashboard**
2. **Database** → **Policies**
3. Cerca la tabella `user_roles`
4. **Elimina MANUALMENTE** tutte le policy con questi nomi:
   - "Admins can view all roles"
   - "Admins can insert roles"
   - "Admins can update roles"
   - "Admins can delete roles"
   - "Only admins can manage roles"

5. Poi **riesegui** `fix-user-roles-simple.sql`

---

## 🧪 Test Finale

Dopo il reset, testa:

1. ✅ Login funziona senza errori
2. ✅ Console mostra ruolo caricato correttamente
3. ✅ Pulsante "Prezzi" è visibile
4. ✅ Cliccando su "Prezzi" si apre il modale

---

## 📋 Checklist Completa

- [ ] Eseguito `fix-user-roles-simple.sql` su Supabase
- [ ] Fatto **logout** dall'app
- [ ] **Clear cache** del browser (`Ctrl + Shift + Delete`)
- [ ] Verificato policy con query SQL
- [ ] Fatto **login** di nuovo
- [ ] Verificato log in console (F12)
- [ ] Testato pulsante "Prezzi"

---

**Se tutto è ✅ = Bug risolto!**
**Se vedi ancora errori = Segnalami l'errore in console**
