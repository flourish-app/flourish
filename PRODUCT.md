# Product

## Register

brand+product

## Users

UK university and college students (18–25) encountering investing for the first time. They come via social media, word of mouth, or a search for "how do ISAs work". They're curious but intimidated: finance feels like something adults with money already understand. They use Flourish on their phone between lectures or at their laptop in the evening. The primary job: go from "I've heard of an ISA but have no idea what to do" to "I've finished a course and made a practice trade."

Secondary users: slightly older early-career graduates (25–30) who want to fill in gaps before opening a real investment account.

## Product Purpose

Free financial literacy platform for UK students. Courses on ISAs, ETFs, pensions, and investing basics; a live stock-market simulator with real prices; and practical calculators (compound interest, ISA tracker, LISA). Success looks like a student completing a course, making their first simulated trade, and feeling confident enough to open a real account. Completely free; no upsells.

## Brand Personality

Friendly, clear, empowering. The tone of a knowledgeable older peer who's figured this out and wants to share it, not a bank or a professor. Warm but not cutesy. Direct but not cold. Confident without being smug.

## Anti-references

- **Traditional bank / corporate finance** (Barclays, NatWest style): corporate navy, formal hierarchy, serious tone, institutional distance. Flourish should feel like the opposite of a bank website.
- **Generic SaaS / Webflow template**: purple gradient heroes, glassmorphism, hero-metric layouts ("10,000 users, 99% uptime"), identical icon+text card grids, the full AI-slop aesthetic. Any new screen should pass the "is this a Webflow template?" test.

## Design Principles

1. **Demystify by default.** Finance is already intimidating. Every screen should reduce anxiety, not add complexity. If a layout choice makes something harder to grasp, it's wrong regardless of how polished it looks.
2. **Earn trust through clarity.** Friendly tone doesn't mean frivolous. Accurate information, clean information hierarchy, and consistent terminology build the credibility that makes students feel safe enough to act.
3. **One coherent product, two surfaces.** Marketing and dashboard share the same visual language. There should be no jarring handoff when a user signs in; the brand doesn't end at the login screen.
4. **Show, don't narrate.** The simulator and tools are the product's strongest argument. UI should expose capability directly, not bury it under marketing copy.
5. **Mobile is the majority case.** Students are on their phones. Every layout earns its desktop upgrade rather than assuming desktop first.

## Accessibility & Inclusion

WCAG 2.1 AA. Minimum 4.5:1 contrast for body text, 3:1 for large text and UI components. Full keyboard navigation in interactive tools and simulator. Reduced-motion support for animations (framer-motion `useReducedMotion`). No colour-only information encoding (charts and indicators must have text/icon fallbacks).
