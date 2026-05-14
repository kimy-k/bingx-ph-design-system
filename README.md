# BingX PH Content Library Design System

Design system for BingX PH KOL content production. Generates branded social-media assets (education cards, carousels, story templates, video thumbnails, memes) for the BingX cryptocurrency exchange affiliate program in the Philippines.

**Live deployment:** phaffiliate.network/content-library

## Brand Foundation

- **Brand:** BingX (global crypto exchange, 20M+ users)
- **Audience:** Filipino crypto traders, beginner to intermediate
- **Language:** Taglish (Tagalog-English mix)
- **Channels:** Instagram, Facebook, TikTok, YouTube
- **Theme:** Dark mode always — never light backgrounds

## Design Tokens

All tokens live in `tokens/` and `tailwind.config.js`. CSS variables in `src/styles/globals.css`.

### Colors

| Token | Hex | Use |
|---|---|---|
| `brand.primary` | `#0058FB` | CTAs, accents, logo, emphasis |
| `surface.base` | `#0B0E17` | Main background (all assets) |
| `surface.elevated` | `#111827` | Cards, modals, elevated surfaces |
| `text.primary` | `#FFFFFF` | Headlines, body text on dark |
| `text.secondary` | `#9CA3AF` | Captions, metadata, deemphasis |
| `accent.profit` | `#059669` | Positive PnL, "up", green candles |
| `accent.warning` | `#D97706` | Risk warnings, stop-loss callouts |
| `accent.loss` | `#DC2626` | Negative PnL, "down", red candles |

### Typography

Inter, all weights. Never substitute another font.

- Display headlines: Inter Black, tight tracking
- Headlines: Inter Bold
- Subheads / numbers: Inter SemiBold
- Body: Inter Regular or Medium
- Captions: Inter Medium, smaller size

### Asset Dimensions

| Asset Type | Dimensions | Use |
|---|---|---|
| Education card (square) | 1080×1080 | IG/FB feed |
| Carousel slide (portrait) | 1080×1350 | IG/FB carousel |
| Story / Reels / TikTok | 1080×1920 | Vertical platforms |
| Video thumbnail | 1280×720 | YouTube |
| Meme | 1080×1080 | All platforms |

## Component Patterns

`src/components/` contains React reference implementations:

- `EducationCard.jsx` — single-image education asset (square)
- `Carousel.jsx` — multi-slide swipe (portrait)
- `StoryTemplate.jsx` — vertical story format
- `VideoThumbnail.jsx` — YouTube thumbnail
- `MemeTemplate.jsx` — meme with bottom caption

## Voice & Tone

- Knowledgeable kuya/ate teaching a friend — not corporate
- Taglish default; pure English for trust/safety topics
- Filipino cultural references welcome: GCash, Maya, sahod day
- Emoji-friendly but not overused: 🚀 💰 📈 for hype, ⚠️ for warnings
- Always include risk language on financial content (no return promises)

## Brand Constraints

- BingX logo watermark bottom-right on all assets, subtle (white or 60% opacity)
- Rounded corners 8–16px on cards and image frames
- Brand blue (`#0058FB`) reserved for emphasis — never large fill backgrounds
- High contrast required: white text on `#0B0E17` minimum
- BingX is not BSP-licensed; positioned as global exchange accessed by Filipino users

## Asset Files

- `assets/logos/` — BingX wordmark and icon SVGs (blue / white / black variants)
- `assets/fonts/` — Inter font family (5 weights, OTF)

## Out of Scope

- No real-person imagery without consent
- No competitor logos (Binance, OKX, Coinbase) outside labeled comparison context
- No copyrighted memes or licensed IP
- No light-mode designs
