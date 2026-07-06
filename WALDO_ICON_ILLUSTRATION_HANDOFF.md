# Waldo Icon And Illustration Handoff

Updated July 6, 2026. This is the shareable source for moving Waldo's icon language into another repo. It uses exact SVG paths for custom assets and SF Symbol names only where the icon is still an SF Symbol.

## Asset Rules

- Product UI icons use either an SF Symbol name or an exact `public/illustrations/*.svg` repo path from the table below.
- Do not invent illustration filenames. If the file is not listed here, it is not available.
- Render icons as one flat glyph color. Do not add enclosing circles, color tiles, or multi-shade icon treatments.
- Rows listed under No-Icon Assignments intentionally do not need icons.

## Exact Illustration Files

| Key / file | Repo File | Public Path | Current Use |
|---|---|---|---|
| brief | `public/illustrations/brief.svg` | `/illustrations/brief.svg` | The Brief (Agent Actions) |
| Checkbox | `public/illustrations/Checkbox.svg` | `/illustrations/Checkbox.svg` | Chat / Ask Waldo (Navigation / Tabs) |
| connectors | `public/illustrations/connectors.svg` | `/illustrations/connectors.svg` | Connectors (Navigation / Tabs) |
| constellations | `public/illustrations/constellations.svg` | `/illustrations/constellations.svg` | The Constellation (Navigation / Tabs) |
| default | `public/illustrations/default.svg` | `/illustrations/default.svg` | Mascot illustration; do not flatten into the functional icon palette. |
| error | `public/illustrations/error.svg` | `/illustrations/error.svg` | Mascot illustration; do not flatten into the functional icon palette. |
| health-stats | `public/illustrations/health-stats.svg` | `/illustrations/health-stats.svg` | Health Stats (Navigation / Tabs) |
| hrv | `public/illustrations/hrv.svg` | `/illustrations/hrv.svg` | HRV (Tier 2 - Recovery); RMSSD (raw HRV reading) (Tier 3 Raw Signals) |
| patrol | `public/illustrations/patrol.svg` | `/illustrations/patrol.svg` | The Patrol (Navigation / Tabs) |
| sleep-time | `public/illustrations/sleep-time.svg` | `/illustrations/sleep-time.svg` | Sleep (Tier 2 - Recovery) |
| slope | `public/illustrations/slope.svg` | `/illustrations/slope.svg` | The Slope (Tier 1 Metrics); Dumbbell plot (Chart / Visualisation Types) |
| spot | `public/illustrations/spot.svg` | `/illustrations/spot.svg` | The Spots (Navigation / Tabs); The Spots (Agent Actions) |
| success | `public/illustrations/success.svg` | `/illustrations/success.svg` | Mascot illustration; do not flatten into the functional icon palette. |
| wakeup-time | `public/illustrations/wakeup-time.svg` | `/illustrations/wakeup-time.svg` | Wake alignment (Tier 3 Raw Signals); Optimal wake alarm (Waldo-Specific Extras) |
| window | `public/illustrations/window.svg` | `/illustrations/window.svg` | The Window (Agent Actions) |

## Icon / Asset Map

### Navigation / Tabs

| Feature | Icon Asset | Rationale |
|---|---|---|
| Overview (home) | `house.fill` | Clearest home-base symbol for the main surface. |
| Health Stats | `public/illustrations/health-stats.svg` | Supplied stats glyph from `public/illustrations/health-stats.svg`; clearer than a boxed SF heart chart. |
| The Patrol | `public/illustrations/patrol.svg` | Supplied patrol shield glyph; one flat color, no enclosing tile. |
| The Constellation | `public/illustrations/constellations.svg` | Supplied constellation glyph maps to long-term pattern discovery. |
| The Spots | `public/illustrations/spot.svg` | Uses the exact custom Spot asset already in `public/illustrations/spot.svg`. |
| Connectors | `public/illustrations/connectors.svg` | Supplied connector/globe glyph for the connected-source surface. |
| Chat / Ask Waldo | `public/illustrations/Checkbox.svg` | Uses the supplied `Checkbox.svg` file; the actual glyph reads as chat bubbles. |
| Settings / Profile | `gearshape.fill` | Standard settings glyph, distinct from profile inside settings. |

### Tier 1 Metrics

| Feature | Icon Asset | Rationale |
|---|---|---|
| Form | `brain.head.profile.fill` | Best fit for present-tense cognitive capacity. |
| Recovery | `moon.zzz.fill` | Sleep and overnight replenishment in one glance. |
| Weight | `backpack.fill` | Communicates load carried through the day better than body weight. |
| The Slope | `public/illustrations/slope.svg` | Supplied dumbbell/slope glyph matches the four-week comparison view. |

### Tier 2 - Recovery

| Feature | Icon Asset | Rationale |
|---|---|---|
| Sleep | `public/illustrations/sleep-time.svg` | Supplied moon glyph makes the overall Sleep card distinct from raw sleep-stage rows. |
| HRV | `public/illustrations/hrv.svg` | Supplied HRV glyph keeps variability visually separate from plain heart-rate icons. |

### Tier 2 - Form

| Feature | Icon Asset | Rationale |
|---|---|---|
| Circadian | `sun.max.fill` | Sun icon maps to wake timing, daylight, and rhythm. |
| Motion | `figure.walk` | Walking figure covers everyday movement without a circular enclosure. |
| Stress | `bolt.heart.fill` | Heart plus bolt signals physiological strain. |

### Tier 2 - Weight

| Feature | Icon Asset | Rationale |
|---|---|---|
| Load | `flame.fill` | Exertion and strain through a plain flame, without the old circle wrapper. |
| The Stack | `calendar.day.timeline.left` | Timeline calendar shows meeting density and blocked time. |
| Signal Pressure | `envelope.badge.fill` | Badged mail implies incoming volume and urgency. |
| Task Pileup | `list.bullet.clipboard.fill` | Clipboard list reads as accumulated tasks. |
| Mind State | `theatermasks.fill` | Mood-state masks are more specific than a generic smile and avoid the old face icon. |

### Tier 3 Raw Signals

| Feature | Icon Asset | Rationale |
|---|---|---|
| Sleep efficiency | `checkmark` | A pass/check symbol fits sleep time used well. |
| Sleep Debt (hours owed) | `hourglass` | Time owed is the core meaning. |
| Bedtime consistency | `calendar.badge.clock` | Calendar plus clock signals repeated timing. |
| RMSSD (raw HRV reading) | `public/illustrations/hrv.svg` | Same HRV identity as the card, used here for the raw RMSSD reading. |
| Resting HR | `heart` | The simplest readable heart-rate signal. |
| Respiratory rate | `wind` | Breath/wind separates respiratory rate from oxygen saturation. |
| Wrist temperature deviation | `thermometer.variable` | Variable thermometer captures deviation from baseline. |
| SpO2 | `lungs.fill` | Replaces the drop; lungs are the clearest available SF proxy for oxygen saturation. |
| Wake alignment | `public/illustrations/wakeup-time.svg` | Supplied wake-time sun glyph fits circadian wake alignment. |
| Daylight exposure | `sun.max` | Direct sunlight metaphor. |
| Bedtime drift | `moon.haze` | Moon with haze suggests nighttime timing slipping. |
| Active energy | `flame` | Standard energy/calorie metaphor. |
| Steps | `shoeprints.fill` | Literal step trail. |
| VO2 Max | `gauge.with.dots.needle.67percent` | Capacity gauge is clearest without reusing lungs. |
| Exercise minutes | `timer` | Time-in-activity is the measurement. |
| Stress confidence score | `gauge.with.needle` | Confidence is a scalar reading, so a gauge fits. |
| Stress event history | `clock.badge.exclamationmark` | Timestamped events plus alert state. |

### Agent Actions

| Feature | Icon Asset | Rationale |
|---|---|---|
| The Brief | `public/illustrations/brief.svg` | Supplied brief/clipboard glyph for the morning message action. |
| The Window | `public/illustrations/window.svg` | Supplied window/timeline glyph for protected focus time. |
| The Handoff | `hand.raised.fill` | Approval/hand-off moment. |
| The Adjustment | `calendar.badge.clock` | Calendar change made because timing needed adjustment. |
| The Close | `moon.stars.fill` | Evening review and end-of-day close. |
| The Patrol entries | `list.bullet.rectangle.fill` | Individual log items in a console feed. |
| The Spots | `public/illustrations/spot.svg` | Individual observations use the exact Spot asset, matching the Spots surface. |
| The Heads-Up | `exclamationmark.triangle.fill` | Proactive warning before something lands. |

### Connectors

| Feature | Icon Asset | Rationale |
|---|---|---|
| Body / HealthKit | `applewatch` | Wearable-first body signal source. |
| Schedule | `calendar` | Universal schedule connector. |
| Communication | `envelope.fill` | Mail and comms metadata without implying chat content. |
| Tasks | `checklist` | Clear task-list metaphor. |
| Mood / Music | `music.note.list` | Music source plus listening history. |
| Screen Time | `hourglass` | Time-use connector in one symbol. |
| Environment | `cloud.sun.fill` | Weather plus ambient conditions. |
| Location | `location.fill` | Standard GPS/location glyph. |
| Messaging / Delivery | `paperplane.fill` | Delivery-channel metaphor for Telegram/WhatsApp-style sends. |

### Onboarding

| Feature | Icon Asset | Rationale |
|---|---|---|
| Connect wearable step | `applewatch.radiowaves.left.and.right` | Wearable pairing plus live signal. |
| Grant HealthKit permissions step | `checkmark.shield.fill` | Permission granted with trust framing. |
| Link messaging channel step | `message.badge.fill` | Messaging setup with a connection badge. |
| Quick profile setup step | `person.badge.plus` | Add-person setup without the circular crop treatment. |
| Signal strength indicator | `antenna.radiowaves.left.and.right` | Standard signal strength language. |

### States & Flags

| Feature | Icon Asset | Rationale |
|---|---|---|
| Sleep Debt flag | `hourglass` | Flagged time owed inside the sleep card. |
| Pillar Drag callout | `arrow.down` | A component pulling the score downward. |
| Escalation | `exclamationmark.triangle.fill` | Highest-severity warning state. |
| Ghost state / locked feature | `lock.fill` | Locked or unavailable feature. |
| Sync error | `arrow.triangle.2.circlepath` | Sync loop with failure state implied. |
| Offline / cached data | `wifi.slash` | No live connection. |
| Peak state | `mountain.2.fill` | Peak is visually literal and memorable. |
| Depleted state | `battery.25percent` | Low-capacity metaphor users know instantly. |
| First use / no data yet | `sparkles.rectangle.stack.fill` | Clean blank-slate state before history exists. |

### Settings

| Feature | Icon Asset | Rationale |
|---|---|---|
| Profile | `person.crop.square.fill` | Profile identity without the circular crop treatment. |
| Signal sources | `antenna.radiowaves.left.and.right` | Shows enabled inputs and signal feeds. |
| Autonomy controls | `slider.horizontal.3` | Direct control-level metaphor. |
| Notifications | `bell.badge.fill` | Notification settings with per-type badge. |
| Waldo's memory | `brain.head.profile.fill` | Pattern memory and feedback history. |
| Appearance | `paintpalette.fill` | Appearance/theme controls read more clearly as palette than a half-filled circle. |
| Data & privacy | `lock.shield.fill` | Privacy and protected data. |
| About / changelog | `info` | Standard about/info entry. |

### Tiers / Subscription

| Feature | Icon Asset | Rationale |
|---|---|---|
| Pup tier | `pawprint.fill` | Entry tier with the Waldo mascot language. |
| Pro tier | `crown.fill` | Premium individual tier. |
| Pack tier | `person.3.fill` | Group or team tier without repeating the paw icon. |

### Lifestyle Logging / Food & Nutrition

| Feature | Icon Asset | Rationale |
|---|---|---|
| Food log | `fork.knife` | Universal meal logging symbol, strong enough for a primary food card. |
| Barcode scan | `barcode.viewfinder` | Directly communicates scanning packaged food. |
| Meal photo capture | `camera.fill` | Simple camera metaphor for photo-based food logging. |
| Recipe | `book.pages.fill` | Saved recipe as a readable book/pages object. |
| Calories | `flame.fill` | Standard energy/calorie metaphor. |
| Protein | `dumbbell.fill` | Closest obvious proxy for protein and muscle support. |
| Carbohydrates | `carrot.fill` | Food-category approximation; clearer than an abstract molecule. |
| Fat | `drop.fill` | Closest simple macro icon for oils/fats. |
| Fiber | `leaf.fill` | Plant/fiber association is immediate enough. |
| Micronutrients | `sparkles` | Small essentials, vitamins, and minerals as tiny beneficial bits. |
| Nutrition Score | `chart.pie.fill` | Composite breakdown of intake quality. |
| Net Energy | `plusminus` | Captures calories in versus calories out. |
| Late meal flag | `clock.badge.exclamationmark.fill` | Time-based eating warning. |
| Meal timing | `clock.fill` | Focuses on when the meal happened, not what it was. |
| Glucose / blood sugar | `drop.degreesign.fill` | Blood-drop approximation for glucose. |
| Fasting window | `hourglass` | A timed eating window is the core concept. |

### Lifestyle Logging / Supplements & Medication

| Feature | Icon Asset | Rationale |
|---|---|---|
| Supplement log | `pills.fill` | Most direct supplement/medication logging icon. |
| Individual vitamin | `capsule.fill` | Single supplement item, distinct from the whole log. |
| Medication reminder | `bell.badge.fill` | Reminder or alert for taking medication. |
| Medication adherence | `checkmark` | Consistency and completion without gamification language. |

### Lifestyle Logging / Hydration

| Feature | Icon Asset | Rationale |
|---|---|---|
| Water intake | `waterbottle.fill` | Direct water logging metaphor. |
| Hydration goal | `target` | Goal progress target. |
| Caffeine intake | `cup.and.saucer.fill` | Coffee/tea signal for caffeine. |
| Alcohol intake | `wineglass.fill` | Obvious alcohol intake marker. |

### Lifestyle Logging / Journal & Habit Tags

| Feature | Icon Asset | Rationale |
|---|---|---|
| Journal entry | `book.closed.fill` | General freeform log entry. |
| Sunlight exposure | `sun.max.fill` | Direct manual sunlight tag. |
| Screen time | `iphone` | Phone-based screen exposure. |
| Cold exposure | `snowflake` | Clear cold cue. |
| Sauna / heat exposure | `thermometer.sun.fill` | Heat exposure without implying fever. |
| Breathwork | `wind` | Breath and airflow metaphor. |
| Meditation | `figure.mind.and.body` | Best built-in symbol for mind-body practice. |
| Gratitude log | `heart.text.square.fill` | Written reflection with positive sentiment. |
| Mood self-report | `face.smiling.fill` | User-entered feeling state. |
| Energy self-report | `bolt.fill` | Perceived energy level. |
| Pain / soreness log | `bandage.fill` | Body discomfort marker. |
| Menstrual cycle tracking | `drop.fill` | Closest discreet cycle marker; use a custom glyph later if needed. |
| Symptom log | `stethoscope` | General symptom or health observation tag. |

### Body Composition & Long-Term Biomarkers

| Feature | Icon Asset | Rationale |
|---|---|---|
| Body weight | `scalemass.fill` | Direct scale reading. |
| Body fat % | `percent` | Literal percentage marker, simple and readable. |
| Muscle mass | `figure.strengthtraining.traditional` | Closest human-strength proxy for muscle. |
| BMI | `ruler.fill` | Body measurement/index approximation. |
| Waist circumference | `lines.measurement.horizontal` | Measurement-line icon fits circumference tracking. |
| Blood pressure | `heart.fill` | Heart-centered cardiovascular metric. |
| Blood test / bloodwork | `doc.badge.arrow.up.fill` | Uploading lab results as a document. |
| Biological Age | `clock.arrow.circlepath` | Time/age metric with long-term recalculation. |
| Individual blood biomarker | `testtube.2` | Generic lab biomarker category. |
| Health Records | `doc.text.fill` | Stored medical/health documents. |

### Workouts & Training

| Feature | Icon Asset | Rationale |
|---|---|---|
| Workout log | `figure.run` | General workout entry point. |
| Strength training | `dumbbell.fill` | Direct strength icon. |
| Cardio session | `heart.fill` | Cardiovascular workout marker. |
| Running | `figure.run` | Literal running activity. |
| Cycling | `figure.outdoor.cycle` | Literal cycling activity. |
| Swimming | `figure.pool.swim` | Literal swimming activity. |
| Yoga | `figure.yoga` | Literal yoga activity. |
| HIIT / interval training | `timer` | Timed intervals. |
| Workout template | `rectangle.stack.fill` | Saved reusable routine stack. |
| Workout plan | `calendar.badge.plus` | Planned workout schedule. |
| Sets & reps | `list.number` | Numbered exercise prescription. |
| Personal record / PR | `trophy.fill` | Achievement/record marker. |
| Muscular strain | `bolt.fill` | Real-time exertion/strain cue. |
| Cardio Load | `heart.text.square.fill` | Cardio demand as a recorded heart metric. |
| Training readiness | `gauge.with.dots.needle.67percent` | Readiness as a capacity gauge. |
| Rest day | `bed.double.fill` | Recovery/rest day marker. |
| Warm-up | `thermometer.sun.fill` | Body warming up. |
| Cool-down | `snowflake` | Cooling down after activity. |
| Stretch | `figure.flexibility` | Direct flexibility/stretch symbol. |

### Waldo-Specific Extras

| Feature | Icon Asset | Rationale |
|---|---|---|
| Waldo mood states | `theatermasks.fill` | Category icon for multiple emotional states. |
| Dreaming Mode | `moon.zzz.fill` | Nightly background processing while the user sleeps. |
| Waldo Context Score | `brain.head.profile.fill` | Context depth represented as cognition. |
| Signal Depth / Signal Strength | `antenna.radiowaves.left.and.right` | Connected-source strength in one glyph. |
| Core Memory tag | `tag.fill` | Stored personal fact as a tagged memory. |
| Pattern Memory | `point.3.connected.trianglepath.dotted` | Learned behavioural pattern as connected points. |
| Feedback - thumbs up | `hand.thumbsup.fill` | Positive feedback action. |
| Feedback - thumbs down | `hand.thumbsdown.fill` | Negative feedback action. |
| Card flip | `rectangle.portrait.rotate` | Front/back card interaction hint. |
| Trend - improving | `arrow.up.right` | Improving direction. |
| Trend - declining | `arrow.down.right` | Declining direction. |
| Trend - stable / holding | `equal` | No meaningful change. |
| Zone - Peak | `mountain.2.fill` | Peak capacity/state. |
| Zone - Good | `checkmark.seal.fill` | Good/acceptable zone. |
| Zone - Low | `exclamationmark` | Low state without full escalation. |
| Zone - Depleted | `battery.25percent` | Low reserve/capacity. |
| Data freshness | `clock.arrow.circlepath` | Recently updated or age-of-data cue. |
| Sync in progress | `arrow.triangle.2.circlepath` | Active sync cycle. |
| Calibration period | `hourglass` | "Give me a few days" waiting period. |
| Medical disclaimer icon | `cross.case.fill` | Health-related caution without diagnosis claims. |
| Permission slip | `doc.text.fill` | Shareable justification as a document/note. |
| Screenshot share / shareable card | `square.and.arrow.up.fill` | Standard share action. |
| Pre-Activity Spot | `clock.badge.exclamationmark.fill` | Time-sensitive warning before an event. |
| Quiet hours | `bell.slash.fill` | Notifications held. |
| Daily notification budget | `bell.badge.fill` | Limited notification allowance. |
| Overload intervention | `hand.raised.fill` | Waldo stepping in to stop overload. |
| Recovery Day enforcement | `calendar.badge.lock` | Calendar protected for recovery. |
| Sleep Optimization Nudge | `bed.double.fill` | Sleep-related reminder/nudge. |
| Optimal wake alarm | `public/illustrations/wakeup-time.svg` | Supplied wake-time glyph is clearer than a generic alarm for wake timing. |
| DND / Do Not Disturb | `moon.fill` | Standard focus/DND metaphor. |
| Communication batching | `tray.full.fill` | Grouped incoming messages/notifications. |

### Chart / Visualisation Types

| Feature | Icon Asset | Rationale |
|---|---|---|
| Bar chart | `chart.bar.fill` | Standard bar chart selector. |
| Line chart | `chart.line.uptrend.xyaxis` | Time-series trend selector. |
| Donut / ring chart | `chart.pie.fill` | Closest built-in symbol for ring breakdown. |
| Sparkline | `chart.line.flattrend.xyaxis` | Small inline trend line. |
| Dumbbell plot | `public/illustrations/slope.svg` | The supplied slope glyph is the closest exact match for a dumbbell comparison. |
| Stacked bar | `chart.bar.xaxis` | Bar-history chart selector. |
| Heatmap | `square.grid.3x3.fill` | Grid-based pattern visualization. |
| Force-directed graph | `point.3.connected.trianglepath.dotted` | Connected-node graph. |

### Third-Party Connector Fallbacks

| Feature | Icon Asset | Rationale |
|---|---|---|
| Generic wearable device | `applewatch` | Best generic wearable fallback. |
| Generic calendar app | `calendar` | Universal calendar fallback. |
| Generic email client | `envelope.fill` | Universal email fallback. |
| Generic task manager | `checklist` | Task-list fallback. |
| Generic music/audio app | `music.note` | Audio/music fallback. |
| Generic fitness app | `figure.run` | Fitness/activity fallback. |
| Generic chat/messaging app | `message.fill` | Chat/messaging fallback. |
| Generic code/developer tool | `chevron.left.forwardslash.chevron.right` | Code/dev tool fallback. |
| Generic CRM/sales tool | `person.2.fill` | People/accounts relationship cue. |
| Generic design tool | `paintpalette.fill` | Design/creative tool fallback. |
| Generic analytics tool | `chart.bar.xaxis` | Analytics/data fallback. |
| Generic HR/people tool | `person.3.fill` | People/team tool fallback. |

## No-Icon Assignments

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
