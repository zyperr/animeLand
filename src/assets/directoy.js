import { MenuListener } from "./components/MenuNav.js";
import { AnimeCard } from "./components/CardAnime.js";
import { Loader } from "./components/Loader.js";

MenuListener();
setTimeout(AnimeCard(),5000)
Loader();