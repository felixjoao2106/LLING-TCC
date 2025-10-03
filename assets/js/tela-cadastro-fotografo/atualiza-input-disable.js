// Atualiza status quando o switch muda
document.querySelectorAll('.horarios-container__dia input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const dia = checkbox.closest('.horarios-container__dia');
        const statusSpan = dia.querySelector('.dia__dia-horario');
        const btnConfig = dia.querySelector('.acoes__btn-config');
        const hiddenInput = dia.querySelector('input[type="hidden"]');

        if (checkbox.checked) {
            const horario = dia.dataset.horario !== 'Fechado' ? dia.dataset.horario : '09:00-18:00';
            statusSpan.textContent = horario;
            if (hiddenInput) hiddenInput.value = horario;
            btnConfig.classList.remove('disabled');
        } else {
            statusSpan.textContent = 'Fechado';
            if (hiddenInput) hiddenInput.value = 'Fechado';
            btnConfig.classList.add('disabled');
        }
    });
});