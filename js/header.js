// Burger button animation (event delegation: works even if the HTML is injected later via .load())
$(document).on("click", ".nav-toggle", function () {
  const $toggle = $(this);
  const $mobileMenu = $("#mobile-menu");
  // Toggle the menu's open state and capture the resulting state in one go
  const isOpen = $mobileMenu.toggleClass("open").hasClass("open");
  $toggle.toggleClass("open", isOpen);
  $toggle.attr("aria-expanded", isOpen);
});

// Close the mobile menu whenever a link inside it is clicked
$(document).on("click", ".nav-mobile a", function () {
  $("#mobile-menu").removeClass("open");
  $(".nav-toggle").removeClass("open").attr("aria-expanded", false);
});

// Highlights the nav link matching the current page
function highlightCurrentPage() {
  // Extract the current filename from the URL path; fallback to "index.html" for the root path
  const currentFile = window.location.pathname.split("/").pop() || "index.html";

  $(".nav-links a, .nav-mobile a").each(function () {
    const $link = $(this);
    // Extract just the filename from each link's href to compare against currentFile
    const linkFile = $link.attr("href").split("/").pop();
    const isActive = linkFile === currentFile;

    $link.toggleClass("active", isActive);

    // Set aria-current="page" on the active link for screen readers, remove it from all others
    if (isActive) {
      $link.attr("aria-current", "page");
    } else {
      $link.removeAttr("aria-current");
    }
  });
}
const newsletterBtn = document.querySelector(".footer-newsletter-btn");
const newsletterCheckbox = document.getElementById("newsletter-rgpd");

newsletterBtn.addEventListener("click", () => {
  if (!newsletterCheckbox.checked) {
    newsletterCheckbox.focus();
    return;
  }
  // logique d'inscription ici
});
