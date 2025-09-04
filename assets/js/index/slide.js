const cards = document.querySelectorAll(".card");
  const infos = document.querySelectorAll(".info");
  let atual = 0;

  function mostrarCard(index) {
    cards.forEach((c, i) => {
      c.style.display = (i === index) ? "block" : "none";
    });
    infos.forEach((info, i) => {
      info.style.display = (i === index) ? "flex" : "none";
    });
  }

  mostrarCard(atual);

  setInterval(() => {
    atual = (atual + 1) % cards.length;
    mostrarCard(atual);
  }, 4000);