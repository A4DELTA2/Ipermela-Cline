# ⚠️ ATTENZIONE - NON MODIFICARE QUESTO REPOSITORY DIRETTAMENTE

## Questo è il repository PRINCIPALE

**NON sviluppare qui!** Rischi di sovrascrivere il codice in produzione.

---

## ✅ Usa la Worktree per sviluppare

### Percorso corretto per sviluppare:
```
C:\Users\andre\.claude-worktrees\Ipermela-Cline\stupefied-banzai
```

### Come aprire la worktree in VS Code:
```bash
code "C:\Users\andre\.claude-worktrees\Ipermela-Cline\stupefied-banzai"
```

---

## 🛡️ Protezioni attive

1. **Git Hook Pre-commit**: Bloccherà automaticamente qualsiasi tentativo di commit in questo repository
2. **Questo file**: Ti ricorda di non lavorare qui

---

## 🔧 Se devi testare altri AI (come Google Antigravity)

### ⚠️ PRIMA di farli lavorare:
1. Apri la **worktree**, non questo repository
2. Oppure crea una **nuova branch di test**:
   ```bash
   git checkout -b test-ai-tool
   ```
3. Quando hai finito, scarta le modifiche con:
   ```bash
   git checkout main
   git branch -D test-ai-tool
   ```

---

## 📋 Workflow Corretto

1. ✅ Sviluppa nella worktree `stupefied-banzai`
2. ✅ Testa nella worktree
3. ✅ Commit e push dalla worktree
4. ✅ Quando è pronto, merge su `main`
5. ✅ Il repository principale si aggiorna automaticamente

---

**Ricorda**: Questo repository principale è sincronizzato con GitHub e rappresenta la tua app in produzione. Proteggilo!
