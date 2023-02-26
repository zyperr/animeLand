export const Loader = () => {
  let loader = document.getElementById("pre-loading");
  setTimeout(function() {
    document.getElementById("pre-loading").style.opacity = "0";
    loader.addEventListener('transitionend',()=> {
        document.body.removeChild(loader)
    })
  }, 7000);
};
