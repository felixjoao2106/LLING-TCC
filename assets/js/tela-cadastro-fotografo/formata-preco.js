// Formato do preço
const inputPreco = document.getElementById("input-preco__cadastro-fotografo");

inputPreco.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove tudo que não é número
    value = (parseInt(value || "0", 10) / 100).toFixed(2); // converte para reais
    value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(value);

    e.target.value = value.replace("R$", "").trim(); // remove R$ se você já tem no span
});