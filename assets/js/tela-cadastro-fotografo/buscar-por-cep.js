// Busca CEP
document.getElementById('input-cep__cadastro-fotografo').addEventListener('blur', function () {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length !== 8) {
        alert('CEP inválido! Um CEP tem 8 números.');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado!');
                return;
            }

            document.getElementById('input-endereco__cadastro-fotografo').value = data.logradouro || '';
            document.getElementById('input-bairro__cadastro-fotografo').value = data.bairro || '';
            document.getElementById('input-cidade__cadastro-fotografo').value = data.localidade || '';
            document.getElementById('input-estado__cadastro-fotografo').value = data.uf || '';
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
        });
});