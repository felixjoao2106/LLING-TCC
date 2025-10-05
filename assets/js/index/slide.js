const cards = document.querySelectorAll(".card");
const infos = document.querySelectorAll(".info");
const pointsContainer = document.querySelector(".carrosel_points");

let atual = 0;

// 🔹 cria dinamicamente as bolinhas de acordo com a quantidade de cards
cards.forEach((_, i) => {
  const point = document.createElement("img");
  point.src = "assets/img/page/index/circle_16dp_wght400.svg";
  point.alt = "ir para o card " + (i + 1);
  point.addEventListener("click", () => {
    atual = i;
    mostrarCard(atual);
  });
  pointsContainer.appendChild(point);
});

const points = pointsContainer.querySelectorAll("img");

function mostrarCard(index) {
  // mostra/esconde cards
  cards.forEach((c, i) => {
    c.style.display = (i === index) ? "block" : "none";
  });

  infos.forEach((info, i) => {
    info.style.display = (i === index) ? "flex" : "none";
  });

  // atualiza bolinhas
  points.forEach((p, i) => {
    p.classList.toggle("ativo", i === index);
  });
}

// inicial
mostrarCard(atual);

// troca automática a cada 4s
setInterval(() => {
  atual = (atual + 1) % cards.length;
  mostrarCard(atual);
}, 4000);
