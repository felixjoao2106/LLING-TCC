// Mapeamento entre IDs e páginas de destino
const rotasFotografo = {
    "item-agendamentos": "tela-fotografo-config-index.html",
    "item-adicionar-servico": "tela-fotografo-config-adicionar-servico.html",
    "item-detalhes-empresa": "tela-fotografo-config-detalhes-da-empresa.html",
    "item-checkout": "tela-fotografo-config-checkout.html",
    "item-sair": "index.html" // ou tela de login, se preferir
};

// Adiciona o evento de clique dinamicamente
Object.keys(rotasFotografo).forEach(id => {
    const item = document.getElementById(id);
    if (item) {
        item.style.cursor = "pointer";
        item.addEventListener("click", () => {
            window.location.href = rotasFotografo[id];
        });
    }
});

