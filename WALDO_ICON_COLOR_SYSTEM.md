# Waldo Icon Color System

Updated July 6, 2026. This version follows the latest review notes: icons are flat, single-color glyphs; custom SVGs point to exact files in `public/illustrations`; and rows that do not need icons are explicitly marked as omitted.

## What Changed From The Previous Draft

- Removed icon assignments for Resting State, The Fetch, individual REM/Core/Deep/Awake sleep-stage rows, and HRV 7-day / 30-day baselines.
- Replaced the old Mind State face icon with `theatermasks.fill`.
- Replaced SpO2 with `lungs.fill`; respiratory rate now uses `wind` so the two raw signals stay distinct.
- Added the supplied SVGs using exact repo paths, including `public/illustrations/Checkbox.svg` with its original filename casing.
- Removed optional tint-circle guidance. Icon color belongs to the glyph only; no shades, no enclosing color circles, no multi-part palette rendering.
- Removed most `.circle.fill` symbol variants where the circle was only a wrapper.

## Palette

These are small-icon colors. They do not have separate light/dark versions, and they should be applied as one flat color on the glyph itself.

| Color | Hex | Meaning |
|---|---|---|
| Red | `#FF3B30` | heart, blood, critical body signals, hard warnings |
| Coral | `#FF6F5E` | warm load, body mass, warm interruption, saved/stored items |
| Orange | `#FF9500` | energy, exertion, heat, active food and action moments |
| Amber | `#FFB800` | time owed, timing, trophies, premium and readiness cues |
| Yellow | `#FFCC00` | daylight, morning, highlights, notification budget |
| Lime | `#A3D63C` | movement, positive capacity, Spot identity, go-state cues |
| Green | `#34C759` | connection, completion, adherence, tasks done, positive outcomes |
| Mint | `#00C7BE` | breath, respiratory, location freshness, calm physical signals |
| Teal | `#30B0C7` | oxygen, hydration-adjacent, sync flow, secondary calm signals |
| Cyan | `#32ADE6` | data, environment, scanning, freshness, incoming volume |
| Blue | `#0A84FF` | calendar, communications, protected time, sharing, structured work |
| Cobalt | `#3E63DD` | interface controls, scans, records, selectors; vibrant replacement for neutral chrome |
| Indigo | `#5E5CE6` | sleep, night, quiet, overnight states |
| Purple | `#AF52DE` | cognition, memory, patterns, mental practices |
| Violet | `#BF5AF2` | context, mood, drift, secondary cognitive states |
| Pink | `#FF375F` | HRV, variability, mood/music, glucose, soft body warning |
| Magenta | `#FF2D9A` | stress events, interventions, cycle/pain-sensitive callouts |

## Usage Rules

- Render functional icons as a single flat color on the glyph.
- Do not add colored circular backgrounds, tint badges, or extra icon tiles around these glyphs.
- Do not use multi-shade rendering inside one icon; if an SVG has multiple paths, tint all visible paths to the same hex.
- Inactive states use opacity on the assigned color, not gray.
- Severity can temporarily override the signature color with the Peak/Steady/Flagging/Depleted zone color. That is a status override, not the icon identity.

## Exact Illustration Files

These are the exact SVG files currently in `public/illustrations`. Do not reference any other illustration filename unless that file is actually added to this folder.

| Asset file | Exact repo file | Public path | Color treatment | Current assignment / note |
|---|---|---|---|---|
| brief.svg | `public/illustrations/brief.svg` | `/illustrations/brief.svg` | Yellow #FFCC00 | The Brief (Agent Actions) |
| Checkbox.svg | `public/illustrations/Checkbox.svg` | `/illustrations/Checkbox.svg` | Teal #30B0C7 | Chat / Ask Waldo (Navigation / Tabs) |
| connectors.svg | `public/illustrations/connectors.svg` | `/illustrations/connectors.svg` | Green #34C759 | Connectors (Navigation / Tabs) |
| constellations.svg | `public/illustrations/constellations.svg` | `/illustrations/constellations.svg` | Purple #AF52DE | The Constellation (Navigation / Tabs) |
| default.svg | `public/illustrations/default.svg` | `/illustrations/default.svg` | Keep source colors | Mascot illustration; do not flatten into the functional icon palette. |
| error.svg | `public/illustrations/error.svg` | `/illustrations/error.svg` | Keep source colors | Mascot illustration; do not flatten into the functional icon palette. |
| health-stats.svg | `public/illustrations/health-stats.svg` | `/illustrations/health-stats.svg` | Red #FF3B30 | Health Stats (Navigation / Tabs) |
| hrv.svg | `public/illustrations/hrv.svg` | `/illustrations/hrv.svg` | Pink #FF375F | HRV (Tier 2 - Recovery); RMSSD (raw HRV reading) (Tier 3 Raw Signals) |
| patrol.svg | `public/illustrations/patrol.svg` | `/illustrations/patrol.svg` | Indigo #5E5CE6 | The Patrol (Navigation / Tabs) |
| sleep-time.svg | `public/illustrations/sleep-time.svg` | `/illustrations/sleep-time.svg` | Indigo #5E5CE6 | Sleep (Tier 2 - Recovery) |
| slope.svg | `public/illustrations/slope.svg` | `/illustrations/slope.svg` | Cyan #32ADE6, Purple #AF52DE | The Slope (Tier 1 Metrics); Dumbbell plot (Chart / Visualisation Types) |
| spot.svg | `public/illustrations/spot.svg` | `/illustrations/spot.svg` | Lime #A3D63C | The Spots (Navigation / Tabs); The Spots (Agent Actions) |
| success.svg | `public/illustrations/success.svg` | `/illustrations/success.svg` | Keep source colors | Mascot illustration; do not flatten into the functional icon palette. |
| wakeup-time.svg | `public/illustrations/wakeup-time.svg` | `/illustrations/wakeup-time.svg` | Amber #FFB800, Orange #FF9500 | Wake alignment (Tier 3 Raw Signals); Optimal wake alarm (Waldo-Specific Extras) |
| window.svg | `public/illustrations/window.svg` | `/illustrations/window.svg` | Blue #0A84FF | The Window (Agent Actions) |

## Active Icon Assignments

### Navigation / Tabs

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Overview (home) | `house.fill` | Blue | `#0A84FF` | Clearest home-base symbol for the main surface. |
| Health Stats | `public/illustrations/health-stats.svg` | Red | `#FF3B30` | Supplied stats glyph from `public/illustrations/health-stats.svg`; clearer than a boxed SF heart chart. |
| The Patrol | `public/illustrations/patrol.svg` | Indigo | `#5E5CE6` | Supplied patrol shield glyph; one flat color, no enclosing tile. |
| The Constellation | `public/illustrations/constellations.svg` | Purple | `#AF52DE` | Supplied constellation glyph maps to long-term pattern discovery. |
| The Spots | `public/illustrations/spot.svg` | Lime | `#A3D63C` | Uses the exact custom Spot asset already in `public/illustrations/spot.svg`. |
| Connectors | `public/illustrations/connectors.svg` | Green | `#34C759` | Supplied connector/globe glyph for the connected-source surface. |
| Chat / Ask Waldo | `public/illustrations/Checkbox.svg` | Teal | `#30B0C7` | Uses the supplied `Checkbox.svg` file; the actual glyph reads as chat bubbles. |
| Settings / Profile | `gearshape.fill` | Cobalt | `#3E63DD` | Standard settings glyph, distinct from profile inside settings. |

### Tier 1 Metrics

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Form | `brain.head.profile.fill` | Purple | `#AF52DE` | Best fit for present-tense cognitive capacity. |
| Recovery | `moon.zzz.fill` | Indigo | `#5E5CE6` | Sleep and overnight replenishment in one glance. |
| Weight | `backpack.fill` | Coral | `#FF6F5E` | Communicates load carried through the day better than body weight. |
| The Slope | `public/illustrations/slope.svg` | Cyan | `#32ADE6` | Supplied dumbbell/slope glyph matches the four-week comparison view. |

### Tier 2 - Recovery

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Sleep | `public/illustrations/sleep-time.svg` | Indigo | `#5E5CE6` | Supplied moon glyph makes the overall Sleep card distinct from raw sleep-stage rows. |
| HRV | `public/illustrations/hrv.svg` | Pink | `#FF375F` | Supplied HRV glyph keeps variability visually separate from plain heart-rate icons. |

### Tier 2 - Form

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Circadian | `sun.max.fill` | Orange | `#FF9500` | Sun icon maps to wake timing, daylight, and rhythm. |
| Motion | `figure.walk` | Green | `#34C759` | Walking figure covers everyday movement without a circular enclosure. |
| Stress | `bolt.heart.fill` | Magenta | `#FF2D9A` | Heart plus bolt signals physiological strain. |

### Tier 2 - Weight

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Load | `flame.fill` | Orange | `#FF9500` | Exertion and strain through a plain flame, without the old circle wrapper. |
| The Stack | `calendar.day.timeline.left` | Blue | `#0A84FF` | Timeline calendar shows meeting density and blocked time. |
| Signal Pressure | `envelope.badge.fill` | Cyan | `#32ADE6` | Badged mail implies incoming volume and urgency. |
| Task Pileup | `list.bullet.clipboard.fill` | Amber | `#FFB800` | Clipboard list reads as accumulated tasks. |
| Mind State | `theatermasks.fill` | Violet | `#BF5AF2` | Mood-state masks are more specific than a generic smile and avoid the old face icon. |

### Tier 3 Raw Signals

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Sleep efficiency | `checkmark` | Green | `#34C759` | A pass/check symbol fits sleep time used well. |
| Sleep Debt (hours owed) | `hourglass` | Amber | `#FFB800` | Time owed is the core meaning. |
| Bedtime consistency | `calendar.badge.clock` | Blue | `#0A84FF` | Calendar plus clock signals repeated timing. |
| RMSSD (raw HRV reading) | `public/illustrations/hrv.svg` | Pink | `#FF375F` | Same HRV identity as the card, used here for the raw RMSSD reading. |
| Resting HR | `heart` | Red | `#FF3B30` | The simplest readable heart-rate signal. |
| Respiratory rate | `wind` | Mint | `#00C7BE` | Breath/wind separates respiratory rate from oxygen saturation. |
| Wrist temperature deviation | `thermometer.variable` | Orange | `#FF9500` | Variable thermometer captures deviation from baseline. |
| SpO2 | `lungs.fill` | Teal | `#30B0C7` | Replaces the drop; lungs are the clearest available SF proxy for oxygen saturation. |
| Wake alignment | `public/illustrations/wakeup-time.svg` | Amber | `#FFB800` | Supplied wake-time sun glyph fits circadian wake alignment. |
| Daylight exposure | `sun.max` | Yellow | `#FFCC00` | Direct sunlight metaphor. |
| Bedtime drift | `moon.haze` | Violet | `#BF5AF2` | Moon with haze suggests nighttime timing slipping. |
| Active energy | `flame` | Orange | `#FF9500` | Standard energy/calorie metaphor. |
| Steps | `shoeprints.fill` | Lime | `#A3D63C` | Literal step trail. |
| VO2 Max | `gauge.with.dots.needle.67percent` | Green | `#34C759` | Capacity gauge is clearest without reusing lungs. |
| Exercise minutes | `timer` | Magenta | `#FF2D9A` | Time-in-activity is the measurement. |
| Stress confidence score | `gauge.with.needle` | Pink | `#FF375F` | Confidence is a scalar reading, so a gauge fits. |
| Stress event history | `clock.badge.exclamationmark` | Red | `#FF3B30` | Timestamped events plus alert state. |

### Agent Actions

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| The Brief | `public/illustrations/brief.svg` | Yellow | `#FFCC00` | Supplied brief/clipboard glyph for the morning message action. |
| The Window | `public/illustrations/window.svg` | Blue | `#0A84FF` | Supplied window/timeline glyph for protected focus time. |
| The Handoff | `hand.raised.fill` | Orange | `#FF9500` | Approval/hand-off moment. |
| The Adjustment | `calendar.badge.clock` | Teal | `#30B0C7` | Calendar change made because timing needed adjustment. |
| The Close | `moon.stars.fill` | Indigo | `#5E5CE6` | Evening review and end-of-day close. |
| The Patrol entries | `list.bullet.rectangle.fill` | Purple | `#AF52DE` | Individual log items in a console feed. |
| The Spots | `public/illustrations/spot.svg` | Lime | `#A3D63C` | Individual observations use the exact Spot asset, matching the Spots surface. |
| The Heads-Up | `exclamationmark.triangle.fill` | Red | `#FF3B30` | Proactive warning before something lands. |

### Connectors

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Body / HealthKit | `applewatch` | Red | `#FF3B30` | Wearable-first body signal source. |
| Schedule | `calendar` | Orange | `#FF9500` | Universal schedule connector. |
| Communication | `envelope.fill` | Blue | `#0A84FF` | Mail and comms metadata without implying chat content. |
| Tasks | `checklist` | Green | `#34C759` | Clear task-list metaphor. |
| Mood / Music | `music.note.list` | Pink | `#FF375F` | Music source plus listening history. |
| Screen Time | `hourglass` | Purple | `#AF52DE` | Time-use connector in one symbol. |
| Environment | `cloud.sun.fill` | Cyan | `#32ADE6` | Weather plus ambient conditions. |
| Location | `location.fill` | Mint | `#00C7BE` | Standard GPS/location glyph. |
| Messaging / Delivery | `paperplane.fill` | Teal | `#30B0C7` | Delivery-channel metaphor for Telegram/WhatsApp-style sends. |

### Onboarding

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Connect wearable step | `applewatch.radiowaves.left.and.right` | Red | `#FF3B30` | Wearable pairing plus live signal. |
| Grant HealthKit permissions step | `checkmark.shield.fill` | Green | `#34C759` | Permission granted with trust framing. |
| Link messaging channel step | `message.badge.fill` | Blue | `#0A84FF` | Messaging setup with a connection badge. |
| Quick profile setup step | `person.badge.plus` | Purple | `#AF52DE` | Add-person setup without the circular crop treatment. |
| Signal strength indicator | `antenna.radiowaves.left.and.right` | Cyan | `#32ADE6` | Standard signal strength language. |

### States & Flags

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Sleep Debt flag | `hourglass` | Amber | `#FFB800` | Flagged time owed inside the sleep card. |
| Pillar Drag callout | `arrow.down` | Orange | `#FF9500` | A component pulling the score downward. |
| Escalation | `exclamationmark.triangle.fill` | Red | `#FF3B30` | Highest-severity warning state. |
| Ghost state / locked feature | `lock.fill` | Cobalt | `#3E63DD` | Locked or unavailable feature. |
| Sync error | `arrow.triangle.2.circlepath` | Magenta | `#FF2D9A` | Sync loop with failure state implied. |
| Offline / cached data | `wifi.slash` | Blue | `#0A84FF` | No live connection. |
| Peak state | `mountain.2.fill` | Green | `#34C759` | Peak is visually literal and memorable. |
| Depleted state | `battery.25percent` | Coral | `#FF6F5E` | Low-capacity metaphor users know instantly. |
| First use / no data yet | `sparkles.rectangle.stack.fill` | Purple | `#AF52DE` | Clean blank-slate state before history exists. |

### Settings

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Profile | `person.crop.square.fill` | Blue | `#0A84FF` | Profile identity without the circular crop treatment. |
| Signal sources | `antenna.radiowaves.left.and.right` | Green | `#34C759` | Shows enabled inputs and signal feeds. |
| Autonomy controls | `slider.horizontal.3` | Orange | `#FF9500` | Direct control-level metaphor. |
| Notifications | `bell.badge.fill` | Red | `#FF3B30` | Notification settings with per-type badge. |
| Waldo's memory | `brain.head.profile.fill` | Purple | `#AF52DE` | Pattern memory and feedback history. |
| Appearance | `paintpalette.fill` | Indigo | `#5E5CE6` | Appearance/theme controls read more clearly as palette than a half-filled circle. |
| Data & privacy | `lock.shield.fill` | Teal | `#30B0C7` | Privacy and protected data. |
| About / changelog | `info` | Cobalt | `#3E63DD` | Standard about/info entry. |

### Tiers / Subscription

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Pup tier | `pawprint.fill` | Orange | `#FF9500` | Entry tier with the Waldo mascot language. |
| Pro tier | `crown.fill` | Amber | `#FFB800` | Premium individual tier. |
| Pack tier | `person.3.fill` | Green | `#34C759` | Group or team tier without repeating the paw icon. |

### Lifestyle Logging / Food & Nutrition

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Food log | `fork.knife` | Orange | `#FF9500` | Universal meal logging symbol, strong enough for a primary food card. |
| Barcode scan | `barcode.viewfinder` | Cobalt | `#3E63DD` | Directly communicates scanning packaged food. |
| Meal photo capture | `camera.fill` | Blue | `#0A84FF` | Simple camera metaphor for photo-based food logging. |
| Recipe | `book.pages.fill` | Teal | `#30B0C7` | Saved recipe as a readable book/pages object. |
| Calories | `flame.fill` | Red | `#FF3B30` | Standard energy/calorie metaphor. |
| Protein | `dumbbell.fill` | Magenta | `#FF2D9A` | Closest obvious proxy for protein and muscle support. |
| Carbohydrates | `carrot.fill` | Amber | `#FFB800` | Food-category approximation; clearer than an abstract molecule. |
| Fat | `drop.fill` | Yellow | `#FFCC00` | Closest simple macro icon for oils/fats. |
| Fiber | `leaf.fill` | Green | `#34C759` | Plant/fiber association is immediate enough. |
| Micronutrients | `sparkles` | Violet | `#BF5AF2` | Small essentials, vitamins, and minerals as tiny beneficial bits. |
| Nutrition Score | `chart.pie.fill` | Lime | `#A3D63C` | Composite breakdown of intake quality. |
| Net Energy | `plusminus` | Cyan | `#32ADE6` | Captures calories in versus calories out. |
| Late meal flag | `clock.badge.exclamationmark.fill` | Pink | `#FF375F` | Time-based eating warning. |
| Meal timing | `clock.fill` | Indigo | `#5E5CE6` | Focuses on when the meal happened, not what it was. |
| Glucose / blood sugar | `drop.degreesign.fill` | Coral | `#FF6F5E` | Blood-drop approximation for glucose. |
| Fasting window | `hourglass` | Purple | `#AF52DE` | A timed eating window is the core concept. |

### Lifestyle Logging / Supplements & Medication

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Supplement log | `pills.fill` | Red | `#FF3B30` | Most direct supplement/medication logging icon. |
| Individual vitamin | `capsule.fill` | Orange | `#FF9500` | Single supplement item, distinct from the whole log. |
| Medication reminder | `bell.badge.fill` | Blue | `#0A84FF` | Reminder or alert for taking medication. |
| Medication adherence | `checkmark` | Green | `#34C759` | Consistency and completion without gamification language. |

### Lifestyle Logging / Hydration

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Water intake | `waterbottle.fill` | Cyan | `#32ADE6` | Direct water logging metaphor. |
| Hydration goal | `target` | Green | `#34C759` | Goal progress target. |
| Caffeine intake | `cup.and.saucer.fill` | Coral | `#FF6F5E` | Coffee/tea signal for caffeine. |
| Alcohol intake | `wineglass.fill` | Purple | `#AF52DE` | Obvious alcohol intake marker. |

### Lifestyle Logging / Journal & Habit Tags

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Journal entry | `book.closed.fill` | Coral | `#FF6F5E` | General freeform log entry. |
| Sunlight exposure | `sun.max.fill` | Yellow | `#FFCC00` | Direct manual sunlight tag. |
| Screen time | `iphone` | Blue | `#0A84FF` | Phone-based screen exposure. |
| Cold exposure | `snowflake` | Cyan | `#32ADE6` | Clear cold cue. |
| Sauna / heat exposure | `thermometer.sun.fill` | Orange | `#FF9500` | Heat exposure without implying fever. |
| Breathwork | `wind` | Teal | `#30B0C7` | Breath and airflow metaphor. |
| Meditation | `figure.mind.and.body` | Purple | `#AF52DE` | Best built-in symbol for mind-body practice. |
| Gratitude log | `heart.text.square.fill` | Pink | `#FF375F` | Written reflection with positive sentiment. |
| Mood self-report | `face.smiling.fill` | Amber | `#FFB800` | User-entered feeling state. |
| Energy self-report | `bolt.fill` | Lime | `#A3D63C` | Perceived energy level. |
| Pain / soreness log | `bandage.fill` | Red | `#FF3B30` | Body discomfort marker. |
| Menstrual cycle tracking | `drop.fill` | Magenta | `#FF2D9A` | Closest discreet cycle marker; use a custom glyph later if needed. |
| Symptom log | `stethoscope` | Green | `#34C759` | General symptom or health observation tag. |

### Body Composition & Long-Term Biomarkers

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Body weight | `scalemass.fill` | Coral | `#FF6F5E` | Direct scale reading. |
| Body fat % | `percent` | Orange | `#FF9500` | Literal percentage marker, simple and readable. |
| Muscle mass | `figure.strengthtraining.traditional` | Red | `#FF3B30` | Closest human-strength proxy for muscle. |
| BMI | `ruler.fill` | Blue | `#0A84FF` | Body measurement/index approximation. |
| Waist circumference | `lines.measurement.horizontal` | Teal | `#30B0C7` | Measurement-line icon fits circumference tracking. |
| Blood pressure | `heart.fill` | Pink | `#FF375F` | Heart-centered cardiovascular metric. |
| Blood test / bloodwork | `doc.badge.arrow.up.fill` | Magenta | `#FF2D9A` | Uploading lab results as a document. |
| Biological Age | `clock.arrow.circlepath` | Purple | `#AF52DE` | Time/age metric with long-term recalculation. |
| Individual blood biomarker | `testtube.2` | Green | `#34C759` | Generic lab biomarker category. |
| Health Records | `doc.text.fill` | Cobalt | `#3E63DD` | Stored medical/health documents. |

### Workouts & Training

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Workout log | `figure.run` | Cobalt | `#3E63DD` | General workout entry point. |
| Strength training | `dumbbell.fill` | Orange | `#FF9500` | Direct strength icon. |
| Cardio session | `heart.fill` | Pink | `#FF375F` | Cardiovascular workout marker. |
| Running | `figure.run` | Green | `#34C759` | Literal running activity. |
| Cycling | `figure.outdoor.cycle` | Cyan | `#32ADE6` | Literal cycling activity. |
| Swimming | `figure.pool.swim` | Blue | `#0A84FF` | Literal swimming activity. |
| Yoga | `figure.yoga` | Purple | `#AF52DE` | Literal yoga activity. |
| HIIT / interval training | `timer` | Magenta | `#FF2D9A` | Timed intervals. |
| Workout template | `rectangle.stack.fill` | Violet | `#BF5AF2` | Saved reusable routine stack. |
| Workout plan | `calendar.badge.plus` | Teal | `#30B0C7` | Planned workout schedule. |
| Sets & reps | `list.number` | Indigo | `#5E5CE6` | Numbered exercise prescription. |
| Personal record / PR | `trophy.fill` | Amber | `#FFB800` | Achievement/record marker. |
| Muscular strain | `bolt.fill` | Red | `#FF3B30` | Real-time exertion/strain cue. |
| Cardio Load | `heart.text.square.fill` | Coral | `#FF6F5E` | Cardio demand as a recorded heart metric. |
| Training readiness | `gauge.with.dots.needle.67percent` | Lime | `#A3D63C` | Readiness as a capacity gauge. |
| Rest day | `bed.double.fill` | Indigo | `#5E5CE6` | Recovery/rest day marker. |
| Warm-up | `thermometer.sun.fill` | Yellow | `#FFCC00` | Body warming up. |
| Cool-down | `snowflake` | Cyan | `#32ADE6` | Cooling down after activity. |
| Stretch | `figure.flexibility` | Mint | `#00C7BE` | Direct flexibility/stretch symbol. |

### Waldo-Specific Extras

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Waldo mood states | `theatermasks.fill` | Purple | `#AF52DE` | Category icon for multiple emotional states. |
| Dreaming Mode | `moon.zzz.fill` | Indigo | `#5E5CE6` | Nightly background processing while the user sleeps. |
| Waldo Context Score | `brain.head.profile.fill` | Violet | `#BF5AF2` | Context depth represented as cognition. |
| Signal Depth / Signal Strength | `antenna.radiowaves.left.and.right` | Green | `#34C759` | Connected-source strength in one glyph. |
| Core Memory tag | `tag.fill` | Orange | `#FF9500` | Stored personal fact as a tagged memory. |
| Pattern Memory | `point.3.connected.trianglepath.dotted` | Magenta | `#FF2D9A` | Learned behavioural pattern as connected points. |
| Feedback - thumbs up | `hand.thumbsup.fill` | Green | `#34C759` | Positive feedback action. |
| Feedback - thumbs down | `hand.thumbsdown.fill` | Red | `#FF3B30` | Negative feedback action. |
| Card flip | `rectangle.portrait.rotate` | Cobalt | `#3E63DD` | Front/back card interaction hint. |
| Trend - improving | `arrow.up.right` | Lime | `#A3D63C` | Improving direction. |
| Trend - declining | `arrow.down.right` | Red | `#FF3B30` | Declining direction. |
| Trend - stable / holding | `equal` | Amber | `#FFB800` | No meaningful change. |
| Zone - Peak | `mountain.2.fill` | Green | `#34C759` | Peak capacity/state. |
| Zone - Good | `checkmark.seal.fill` | Lime | `#A3D63C` | Good/acceptable zone. |
| Zone - Low | `exclamationmark` | Orange | `#FF9500` | Low state without full escalation. |
| Zone - Depleted | `battery.25percent` | Red | `#FF3B30` | Low reserve/capacity. |
| Data freshness | `clock.arrow.circlepath` | Cyan | `#32ADE6` | Recently updated or age-of-data cue. |
| Sync in progress | `arrow.triangle.2.circlepath` | Teal | `#30B0C7` | Active sync cycle. |
| Calibration period | `hourglass` | Amber | `#FFB800` | "Give me a few days" waiting period. |
| Medical disclaimer icon | `cross.case.fill` | Coral | `#FF6F5E` | Health-related caution without diagnosis claims. |
| Permission slip | `doc.text.fill` | Blue | `#0A84FF` | Shareable justification as a document/note. |
| Screenshot share / shareable card | `square.and.arrow.up.fill` | Cyan | `#32ADE6` | Standard share action. |
| Pre-Activity Spot | `clock.badge.exclamationmark.fill` | Magenta | `#FF2D9A` | Time-sensitive warning before an event. |
| Quiet hours | `bell.slash.fill` | Indigo | `#5E5CE6` | Notifications held. |
| Daily notification budget | `bell.badge.fill` | Yellow | `#FFCC00` | Limited notification allowance. |
| Overload intervention | `hand.raised.fill` | Coral | `#FF6F5E` | Waldo stepping in to stop overload. |
| Recovery Day enforcement | `calendar.badge.lock` | Blue | `#0A84FF` | Calendar protected for recovery. |
| Sleep Optimization Nudge | `bed.double.fill` | Indigo | `#5E5CE6` | Sleep-related reminder/nudge. |
| Optimal wake alarm | `public/illustrations/wakeup-time.svg` | Orange | `#FF9500` | Supplied wake-time glyph is clearer than a generic alarm for wake timing. |
| DND / Do Not Disturb | `moon.fill` | Purple | `#AF52DE` | Standard focus/DND metaphor. |
| Communication batching | `tray.full.fill` | Teal | `#30B0C7` | Grouped incoming messages/notifications. |

### Chart / Visualisation Types

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Bar chart | `chart.bar.fill` | Cobalt | `#3E63DD` | Standard bar chart selector. |
| Line chart | `chart.line.uptrend.xyaxis` | Blue | `#0A84FF` | Time-series trend selector. |
| Donut / ring chart | `chart.pie.fill` | Orange | `#FF9500` | Closest built-in symbol for ring breakdown. |
| Sparkline | `chart.line.flattrend.xyaxis` | Cyan | `#32ADE6` | Small inline trend line. |
| Dumbbell plot | `public/illustrations/slope.svg` | Purple | `#AF52DE` | The supplied slope glyph is the closest exact match for a dumbbell comparison. |
| Stacked bar | `chart.bar.xaxis` | Pink | `#FF375F` | Bar-history chart selector. |
| Heatmap | `square.grid.3x3.fill` | Magenta | `#FF2D9A` | Grid-based pattern visualization. |
| Force-directed graph | `point.3.connected.trianglepath.dotted` | Violet | `#BF5AF2` | Connected-node graph. |

### Third-Party Connector Fallbacks

| Feature | Icon Asset | Color | Hex | Rationale |
|---|---|---|---|---|
| Generic wearable device | `applewatch` | Red | `#FF3B30` | Best generic wearable fallback. |
| Generic calendar app | `calendar` | Orange | `#FF9500` | Universal calendar fallback. |
| Generic email client | `envelope.fill` | Blue | `#0A84FF` | Universal email fallback. |
| Generic task manager | `checklist` | Green | `#34C759` | Task-list fallback. |
| Generic music/audio app | `music.note` | Pink | `#FF375F` | Audio/music fallback. |
| Generic fitness app | `figure.run` | Lime | `#A3D63C` | Fitness/activity fallback. |
| Generic chat/messaging app | `message.fill` | Cyan | `#32ADE6` | Chat/messaging fallback. |
| Generic code/developer tool | `chevron.left.forwardslash.chevron.right` | Purple | `#AF52DE` | Code/dev tool fallback. |
| Generic CRM/sales tool | `person.2.fill` | Teal | `#30B0C7` | People/accounts relationship cue. |
| Generic design tool | `paintpalette.fill` | Magenta | `#FF2D9A` | Design/creative tool fallback. |
| Generic analytics tool | `chart.bar.xaxis` | Indigo | `#5E5CE6` | Analytics/data fallback. |
| Generic HR/people tool | `person.3.fill` | Coral | `#FF6F5E` | People/team tool fallback. |

## No-Icon Assignments

These features intentionally do not receive an icon. They should be represented by text, rows, charts, or surrounding card structure.

| Feature | Category | Reason |
|---|---|---|
| Resting State | Tier 2 - Recovery | Resting State is a composite card; its raw components carry the icons instead. |
| Deep sleep % | Tier 3 Raw Signals | Sleep-stage rows use text/segmented visuals only, not individual icons. |
| REM sleep % | Tier 3 Raw Signals | Sleep-stage rows use text/segmented visuals only, not individual icons. |
| HRV 7-day baseline | Tier 3 Raw Signals | Baselines are comparison annotations beside HRV, not standalone icon concepts. |
| HRV 30-day baseline | Tier 3 Raw Signals | Baselines are comparison annotations beside HRV, not standalone icon concepts. |
| The Fetch | Agent Actions | Fetch appears as a stress alert/action message; no separate icon is needed. |
| Core sleep % | Tier 3 Raw Signals | Core is a sleep-stage row and does not need a separate icon. |
| Awake | Tier 3 Raw Signals | Awake is a sleep-stage row and does not need a separate icon. |

## Validation

- Active icon rows assigned: 198.
- SF Symbol rows rendered: 182.
- Exact custom SVG rows assigned: 16.
- No-icon rows documented: 8.
- Brown/gray palette anchors: none.
- Preview rendering rule: one glyph, one color, no extra circle/tile wrapper.
