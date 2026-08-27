# Konibaje Originals

A premium streetwear e-commerce frontend for **Konibaje Originals**, built with React, Vite and Tailwind CSS.

## What's included

- Full storefront: Home, Shop (with search/filter/sort), Product detail, Cart, Checkout (3-step), About, Lookbook, Contact, Wishlist
- Sticky responsive header with mobile menu, search, wishlist and cart
- Working cart (add/update/remove, quantity, subtotal/shipping/total) using in-memory React state
- Quick View modal, size guide modal, FAQ accordion
- Checkout is structured for a payment provider (e.g. **Paystack**) to be dropped into the final "Payment" step — no real payment processing is wired up yet
- SEO meta tags (title, description, Open Graph, Twitter card) in `index.html`
- Placeholder product photography (picsum.photos) — swap in real product images before launch

## Requirements

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node)

## Run locally

```bash
npm install
npm run dev
```

This starts a local dev server (usually at `http://localhost:5173`) with hot reload.

## Build for production

```bash
npm run build
```

This outputs a static production build to the `dist/` folder.

Preview the production build locally:

```bash
npm run preview
```

## Deploying

The `dist/` folder is a plain static site and can be deployed anywhere that serves static files:

- **Vercel**: `vercel` (or connect the repo in the Vercel dashboard — it auto-detects Vite)
- **Netlify**: drag-and-drop the `dist/` folder into Netlify, or connect the repo (build command `npm run build`, publish directory `dist`)
- **GitHub Pages / Cloudflare Pages / any static host**: upload the contents of `dist/` after running `npm run build`

## Project structure

```
konibaje-site/
├── index.html          # entry HTML, SEO meta tags
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx         # React entry point
    ├── index.css        # Tailwind directives + base styles
    └── App.jsx           # entire site (components, product data, pages)
```

## Next steps before launch

1. **Replace placeholder images** — `src/App.jsx` currently uses picsum.photos placeholder URLs for hero, product, category and lookbook imagery. Replace with real product photography.
2. **Connect a real product catalog** — products currently live in a hardcoded array (`PRODUCTS`) in `src/App.jsx`. Swap this for a CMS, Shopify, or your own backend/API as needed.
3. **Wire up payment** — the checkout's final step is structured to accept a payment integration (Paystack was requested). Add the Paystack inline SDK or redirect flow at the "Place Order" action in the `Checkout` component.
4. **Connect a newsletter/email service** — the newsletter and contact forms are currently UI-only (no email is actually sent).
5. **Add real account/auth functionality** if customer accounts are needed — the header's Account icon is currently a placeholder link.
6. **Add an `og-image.jpg`** to `public/` (referenced in `index.html`'s Open Graph tags) sized ~1200×630px.
