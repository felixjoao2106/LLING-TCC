// Salvar horário
        salvarHorarioBtn.addEventListener('click', () => {
            const novoHorario = `${horaInicioInput.value}-${horaFimInput.value}`;
            const checkbox = diaAtual.querySelector('input[type="checkbox"]');
            const statusSpan = diaAtual.querySelector('.dia__dia-horario');
            const hiddenInput = diaAtual.querySelector('input[type="hidden"]');

            statusSpan.textContent = checkbox.checked ? novoHorario : 'Fechado';
            if (hiddenInput) hiddenInput.value = checkbox.checked ? novoHorario : 'Fechado';

            diaAtual.dataset.horario = checkbox.checked ? novoHorario : 'Fechado';
            modalHorario.style.display = 'none';
        });