# BingX PH Content Library Design System

Design system + 73 production assets for the BingX cryptocurrency exchange KOL affiliate program in the Philippines. Generates branded social-media content in Taglish for Filipino crypto traders.

**Live deployment target:** `phaffiliate.network/content-library`

---

## What's in this repo

### 73 production assets across 6 batches

| Batch | Folder | Count | Format |
|---|---|---|---|
| Education Cards | `library/education/` | 10 | 1080×1080 + 1080×1350 |
| Carousels | `library/carousels/` | 5 sets, 29 slides | 1080×1350 |
| Stories | `library/stories/` | 10 + 4 base templates | 1080×1920 |
| Memes | `library/memes/` | 10 + 3 base templates | 1080×1080 |
| Campaign Pack | `library/campaigns/` | 5 base templates + JSON slot manifests | 1080×1080 + 1080×1350 |
| YouTube Thumbnails | `library/thumbnails/` | 10 + 3 base templates | 1280×720 |

### Asset type breakdown

**Static assets (38) — export to PNG, ship as-is:**
- All 10 Education Cards
- All 29 Carousel slides
- Stories 1, 2, 3, 7, 8, 9

**Interactive templates (35) — KOL drops their own image/data in-browser:**
- Stories 4, 5, 6, 10 (image-slot)
- All 10 Memes (image-slot)
- All 5 Campaign templates (editable slots + JSON manifests)
- All 10 Thumbnails (image-slot)

The `<image-slot>` web component (`library/stories/_framework/image-slot.js`, duplicated to memes and thumbnails) handles drag-and-drop photo insertion. Campaign templates use an `editable-mode` CSS toggle for dashed-underline edit slots.

---

## Brand foundation

### Colors

| Token | Hex | Use |
|---|---|---|
| `brand.primary` | `#0058FB` | CTAs, accents, logo, emphasis |
| `surface.base` | `#0B0E17` | Main background |
| `surface.elevated` | `#111827` | Cards, modals |
| `text.primary` | `#FFFFFF` | Headlines on dark |
| `text.secondary` | `#9CA3AF` | Captions, metadata |
| `accent.profit` | `#059669` | Positive PnL, growth |
| `accent.warning` | `#D97706` | Risk callouts |
| `accent.loss` | `#DC2626` | Negative PnL, warnings |

Full token system: `colors_and_type.css` (canonical) + `tailwind.config.js` + `tokens/design-tokens.json`.

### Typography

Inter — Regular 400, Medium 500, SemiBold 600, Bold 700, Black 900.
Never substitute another font. Files in `assets/fonts/`.

### Logos

`assets/logos/` — BingX wordmark + icon in blue / white / black SVG.

### Voice

- Taglish (Tagalog-English) default; pure English for trust/safety
- Knowledgeable kuya/ate teaching a friend — not corporate
- Filipino cultural references welcome (GCash, Maya, sahod day)
- Always include risk language on financial content
- Dark mode always — never light backgrounds

### Watermark conventions

- **Education / Carousels:** 0.55 opacity, bottom-right
- **Stories:** 0.6 opacity, bottom-center (story-native placement)
- **Memes:** 0.3 opacity, bottom-right (light branding for shareability)
- **Thumbnails:** 0.4 opacity, bottom-right
- **Campaign Pack:** 0.55 opacity, bottom-right (intentional BingX branding)

---

## Repository structurebingx-ph-design-system/
├── assets/
│   ├── fonts/                       Inter 5 weights
│   └── logos/                       BingX wordmark + icon, 3 colors each
├── library/
│   ├── education/                   10 finished cards
│   ├── carousels/                   5 sets (29 slides + 5 grid indexes)
│   ├── stories/
│   │   ├── _framework/              4 base templates + image-slot.js + styles.css
│   │   └── 01-10 finished stories
│   ├── memes/
│   │   ├── _framework/              3 base templates + duplicated image-slot.js
│   │   └── 01-10 finished memes
│   ├── campaigns/
│   │   └── _framework/              5 editable bases + 5 .slots.json manifests
│   └── thumbnails/
│       ├── _framework/              3 base templates + duplicated image-slot.js
│       └── 01-10 finished thumbnails
├── src/                             React reference components (legacy from initial setup)
├── tokens/                          JSON design tokens
├── examples/                        Standalone HTML examples
├── colors_and_type.css              Canonical token CSS (referenced by all assets)
├── tailwind.config.js               Tailwind config with brand tokens
└── package.json

---

## Build history

Six clean commits across two production sessions:

1. `039fe99` — Initial repo setup, brand tokens, fonts, logos
2. `b611571` — Batches 1+2: 10 Education Cards + 5 Carousel sets
3. `a197df5` — Batch 3: 10 Stories with image-slot web component
4. `1d4b7b0` — Batch 4: 10 Memes with light branding
5. `22b80d0` — Batch 5: Campaign Pack with editable slot manifests
6. `922d201` — Batch 6: 10 YouTube Thumbnails with hero-size scale system

---

## Out of scope

- No real-person imagery without consent
- No competitor logos (Binance, OKX, Coinbase) outside labeled comparison
- No copyrighted memes or licensed IP
- No light-mode designs
- BingX is not BSP-licensed in PH — positioned as global exchange accessed by Filipino users
