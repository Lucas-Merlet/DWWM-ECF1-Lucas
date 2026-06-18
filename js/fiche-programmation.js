// Read the show ID from the URL query string (e.g. fiche-programmation.html?id=3)
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

// Maps internal type keys (used in spectacles.json) to their display labels
const badgeLabels = {
  theatre: "Théâtre",
  concert: "Concert",
  standup: "Stand-up",
};

// Binary capacity logic: either "scarce" (sold out) or "limited" (anything else has availability)
// Note: only 2 tiers here, unlike a 3-tier gauge (e.g. limited/scarce/sold out) you might expect
function getCapacityTier(remaining) {
  if (remaining <= 0) return { tier: "scarce", label: "Complet" };
  return { tier: "limited", label: "Places disponibles" };
}

// Builds an inline SVG icon from raw path data, marked aria-hidden since icons here are always paired with visible text
function createIcon(pathData, viewBox = "0 0 24 24") {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", viewBox);
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", pathData);
  svg.appendChild(path);
  return svg;
}

// Shared icon path data, reused across meta items and practical info blocks
const icons = {
  back: "M19 12H5M12 19l-7-7 7-7",
  calendar:
    "M8 2v4M16 2v4M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2",
  pin: "M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
};

// Builds one row in the meta list (icon + text), e.g. date, time, or duration
function createMetaItem(iconKey, text) {
  const item = document.createElement("div");
  item.classList.add("fiche-spectacle__meta-item");
  item.appendChild(createIcon(icons[iconKey]));
  const span = document.createElement("span");
  span.textContent = text;
  item.appendChild(span);
  return item;
}

// Formats an ISO date string into a long, capitalized French date (e.g. "Vendredi 12 juin 2026")
function formatDateLong(dateISO) {
  const formatted = new Date(dateISO).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  // toLocaleDateString returns the weekday lowercase by default, so capitalize the first letter manually
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

// Builds one block in the "Informations pratiques" grid (title + one or more text lines)
function createPracticalBlock(iconKey, titleText, lines) {
  const block = document.createElement("div");
  block.classList.add("fiche-spectacle__practical-block");

  const blockTitle = document.createElement("h3");
  // Icon is optional: "Accès" and "Tarifs" blocks below pass null and skip it
  if (iconKey) blockTitle.appendChild(createIcon(icons[iconKey]));
  const titleSpan = document.createElement("span");
  titleSpan.textContent = titleText;
  blockTitle.appendChild(titleSpan);
  block.appendChild(blockTitle);

  lines.forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    block.appendChild(p);
  });

  return block;
}

// The empty <section class="fiche-spectacle"> from fiche-programmation.html, filled in below
const sectionFiche = document.querySelector(".fiche-spectacle");

fetch("/spectacles.json")
  .then((response) => response.json())
  .then((data) => {
    // Note: data structure is data[0].spectacles, an array nested inside the first element of the JSON
    const spectacles = data[0].spectacles;
    const projet = spectacles.find((p) => p.id === id);

    // Guard clause: if no ID matches (bad URL, missing param), show a fallback message and stop
    if (!projet) {
      sectionFiche.innerText = "Spectacle introuvable.";
      return;
    }

    // "Back to programmation" link at the top of the page
    const back = document.createElement("a");
    back.classList.add("fiche-spectacle__back");
    back.href = "/pages/programmation.html";
    back.appendChild(createIcon(icons.back));
    const backText = document.createElement("span");
    backText.textContent = "Retour à la programmation";
    back.appendChild(backText);
    sectionFiche.appendChild(back);

    // Main two-column layout: image on the left, info block on the right
    const main = document.createElement("div");
    main.classList.add("fiche-spectacle__main");

    // Left column: show poster/image
    const imageWrap = document.createElement("div");
    imageWrap.classList.add("fiche-spectacle__image-wrap");
    const image = document.createElement("img");
    image.src = projet.image;
    image.alt = projet.titre;
    imageWrap.appendChild(image);
    main.appendChild(imageWrap);

    // Right column: badge, title, meta, description, capacity gauge, CTA
    const info = document.createElement("div");
    info.classList.add("fiche-spectacle__info");

    // Category badge (e.g. "Théâtre"), styled via a modifier class matching the show type
    const badge = document.createElement("span");
    badge.classList.add(
      "fiche-spectacle__badge",
      `fiche-spectacle__badge--${projet.type}`,
    );
    badge.textContent = badgeLabels[projet.type] || projet.type;
    info.appendChild(badge);

    const title = document.createElement("h1");
    title.classList.add("fiche-spectacle__title");
    title.textContent = projet.titre;
    info.appendChild(title);

    // Meta row: date, time, and optionally duration if present in the data
    const meta = document.createElement("div");
    meta.classList.add("fiche-spectacle__meta");
    meta.appendChild(createMetaItem("calendar", formatDateLong(projet.date)));
    meta.appendChild(createMetaItem("clock", projet.horaire));
    if (projet.duree) {
      meta.appendChild(createMetaItem("clock", `Durée : ${projet.duree}`));
    }
    info.appendChild(meta);

    const description = document.createElement("p");
    description.classList.add("fiche-spectacle__description");
    description.textContent = projet.description ?? "";
    info.appendChild(description);

    // Compute remaining seats and the sold percentage for the capacity gauge
    const remaining = projet.places_total - projet.places_vendues;
    const pct = Math.round((projet.places_vendues / projet.places_total) * 100);
    const { tier, label } = getCapacityTier(remaining);

    // Capacity gauge: label row (text + count) + visual bar
    const capacity = document.createElement("div");
    capacity.classList.add("fiche-spectacle__capacity");

    const capacityLabel = document.createElement("div");
    capacityLabel.classList.add("fiche-spectacle__capacity-label");

    const capacityText = document.createElement("span");
    capacityText.classList.add("fiche-spectacle__capacity-text");
    capacityText.textContent = label;

    const capacityCount = document.createElement("span");
    capacityCount.classList.add(
      "fiche-spectacle__capacity-count",
      `fiche-spectacle__capacity-count--${tier}`,
    );
    // Handles singular/plural agreement for "place" / "places"
    capacityCount.textContent = `${remaining} place${remaining > 1 ? "s" : ""} restante${remaining > 1 ? "s" : ""}`;

    capacityLabel.appendChild(capacityText);
    capacityLabel.appendChild(capacityCount);

    const capacityBar = document.createElement("div");
    capacityBar.classList.add("fiche-spectacle__capacity-bar");

    // Fill width is set dynamically based on the sold percentage, color comes from the tier modifier class
    const capacityFill = document.createElement("div");
    capacityFill.classList.add(
      "fiche-spectacle__capacity-fill",
      `fiche-spectacle__capacity-fill--${tier}`,
    );
    capacityFill.style.width = `${pct}%`;

    capacityBar.appendChild(capacityFill);
    capacity.appendChild(capacityLabel);
    capacity.appendChild(capacityBar);
    info.appendChild(capacity);

    // Booking CTA: link to the ticketing page, disabled state when the show is sold out
    const cta = document.createElement("a");
    cta.classList.add("fiche-spectacle__cta");
    cta.href = `/pages/billetterie.html?id=${projet.id}`;
    cta.textContent = remaining > 0 ? "RÉSERVER" : "COMPLET";
    if (remaining <= 0) {
      cta.classList.add("fiche-spectacle__cta--disabled");
      cta.setAttribute("aria-disabled", "true");
    }
    info.appendChild(cta);

    main.appendChild(info);
    sectionFiche.appendChild(main);

    // Divider between the main info block and the practical info section
    const hr = document.createElement("hr");
    hr.classList.add("fiche-spectacle__divider");
    sectionFiche.appendChild(hr);

    // "Informations pratiques" section: location, access, pricing
    const practical = document.createElement("div");
    practical.classList.add("fiche-spectacle__practical");

    const practicalTitle = document.createElement("h2");
    practicalTitle.textContent = "Informations pratiques";
    practical.appendChild(practicalTitle);

    const grid = document.createElement("div");
    grid.classList.add("fiche-spectacle__practical-grid");

    // Hardcoded venue address and access info, same for every show (not pulled from projet)
    grid.appendChild(
      createPracticalBlock("pin", "Lieu", [
        "Le Phosphore",
        "15 Rue des Arts",
        "75001 Paris",
      ]),
    );
    grid.appendChild(
      createPracticalBlock(null, "Accès", [
        "Métro : Châtelet (L1, L4, L7, L11, L14)",
        "Bus : 29, 38, 47, 75",
      ]),
    );
    // Pricing block uses the actual show's price from the data
    grid.appendChild(
      createPracticalBlock(null, "Tarifs", [`Plein tarif : ${projet.prix} €`]),
    );

    practical.appendChild(grid);
    sectionFiche.appendChild(practical);
  });
