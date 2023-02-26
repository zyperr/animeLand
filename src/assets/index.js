import { Loader } from "./components/Loader.js";
import { MenuListener } from "./components/MenuNav.js";
import { slider } from "./components/Slider.js";
import { TrailerHome } from "./components/TrailerHome.js";


MenuListener();
AOS.init({
  mirror: false,
});
TrailerHome();
setTimeout(() => {
  slider();
}, 1500);
Loader();
