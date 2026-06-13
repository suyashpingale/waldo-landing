# Waldo — Design System

**Status: frozen v3.** Source of truth for all build work. Derived from `CODEX_CONTEXT.md`,
`AGENTS.md`, the owner's expanded UI palette + component sheets, and the Bevel/Smallest/Apple
forensics in `competitor-visuals/`. **Where this file and the older docs disagree, this file wins.**

Tools (Codex, Antigravity) must read this file before touching any section. Items marked
`⟡ DEFAULT` are sensible fills awaiting owner sign-off — safe to build against, easy to redline.

> **Conflicts resolved in this version** (flagged for a one-word correction if I guessed wrong):
> - **Accent = `#FB943F`** (from the named palette swatch), not the `#F97316` referenced in an earlier multiple-choice option.
> - **Border focus = `16%`** — confirmed (palette token); the `20%` typed in chat was set aside.
> - **Dark canvas (Page BG) = `#1C1B1A`** per the palette; your typed tier list said `#191817` (visually identical). Using the palette value.

---

## 1. Color tokens

### Light mode
| Token | Hex |
|---|---|
| Surface (T2) | `#FAFAF8` |
| Page BG (T3, canvas) | `#F4F3F0` |
| Surface sunken (T4) | `#E8E6E0` |
| Border default | `#1A1A1A` @ 8% |
| Border focus | `#1A1A1A` @ 16% |
| Text primary | `#1A1A1A` |
| Text secondary | `#6B6B68` |
| Text tertiary | `#9A9A96` |
| Text disabled | `#C4C3BF` |
| Accent | `#FB943F` |
| Accent subtle | `#FB943F` @ 10% |
| Action | `#2388FF` |

### Dark mode
| Token | Hex |
|---|---|
| Surface (T2) | `#1D1D1B` |
| Page BG (T3, canvas) | `#1C1B1A` |
| Surface sunken (T4) | `#171616` |
| Border default | `#FAFAF8` @ 8% |
| Border focus | `#FAFAF8` @ 16% |
| Text primary | `#FAFAF8` |
| Text secondary | `#9A9A96` |
| Text tertiary | `#6B6B68` |
| Text disabled | `#444441` |
| Accent | `#FB943F` |
| Accent subtle | `#FB943F` @ 10% |
| Action | `#2388FF` |

**Accent vs Action — keep distinct:**
- **Accent `#FB943F`** = brand emphasis. **Once per viewport, never two visible.** The Primary *icon* button (orange squircle) and a Flagging donut ring each count as that one orange.
- **Action `#2388FF`** = functional UI state — checkbox tick, radio dot, toggle track, selected dropdown rows. Does **not** count toward the accent rule.

**Color washes:** the **hero orange dome only**. Every other section uses neutral tier surfaces.
The dome is the provided `public/assets/hero-bg.svg` asset — **never replaced or restyled**. Display
it at its **native `1440 / 989`** proportions with `object-cover object-top` (owner override, June 2 —
the deeper arc shows the concentric bands + white inner circle as designed); never `object-fill` (it
stretches/distorts the asset). The mascot is centered on the **top edge of the white inner ellipse**
(`≈28.1%` down the dome — the asset's inner `#F4F3F0` ellipse has its top edge at y≈278 of 989).

---

## 2. Surface elevation — "higher = lighter"

The more foreground / nested a surface, the lighter it is. Four tiers per mode.

| Tier | Light | Dark | Role |
|---|---|---|---|
| T1 | `#FFFFFF` | `#272725` | top-most / most-nested cards |
| T2 | `#FAFAF8` | `#1D1D1B` | default card / panel surface |
| T3 | `#F4F3F0` | `#1C1B1A` | page canvas |
| T4 | `#E8E6E0` | `#171616` | **sunken** — pressed buttons / active toggles only |

*(T1 white / `#272725` and the T4 sunken tier are the owner's most recent additions; the component
sheets predate them.)*

### Rules (both modes)
- **Adjacency:** combine adjacent tiers, or skip exactly one (T1+T2 ✓, T1+T3 ✓). **Never jump two** (T1+T4 ✗).
- **Stroke:** adjacent-tier pairs get a **1px inset stroke on the lighter surface** = the Border-default token (8%). Skipping a tier needs no stroke.
- **Focus:** Border token rises **8% → 16%**.
- **Default mapping:** canvas = T3 · cards = T2 (+stroke) or T1 (no stroke) · nested = step one lighter · sunken controls = T4.

---

## 3. Typography

Hierarchy mirrors **Smallest AI**'s ladder (tight, technical, restrained), mapped onto our
typefaces, **plus one extra state**: the italic aside (Waldo's voice).
Smallest's DNA we adopt: **negative tracking** (`-0.01em` everywhere; headlines `-0.02em`),
**400-weight headlines**, tight heading line-heights, **500-weight** compact UI labels.

**Corben 400** — headline tier (`display`/`h1`/`h2`), *never bold*. **SF Pro Rounded** — everything else.

| Token | Font | Size | Wt | LH | Tracking | Use |
|---|---|---|---|---|---|---|
| `display` | Corben | `clamp(1.65rem,1.05rem+2.64vw,3.4rem)` (26→54) | 400 | 1.06 | -0.02em | hero h1 (−12%, owner call Jun 2) |
| `h1` | Corben | `clamp(2rem,1.4rem+2.4vw,3rem)` (32→48) | 400 | 1.10 | -0.02em | section headline |
| `h2` | Corben | `clamp(1.5rem,1.2rem+1.4vw,2rem)` (24→32) | 400 | 1.18 | -0.01em | sub-headline |
| `h3` | SF Pro Rounded | `1.25rem` (20) | 500 | 1.30 | -0.01em | card title / subhead |
| `body` | SF Pro Rounded | `1rem` (16) | 400 | 1.5 | -0.01em | paragraph; max ~58ch; Text-secondary |
| `label` | SF Pro Rounded | `0.875rem` (14) | 500 | 1.2 | -0.01em | UI labels, buttons, chips |
| `eyebrow` | SF Pro Rounded | `0.8125rem` (13) | 400 | 1.3 | -0.01em | section label (regular, per owner) |
| `caption` | SF Pro Rounded | `0.75rem` (12) | 400 | 1.3 | -0.01em | fine print, meta |
| `aside` ★ | SF Pro Rounded *italic* | `0.8125rem` (13) | 400 | 1.3 | -0.01em | **the +1 state — Waldo's closing sarcastic line; Text-tertiary** |
| `data` | SF Pro Rounded | — | 500 | — | tabular-nums | all metrics/numerals |

- ★ `aside` is the single level **beyond** Smallest's set — italic, Text-tertiary, closes a copy block.
- **Italic aside:** SF Pro Rounded has no italic (Apple ships italics only for SF Pro Text/Display, not Rounded), so the aside renders as a **browser-synthesized oblique** — accepted fallback.
- **Headlines:** manual `<br>` for the triangular/oval taper. **Never** `text-wrap:balance` or browser-decided breaks.
- Eyebrow ≠ aside — eyebrow is the regular top label; aside is the italic closing voice line.
- Mapping note: **our typefaces are fixed** — Corben for the headline tier (`display`/`h1`/`h2`), SF Pro Rounded from `h3` down. We borrow only Smallest AI's **sizing / hierarchy / layout logic**, never its font choices.

---

## 4. Spacing · Radius · Shadow · Grid

- **Spacing** (8px base): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 128`. Section rhythm `clamp(6rem, 4rem + 8vw, 10rem)` (96→160px).
- **Grid** ⟡ DEFAULT: 12-col, content max **1200px**, gutters `clamp(1rem, .5rem + 3vw, 2.5rem)`, column gap `24px`.
- **Radius:** card `24px` · bento `≤36px` · pill (text/number buttons, toggles) `999px` · input / icon-button / select `12px` · **small accessory tiles `16px`** (heart/stress-type tiles — keep `24px` only on main cards) · checkbox `6px`.
- **Shadow:** card `0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.05)` · elevated `0 2px 4px/.04, 0 16px 40px/.06` · floating hero card `0 20px 48px rgba(26,26,26,.08), 0 2px 8px rgba(26,26,26,.04)`.

### Nested boxes ("boxes within boxes")

The system is built to nest. Three rules keep it sound at any depth — they always move together:

1. **Elevation step.** Each box nested inside another steps **one tier lighter**
   (canvas `T3` → card `T2` → inner card `T1`). Honor the no-jump-2-tiers rule, so a clean stack
   is at most **T3 → T2 → T1** (3 visible surfaces). Need more depth? Separate with spacing or a
   stroke, **not** more tiers.
2. **Concentric corners.** Inner radius = **outer radius − padding** between them
   (`r_inner = r_outer − p`). Keeps the corner gap constant (true concentric look). **Floor inner
   radius at `8px`**; if the math drops below, increase padding or raise the outer radius. Pills
   (`999`) stay pills — the formula applies to rounded-rects only.
3. **Stroke.** Adjacent-tier pairs get the **8% Border stroke on the lighter (inner) surface**;
   skipping a tier needs none (contrast suffices). Focus raises that stroke to 16%.

**Worked examples**
| Outer radius | Padding | Inner radius |
|---|---|---|
| card `24` | `16` | `8` |
| bento `36` | `24` | `12` |
| section panel `36` | `12` | `24` |
| input `12` in card `24` | `12` | `12` (already concentric ✓) |

---

## 5. Buttons & badges

3 emphasis × 3 content types (text / icon / number) × 2 sizes, light + dark.

| | Fill | Content | Stroke |
|---|---|---|---|
| **Primary** | solid — light: ink `#1A1A1A`/light text · dark: light surface/ink text. **Icon variant = accent `#FB943F` squircle, white glyph** | text (opt. leading icon + trailing `→`), icon, number | none |
| **Secondary** | filled one tier above its background | ink content, leading icon + trailing `→` | 8% inset stroke |
| **Tertiary / ghost** | transparent | ink content | hairline stroke only |

- **Shapes:** text & number = pill `999px`; icon = squircle `12px`.
- **Sizes:** Default `48px` (pad `12×24`) · Small `36px` (pad `8×16`) · **Large `56px`** (hero CTA). Icon squircles `40 / 32 / 48px`.
- **States:** hover = lift `translateY(-1px)` + shadow bump · active = `scale(.98)` (filled may sink to T4) · disabled = `40%` opacity / Text-disabled token, no pointer · focus = the 8→16% Border bump.
- **Primary CTA label is always `Let Waldo in →`** (real `→` glyph). Never "Get started" / "Get early access".

---

## 6. Form controls & inputs

All "selected / on" states use **Action `#2388FF`**. Focus = Border 8→16%. Disabled = Text-disabled + reduced fill.

- **Text input / textarea** — two variants:
  - *Filled*: surface T-step, `12px` radius, 8% inset border, optional leading Lucide icon, placeholder in Text-tertiary.
  - *Line*: no box; single bottom border only, placeholder + optional icon.
  - Sizes Small / Default.
- **Select** — Filled input with a trailing chevron-down, optional leading icon, placeholder "Select".
- **Tabs** — segmented group in a recessed track; **active tab = elevated chip one tier lighter** (+ small shadow), inactive = transparent text; optional leading icon. Sizes Small / Default.
- **Checkbox** — rounded square (`6px`). On = Action fill + white check · Off = transparent + 8% border · disabled = muted/lighter.
- **Radio** — circle. On = Action fill + white center dot · Off = border only.
- **Toggle** — pill track + circular knob. On = Action track, knob right · Off = neutral/sunken track, knob left.
- **Dropdown / menu** — rows support leading content: Text · Icon · Checkbox · Radio · Avatar. Hover = row fills one tier lighter; selected = Action indicator. Nested menus use a leading icon + trailing submenu chevron. Rows are pill-shaped or full-width.

---

## 7. Icons & logos

### Source hierarchy

Icons must tell the same story everywhere. The source choice depends on what the icon represents:

| Use case | Source | Rule |
|---|---|---|
| Waldo product UI: navigation, metrics, cards, agent actions, states, settings | **SF Symbols** | Use the canonical mapping below. Prefer filled symbols for primary navigation, Tier 1, Tier 2, and action cards. Use outline symbols for Tier 3 raw signals and dense supporting rows. |
| Web utility chrome: chevrons, close, search, menus, generic input adornments | **Lucide** | `1.5px` stroke, sized to text (`16-24px`). Use only when the symbol is generic interface behavior, not a Waldo product concept. |
| Source-app / connector references | **Real brand logos** | Use official PNG/SVG assets for Apple Health, Google Calendar, Slack, Gmail, Linear, etc. Never replace source apps with a generic glyph or emoji. |
| Mascot / brand illustration | **Waldo assets** | Mascot, paw, spot, and custom illustration moments come from brand assets, not icon libraries. |

### Style rules

- **Filled vs outline:** filled SF Symbols = primary destinations, Tier 1/Tier 2 cards, agent actions, selected states. Outline SF Symbols = Tier 3 signals, metadata rows, and secondary references.
- **Size:** nav `22-24px` · Tier cards `24-28px` · compact rows `16-20px` · large empty/flag states `32-40px`.
- **Weight:** use the regular SF Symbol weight unless the icon sits inside a large hero/product artifact, where medium is allowed.
- **Color:** default icons inherit the local text token. Selected/on icons use Action `#2388FF`. Primary icon buttons keep the Accent squircle with a light glyph. Warning/depleted icons use the zone color only when the state itself is the message.
- **Containers:** standalone product icons sit in `12-16px` squircles using the surface ladder. Do not put a card-shaped icon tile inside another card unless it is a real repeated item.
- **Accessibility:** decorative icons are `aria-hidden`. Meaningful icon-only buttons must have an accessible label. If the icon clarifies text already present, the text is the label.
- **No emoji:** emoji never stand in for product icons, source apps, states, or mascot moments.

### Canonical SF Symbols map

Validated against the local SF Symbols API.

| Feature | Category | SF Symbol | Rationale |
|---|---|---|---|
| Overview (home) | Navigation / Tabs | `house.fill` | Clearest home-base symbol for the main surface. |
| Health Stats | Navigation / Tabs | `heart.text.square.fill` | Biometric record plus stats without feeling clinical. |
| The Patrol | Navigation / Tabs | `eye.fill` | Patrol is continuous watching, so the eye is immediate. |
| The Constellation | Navigation / Tabs | `point.3.connected.trianglepath.dotted` | Connected points map directly to pattern discovery. |
| The Spots | Navigation / Tabs | `scope` | Spotting observations is the key metaphor. |
| Connectors | Navigation / Tabs | `cable.connector.horizontal` | Literal connector symbol. |
| Chat / Ask Waldo | Navigation / Tabs | `bubble.left.and.bubble.right.fill` | Two bubbles clearly signal conversation. |
| Settings / Profile | Navigation / Tabs | `gearshape.fill` | Standard settings glyph, distinct from profile inside settings. |
| Form | Tier 1 Metrics | `brain.head.profile.fill` | Best fit for present-tense cognitive capacity. |
| Recovery | Tier 1 Metrics | `moon.zzz.fill` | Sleep and overnight replenishment in one glance. |
| Weight | Tier 1 Metrics | `backpack.fill` | Communicates load carried through the day better than body weight. |
| The Slope | Tier 1 Metrics | `chart.line.flattrend.xyaxis.circle.fill` | Trend line captures 4-week trajectory without implying up or down. |
| Sleep | Tier 2 - Recovery | `bed.double.fill` | Most obvious icon for sleep duration and stages. |
| HRV | Tier 2 - Recovery | `waveform.path.ecg.rectangle.fill` | ECG waveform in a filled tile reads as heart signal variability. |
| Resting State | Tier 2 - Recovery | `heart.circle.fill` | Heart-centered composite for resting HR and related body state. |
| Circadian | Tier 2 - Form | `sun.max.circle.fill` | Sun icon maps to wake timing, daylight, and rhythm. |
| Motion | Tier 2 - Form | `figure.walk.circle.fill` | Walking figure covers everyday movement without over-indexing on workouts. |
| Stress | Tier 2 - Form | `bolt.heart.fill` | Heart plus bolt signals physiological strain. |
| Load | Tier 2 - Weight | `flame.circle.fill` | Exertion and strain are commonly read through flame energy. |
| The Stack | Tier 2 - Weight | `calendar.day.timeline.left` | Timeline calendar shows meeting density and blocked time. |
| Signal Pressure | Tier 2 - Weight | `envelope.badge.fill` | Badged mail implies incoming volume and urgency. |
| Task Pileup | Tier 2 - Weight | `list.bullet.clipboard.fill` | Clipboard list reads as accumulated tasks. |
| Mind State | Tier 2 - Weight | `face.smiling` | Mood-first symbol. |
| Deep sleep % | Tier 3 Raw Signals | `moon.zzz` | Sleep-specific and calm, suited to a raw submetric. |
| REM sleep % | Tier 3 Raw Signals | `eye` | REM is visually tied to dreaming and eye movement. |
| Sleep efficiency | Tier 3 Raw Signals | `checkmark.circle` | A pass/check symbol fits sleep time used well. |
| Sleep Debt (hours owed) | Tier 3 Raw Signals | `hourglass` | Time owed is the core meaning. |
| Bedtime consistency | Tier 3 Raw Signals | `calendar.badge.clock` | Calendar plus clock signals repeated timing. |
| RMSSD (raw HRV reading) | Tier 3 Raw Signals | `waveform.path.ecg` | Raw heart-waveform symbol for the underlying HRV value. |
| HRV 7-day baseline | Tier 3 Raw Signals | `chart.line.flattrend.xyaxis` | A short baseline should feel like a stable comparison line. |
| HRV 30-day baseline | Tier 3 Raw Signals | `chart.line.uptrend.xyaxis` | Longer baseline needs a more directional trend visual. |
| Resting HR | Tier 3 Raw Signals | `heart` | The simplest readable heart-rate signal. |
| Respiratory rate | Tier 3 Raw Signals | `lungs` | Direct anatomical match. |
| Wrist temperature deviation | Tier 3 Raw Signals | `thermometer.variable` | Variable thermometer captures deviation from baseline. |
| SpO2 | Tier 3 Raw Signals | `drop` | Closest body-fluid shorthand for blood oxygen. |
| Wake alignment | Tier 3 Raw Signals | `sunrise` | Wake timing is anchored to morning alignment. |
| Daylight exposure | Tier 3 Raw Signals | `sun.max` | Direct sunlight metaphor. |
| Bedtime drift | Tier 3 Raw Signals | `moon.haze` | Moon with haze suggests nighttime timing slipping. |
| Active energy | Tier 3 Raw Signals | `flame` | Standard energy/calorie metaphor. |
| Steps | Tier 3 Raw Signals | `shoeprints.fill` | Literal step trail. |
| VO2 Max | Tier 3 Raw Signals | `gauge.with.dots.needle.67percent` | Capacity gauge is clearest without reusing lungs. |
| Exercise minutes | Tier 3 Raw Signals | `timer` | Time-in-activity is the measurement. |
| Stress confidence score | Tier 3 Raw Signals | `gauge.with.needle` | Confidence is a scalar reading, so a gauge fits. |
| Stress event history | Tier 3 Raw Signals | `clock.badge.exclamationmark` | Timestamped events plus alert state. |
| The Brief | Agent Actions | `sunrise.fill` | Morning action message. |
| The Fetch | Agent Actions | `bolt.heart.fill` | Stress-triggered intervention from body signal. |
| The Window | Agent Actions | `calendar.badge.lock` | Protected calendar time. |
| The Handoff | Agent Actions | `hand.raised.fill` | Approval/hand-off moment. |
| The Adjustment | Agent Actions | `calendar.badge.clock` | Calendar change made because timing needed adjustment. |
| The Close | Agent Actions | `moon.stars.fill` | Evening review and end-of-day close. |
| The Patrol entries | Agent Actions | `list.bullet.rectangle.fill` | Individual log items in a console feed. |
| The Spots | Agent Actions | `smallcircle.filled.circle.fill` | Single observed pattern chip. |
| The Heads-Up | Agent Actions | `exclamationmark.triangle.fill` | Proactive warning before something lands. |
| Body / HealthKit | Connectors | `applewatch` | Wearable-first body signal source. |
| Schedule | Connectors | `calendar` | Universal schedule connector. |
| Communication | Connectors | `envelope.fill` | Mail and comms metadata without implying chat content. |
| Tasks | Connectors | `checklist` | Clear task-list metaphor. |
| Mood / Music | Connectors | `music.note.list` | Music source plus listening history. |
| Screen Time | Connectors | `hourglass` | Time-use connector in one symbol. |
| Environment | Connectors | `cloud.sun.fill` | Weather plus ambient conditions. |
| Location | Connectors | `location.fill` | Standard GPS/location glyph. |
| Messaging / Delivery | Connectors | `paperplane.fill` | Delivery-channel metaphor for Telegram/WhatsApp-style sends. |
| Connect wearable step | Onboarding | `applewatch.radiowaves.left.and.right` | Wearable pairing plus live signal. |
| Grant HealthKit permissions step | Onboarding | `checkmark.shield.fill` | Permission granted with trust framing. |
| Link messaging channel step | Onboarding | `message.badge.fill` | Messaging setup with a connection badge. |
| Quick profile setup step | Onboarding | `person.crop.circle.badge.plus` | Add personal profile details. |
| Signal strength indicator | Onboarding | `antenna.radiowaves.left.and.right` | Standard signal strength language. |
| Sleep Debt flag | States & Flags | `hourglass.circle.fill` | Flagged time owed inside the sleep card. |
| Pillar Drag callout | States & Flags | `arrow.down.circle.fill` | A component pulling the score downward. |
| Escalation | States & Flags | `exclamationmark.triangle.fill` | Highest-severity warning state. |
| Ghost state / locked feature | States & Flags | `lock.fill` | Locked or unavailable feature. |
| Sync error | States & Flags | `arrow.triangle.2.circlepath.circle.fill` | Sync loop with failure state implied. |
| Offline / cached data | States & Flags | `wifi.slash` | No live connection. |
| Peak state | States & Flags | `mountain.2.fill` | Peak is visually literal and memorable. |
| Depleted state | States & Flags | `battery.25percent` | Low-capacity metaphor users know instantly. |
| First use / no data yet | States & Flags | `sparkles.rectangle.stack.fill` | Clean blank-slate state before history exists. |
| Profile | Settings | `person.crop.circle.fill` | Standard profile identity symbol. |
| Signal sources | Settings | `antenna.radiowaves.left.and.right.circle.fill` | Shows enabled inputs and signal feeds. |
| Autonomy controls | Settings | `slider.horizontal.3` | Direct control-level metaphor. |
| Notifications | Settings | `bell.badge.fill` | Notification settings with per-type badge. |
| Waldo's memory | Settings | `brain.head.profile.fill` | Pattern memory and feedback history. |
| Appearance | Settings | `circle.lefthalf.filled` | Light/dark mode toggle metaphor. |
| Data & privacy | Settings | `lock.shield.fill` | Privacy and protected data. |
| About / changelog | Settings | `info.circle.fill` | Standard about/info entry. |
| Pup tier | Tiers / Subscription | `pawprint.fill` | Entry tier with the Waldo mascot language. |
| Pro tier | Tiers / Subscription | `crown.fill` | Premium individual tier. |
| Pack tier | Tiers / Subscription | `person.3.fill` | Group or team tier without repeating the paw icon. |

---

## 8. Inline links

- Color: **Accent `#FB943F`**.
- Underline: `text-decoration-skip-ink: auto`, thickness `0.07em`, offset `0.13em`, **rounded caps** (custom rounded underline if `text-decoration` can't round).
- Underline color: lighter tint light mode `#FDBF8C`, darker shade dark mode `#B0682C`. ⟡ DEFAULT (derived from accent).

---

## 9. Motion

- Primary easing `cubic-bezier(0.19, 1, 0.22, 1)`. Micro `150ms` · transitions `300–600ms`.
- Scroll reveal ⟡ DEFAULT: fade + `16–24px` rise, `0.5s`, stagger `60–80ms`, fires once.
- Always honor `prefers-reduced-motion`.

---

## 10. Copy & brand rules (non-negotiable)

- **CTA** is always `Let Waldo in →`.
- **Raw-data rule:** no number without Waldo's plain-language read beside it.
- **No feature duplication:** each agent action (Spot, Constellation, Brief, Fetch, Adjustment, Patrol…) appears **once** on the page, ever.
- **Mascot:** always doing something; resting pose on landing; never sad / static / speech-bubbled.
- **Banned words:** `smart / smarter`, `optimize`, `wellness`, `dashboard`, `AI-powered`, `intelligent`, `health tracker`, `"Meet Waldo"`, `"Waldo AI"`, and exclamation marks.

---

## 11. Responsive

Mobile-first (Tailwind min-width): **sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536**.
Must hold at **375 / 768 / 1024 / 1280 / 1440**. The **1024–1280 seam** is the known failure
zone — test it explicitly every section.

Calibrated from competitor breakpoint forensics (Bevel, Composio, et al. — `competitor-visuals/*` Block 7):
- **Headline scales fluidly** with the viewport (our `display`/`h1` clamps). Competitors drop H1 ~35–40% desktop→mobile (Bevel 80→50, Composio 64→36), always staying centered.
- **CTA geometry stays constant** across breakpoints — do NOT shrink the button on mobile (Bevel holds 174×46, Composio 116×43 at every width). Only the surrounding layout reflows.
- **Cards: shrink-then-stack** — feature/floating cards scale down through tablet, then go near-full-width and stack vertically on mobile. Never keep many absolutely-positioned floating cards on small screens (that clips/overflows) — reduce to the key 1–2 or stack them.
- **Nav collapses to a menu** below md (768): full links on desktop → hamburger/toggle on tablet & phone.
- Honor `prefers-reduced-motion` and `prefers-color-scheme` (both present across competitors).

---

## 12. Section → competitor layout map

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
