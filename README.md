# Yajur Fire Bowl

One-page Next.js menu site for QR codes. Shows the logo, full menu, store address, hours, and contact details.

## Local preview

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this folder to GitHub.
2. Import the project at [vercel.com](https://vercel.com).
3. Vercel will detect Next.js automatically — deploy with the defaults.
4. Use the `*.vercel.app` URL as the QR code link.

## Future backend

Menu and shop details are already available as JSON:

- `GET /api/menu`
- `GET /api/site`

Update the shop address in `lib/site.ts`.
