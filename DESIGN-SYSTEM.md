# Waldo — Design System

**Status: frozen v2.** Source of truth for all build work. Derived from `CODEX_CONTEXT.md`,
`AGENTS.md`, and the Bevel/Smallest/Apple forensics in `competitor-visuals/`. Where this file and
the older docs disagree, **this file wins** (it carries the owner's latest decisions).

Tools (Codex, Antigravity) must read this file before touching any section. Items marked
`⟡ DEFAULT` are sensible fills awaiting owner sign-off — safe to build against, easy to redline.

---

## 1. Surface elevation — "higher = lighter"

The more foreground / nested a surface, the lighter it is. Four tiers per mode.

### Light mode
| Tier | Hex | Role |
|---|---|---|
| T1 | `#FFFFFF` | top-most / most-nested cards *(supersedes the old "never #FFFFFF" rule)* |
| T2 | `#FAFAF8` | default card / panel surface |
| T3 | `#F4F3F0` | page canvas (lowest standing surface) |
| T4 | `#E8E6E0` | **sunken** — pressed buttons / active toggles only |

### Dark mode
| Tier | Hex | Role |
|---|---|---|
| T1 | `#272725` | top-most / nested cards |
| T2 | `#1D1D1B` | raised panel |
| T3 | `#191817` | dark-section canvas (≈ the plan's `#1A1A1A`) |
| T4 | `#171616` | **sunken** — pressed controls only |

### Rules (both modes)
- **Adjacency:** combine adjacent tiers, or skip exactly one (T1+T2 ✓, T1+T3 ✓). **Never jump two** (T1+T4 ✗ — looks off).
- **Stroke:** adjacent-tier pairs get a **1px inset stroke on the lighter surface** — `#1A1A1A @ 8%` (light) / `#FAFAF8 @ 8%` (dark). Skipping a tier needs no stroke (contrast suffices).
- **Focus bump:** stroke opacity rises **8% → 16%** on focus (applies to both modes).
- **Default mapping:** canvas = T3 · cards = T2 (+stroke) or T1 (no stroke) · nested = step one lighter · sunken controls = T4.

---

## 2. Color

| Token | Hex | Use |
|---|---|---|
| `ink` | `#1A1A1A` | primary text (never `#000000`) |
| `muted` | `#6B6B68` | secondary text |
| `tertiary` | `#73736E` | italic asides |
| `accent` | `#F97316` | **once per viewport, never two visible** |

**Accent discipline:** exactly one solid `#F97316` per viewport-worth. The Primary *icon* button
(orange squircle) and a Flagging donut ring both count as that orange — don't stack another.

**Health zones** (donut rings / metric chrome only — never as UI accent):
| Zone | Hex |
|---|---|
| Peak | `#5FA83C` green ⟡ DEFAULT |
| Steady | `#F5B027` amber ⟡ DEFAULT |
| Flagging | `#F97316` (= accent) |
| Depleted | `#E5484D` red ⟡ DEFAULT |

**Color washes:** the **hero orange dome only**. Every other section uses neutral tier surfaces.

---

## 3. Typography

**Corben 400** — headlines only, *never bold*. **DM Sans** — all body, UI, eyebrows, data.

| Role | Size | LH | Notes |
|---|---|---|---|
| `display-xl` | `clamp(2.25rem, 1rem + 5vw, 3.875rem)` (36→62px) | 1.06 | hero h1; letter-spacing `-0.02em` |
| `display-l` | `clamp(2rem, 1.3rem + 2.6vw, 3rem)` (32→48px) | 1.08 | section h2 |
| `title` | `clamp(1.25rem, 1rem + 1vw, 1.75rem)` (20→28px) | 1.15 | card titles |
| `body` | `1rem` (16px) | 1.6 | muted; max ~58ch |
| `eyebrow` | `0.8125rem` (13px), DM Sans **regular**, muted | 1.3 | section labels |
| `aside` | `0.8125rem` (13px), DM Sans *italic*, tertiary | 1.3 | **closing line, Waldo's sarcastic tone** |
| `data` | DM Sans, `font-variant-numeric: tabular-nums` | — | all metrics/numerals |

- **Headlines:** manual `<br>` for the deliberate triangular/oval taper. **Never** `text-wrap:balance` or browser-decided breaks.
- The eyebrow (top label) and the closing italic aside are **different things** — don't conflate them. Every copy block ends in an aside.

---

## 4. Spacing · Radius · Shadow · Grid

- **Spacing** (8px base): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 128`. Section rhythm `clamp(6rem, 4rem + 8vw, 10rem)` (96→160px).
- **Grid** ⟡ DEFAULT: 12-col, content max **1200px**, gutters `clamp(1rem, .5rem + 3vw, 2.5rem)`, column gap `24px`.
- **Radius:** card `24px` · bento `≤36px` · pill (text/number buttons) `999px` · icon button squircle `12px` · small `12–16px`.
- **Shadow:** card `0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.05)` · elevated `0 2px 4px/.04, 0 16px 40px/.06` · floating hero card `0 22px 46px rgba(26,26,26,.16)`.

---

## 5. Buttons & badges

3 emphasis × 3 content types (text / icon / number) × 2 sizes, in light + dark.

| | Fill | Content | Stroke |
|---|---|---|---|
| **Primary** | solid — light: ink `#1A1A1A`/light text · dark: light surface/ink text. **Icon variant = accent `#F97316` squircle, white glyph** | text (opt. leading icon + trailing `→`), icon, number | none |
| **Secondary** | filled one tier above its background | ink content, leading icon + trailing `→` | 8% inset stroke |
| **Tertiary / ghost** | transparent | ink content | hairline stroke only |

- **Shapes:** text & number = pill `999px`; icon = squircle `12px`.
- **Sizes:** Default `48px` (pad `12×24`) · Small `36px` (pad `8×16`) · **Large `56px`** for the hero CTA. Icon squircles `40 / 32 / 48px`.
- **States:** hover = lift `translateY(-1px)` + shadow bump · active = `scale(.98)` (filled controls may sink to T4) · disabled = `40%` opacity, no pointer · focus = the 8→16% stroke bump.
- **Primary CTA label is always `Let Waldo in →`** (real `→` glyph). Never "Get started" / "Get early access".

---

## 6. Icons & logos

- **UI glyphs:** Lucide line icons, `1.5px` stroke, `ink` color, 20–24px.
- **Source-app references** (e.g. hero floating cards): real brand logos as PNG/SVG — Apple Health, Whoop, etc. — never a generic glyph or emoji.

---

## 7. Inline links

- Color: `accent #F97316`.
- Underline: `text-decoration-skip-ink: auto`, thickness `0.07em`, offset `0.13em`, **rounded caps** (implement as a custom rounded underline if `text-decoration` can't round).
- Underline color: lighter tint in light mode `#FBB276`, darker shade in dark mode `#B5530F`. ⟡ DEFAULT (derived from accent — adjust to taste).

---

## 8. Motion

- Primary easing `cubic-bezier(0.19, 1, 0.22, 1)`. Micro `150ms` · transitions `300–600ms`.
- Scroll reveal ⟡ DEFAULT: fade + `16–24px` rise, `0.5s`, stagger `60–80ms`, fires once.
- Always honor `prefers-reduced-motion`.

---

## 9. Copy & brand rules (non-negotiable)

- **CTA** is always `Let Waldo in →`.
- **Raw-data rule:** no number without Waldo's plain-language read beside it.
- **No feature duplication:** each agent action (Spot, Constellation, Brief, Fetch, Adjustment, Patrol…) appears **once** on the page, ever.
- **Mascot:** always doing something; resting pose on landing; never sad / static / speech-bubbled.
- **Banned words:** `smart / smarter`, `optimize`, `wellness`, `dashboard`, `AI-powered`, `intelligent`, `health tracker`, `"Meet Waldo"`, `"Waldo AI"`, and exclamation marks.

---

## 10. Responsive

Mobile-first. Must hold at **375 / 768 / 1024 / 1280 / 1440**. The **1024–1280 seam** is the known
failure zone — test it explicitly every section.

---

## 11. Section → competitor layout map

| Section | Borrow layout from |
|---|---|
| Hero | Bevel floating-card state rotation + product mockup; Dia cursor-proximity parallax |
| Problem (data ticker / app graveyard) | Smallest AI dark container, monospace data feel |
| Turn (passive vs action) | Smallest AI side-by-side contrast, sparse copy |
| Product Showcase | Bevel colour-blocked sections; dark product-UI cards inside |
| Depth (Constellation) | Bevel dark intelligence section + Stripe-style data viz |
| Liveness (Where's Waldo) | Stripe live ticker on Bevel warm bg |
| FAQ | Headspace clean bordered accordion |
| Footer | Headspace mascot + Stripe time-of-day adaptive gradient |
