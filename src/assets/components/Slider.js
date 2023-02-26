export const slider = () => {
  const sliderContent = document.querySelector(".slider__container");
  const API =
    "https://api.jikan.moe/v4/anime?status=airing&min_score=7.20&start_date=2023&limit=24";
  async function animeData(urlApi) {
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
  }
  const createSlider = async () => {
    try {
      const animeinfo = await animeData(API);
      console.log(animeinfo);
      const newAnimesSort = animeinfo.data.map((anime) => {
        let animeUrlImg = anime.images.jpg.image_url;
        let animeTitle = anime.title;
        let animeSynopsis = anime.synopsis;
        return { animeUrlImg, animeTitle, animeSynopsis };
      });
      for (const anime of newAnimesSort) {
        const list = document.createElement("li");
        const paragraph = document.createElement("p");
        const animeName = document.createElement("span");
        const listImg = document.createElement("img");
        list.classList.add("slide");
        listImg.classList.add("animeFp");
        paragraph.classList.add("synopsis-anime");
        animeName.classList.add("span-name__anime");
        listImg.setAttribute("src", anime.animeUrlImg);
        listImg.setAttribute("alt", `anime name: ${anime.animeTitle}`);
        listImg.setAttribute("loading", "lazy");

        paragraph.textContent = anime.animeSynopsis;
        animeName.textContent = anime.animeTitle;

        list.appendChild(paragraph);
        list.appendChild(listImg);
        list.appendChild(animeName);
        sliderContent.appendChild(list);
      }
      let currentIndex = 0;
      const SynopsisScroll = document.querySelectorAll(".synopsis-anime");
      const slides = document.querySelectorAll(".slide");
      const slide1 = document.querySelector(".slide");
      slide1.classList.add("active");
      function setSlideCarrousel() {
        setTimeout(slides[23].classList.remove("active"), 9000);
        if (currentIndex > 0) {
          slides[currentIndex - 1].classList.remove("active");
        }
        slides[currentIndex].classList.add("active");
        currentIndex++;

        if (currentIndex >= slides.length) {
          currentIndex = 0;
        }
      }
      setInterval(setSlideCarrousel, 9000);
    } catch (error) {
      console.log(error);
    }
  };
  createSlider();
};
