// Same labels and capacity logic as fiche-programmation.js — duplicated here rather than shared
const badgeLabels = {
  theatre: "Théâtre",
  concert: "Concert",
  standup: "Stand-up",
};

// Binary capacity logic: "scarce" only when fully sold out, "limited" for everything else
function getCapacityTier(remaining) {
  if (remaining <= 0) return { tier: "scarce", label: "Complet" };
  return { tier: "limited", label: "Places disponibles" };
}

// Builds one event card for the homepage's "Prochains événements" grid
function createCard(projet) {
  const card = document.createElement("div");
  card.classList.add("event-card");

  // Clickable wrapper linking to the show's detail page
  const link = document.createElement("a");
  link.classList.add("event-card__link");
  link.href = `/pages/fiche-programmation.html?id=${projet.id}`;

  const imageWrap = document.createElement("div");
  imageWrap.classList.add("event-card__image-wrap");

  const image = document.createElement("img");
  image.src = projet.image;
  image.alt = projet.titre;

  // Category badge overlaid on the image (e.g. "Théâtre")
  const badge = document.createElement("span");
  badge.classList.add("event-card__badge", `event-card__badge--${projet.type}`);
  badge.textContent = badgeLabels[projet.type] || projet.type;

  imageWrap.appendChild(image);
  imageWrap.appendChild(badge);

  const body = document.createElement("div");
  body.classList.add("event-card__body");

  const name = document.createElement("p");
  name.classList.add("event-card__name");
  name.textContent = projet.titre;

  // Short date format here (day + month only, no year/weekday), unlike the long format used on the fiche page
  const date = document.createElement("p");
  date.classList.add("event-card__date");
  const dateFormatted = new Date(projet.date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
  });
  date.textContent = `${dateFormatted} • ${projet.horaire}`;

  body.appendChild(name);
  body.appendChild(date);
  link.appendChild(imageWrap);
  link.appendChild(body);

  // Capacity gauge: same structure as on the fiche-programmation page, just inside a smaller card
  const remaining = projet.places_total - projet.places_vendues;
  const pct = Math.round((projet.places_vendues / projet.places_total) * 100);
  const { tier, label } = getCapacityTier(remaining);

  const capacity = document.createElement("div");
  capacity.classList.add("event-card__capacity");

  const capacityLabel = document.createElement("div");
  capacityLabel.classList.add("event-card__capacity-label");

  const capacityText = document.createElement("span");
  capacityText.classList.add("event-card__capacity-text");
  capacityText.textContent = label;

  const capacityCount = document.createElement("span");
  capacityCount.classList.add(
    "event-card__capacity-count",
    `event-card__capacity-count--${tier}`,
  );
  capacityCount.textContent = `${remaining} place${remaining > 1 ? "s" : ""}`;

  capacityLabel.appendChild(capacityText);
  capacityLabel.appendChild(capacityCount);

  const capacityBar = document.createElement("div");
  capacityBar.classList.add("event-card__capacity-bar");

  const capacityFill = document.createElement("div");
  capacityFill.classList.add(
    "event-card__capacity-fill",
    `event-card__capacity-fill--${tier}`,
  );
  capacityFill.style.width = `${pct}%`;

  capacityBar.appendChild(capacityFill);
  capacity.appendChild(capacityLabel);
  capacity.appendChild(capacityBar);

  // Footer holds the "En savoir plus" toggle button that reveals/hides the description below
  const footer = document.createElement("div");
  footer.classList.add("event-card__footer");

  // Unique ID per card so aria-controls correctly targets this specific card's description
  const descriptionId = `description-${projet.id}`;

  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.classList.add("event-card__btn-info");
  toggleBtn.textContent = "En savoir plus";
  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.setAttribute("aria-controls", descriptionId);

  // Description starts hidden, toggled via the button below (uses the native `hidden` attribute, not just CSS)
  const description = document.createElement("p");
  description.classList.add("event-card__description");
  description.id = descriptionId;
  description.textContent = projet.description;
  description.hidden = true;

  // Toggles visibility and keeps aria-expanded + button label in sync with the actual state
  toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    description.hidden = expanded;
    toggleBtn.setAttribute("aria-expanded", String(!expanded));
    toggleBtn.textContent = expanded ? "En savoir plus" : "Voir moins";
  });

  footer.appendChild(toggleBtn);

  card.appendChild(link);
  card.appendChild(capacity);
  card.appendChild(footer);
  card.appendChild(description);

  return card;
}

// Fisher-Yates shuffle, then takes the first n items — used to randomize which shows appear on the homepage
function getRandomItems(array, n) {
  const copie = [...array];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie.slice(0, n);
}

// Picks 4 random shows and renders them into the homepage grid (#programmation-grid)
function renderHomeEvents(spectacles) {
  const grid = document.getElementById("programmation-grid");
  grid.innerHTML = "";
  const selection = getRandomItems(spectacles, 4);
  selection.forEach((projet) => {
    grid.appendChild(createCard(projet));
  });
}

fetch("/spectacles.json")
  .then((response) => response.json())
  .then((data) => {
    renderHomeEvents(data[0].spectacles);
  });
