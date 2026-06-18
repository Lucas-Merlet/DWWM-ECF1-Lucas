// Animation du bouton burger (délégation : fonctionne même si le HTML est injecté plus tard)
$(document).on("click", ".nav-toggle", function () {
  const $toggle = $(this);
  const $mobileMenu = $("#mobile-menu");
  const isOpen = $mobileMenu.toggleClass("open").hasClass("open");
  $toggle.toggleClass("open", isOpen);
  $toggle.attr("aria-expanded", isOpen);
});

// Ferme le menu mobile quand on clique sur un lien
$(document).on("click", ".nav-mobile a", function () {
  $("#mobile-menu").removeClass("open");
  $(".nav-toggle").removeClass("open").attr("aria-expanded", false);
});

// Met en surbrillance le lien de la page actuelle
function highlightCurrentPage() {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";

  $(".nav-links a, .nav-mobile a").each(function () {
    const $link = $(this);
    const linkFile = $link.attr("href").split("/").pop();
    const isActive = linkFile === currentFile;

    $link.toggleClass("active", isActive);

    if (isActive) {
      $link.attr("aria-current", "page");
    } else {
      $link.removeAttr("aria-current");
    }
  });
}
