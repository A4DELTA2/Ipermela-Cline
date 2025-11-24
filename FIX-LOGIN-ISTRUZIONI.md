# 🔧 Guida per Risolvere il Problema di Login

## 🐛 Problema Identificato

Il login non funzionava a causa di un errore nelle **Row Level Security (RLS) policies** di Supabase sulla tabella `user_roles`.

**Causa specifica:**
- La policy "Only admins can view roles" impediva agli utenti normali di leggere il proprio ruolo
- Questo creava un circolo vizioso: il codice non poteva verificare se l'utente era admin perché servivano permessi admin per leggere i ruoli!

## ✅ Soluzione Applicata

Ho applicato **3 fix**:

### 1. 📝 Nuovo Script SQL per Supabase
Ho creato il file `supabase-fix-login.sql` che:
- Rimuove le policy RLS problematiche
- Crea nuove policy corrette che permettono a ogni utente di leggere il **proprio** ruolo
- Gli admin possono ancora vedere tutti i ruoli

### 2. 🔧 Miglioramento Gestione Errori JavaScript
Ho aggiornato la funzione `getUserRole()` in `script.js` per:
- Mostrare dettagli più precisi degli errori nella console
- Creare automaticamente un ruolo "operator" se l'utente non ne ha uno
- Gestire meglio i fallback in caso di errori

### 3. 💬 Messaggi di Errore Più Chiari
Ho migliorato la funzione `handleLogin()` per:
- Mostrare messaggi di errore specifici (email non confermata, credenziali errate, troppi tentativi, ecc.)
- Loggare più informazioni nella console per debug
- Validare correttamente la risposta del login

## 🚀 Come Applicare la Fix

### Passo 1: Eseguire lo Script SQL su Supabase

1. Vai su **Supabase Dashboard** → [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Seleziona il tuo progetto **Ipermela Store**
3. Vai su **SQL Editor** (icona nella sidebar)
4. Crea una nuova query
5. Copia e incolla tutto il contenuto del file `supabase-fix-login.sql`
6. Clicca su **"Run"** per eseguire lo script

### Passo 2: Verificare gli Utenti Esistenti

Dopo aver eseguito lo script, verifica che tutti i tuoi utenti abbiano un ruolo:

```sql
SELECT u.email, ur.role, u.id
FROM auth.users u
LEFT JOIN user_roles ur ON u.id = ur.user_id;
```

Se qualche utente non ha un ruolo (colonna `role` è NULL), assegnalo manualmente:

```sql
INSERT INTO user_roles (user_id, role)
VALUES ('USER-ID-DA-COPIARE-DALLA-QUERY-SOPRA', 'operator')
ON CONFLICT (user_id) DO UPDATE SET role = 'operator';
```

### Passo 3: Testare il Login

1. Apri l'applicazione nel browser
2. Prova a fare login con le tue credenziali
3. Controlla la **Console del Browser** (F12) per vedere i log dettagliati
4. Se ci sono ancora errori, copia i messaggi dalla console e condividili

## 🔍 Debug: Come Controllare i Log

Se il login ancora non funziona, apri la **Console del Browser** (F12 → tab "Console") e cerca questi messaggi:

### ✅ Login Riuscito - Dovresti Vedere:
```
Login effettuato con successo. User ID: xxxx-xxxx-xxxx
Ruolo utente: operator (o admin)
```

### ❌ Login Fallito - Cerca Questi Errori:

**Errore "Email not confirmed":**
```
Email non ancora confermata. Controlla la tua casella di posta.
```
→ **Soluzione**: Verifica l'email e clicca sul link di conferma ricevuto

**Errore "Invalid login credentials":**
```
Email o password non corretti. Riprova.
```
→ **Soluzione**: Verifica di aver inserito email e password corretti

**Errore RLS Policy:**
```
Errore ottenimento ruolo: {...}
Dettagli errore: policy_error...
```
→ **Soluzione**: Lo script SQL non è stato eseguito correttamente. Ripeti il Passo 1.

## 📋 Checklist Post-Fix

- [ ] Script SQL eseguito con successo su Supabase
- [ ] Verificato che tutti gli utenti hanno un ruolo assegnato
- [ ] File `script.js` aggiornato con le nuove funzioni
- [ ] Testato il login con almeno un utente
- [ ] Verificato che non ci siano errori nella console del browser

## 🆘 Problemi Persistenti?

Se il login ancora non funziona dopo aver seguito tutti i passaggi:

1. **Controlla la configurazione Supabase:**
   - Dashboard → Authentication → Providers → Email deve essere **abilitato**
   - Dashboard → Authentication → URL Configuration → Site URL deve essere corretto

2. **Verifica le credenziali nel codice:**
   - Apri `script.js`
   - Controlla che `SUPABASE_URL` e `SUPABASE_ANON_KEY` siano corretti

3. **Controlla i log di Supabase:**
   - Dashboard → Logs → Auth logs
   - Cerca errori relativi al tuo tentativo di login

4. **Inviami questi dettagli:**
   - Screenshot della Console del Browser (F12)
   - Screenshot dei log Auth di Supabase
   - Il messaggio di errore esatto che vedi

## 📚 Riferimenti

- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth JavaScript](https://supabase.com/docs/reference/javascript/auth-signinwithpassword)

---

**Ultima modifica:** 2025-11-24
**Stato:** ✅ Fix applicato e pronto per il test
