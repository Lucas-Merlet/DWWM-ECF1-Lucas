// Holds the full unfiltered dataset once loaded, and the current filter state
let allProjets = [];
const activeFilters = {
  type: "tous",
  day: null,
  disponibleOnly: false,
};

// Same labels and capacity logic duplicated again from index-programmation.js / fiche-programmation.js
const badgeLabels = {
  theatre: "Théâtre",
  concert: "Concert",
  standup: "Stand-up",
};

function getCapacityTier(remaining) {
  if (remaining <= 0) return { tier: "scarce", label: "Complet" };
  return { tier: "limited", label: "Places disponibles" };
}

// Identical to createCard() in index-programmation.js — third copy of the same function in the project
function createCard(projet) {
  const card = document.createElement("div");
  card.classList.add("event-card");

  const link = document.createElement("a");
  link.classList.add("event-card__link");
  link.href = `/pages/fiche-programmation.html?id=${projet.id}`;

  const imageWrap = document.createElement("div");
  imageWrap.classList.add("event-card__image-wrap");

  const image = document.createElement("img");
  image.src = projet.image;
  image.alt = projet.titre;

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

  const footer = document.createElement("div");
  footer.classList.add("event-card__footer");

  const descriptionId = `description-${projet.id}`;

  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.classList.add("event-card__btn-info");
  toggleBtn.textContent = "En savoir plus";
  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.setAttribute("aria-controls", descriptionId);

  const description = document.createElement("p");
  description.classList.add("event-card__description");
  description.id = descriptionId;
  description.textContent = projet.description;
  description.hidden = true;

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

// Applies all three active filters (category, day, availability) to the full dataset
function getFilteredProjets() {
  return allProjets.filter((projet) => {
    // Category filter: skip if a specific type is selected and this show doesn't match
    if (activeFilters.type !== "tous" && projet.type !== activeFilters.type) {
      return false;
    }

    // Day filter: skip if a day is selected and this show's date doesn't fall on it
    if (activeFilters.day !== null) {
      const projetDay = new Date(projet.date).getDay();
      if (projetDay !== activeFilters.day) return false;
    }

    // Availability filter: skip sold-out shows when "Disponible uniquement" is active
    if (activeFilters.disponibleOnly) {
      const remaining = projet.places_total - projet.places_vendues;
      if (remaining <= 0) return false;
    }

    return true;
  });
}

// Clears and re-renders the events grid based on the current filter state
function renderCards() {
  const cardsContainer = document.getElementById("eventsGrid");
  cardsContainer.innerHTML = "";

  const filtered = getFilteredProjets();

  // Empty state message when no shows match the current filter combination
  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.classList.add("programmation__empty");
    empty.textContent = "Aucun spectacle ne correspond à ces critères.";
    cardsContainer.appendChild(empty);
    return;
  }

  filtered.forEach((projet) => {
    cardsContainer.appendChild(createCard(projet));
  });
}

// Wires up all three filter button groups (category, day, availability) to update state and re-render
function initFilters() {
  // Category filters: single-select, only one .active at a time
  const typeButtons = document.querySelectorAll(".filter-btn[data-filter]");
  typeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      typeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilters.type = btn.dataset.filter;
      renderCards();
    });
  });

  // Day filters: single-select with toggle-off behavior (clicking the active day deselects it)
  const dayButtons = document.querySelectorAll(
    ".filter-days .filter-btn[data-day]",
  );
  dayButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const day = Number(btn.dataset.day);
      const wasActive = btn.classList.contains("active");

      // Reset all day buttons first, since only one can be active at a time
      dayButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });

      if (wasActive) {
        // Clicking the already-active day clears the filter entirely
        activeFilters.day = null;
      } else {
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        activeFilters.day = day;
      }

      renderCards();
    });
  });

  // Availability toggle: independent on/off switch, doesn't affect the other filter groups
  const dispoBtn = document.getElementById("dispoFilterBtn");
  dispoBtn.addEventListener("click", () => {
    activeFilters.disponibleOnly = !activeFilters.disponibleOnly;
    dispoBtn.classList.toggle("active", activeFilters.disponibleOnly);
    dispoBtn.setAttribute("aria-pressed", String(activeFilters.disponibleOnly));
    renderCards();
  });
}

// Load the data once, then render the initial grid and wire up the filters
fetch("/spectacles.json")
  .then((response) => response.json())
  .then((data) => {
    allProjets = data[0].spectacles;
    renderCards();
    initFilters();
  });
