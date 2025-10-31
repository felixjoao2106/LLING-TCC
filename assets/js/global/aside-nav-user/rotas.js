// Mapeia cada item com seu destino
const rotas = {
    "item-agendamentos": "tela-user-config-agendamento.html",
    "item-config-conta": "tela-user-config-index.html",
    "item-favoritos": "tela-user-config-favoritos.html",
    "item-avaliacoes": "tela-user-config-avaliacao.html",
    "item-sair": "index.html" // ou tela de login, se quiser
};

// Adiciona o evento de clique em todos
Object.keys(rotas).forEach(id => {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.style.cursor = "pointer"; // feedback visual
        elemento.addEventListener("click", () => {
            window.location.href = rotas[id];
        });
    }
});