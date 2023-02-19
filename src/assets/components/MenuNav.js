export const MenuListener = () => {
  const navMenu = document.querySelector(".navbar-container");
  const navIcon = document.getElementById("hambugerIcon");
  const bgDarked = document.querySelector(".bg-darked");
  navIcon.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    bgDarked.classList.toggle("active");
  });
};
