class NavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <nav class="navbar" aria-label="Navigation principale">
          <a class="nav-brand" href="/index.html" aria-label="Le Phosphore – Accueil">
            <div class="nav-logo" aria-hidden="true">
              <img src="/img/picto-removebg-preview.png" alt="" class="nav-logo"/>
            </div>
            <div class="nav-brand-text">
              <span class="nav-brand-name">Le Phosphore</span>
              <span class="nav-brand-sub">Salle de spectacles</span>
            </div>
          </a>

          <ul class="nav-links" role="list">
            <li><a href="/index.html" class="active" aria-current="page">Accueil</a></li>
            <li><a href="/pages/programmation.html">Programmation</a></li>
            <li><a href="infos.html">Infos pratiques</a></li>
            <li><a href="/pages/contact.html">Contact</a></li>
          </ul>

          <a href="billetterie.html" class="nav-cta">Billetterie</a>

          <button class="nav-toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>

        <nav class="nav-mobile" id="mobile-menu" aria-label="Menu mobile">
          <a href="index.html" class="active" aria-current="page">Accueil</a>
          <a href="programmation.html">Programmation</a>
          <a href="infos.html">Infos pratiques</a>
          <a href="/pages/contact.html">Contact</a>
          <a href="billetterie.html" class="nav-cta-mobile">Billetterie</a>
        </nav>
      </header>
    `;

    // ✅ Le DOM est prêt, on peut cibler les éléments
    const toggle = this.querySelector(".nav-toggle");
    const mobileMenu = this.querySelector("#mobile-menu");

    toggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen);
    });

    this.querySelectorAll(".nav-mobile a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", false);
      });
    });
  }
}

customElements.define("nav-bar", NavBar);
