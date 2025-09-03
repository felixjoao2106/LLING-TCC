const cards = document.querySelectorAll(".section-dois__carrosel__card");
  let atual = 0;

  // Mostra só o card ativo
  function mostrarCard(index) {
    cards.forEach((c, i) => {
      c.style.display = (i === index) ? "block" : "none";
    });
  }

  // Inicializa
  mostrarCard(atual);

  // Troca automático a cada 4s
  setInterval(() => {
    atual = (atual + 1) % cards.length;
    mostrarCard(atual);
  }, 4000);