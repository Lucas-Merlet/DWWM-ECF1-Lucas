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

| Page                             | Description                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| `index.html`                     | Homepage: hero banner, venue bio, and a random selection of upcoming shows            |
| `pages/programmation.html`       | Full event listing with category, day, and availability filters                       |
| `pages/fiche-programmation.html` | Single show detail page (loaded via `?id=`), with capacity gauge and practical info   |
| `pages/infos.html`               | Practical information in tabs: access, pricing, services, accessibility, seating plan |
| `pages/contact.html`             | Contact form and venue contact details                                                |

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

## Environment Setup

This project requires no Node.js/npm build pipeline. SCSS is compiled directly through a VS Code extension.

1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Install the **Live Sass Compiler** extension (by Glenn Marks)
3. Open the project folder in VS Code
4. Click **Watch Sass** in the bottom status bar — this compiles every `.scss` file into `css/style.min.css` automatically on save
5. Install the **Live Server** extension and click **Go Live** to serve the site locally with auto-reload

## Running the Project Locally

This is a static site with no build step beyond SCSS compilation. All asset paths are absolute (e.g. `/css/style.min.css`, `/pages/contact.html`), so the project must be served from its root using a local server (e.g. VS Code Live Server) rather than opened directly as a file.

## Deployment

The site is deployed on **GitHub Pages**.

1. Push the project to a GitHub repository
2. In the repository settings, go to **Pages**
3. Set the source branch (e.g. `main`) and folder (`/root`)
4. GitHub Pages publishes the site at `https://<username>.github.io/<repo-name>/`

> **Note:** since all internal links and asset paths in this project are root-relative (e.g. `/css/style.min.css`, `/pages/contact.html`), they will only resolve correctly if the site is served from the domain root. On a GitHub Pages **project site** (`https://<username>.github.io/<repo-name>/`), these paths will break, since they'll point to `https://<username>.github.io/css/...` instead of `https://<username>.github.io/<repo-name>/css/...`. To fix this, either configure a custom domain at the root, or convert paths to relative ones (e.g. `../css/style.min.css`) before deploying.

## Known Limitations / Roadmap

- Shared logic (`badgeLabels`, `getCapacityTier`, `createCard`) is currently duplicated across multiple JS files and should be consolidated into a shared module
- The capacity gauge currently only distinguishes "sold out" from "available" rather than a graduated low-stock warning
- The "Plan de salle" tab on the practical info page is a placeholder pending a real seating plan
- Venue address needs to be unified across pages (currently inconsistent between sections)

## Author

Lucas — DWWM trainee
