import { MenuListener } from "./components/MenuNav.js";

const cardImg = document.querySelectorAll(".card__img");
const paragraph = document.querySelectorAll(".aboutUs__paragraph");
const zoomBackground = document.querySelector(".zoom-background");

window.addEventListener("load", () => {
  cardImg.forEach((item) => {
    item.style.transform = `translateX(0px)`;
  });
  zoomBackground.style.transform = "scale(1.2)";
  zoomBackground.style.opacity = "0.2";
});

for (let i = 0; i < cardImg.length; i++) {
    cardImg[i].addEventListener("click",(event)=>{
        paragraph[i].classList.add("active")
        cardImg[i].classList.add("active")
        for (let j = 0; j < cardImg.length; j++) {
            cardImg[j].classList.remove("active");
            paragraph[j].classList.remove("active")
        }
        paragraph[i].classList.add("active")
        event.target.classList.add("active")
    })

}

MenuListener();
