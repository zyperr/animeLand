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
  (async () => {
    try {
      const animeInfo = await animeData(API);
      let cardAnime = `${animeInfo.data
        .map(
          (anime, index) =>
            ` 
        <div class="anime__card staggered-enter" style="background: linear-gradient(to bottom left, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)),url('${
          anime.images.jpg.large_image_url
        }');background-repeat: no-repeat;background-size: cover;animation-delay:${
              index * 0.1
            }s">
            <span class="anime__card-likes">
              <i class="fa-solid fa-star"></i>
              ${anime.score ?? "no rating"}
            </span>
            <h5 class="anime__title">${anime.title}</h5>
          </div>`
        )
        .join("")}`;
      animeCardContainer.innerHTML += cardAnime;
      await new Promise((resolve) => setTimeout(resolve, 500));
      animeCardContainer
        .querySelectorAll(".staggered-enter")
        .forEach((animation) =>
          animation.classList.add("staggered-enter-active")
        );

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
              .filter((item) => item.title == animeName || item.score > 0 && item.score != null)
              .map(
                (
                  anime,
                  index
                ) => `<div class="anime__card" style="background: linear-gradient(to bottom left, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)),url('${
                  anime.images.jpg.large_image_url
                }');background-repeat: no-repeat;background-size: cover;animation-delay:${
                  index * 0.2
                };"><span class="anime__card-likes"><i class="fa-solid fa-star"></i>${
                  anime.score ?? "No rating"
                }</span><h5 class="anime__title">${anime.title}</h5>
                </div>`
              )
              .join("")}`;
            if (animeName != "") {
              errorMessage.classList.remove("show__errorMessage");
              animeCardContainer.innerHTML = cardSearch;
            } else {
              errorMessage.classList.remove("show__errorMessage");
              animeCardContainer.innerHTML = cardAnime;
              new Promise((resolve) => setTimeout(resolve, 100));
              animeCardContainer
                .querySelectorAll(".staggered-enter")
                .forEach((animation) =>
                  animation.classList.add("staggered-enter-active")
                );
            }
            if(animes.data.tile !== animeName && animes.data.length === 0){
              errorMessage.classList.add("show__errorMessage")
            }
          })
          .catch((error) => console.log(error));
      });
    } catch (error) {
      console.error(error);
    }
  })();
};
