// Imagem do local de trabalho
const inputImagem = document.getElementById('input-imagem__cadastro-fotografo');
const preview = document.getElementById('preview__cadastro-fotografo');

// Salva o HTML inicial do preview para restaurar depois
const initialPreviewHTML = preview.innerHTML;

// Abrir filepicker por teclado também
preview.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        inputImagem.click();
    }
});

// Quando escolher arquivo
inputImagem.addEventListener('change', function () {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.innerHTML = `
                <button type="button" class="remove-btn" aria-label="Remover imagem">&times;</button>
                <img class="preview-img" src="${e.target.result}" alt="Preview da imagem">
            `;

            const btn = preview.querySelector('.remove-btn');
            btn.addEventListener('click', removerImagem);
        };
        reader.readAsDataURL(this.files[0]);
    }
});

function removerImagem(event) {
    event.stopPropagation();
    inputImagem.value = '';
    preview.innerHTML = initialPreviewHTML;

    preview.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputImagem.click();
        }
    });
}