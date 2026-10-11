# Rivana — Milestone 1

**Tagline:** Your Idea. Your Surprise. Your Way.

A beginner-friendly React + Vite + TypeScript starter for the Rivana digital surprise creator.

## Included in this milestone

- Responsive magical homepage and navigation
- Occasion selector with 21 occasions
- Template gallery with style filters
- Custom idea form with optional recipient/sender/tone/language fields
- Clearly labelled **local demo planner** (not a real AI integration)
- Editable scene list: select, edit title/message/emoji, add/delete and reorder scenes
- Live scene preview
- Responsive layouts and reduced-motion support

## Not implemented yet

Real AI API calls, login/accounts, database persistence, private media storage, photo/video uploads, music playback, QR code, genuine public share links, password-protected publishing, scheduled server-side Midnight Magic, and messaging integrations. The current “share options” message is demo-only and does not publish a public surprise.

## Requirements

- Windows 10/11
- Node.js LTS (includes npm): https://nodejs.org/
- Visual Studio Code: https://code.visualstudio.com/

## Run locally on Windows

1. Extract the ZIP file.
2. Open VS Code.
3. Choose **File → Open Folder…** and select the extracted `Rivana` folder (the folder containing `package.json`).
4. Open **Terminal → New Terminal**.
5. Run:

   ```powershell
   node -v
   npm -v
   npm install
   npm run dev
   ```

6. Vite prints a local address, normally `http://localhost:5173/`. Hold **Ctrl** and click the address, or copy it into your browser.
7. Keep the terminal running while using the website. Press `Ctrl + C` in that terminal to stop it.

If PowerShell blocks `npm.ps1`, use the VS Code terminal dropdown and select **Command Prompt**, then run the same `npm` commands there. You do not need to change Windows execution-policy settings.

## Build check

```powershell
npm run build
```

Vite writes the production build to `dist/`.

## Folder structure

```text
Rivana/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── README.md
└── src/
    ├── App.tsx
    ├── main.tsx
    └── styles.css
```

## Next milestones

1. Add reusable components and persistent project structure.
2. Add real AI generation through a backend API, with validated JSON scene schemas.
3. Add uploads and private storage.
4. Add Supabase Auth, PostgreSQL, row-level security and owner permissions.
5. Add server-side scheduled reveal, private share tokens and link revocation.
6. Test and deploy frontend/backend separately.

Never place API keys or service-role secrets in frontend code. Configure real integrations only in server-side environment variables.
