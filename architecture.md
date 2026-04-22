# Architecture Document

## Project Overview
Static offline English learning website for Malagasy and French speakers.
Vanilla JS only. Zero dependencies. Zero frameworks.
Bilingual interface: Malagasy (default) and French.
English is the learning target and is never translated.

## File Structure

### /architecture.md
Purpose: Project architecture documentation and change log.
Date Created: 2025-01-15

### /design-tokens.css
Purpose: CSS custom properties for colors, spacing, fonts, and reusable design tokens.
Ensures visual consistency across the site.
Contains all color variables, spacing scales, typography settings.

### /css/layout.css
Purpose: Page structure, grid systems, banner positioning.
Handles right-positioned banner on non-session pages.
Handles bottom-positioned banner during active learning sessions.

### /css/components.css
Purpose: Reusable component styles.
Includes: buttons, cards, word-block tiles, scrambled letter tiles, textarea, feedback display, pop-up, score display.

### /index.html
Purpose: Main HTML shell.
Imports all CSS and JS modules.
Renders level selection screen and redaction tool entry point.
Contains service worker registration (only inline script allowed).
No inline styles. Under 600 lines.

### /sw.js
Purpose: Service worker for offline functionality.
Caches all local assets on install.
Serves from cache on fetch events.
No external requests. Vanilla JS only.

### /data/vocab-data.js
Purpose: Vocabulary data for all four levels.
Each entry contains: English word, emoji, scrambled variant.
Data completeness takes priority over line limit.

### /data/grammar-data.js
Purpose: Grammar rules and sentence-building exercises for all four levels.
Contains rules and word blocks for sentence construction.
Data completeness takes priority over line limit.

### /js/vocab-engine.js
Purpose: Vocabulary learning engine.
Handles scrambled letter reconstruction logic.
Manages answer validation and score tracking.
Under 600 lines.

### /js/grammar-engine.js
Purpose: Grammar learning engine.
Handles word-block sentence building.
Manages order validation and step feedback.
Tracks scores. Under 600 lines.

### /js/redaction-engine.js
Purpose: Writing analysis tool.
Performs rule-based text checks: subject-verb agreement, word order, tense consistency, article usage.
Returns annotated feedback. Under 600 lines.

### /js/ui-controller.js
Purpose: UI interaction controller.
Handles DOM manipulation, language toggle, banner position switching.
Manages pop-up open/close and navigation between levels and redaction tool.
Under 600 lines.

## Learning Levels

### Débutant (Beginner)
- Present simple
- SVO order
- Articles
- Pronouns

### Intermédiaire (Intermediate)
- Present continuous
- Past simple
- Question formation
- Negation

### Avancé (Advanced)
- Future forms
- Modals
- Conjunctions
- Compound sentences

### Expert
- Perfect tenses
- Passive voice
- Conditionals
- Reported speech

## Security Rules
- No eval()
- No external requests
- No localStorage
- No cookies
- No user data stored or transmitted

## Change Log
- 2025-01-15: Initial architecture document created
