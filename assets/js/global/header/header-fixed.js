window.addEventListener("scroll", function () {
  const header = document.querySelector(".header-fixo");
  const scrollPos = window.scrollY;

  if (scrollPos > 545) { // a partir de 200px de rolagem
    header.classList.add("mostrar");
  } else {
    header.classList.remove("mostrar");
  }
});