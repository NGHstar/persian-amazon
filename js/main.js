const mobileMenuIcon = document.querySelector(".mobile-menu__icon");
const mobileMenu = document.querySelector(".amazon-header__mobile-menu");

mobileMenuIcon.addEventListener("click", () => {
  mobileMenu.classList.toggle("expanded");
});
