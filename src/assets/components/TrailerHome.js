export const TrailerHome = () => {
  const API =
    "https://api.jikan.moe/v4/anime?&min_score=7&status=airing&start_date=2023&limit=7";
  const parallaxBg = document.querySelector(".attachment-bg");
  const cardTrailer = document.querySelector(".card-trailer");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  async function animeEpisodeInfo(urlApi) {
    const response = await fetch(urlApi, {
      method: "GET",
      headers: { Accept: "text/html"},
      mode: "cors",
      cache:"reload"
    });
    const data = await response.json();
    return data;
  }
  const createCardTrailer = async () => {
    try {
      const animeData = await animeEpisodeInfo(API);

      const dataTrailer = animeData.data.map((anime) => {
        let animeTrailerUrl = anime.trailer.embed_url;
        let animeName = anime.title;
        let animeImg = anime.trailer.images.large_image_url;
        return { animeTrailerUrl, animeName ,animeImg};
      });

      for (const anime of dataTrailer) {
        const cardVideo = document.createElement("iframe");
        const spanName = document.createElement("span");

        cardVideo.setAttribute("src", anime.animeTrailerUrl);
        spanName.textContent = anime.animeName;
        spanName.classList.add("box-anime-title");
        cardVideo.classList.add("card__video");

        cardTrailer.appendChild(cardVideo);
        parallaxBg.append(spanName);
      }
      const cardVideo = document.querySelector(".card__video");
      const videos = document.querySelectorAll(".card__video");
      const boxTitle = document.querySelector('.box-anime-title')
      const boxTitles = document.querySelectorAll('.box-anime-title')
      cardVideo.classList.add("slideTrailer");
      parallaxBg.style.backgroundImage = `url("${animeData.data[0].images.jpg.large_image_url}")`
      boxTitle.classList.add('slideTrailer')
      
      let slideIndex = 0;
      function showVideo() {
        videos.forEach((slideVideo) => {
          slideVideo.classList.remove("slideTrailer");
        });
        boxTitles.forEach(animeTitle => {
          animeTitle.classList.remove("slideTrailer")
        })
        videos[slideIndex].classList.add("slideTrailer");
        boxTitles[slideIndex].classList.add('slideTrailer')
        parallaxBg.style.backgroundImage = `url(${animeData.data[slideIndex].images.jpg.large_image_url})`
      }
      btnPrev.addEventListener("click", () => {
        slideIndex--;
        if (slideIndex < 0) {
          slideIndex = videos.length - 1;
        }
        showVideo();
      });
      btnNext.addEventListener("click", () => {
        slideIndex++;
        if (slideIndex > videos.length - 1) {
          slideIndex = 0;
        }
        showVideo();
      });
    } catch (error) {
      console.error(error);
    }
  };
  createCardTrailer();
};
