# Le Phosphore

A multi-page static website for **Le Phosphore**, a fictional French performance venue hosting théâtre, concerts, and stand-up shows. Built as the ECF AT#1 evaluation project for a DWWM (Développeur Web et Web Mobile) certification.

## Tech Stack

- HTML5
- SCSS (BEM methodology)
- Vanilla JavaScript (ES6+)
- jQuery (shared header/footer injection)
- JSON as a static data source (no backend / no build framework)

## Project Structure

```
/
├── index.html
├── spectacles.json
├── css/
│   └── style.min.css
├── js/
│   ├── header.js
│   ├── index-programmation.js
│   ├── programmation.js
│   ├── fiche-programmation.js
│   └── infos.js
├── img/
└── pages/
    ├── header.html
    ├── navbar.html
    ├── footer.html
    ├── programmation.html
    ├── fiche-programmation.html
    ├── infos.html
    └── contact.html
```

## Pages

| Page | Description |
|---|---|
| `index.html` | Homepage: hero banner, venue bio, and a random selection of upcoming shows |
| `pages/programmation.html` | Full event listing with category, day, and availability filters |
| `pages/fiche-programmation.html` | Single show detail page (loaded via `?id=`), with capacity gauge and practical info |
| `pages/infos.html` | Practical information in tabs: access, pricing, services, accessibility, seating plan |
| `pages/contact.html` | Contact form and venue contact details |

## Features

- Event cards rendered dynamically from `spectacles.json`
- Filterable programmation grid (category, day of week, availability), built with a single `allProjets` array and a `renderCards()` re-render pattern
- Capacity gauge with gold/red states based on remaining seats
- Tabbed interface on the practical info page
- Shared navbar and footer injected on every page via jQuery `.load()`, with current-page highlighting (`.active` + `aria-current="page"`)
- Responsive layout across desktop, tablet, and mobile breakpoints
- Accessible toggle patterns using `aria-expanded`, `aria-controls`, and `aria-pressed`

## Design System

- Dark background with gold and bordeaux accent colors
- Typography: EB Garamond (display) + Inter (body), per the design spec
- Built with RGAA accessibility standards in mind

## Running the Project

This is a static site with no build step. All asset paths are absolute (e.g. `/css/style.min.css`, `/pages/contact.html`), so it must be served from the project root using a local server (e.g. VS Code Live Server) rather than opened directly as a file.

## Known Limitations / Roadmap

- Shared logic (`badgeLabels`, `getCapacityTier`, `createCard`) is currently duplicated across multiple JS files and should be consolidated into a shared module
- The capacity gauge currently only distinguishes "sold out" from "available" rather than a graduated low-stock warning
- The "Plan de salle" tab on the practical info page is a placeholder pending a real seating plan
- Venue address needs to be unified across pages (currently inconsistent between sections)

## Author

Lucas — DWWM trainee
