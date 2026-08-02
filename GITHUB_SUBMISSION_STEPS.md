# GitHub submission steps for Zain

The prepared Git branch is here:

`C:\Users\zaina\Downloads\cohort-1-squad-deosai-main\github-pr-work`

Branch name:

`feat/grounded-csv-assistant`

## 1. Fork the original repository

1. Sign in to your own GitHub account. If the old account cannot be recovered, create a new account.
2. Open `https://github.com/Comebck-Pakistan/cohort-1-squad-deosai`.
3. Click **Fork** and create the fork in your account.
4. Do not share your GitHub password, token, OTP, or API key with anyone.

## 2. Connect this prepared clone to your fork

Open PowerShell and run these commands. Replace `YOUR_USERNAME` and `YOUR_GITHUB_EMAIL` first.

```powershell
cd "C:\Users\zaina\Downloads\cohort-1-squad-deosai-main\github-pr-work"
git remote add origin https://github.com/YOUR_USERNAME/cohort-1-squad-deosai.git
git config user.name "Zain Ali Khan"
git config user.email "YOUR_GITHUB_EMAIL"
git remote -v
```

Expected remotes:

- `origin` points to your fork.
- `upstream` points to `Comebck-Pakistan/cohort-1-squad-deosai`.

## 3. Verify and commit

Never add `app/.env.local` or a real API key to Git.

```powershell
cd "C:\Users\zaina\Downloads\cohort-1-squad-deosai-main\github-pr-work\app"
npm install
npm run build
npx tsc --noEmit
cd ..
git status
git add .
git diff --cached --check
git diff --cached --stat
git commit -m "feat: add grounded CSV assistant"
```

## 4. Push your branch

```powershell
git push -u origin feat/grounded-csv-assistant
```

If GitHub asks you to sign in, complete the login in the official GitHub prompt. Do not paste credentials into project files.

## 5. Create the pull request

1. Open your fork on GitHub.
2. Click **Contribute** and then **Open pull request**.
3. Confirm the base is `Comebck-Pakistan/cohort-1-squad-deosai` and the base branch is `main`.
4. Confirm the compare branch is `feat/grounded-csv-assistant` from your fork.
5. Use this title: `feat: add grounded CSV assistant with verified answers`.
6. Copy the contents of `PR_DESCRIPTION.md` into the PR description.
7. Drag these screenshots into the PR description:
   - `docs/screenshots/grounded-csv-complete-testing.png`
   - `docs/screenshots/grounded-csv-safe-handoff.png`
   - `docs/screenshots/grounded-csv-return-and-stock.png`
8. Use the PR sidebar to assign or request review from the teammate/mentor named in your assignment.
9. Create the pull request and send them the PR link.

## 6. SQL message

Tell the mentor:

> No SQL migration file is added or changed in this PR. The existing `app/supabase/migrations/202607190001_ai_messaging.sql` must already be applied for authenticated dashboard testing.
