
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header-fixo");
    const searchBtn = document.querySelector(".header-fixo__search-btn");
    const closeBtn = document.querySelector(".header-fixo__close-btn");
    const inputBox = document.querySelector(".header-fixo__input");

    searchBtn.addEventListener("click", () => {
        header.classList.add("ativo");
        inputBox.classList.add("ativo");
    });

    closeBtn.addEventListener("click", () => {
        header.classList.remove("ativo");
        inputBox.classList.remove("ativo");
    });
});

