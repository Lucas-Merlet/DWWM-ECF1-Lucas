class FooterBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="footer-main">

          <!-- Colonne 1 : brand -->
          <div class="footer-brand">
            <a href="index.html" class="footer-logo-link" aria-label="Le Phosphore – Accueil">
              <img src="/img/picto-removebg-preview.png" alt="" class="footer-logo-img" />
              <div class="footer-brand-text">
                <span class="footer-brand-name">LE PHOSPHORE</span>
                <span class="footer-brand-sub">SALLE DE SPECTACLE</span>
              </div>
            </a>
            <p class="footer-desc">
              Une salle de spectacle pluridisciplinaire au cœur de la ville.
              Théâtre, concerts, stand-up : vivez toutes les émotions.
            </p>
          </div>

          <!-- Colonne 2 : liens rapides -->
          <div class="footer-col">
            <h3 class="footer-col-title">LIENS RAPIDES</h3>
            <ul class="footer-links" role="list">
              <li><a href="index.html">Accueil</a></li>
              <li><a href="programmation.html">Programmation</a></li>
              <li><a href="infos.html">Infos pratiques</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>

          <!-- Colonne 3 : réseaux sociaux -->
          <div class="footer-col">
            <h3 class="footer-col-title">SUIVEZ-NOUS</h3>
            <div class="footer-socials">
              <a href="#" aria-label="Facebook" class="footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" class="footer-social-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" aria-label="TikTok" class="footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" class="footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon fill="#0D0D0D" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Colonne 4 : newsletter -->
          <div class="footer-col">
            <h3 class="footer-col-title">NEWSLETTER</h3>
            <p class="footer-newsletter-desc">Recevez notre actualité et nos offres.</p>
            <div class="footer-newsletter-form">
              <input type="email" placeholder="Votre email" aria-label="Votre adresse email" class="footer-newsletter-input" />
              <button type="button" class="footer-newsletter-btn">S'INSCRIRE</button>
            </div>
          </div>

        </div>

        <!-- Barre basse -->
        <div class="footer-bottom">
          <p class="footer-copy">© 2026 Le Phosphore – Tous droits réservés</p>
          <nav class="footer-legal" aria-label="Liens légaux">
            <a href="#">Mentions légales</a>
            <a href="#">RGAA</a>
            <a href="#">Confidentialité</a>
          </nav>
        </div>
      </footer>
    `;
  }
}

customElements.define("footer-bar", FooterBar);
