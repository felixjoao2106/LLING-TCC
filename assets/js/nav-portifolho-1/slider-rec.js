const carrossel = document.querySelector(".section-tres__carrossel-rec-3");
const btnLeft = document.querySelector(".arrow-left");
const btnRight = document.querySelector(".arrow-right");

btnLeft.addEventListener("click", () => {
  carrossel.scrollBy({ left: -300, behavior: "smooth" });
});

btnRight.addEventListener("click", () => {
  carrossel.scrollBy({ left: 300, behavior: "smooth" });
});
