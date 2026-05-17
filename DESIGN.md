---
name: Flourish
description: Free financial literacy platform for UK students
colors:
  growth-green: "#2e7d5e"
  growth-green-mid: "#4caf82"
  growth-green-light: "#e6f4ee"
  ink-black: "#0d0d0d"
  warm-parchment: "#f7f6f2"
  canvas-white: "#ffffff"
  border-grey: "#e8e8e4"
  ui-grey: "#f2f2f0"
  body-grey: "#4a4a47"
  muted-grey: "#9e9e9a"
  loss-red: "#f87171"
typography:
  display:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(2.4rem, 7vw, 4.2rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(1.8rem, 4vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.15
  title:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.06em"
rounded:
  pill: "99px"
  xl: "24px"
  lg: "20px"
  card: "16px"
  md: "14px"
  sm: "10px"
  xs: "8px"
  "2xs": "6px"
spacing:
  section: "80px"
  card-lg: "32px"
  card: "24px"
  inner: "20px"
  tight: "12px"
components:
  button-primary:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.canvas-white}"
    rounded: "{rounded.xs}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "#222222"
    textColor: "{colors.canvas-white}"
  button-primary-lg:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.canvas-white}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  button-green:
    backgroundColor: "{colors.growth-green}"
    textColor: "{colors.canvas-white}"
    rounded: "{rounded.xs}"
    padding: "10px 20px"
  button-green-hover:
    backgroundColor: "#256b50"
    textColor: "{colors.canvas-white}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.xs}"
    padding: "10px 20px"
  card-standard:
    backgroundColor: "{colors.canvas-white}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
  card-featured:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.canvas-white}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
---

# Design System: Flourish

## 1. Overview

**Creative North Star: "The Confident Starter"**

Flourish exists to turn financial anxiety into financial competence. The visual system reflects that mission directly: Inter carries the structural weight of the interface, moving with clarity and efficiency, while DM Serif Display appears at moments that matter — the headline that reframes the stakes, the number that makes the lesson land, the quote from a student who got it. The system is light by default because a student between lectures in a campus café deserves a screen that doesn't fight the ambient light. Growth Green is momentum, not decoration; its scarcity makes it mean something.

The palette rejects both poles of fintech design. No corporate navy-and-serif banking gravity. No neon-on-dark gamification noise. Flourish sits in the space between: warm enough to feel personal, structured enough to feel credible. Flat surfaces get out of the way; shadows are earned, appearing only when something truly lifts above the page. Borders at rest are quiet; hover reveals the green or black that was there all along.

This is a system that knows when to speak and when to step aside. Inter handles the explaining. The serif handles the feeling. The green handles the signal.

**Key Characteristics:**
- DM Serif Display reserved for display, headline, and quote contexts only; Inter for all other UI
- Growth Green appears on ≤20% of any screen; its scarcity carries all the signalling weight
- Flat-by-default surfaces; elevation is a state response, not a base style
- Light mode primary; dark mode for intentionally atmospheric sections (footer, stats strip, simulator hero)
- Warm Parchment and Canvas White alternate at page and card level, never mixed at the same depth

## 2. Colors: The Momentum Palette

A minimal palette where one green carries the entire emotional register of growth, momentum, and trust.

### Primary
- **Growth Green** (`#2e7d5e`): The brand's single accent. Used on primary CTA text highlights, badge backgrounds in heavy form, and the CTA banner section background. When Growth Green appears, it means "act" or "progress." Never decorative.
- **Growth Green Mid** (`#4caf82`): Lighter, more energetic. Used for positive portfolio changes, stat highlights on dark backgrounds, and animated indicators. Never used on light backgrounds as body text (insufficient contrast).
- **Growth Green Light** (`#e6f4ee`): The green's quiet presence. Badge backgrounds, icon container fills, hover states on tool cards. Where Growth Green would be too loud, Growth Green Light carries the association without the weight.

### Neutral
- **Ink Black** (`#0d0d0d`): Primary text, black-variant buttons, featured card backgrounds, footer. Not pure black; the faint warmth prevents harshness.
- **Warm Parchment** (`#f7f6f2`): Page-level backgrounds for sections that want warmth: hero, testimonials, course listing, path cards section. Slightly warmer than off-white; feels handpicked.
- **Canvas White** (`#ffffff`): Card and surface backgrounds. Against Warm Parchment, white cards pop gently without needing shadows.
- **Border Grey** (`#e8e8e4`): All borders and dividers at rest. 1.5px stroke. Quiet enough to structure without asserting.
- **UI Grey** (`#f2f2f0`): Hover backgrounds, chip surfaces, phone mockup inner backgrounds. The lightest interactive surface.
- **Body Grey** (`#4a4a47`): Secondary text, body copy, supporting descriptions. Warm dark grey that reads well on both white and parchment.
- **Muted Grey** (`#9e9e9a`): Faint text, metadata, timestamps, sub-labels. Steps back aggressively.

### Functional
- **Loss Red** (`#f87171`): Negative portfolio change values only. Not a brand color; never appears in any UI component, button, badge, or illustration.

### Named Rules
**The Momentum Rule.** Growth Green appears on at most 20% of any given screen. Every use is a signal. Dilute it and it becomes wallpaper.

**The Two-Background Rule.** Any given page section uses either Warm Parchment or Canvas White, not both at the same visual layer. Alternating sections between the two creates rhythm without color.

## 3. Typography

**Display Font:** DM Serif Display (with Georgia, serif fallback)
**Body Font:** Inter (with system-ui, sans-serif fallback)

**Character:** The pairing is unambiguous. Inter handles the interface; DM Serif Display arrives at the moments that deserve attention. The contrast between them creates hierarchy without needing size alone to do the work. Italic DM Serif Display, used inside headlines for emphasis, carries personality without performative flair.

### Hierarchy
- **Display** (weight 400, `clamp(2.4rem, 7vw, 4.2rem)`, line-height 1.1, tracking -0.02em): Hero headlines and page-hero headlines. Maximum one per page. A single `<em>` child renders in italic at Growth Green.
- **Headline** (weight 400, `clamp(1.8rem, 4vw, 2.6rem)`, line-height 1.15): Section-level headlines, large display numbers in stats strip. The serif's workhorse scale.
- **Title** (weight 400, `1.25–1.4rem`, line-height 1.2): Card titles, course names, phase headings. Readable at body-adjacent scale; still clearly a DM Serif heading.
- **Body** (weight 400, `0.875rem`, line-height 1.65–1.7): All descriptive copy, card body text, lesson prose. Max line length ~520px (roughly 65ch). Weight 500 for section sub-headers that stay in Inter.
- **Label** (weight 700, `0.7–0.8rem`, letter-spacing 0.06–0.1em, uppercase): Section eyebrows, badge text, nav section headers in mobile, stat unit markers. Always Inter. Always uppercase when used as an eyebrow.

### Named Rules
**The Serif Reserve Rule.** DM Serif Display appears on headlines (Display, Headline, Title), display numbers, testimonial quotes, and CTA section headlines. It does not appear on labels, inputs, nav items, buttons, or body copy. One font per register.

**The Italic Signal.** An `<em>` inside a DM Serif headline renders in italic with Growth Green color. One emphasis per headline maximum. This is a personality gesture, not a formatting convention.

## 4. Elevation

Flourish is flat by default. Canvas White and Warm Parchment surfaces establish visual separation through color alternation and 1.5px borders, not depth. This keeps the interface clean, fast, and unpretentious; it also means that when something genuinely floats, the contrast is immediate and legible.

Shadows appear in three cases: (1) hover-state responses on interactive cards — a surface earns elevation by being engaged; (2) floating elements that are architecturally above the page (nav dropdown, hero mockup cards); (3) the hero phone mockup, which needs to read as a physical object.

### Shadow Vocabulary
- **Hover lift** (`0 8px 32px rgba(0,0,0,0.06)`): Applied on hover to interactive cards (course cards, path cards, how-cards, barrier cards, tool cards). Pairs with `translateY(-2px)`.
- **Content float** (`0 4px 24px rgba(0,0,0,0.06)`): Dashboard cards and containers at rest — the exception to flat-by-default, where cards sit inside an application shell and need visual grounding.
- **Hero float** (`0 4px 16px rgba(0,0,0,0.07)`): Hero floating annotation cards. Lighter than content float; they hover without competing.
- **Hero card** (`0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)`): The portfolio mockup card in the hero — the deepest on-page marketing element, layered shadow for physical presence.
- **Depth anchor** (`0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.08)`): Phone mockup only. This is the visual anchor of the hero; it needs theatrical depth.
- **Focus ring** (`0 0 0 3px rgba(46,125,94,0.1)`): Input and interactive element focus state. Green-tinted, not blue. Applied alongside Growth Green border.
- **Dropdown** (`0 12px 40px rgba(0,0,0,0.1)`): Nav dropdown only.

### Named Rules
**The Flat-By-Default Rule.** A surface at rest has no shadow. If a card seems to need a resting shadow for visual separation, the background contrast or border is wrong — fix those first.

## 5. Components

Components are confident and direct. Buttons invite clicking. Cards have presence. Nothing hesitates.

### Buttons
- **Shape:** Gently curved edges (8px radius standard; 10px on large variant). Enough curve to feel approachable, not so much it reads as playful.
- **Primary (Black):** Ink Black background (`#0d0d0d`), Canvas White text, `10px 20px` padding, 600-weight Inter 0.875rem. Hover: `#222222` background, `translateY(-1px)`. This is the default action button across the marketing site.
- **Primary (Large):** Same as above, `14px 28px` padding, 10px radius. For hero CTAs.
- **Green CTA:** Growth Green background, Canvas White text. Hover: `#256b50`, `translateY(-1px)`. Used in the CTA banner and lesson contexts where the green carries extra motivational weight.
- **Outline:** Transparent background, 1.5px Border Grey stroke, Ink Black text. Hover: stroke becomes Ink Black. Used as a secondary option alongside a primary black button.
- **Ghost White:** For use on Ink Black or Growth Green section backgrounds only. Transparent background, white border at 40% opacity. Hover: 100% opacity border.

### Chips and Badges
- **Category tag:** Growth Green Light background, Growth Green text, pill radius (99px), Inter 0.7rem weight 700 uppercase, tracking 0.06em, `3px 10px` padding. Used on course cards and path cards.
- **Status badge (active):** Growth Green background, Canvas White text, pill radius, 0.55–0.7rem. For lesson completion indicators, live-data badges.
- **Status badge (neutral):** Border Grey background, Body Grey text. For "coming soon" or inactive states.
- **Eyebrow label:** No background. Growth Green text, Inter 0.7–0.8rem weight 700, uppercase, 0.08em tracking. Used above section headlines.

### Cards
- **Shape:** 16px radius (standard path cards, course cards, tool cards, testi cards); 20px for featured how-cards and barrier cards.
- **Background:** Canvas White surfaces on Warm Parchment sections; Warm Parchment within white sections. Never same-color card on same-color background.
- **Border:** 1.5px Border Grey at rest. Hover: border transitions to Growth Green (tool cards, how-cards) or Ink Black (path cards, course cards).
- **Padding:** 24px standard; 32px for larger educational cards.
- **Featured variant:** Ink Black background, Canvas White text, no shadow, no hover lift. Used to anchor a grid when one card needs to stand out. Never add a resting shadow to this variant.

### Inputs and Fields
- **Style:** Canvas White background, 1.5px Border Grey border, 10px radius. Inter 0.9rem.
- **Focus:** Border shifts to Growth Green; `0 0 0 3px rgba(46,125,94,0.1)` focus ring.
- **Error:** Border and focus ring shift to red (`#c0392b`), ring at `rgba(192,57,43,0.12)`.
- **Disabled:** Opacity 0.5, cursor not-allowed.

### Navigation (Public)
- Canvas White background with subtle bottom border. Translucent on scroll (`rgba(255,255,255,0.92)` backdrop).
- Nav links: Inter 0.875rem weight 500, Body Grey default. Hover: UI Grey background, 8px radius, Ink Black text. Active: weight 600, Ink Black.
- Dropdown: Canvas White panel, 14px radius, `0 12px 40px rgba(0,0,0,0.1)` shadow, 1.5px Border Grey border. Items at 0.825rem Inter.

### Sidebar (Dashboard)
- Off-white (#1a1a18 dark / warm-parchment-equivalent light) background. 1.5px right border.
- Nav items: Inter 0.875rem weight 500, Body Grey. Hover: Canvas White background, Ink Black text.
- **Active item:** Growth Green text, Growth Green Light background, 3px Growth Green `border-left`. This is the single system-level use of a side-stripe border: it is functional navigation state, not decorative.

### Dashboard Progress Card (`.psc`)
Compact application card that translates learning progress into a quick visual dashboard read. Use Inter throughout; this is operational UI, not editorial typography.

- **Header:** circular Growth Green Light trend icon, bold `Your progress` title, and a compact bordered weekly XP pill. The pill must shrink before wrapping or overlapping.
- **Stats:** three equal metric columns with small green icon tiles, Growth Green numeric values, muted two-line labels, and 1.5px vertical dividers between columns.
- **Level:** hex Growth Green badge on the left, level title/subtitle in the middle, XP stack plus `% to Level N` on the right, followed by a 7px green progress bar.
- **Streak:** flame label, supporting copy, and Monday-to-Sunday dots. Completed days use Growth Green circles with tick icons; empty/current past days are grey; future days are quiet outlined grey.
- **Sizing:** preserve compact dashboard-card height relative to neighbouring cards. Add breathing room with modest padding and gaps only; do not return to oversized hero-like spacing.
- **Responsive:** `.psc` uses container-aware CSS. Header, XP pill, level title, and XP stack must not overlap in narrow dashboard columns.

### Signature Component: Section Eyebrow
The Flourish eyebrow pattern (found above every major headline) is Growth Green text, Inter 0.7–0.8rem, weight 700, uppercase, letter-spacing 0.08em. It precedes the headline by 12px margin. This pattern consistently signals "new section, new idea" across both marketing and dashboard surfaces.

## 6. Learning Path & Lesson Reader Patterns

### Path overview page (`.path-overview__*`)
Editorial layout inside the `.dashboard` container. Header uses: uppercase Inter eyebrow (category, green) + DM Serif Display title (`2.2rem`, Ink Black) + Inter body description + pill tags (`.path-overview__tag`: Border Grey background, Body Grey text, `pill` radius). Separated from course list by a `1.5px` Border Grey bottom border.

### Course block (`.path-course-block`)
White card, `16px` radius, `1.5px` Border Grey border. Header band (`.path-course-block__header`) uses `--grey-1` (`#f7f6f2`) background — the subtle two-tone contrast creates structure without shadow. Index number (`.path-course-block__index`) is tabular-numeric, oversized (`1.4rem`), muted grey — a quiet ordinal, not a headline.

### Lesson row (`.path-lesson-row`)
Full-width flex link. Three columns: left-pinned index number (18px, tabular), center content block (`flex: 1; min-width: 0`) with title (Inter 0.875rem weight 500) and 1-line clamped description below, right-pinned metadata stack (time in Muted Grey, XP value in Growth Green weight 600). Hover: `--grey-1` background, title transitions to Growth Green.

### Lesson reader (`.lesson-reader`)
Distraction-free reading column: `max-width: 680px`, centered, `padding: 48px 32px 80px`. Structure: back link → eyebrow row (course name in Growth Green uppercase / lesson counter in Muted Grey, space-between) → DM Serif Display title (`2.5rem`) → meta strip (time + XP, separated by Border Grey rule) → prose body (Inter `1.05rem`, `line-height 1.8`, section `<h2>`s in DM Serif `1.5rem`) → full-width green complete button.

### Complete button (`.lesson-reader__complete-btn`)
Full-width, Growth Green background, `18px 32px` padding, `10px` radius. On click: transitions to disabled/done state (grey), fires a pill toast at bottom-centre (`lesson-toast`), then navigates to the next lesson via `router.push`. The toast uses `toastIn` keyframe (`translateY(12px) → 0` with opacity fade). Done state text: "✓ Lesson Complete".

## 7. Do's and Don'ts

### Do:
- **Do** use DM Serif Display for display, headline, title, quote, and display number contexts only. Inter handles everything else.
- **Do** use a single `<em>` inside a DM Serif headline for italic emphasis at Growth Green. One per headline.
- **Do** use section eyebrows: Growth Green, Inter, uppercase, tracked, before every major headline.
- **Do** use 1.5px Border Grey borders on cards at rest; let hover reveal the personality (green or black).
- **Do** use Ink Black and Growth Green as section background alternatives (footer, stats strip, CTA banner, sim section). These dark and green sections should retain their own variable values in dark mode — do not override them.
- **Do** keep body copy to a max width of ~520px (roughly 65ch) on desktop.
- **Do** keep Growth Green on ≤20% of any surface. Use Growth Green Light when the association is wanted but the weight is not.
- **Do** use WCAG 2.1 AA minimum contrast: 4.5:1 for body text, 3:1 for large text and UI components. Growth Green Mid (`#4caf82`) on Canvas White fails AA for small text; use Growth Green (`#2e7d5e`) instead.

### Don't:
- **Don't** use traditional bank or financial institution aesthetics: corporate navy, formal hierarchy, institutional serif body text, crest-style iconography, sombre palettes. Flourish should feel like the opposite of a bank website.
- **Don't** use generic SaaS or Webflow template patterns: purple gradient heroes, glassmorphism card overlays, hero-metric layouts (big number + gradient accent + supporting stats), identical icon+heading+text card grids filling a section.
- **Don't** use `background-clip: text` gradient text. Headlines use a solid color. Growth Green on a white background, or Canvas White on Ink Black. Not a gradient.
- **Don't** use `border-left` or `border-right` greater than 1px as a decorative accent stripe on cards, callouts, or list items. The sidebar active indicator is the one architectural exception in the system.
- **Don't** apply shadows to cards at rest on marketing pages. Borders and background contrast do that work.
- **Don't** use DM Serif Display for buttons, labels, nav items, inputs, or form copy of any kind.
- **Don't** use Loss Red (`#f87171`) for anything other than a negative portfolio delta value in the simulator. It is a functional signal, not a color palette member.
- **Don't** use `enableSystem` in the theme provider or default to dark mode based on OS preference. Flourish defaults to light regardless of OS setting.
