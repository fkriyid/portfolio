# Sayid Ali Nurfikri — Portfolio
React + Vite + TypeScript + Tailwind v4. Static, no backend.

## Run locally
```
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```
## Edit content
`src/data/` holds profile, projects, experience, skills and all media paths. See `MEDIA_CHECKLIST.md` and `CONTENT_REVIEW.md`.

## Deploy to Netlify (Free)
1. Push this folder to a GitHub repository.
2. Netlify → Add new site → Import from Git → choose the repo.
3. Build command `npm run build`, publish directory `dist` (already in `netlify.toml`).
4. Deploy. Single-page site, so no redirect rules are required.
