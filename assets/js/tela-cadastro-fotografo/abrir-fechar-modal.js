const openModalFotografoBtns = document.querySelectorAll(".openModal__cadastro-fotografo");
const modalFotografo = document.getElementById("modal__cadastro-fotografo");
const closeModalFotografo = document.getElementById("closeModal__cadastro-fotografo");

// Abrir modal em qualquer botão
openModalFotografoBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        modalFotografo.style.display = "flex";
    });
});

// Fechar no X
closeModalFotografo.addEventListener("click", () => {
    modalFotografo.style.display = "none";
});

