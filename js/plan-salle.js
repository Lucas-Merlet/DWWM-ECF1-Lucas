// Seat map configuration: each row lists how many seats belong to each category, front (stage) to back
// Total: 120 seats — 16 Carré Or, 34 Carré Argent, 62 Basique, 8 PMR
const seatMapConfig = [
  { category: "or", count: 8 },
  { category: "or", count: 8 },
  { category: "argent", count: 10 },
  { category: "argent", count: 12 },
  { category: "argent", count: 12 },
  { category: "basique", count: 14 },
  { category: "basique", count: 14 },
  { category: "basique", count: 14 },
  { category: "basique", count: 14 },
  { category: "basique", count: 6 },
  { category: "pmr", count: 8 },
];

// Category metadata: display label and average price, used for tooltips and aria-labels
const categoryInfo = {
  or: { label: "Carré Or", price: 45 },
  argent: { label: "Carré Argent", price: 35 },
  basique: { label: "Basique", price: 28 },
  pmr: { label: "PMR", price: 28 },
};

const tooltip = document.getElementById("seatMapTooltip");

// Shows the tooltip near the hovered/focused seat with its category label and average price
function showTooltip(seatEl, label, price) {
  if (!tooltip) return;
  tooltip.textContent = `${label} — environ ${price} €`;
  tooltip.hidden = false;

  const seatRect = seatEl.getBoundingClientRect();
  const wrapRect = seatEl.closest(".seat-map").getBoundingClientRect();

  tooltip.style.left = `${seatRect.left - wrapRect.left + seatRect.width / 2}px`;
  tooltip.style.top = `${seatRect.top - wrapRect.top}px`;
}

function hideTooltip() {
  if (!tooltip) return;
  tooltip.hidden = true;
}

// Builds a single seat button. Uses a <button> (not a <div>) so it's keyboard-focusable,
// and aria-label carries the same info as the visual tooltip for screen reader / keyboard-only users
function createSeat(category, seatNumber) {
  const seat = document.createElement("button");
  seat.type = "button";
  seat.classList.add("seat-map__seat", `seat-map__seat--${category}`);

  const { label, price } = categoryInfo[category];
  seat.setAttribute(
    "aria-label",
    `${label}, place ${seatNumber} — environ ${price} €`,
  );

  seat.addEventListener("mouseenter", () => showTooltip(seat, label, price));
  seat.addEventListener("focus", () => showTooltip(seat, label, price));
  seat.addEventListener("mouseleave", hideTooltip);
  seat.addEventListener("blur", hideTooltip);

  return seat;
}

// Generates all rows and seats from seatMapConfig and injects them into the page
function renderSeatMap() {
  const container = document.getElementById("seatMapRows");
  if (!container) return;

  let seatNumber = 0;

  seatMapConfig.forEach((rowConfig) => {
    const row = document.createElement("div");
    row.classList.add("seat-map__row");

    for (let i = 0; i < rowConfig.count; i++) {
      seatNumber++;
      row.appendChild(createSeat(rowConfig.category, seatNumber));
    }

    container.appendChild(row);
  });
}

renderSeatMap();
