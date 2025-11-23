# 🔐 Guida Setup Autenticazione Sicura - Ipermela Store

Questa guida ti aiuterà a configurare l'autenticazione sicura con Supabase Auth per l'app Ipermela Store.

---

## 📋 Prerequisiti

- Account Supabase attivo
- Progetto Supabase già creato e collegato all'app
- Accesso al pannello Supabase Dashboard

---

## 🚀 Passo 1: Esegui lo Script SQL

### 1.1 Accedi a Supabase Dashboard
1. Vai su [supabase.com](https://supabase.com)
2. Accedi al tuo account
3. Seleziona il progetto **Ipermela Store**

### 1.2 Esegui il nuovo schema database
1. Nel menu laterale, clicca su **SQL Editor**
2. Clicca su **New Query**
3. Copia tutto il contenuto del file `supabase-setup.sql`
4. Incollalo nell'editor SQL
5. Clicca su **Run** (o premi `Ctrl+Enter`)

> ⚠️ **NOTA**: Se hai già dati nel database, lo script NON li cancellerà. Aggiungerà solo le nuove colonne e policy.

---

## 🔑 Passo 2: Abilita Email Authentication

### 2.1 Configura Email Provider
1. Nel menu laterale, vai su **Authentication**
2. Clicca su **Providers**
3. Trova **Email** nella lista
4. Clicca per espandere le impostazioni
5. Assicurati che sia **Abilitato** (toggle verde)
6. Configurazioni consigliate:
   - ✅ Enable Email provider
   - ✅ Confirm email (opzionale - se vuoi che gli utenti confermino l'email)
   - ✅ Secure email change (raccomandato)
7. Clicca **Save**

---

## 👤 Passo 3: Crea il Primo Utente Admin

### 3.1 Crea l'utente
1. Vai su **Authentication** > **Users**
2. Clicca su **Add User** (oppure **Invite User**)
3. Inserisci:
   - **Email**: `tuaemail@ipermela.it` (o la tua email aziendale)
   - **Password**: Scegli una password sicura (min. 8 caratteri)
   - ✅ **Auto Confirm User** (se non vuoi verificare l'email manualmente)
4. Clicca **Create User** o **Send Invitation**

### 3.2 Copia lo User ID
1. Dopo aver creato l'utente, vedrai una lista di utenti
2. Clicca sull'utente appena creato
3. Copia il valore di **ID** (sarà un UUID tipo: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### 3.3 Assegna il ruolo Admin
1. Vai su **SQL Editor**
2. Clicca **New Query**
3. Incolla questo comando (sostituisci `USER_ID_QUI` con l'ID copiato prima):

```sql
INSERT INTO user_roles (user_id, role)
VALUES ('USER_ID_QUI', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

Esempio:
```sql
INSERT INTO user_roles (user_id, role)
VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

4. Clicca **Run**
5. Se vedi "Success. No rows returned", è tutto ok! ✅

---

## 🧪 Passo 4: Testa l'Autenticazione

### 4.1 Testa in locale (su VS Code)
1. Apri il progetto in VS Code
2. Apri `index.html` con Live Server o un server locale
3. Dovresti vedere la schermata di login
4. Inserisci le credenziali dell'utente admin creato
5. Se tutto funziona, vedrai l'app normalmente

### 4.2 Testa su Netlify
1. Dopo aver fatto merge del branch `feature/secure-auth` su `main`
2. Netlify deploierà automaticamente
3. Vai sull'URL Netlify della tua app
4. Prova a fare login con le stesse credenziali

---

## 👥 Passo 5: Aggiungi Altri Utenti (Opzionale)

### 5.1 Crea utenti operatori
Se vuoi dare accesso ad altri membri del team:

1. Vai su **Authentication** > **Users**
2. Clicca **Add User**
3. Inserisci email e password del nuovo operatore
4. Il nuovo utente avrà automaticamente ruolo **operator** (può creare ordini e vedere tutto, ma NON può modificare prezzi)

### 5.2 Assegna ruoli diversi
Se vuoi dare permessi diversi:

**Ruoli disponibili:**
- **`admin`**: Può fare tutto (modificare prezzi, eliminare qualsiasi ordine, gestire utenti)
- **`operator`**: Può creare ordini, vedere ordini, aggiungere prodotti personalizzati
- **`viewer`**: Può solo vedere ordini (no modifica)

Per cambiare ruolo a un utente:
```sql
UPDATE user_roles 
SET role = 'admin'  -- oppure 'operator' o 'viewer'
WHERE user_id = 'USER_ID_QUI';
```

---

## 🔒 Cosa è Cambiato a Livello di Sicurezza

### Prima (NON SICURO):
❌ Password hardcoded nel codice JavaScript  
❌ Chiunque poteva aprire gli strumenti sviluppatore e bypassare l'autenticazione  
❌ Policy RLS permettevano a chiunque di accedere ai dati  

### Ora (SICURO):
✅ Autenticazione vera con Supabase Auth  
✅ Token JWT sicuri gestiti da Supabase  
✅ Policy RLS che proteggono davvero i dati  
✅ Solo utenti autenticati possono accedere all'app  
✅ Ruoli per gestire diversi livelli di permessi  
✅ Le chiavi Supabase pubbliche sono sicure (protette da RLS)  

---

## ❓ Domande Frequenti (FAQ)

### Q: Ho dimenticato la password admin, cosa faccio?
**R**: Vai su Supabase Dashboard > Authentication > Users > Clicca sull'utente > Send Password Reset Email

### Q: Posso cambiare l'email dell'utente admin?
**R**: Sì, da Supabase Dashboard > Authentication > Users > Clicca sull'utente > Modifica Email

### Q: Come elimino un utente?
**R**: Supabase Dashboard > Authentication > Users > Clicca sull'utente > Delete User (i dati associati rimarranno nel database)

### Q: L'app funziona ancora senza autenticazione per i clienti?
**R**: No, ora TUTTI devono autenticarsi. Se vuoi che i clienti possano vedere il catalogo senza login, devi creare policy separate per la lettura pubblica.

### Q: Ho problemi con le policy RLS?
**R**: Puoi temporaneamente disabilitare RLS per debug:
```sql
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
```
Ma ricorda di riabilitarlo dopo il test!

---

## 🆘 Problemi Comuni e Soluzioni

### Problema: "Invalid login credentials"
- Controlla che l'email sia corretta
- Verifica che la password sia corretta (min. 8 caratteri)
- Assicurati che l'utente sia stato creato su Supabase

### Problema: "User not authorized"
- Controlla che l'utente abbia un ruolo assegnato nella tabella `user_roles`
- Verifica con questo comando SQL:
```sql
SELECT * FROM user_roles WHERE user_id = 'USER_ID_QUI';
```

### Problema: "Cannot read properties of null"
- Controlla che le chiavi Supabase (`SUPABASE_URL` e `SUPABASE_ANON_KEY`) siano corrette in `script.js`
- Verifica che il progetto Supabase sia attivo

---

## 📞 Supporto

Se hai ancora problemi, contatta il team di sviluppo o apri una issue su GitHub.

---

**🎉 Configurazione completata!** 

Ora la tua app Ipermela Store è protetta da autenticazione sicura! 🔐

