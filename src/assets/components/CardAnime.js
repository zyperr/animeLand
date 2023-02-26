export const AnimeCard = () => {
  const animeCardContainer = document.querySelector(".anime__cards-container");
  const searchInput = document.getElementById("search__input");
  const searchForm = document.querySelector(".search-form");
  const errorMessage = document.querySelector(".content");
  let max_score = 9;
  let min_score = 7.5;
  const API = `https://api.jikan.moe/v4/anime?min_score=${min_score}&max_score=${max_score}&type=TV/pictures`;

  async function animeData(urlApi) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
  }
  const createAnimeCard = async () => {
    try {
      const animeInfo = await animeData(API);
      const infoCard = animeInfo.data.map((anime) => {
        let animeScore = anime.score ?? "no rating";
        let animeImg = anime.images.jpg.large_image_url;
        let animeTitle = anime.title;

        return { animeScore, animeImg, animeTitle };
      });
      for (const cardAnime of infoCard) {
        const animeCard = document.createElement("div");
        const spanScore = document.createElement("span");
        const iconStar = document.createElement("i");
        const animeTitle = document.createElement("h5");

        spanScore.classList.add("anime__card-likes");
        spanScore.textContent = cardAnime.animeScore;

        animeTitle.classList.add("anime__title");
        animeTitle.innerText = cardAnime.animeTitle;

        animeCard.classList.add("anime__card");
        animeCard.style.background = `linear-gradient(to bottom left, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)),url('${cardAnime.animeImg}')`;
        animeCard.style.backgroundSize = "cover";
        animeCard.style.backgroundRepeat = "no-repeat";

        iconStar.setAttribute("class", "fa-solid fa-star");
        spanScore.appendChild(iconStar);
        animeCard.appendChild(spanScore);
        animeCard.appendChild(animeTitle);

        animeCardContainer.appendChild(animeCard);
      }

      searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const searchText = searchInput.value;
        const animeName = searchInput.value
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        let parsetText = searchText
          .split(" ")
          .join("-")
          .toString()
          .toLowerCase()
          .trim();
        const API = `https://api.jikan.moe/v4/anime?q=${parsetText}&min_score=5/pictures`;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await fetch(API)
          .then((response) => response.json())
          .then((animes) => {
            let cardSearch = `${animes.data
              .filter(
                (item) =>
                  item.title == animeName ||
                  (item.score > 0 && item.score != null)
              )
              .map(
                (anime, index) =>
                  `<div class="anime__card" style="background: linear-gradient(to bottom left, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)),url('${
                    anime.images.jpg.large_image_url
                  }');background-repeat: no-repeat;background-size: cover;animation-delay:${
                    index * 0.2
                  };">
                  <span class="anime__card-likes"><i class="fa-solid fa-star"></i>${
                    anime.score ?? "No rating"
                  }</span><h5 class="anime__title">${anime.title}</h5>
                </div>`
              )
              .join("")}`;
              const cardAnimes = document.querySelectorAll('.anime__card')
            if (animeName != "") {
              errorMessage.classList.remove("show__errorMessage");
              animeCardContainer.innerHTML = cardSearch;
            } else {
              errorMessage.classList.remove("show__errorMessage");
              
              new Promise((resolve) => setTimeout(resolve, 100));
            }
            if (animes.data.tile !== animeName && animes.data.length === 0) {
              errorMessage.classList.add("show__errorMessage");
              setTimeout(()=>location.reload(),4000)
            }
          })
          .catch((error) => console.log(error));
      });
    } catch (error) {
      console.error(error);
    }
  };

  const hero = document.querySelector(".hero");
  window.addEventListener("load", () => {
    hero.classList.add("zoom-background");
    hero.style.transform = "scale(1.9)";
    hero.style.opacity = "0";

    setTimeout(() => {
      hero.style.width = "0%";
      scrollTo(0, 0);
    }, 2000);
  });
  setTimeout(createAnimeCard, 1500);
};
