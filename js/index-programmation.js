const spectacles = [
  {
    id: 1,
    titre: "Cyrano de Bergerac",
    type: "theatre",
    description:
      "La célèbre pièce d'Edmond Rostand dans une mise en scène contemporaine audacieuse. Cyrano, poète et bretteur au nez légendaire, aime en secret sa cousine Roxane.",
    date: "2026-06-20",
    horaire: "20:30",
    duree: "2h30",
    prix: 32,
    places_total: 120,
    places_vendues: 87,
    artiste: "Cie Les Éclaireurs",
    image: "/img/Cyrano.webp",
  },
  {
    id: 2,
    titre: "Marina Music - Électro-Pop Live",
    type: "concert",
    description:
      "Marina Music enflamme la scène avec son mélange unique d'électro-pop et de mélodies envoûtantes. Un show visuel et sonore à couper le souffle.",
    date: "2026-06-20",
    horaire: "21:00",
    duree: "1h45",
    prix: 28,
    places_total: 120,
    places_vendues: 120,
    artiste: "Marina Music",
    image: "/img/marina.webp",
  },
  {
    id: 3,
    titre: "Paul Music - Rock Indépendant",
    type: "concert",
    description:
      "Paul Music revient avec son énergie brute et ses riffs acérés. Rock indépendant, guitares saturées et textes engagés pour une soirée électrique.",
    date: "2026-06-21",
    horaire: "21:00",
    duree: "2h00",
    prix: 25,
    places_total: 120,
    places_vendues: 63,
    artiste: "Paul Music",
    image: "/img/paul.webp",
  },
  {
    id: 4,
    titre: "Fadily Camara - La plus drôle",
    type: "standup",
    description:
      "Fadily Camara débarque avec son nouveau spectacle hilarant. Entre anecdotes du quotidien et observations acérées, elle prouve une fois de plus qu'elle est la plus drôle.",
    date: "2026-06-21",
    horaire: "20:00",
    duree: "1h30",
    prix: 35,
    places_total: 120,
    places_vendues: 112,
    artiste: "Fadily Camara",
    image: "/img/fadily.webp",
  },
  {
    id: 5,
    titre: "En attendant Godot",
    type: "theatre",
    description:
      "L'œuvre majeure de Samuel Beckett. Vladimir et Estragon attendent Godot, qui ne viendra jamais. Une réflexion absurde et profonde sur la condition humaine.",
    date: "2026-06-22",
    horaire: "19:30",
    duree: "2h00",
    prix: 28,
    places_total: 120,
    places_vendues: 120,
    artiste: "Cie du Passage",
    image: "/img/godot.webp",
  },
  {
    id: 6,
    titre: "Ahmed Music - Jazz Manouche",
    type: "concert",
    description:
      "Ahmed Music et son quartet invitent à un voyage musical entre Django Reinhardt et compositions originales. Guitares, violon et contrebasse pour une soirée swing.",
    date: "2026-06-22",
    horaire: "20:30",
    duree: "1h45",
    prix: 22,
    places_total: 120,
    places_vendues: 45,
    artiste: "Ahmed Music Quartet",
    image: "/img/ahmed.webp",
  },
  {
    id: 7,
    titre: "Nora Music - Chanson Française",
    type: "concert",
    description:
      "Nora Music revisite la chanson française avec élégance. De Piaf à ses propres compositions, sa voix puissante et ses arrangements raffinés captivent le public.",
    date: "2026-06-20",
    horaire: "19:00",
    duree: "1h30",
    prix: 24,
    places_total: 120,
    places_vendues: 78,
    artiste: "Nora Music",
    image: "/img/nora.webp",
  },
  {
    id: 8,
    titre: "Jamel Comedy Club",
    type: "standup",
    description:
      "Le mythique plateau du Jamel Comedy Club s'invite au Phosphore. Découvrez la nouvelle génération d'humoristes sélectionnés par Jamel Debbouze.",
    date: "2026-06-22",
    horaire: "21:30",
    duree: "2h00",
    prix: 30,
    places_total: 120,
    places_vendues: 98,
    artiste: "Jamel Comedy Club",
    image: "/img/jamel.webp",
  },
];

// Libellés d'affichage pour chaque type
const typeLabels = {
  theatre: "Théâtre",
  concert: "Concert",
  standup: "Stand-up",
};

// Formate la date ISO ("2026-06-20") en "20 Juin 2026"
function formatDate(dateISO) {
  const mois = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const [annee, m, jour] = dateISO.split("-");
  return `${parseInt(jour, 10)} ${mois[parseInt(m, 10) - 1]} ${annee}`;
}

// Mélange un tableau (Fisher-Yates) et retourne les n premiers éléments
function getRandomItems(array, n) {
  const copie = [...array];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie.slice(0, n);
}

// Construit le HTML d'une seule card
function createEventCard(spectacle) {
  const imageSrc =
    spectacle.image ||
    "https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&q=80";
  const dateFormatee = formatDate(spectacle.date);
  const label = typeLabels[spectacle.type] || spectacle.type;

  return `
    <article class="event-card" data-id="${spectacle.id}">
      <div class="event-card__image-wrap">
        <img src="${imageSrc}" alt="${spectacle.titre}" />
        <span class="event-card__badge event-card__badge--${spectacle.type}">${label}</span>
      </div>
      <div class="event-card__body">
        <p class="event-card__name">${spectacle.titre}</p>
        <p class="event-card__date">${dateFormatee} &nbsp;•&nbsp; ${spectacle.horaire.replace(":", "h")}</p>
      </div>
    </article>
  `;
}

// Affiche 4 cards aléatoires dans la grille
function renderProgrammation() {
  const grid = document.getElementById("programmation-grid");
  const selection = getRandomItems(spectacles, 4);
  grid.innerHTML = selection.map(createEventCard).join("");
}

renderProgrammation();
