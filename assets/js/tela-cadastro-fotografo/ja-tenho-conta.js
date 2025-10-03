// Seleciona o link "Já tenho conta" do modal fotógrafo
const jaTenhoContaFotografo = document.querySelector(".link-ja-conta-fotografo");
const modalCadastroFotografo = document.getElementById("modal__cadastro-fotografo");
const modalLoginFotografo = document.getElementById("modal__login-fotografo");

jaTenhoContaFotografo.addEventListener("click", () => {
    // Fecha o modal de cadastro
    modalCadastroFotografo.style.display = "none";

    // Abre o modal de login
    modalLoginFotografo.style.display = "flex"; // ou "block" conforme seu CSS
});

// Fecha modal clicando no X do login
const closeLoginFotografo = modalLoginFotografo.querySelector(".modal-overlay__section-login__modal-close");
closeLoginFotografo.addEventListener("click", () => {
    modalLoginFotografo.style.display = "none";
});

// Fecha clicando fora do modal
window.addEventListener("click", (e) => {
    if (e.target === modalLoginFotografo) {
        modalLoginFotografo.style.display = "none";
    }
});
