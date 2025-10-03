// Modal de horário
const modalHorario = document.getElementById('modal-horario__cadastro-fotografo');
const closeBtnHorario = modalHorario.querySelector('.div-config-time__modal-close');
const modalDiaNome = document.getElementById('modal-dia-nome__cadastro-fotografo');
const horaInicioInput = document.getElementById('hora-inicio__cadastro-fotografo');
const horaFimInput = document.getElementById('hora-fim__cadastro-fotografo');
const salvarHorarioBtn = document.getElementById('salvar-horario__cadastro-fotografo');

let diaAtual = null;

// Botões de configuração
document.querySelectorAll('.horarios-container__dia .acoes__btn-config').forEach(btn => {
    btn.addEventListener('click', () => {
        const dia = btn.closest('.horarios-container__dia');
        const checkbox = dia.querySelector('input[type="checkbox"]');
        if (!checkbox.checked) return;

        diaAtual = dia;
        modalDiaNome.textContent = dia.dataset.dia;

        let horario = dia.dataset.horario;
        if (horario !== 'Fechado') {
            let partes = horario.split('-');
            horaInicioInput.value = partes[0];
            horaFimInput.value = partes[1];
        } else {
            horaInicioInput.value = '09:00';
            horaFimInput.value = '18:00';
        }

        modalHorario.style.display = 'flex';
    });
});

// Fechar modal
closeBtnHorario.addEventListener('click', () => {
    modalHorario.style.display = 'none';
});