document.addEventListener('DOMContentLoaded', () => {
    // --- Configurações iniciais ---
    const diasContainer = document.querySelector('.div-wrapper__dias-disponiveis');
    const leftDiaArrow = document.querySelector('.next-left__icon');
    const rightDiaArrow = document.querySelector('.next-rigth__icon');
    const inputData = document.getElementById('input-data-selecionada');

    const wrapperHorarios = document.querySelector('.horarios__wrapper');
    const leftHorarioArrow = document.querySelector('.horarios__next-left');
    const rightHorarioArrow = document.querySelector('.horarios__next-rigth');
    const inputHorario = document.getElementById('input-horario-selecionado');

    const btnManha = document.querySelector('.container-horario__manha');
    const btnTarde = document.querySelector('.container-horario__tarde');
    const btnNoite = document.querySelector('.container-horario__noite');

    const diasPorPagina = 6;
    const horariosPorPagina = 6;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const fotografo = {
        horarios_funcionamento: {
            Segunda: { status: true, horario: "09:00-18:00" },
            Terça: { status: true, horario: "09:00-18:00" },
            Quarta: { status: true, horario: "09:00-18:00" },
            Quinta: { status: true, horario: "09:00-18:00" },
            Sexta: { status: true, horario: "09:00-18:00" },
            Sábado: { status: false, horario: "Fechado" },
            Domingo: { status: false, horario: "Fechado" }
        },
        ensaios: [
            { nome: "Baby born", duracao: 40, preco: 200 }
        ]
    };
    const duracao = fotografo.ensaios[0].duracao;

    let diasGerados = [];
    let paginaDiasAtual = 0;
    let paginaHorarioAtual = 0;
    let horariosDiaAtual = [];

    // --- Funções utilitárias ---
    function formatarIso(d) { return d.toISOString().split('T')[0]; }
    function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
    function nomeMes(d) {
        return capitalize(new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(d).replace('.', ''));
    }
    function nomeDiaSemana(d) {
        return capitalize(new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(d).replace('.', ''));
    }
    function toMinutes(h) { const [hh, mm] = h.split(':').map(Number); return hh * 60 + mm; }
    function toHour(min) { const hh = String(Math.floor(min / 60)).padStart(2, '0'); const mm = String(min % 60).padStart(2, '0'); return `${hh}:${mm}`; }

    // --- Gerar dias ---
    function gerarDias(qtd) {
        const inicioIndex = diasGerados.length;
        for (let i = inicioIndex; i < inicioIndex + qtd; i++) {
            const d = new Date(hoje);
            d.setDate(d.getDate() + i);
            diasGerados.push({
                data: d,
                iso: formatarIso(d),
                dia: d.getDate(),
                mes: nomeMes(d),
                diaSemana: nomeDiaSemana(d)
            });
        }
    }

    // --- Renderizar dias ---
    function renderizarDias(pagina) {
        diasContainer.innerHTML = '';
        const inicio = pagina * diasPorPagina;
        const fim = inicio + diasPorPagina;
        const subset = diasGerados.slice(inicio, fim);

        subset.forEach(obj => {
            const card = document.createElement('div');
            card.classList.add('dias-disponiveis__container-dia');
            card.dataset.iso = obj.iso;

            const statusDiv = document.createElement('div');
            statusDiv.classList.add('container-dia__status');

            const mapaDias = { seg: 'Segunda', ter: 'Terça', qua: 'Quarta', qui: 'Quinta', sex: 'Sexta', sab: 'Sábado', dom: 'Domingo' };
            const chaveDia = obj.diaSemana.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const nomeDia = mapaDias[chaveDia] || 'Segunda';
            const info = fotografo.horarios_funcionamento[nomeDia];
            if (info && info.status) statusDiv.classList.add('container-dia__status--ativo');
            else statusDiv.classList.add('container-dia__status--desativo');

            card.appendChild(statusDiv);
            card.innerHTML += `
                <p>${obj.mes}</p>
                <p>${obj.dia}</p>
                <p>${obj.diaSemana}</p>
            `;

            diasContainer.appendChild(card);
        });

        diasContainer.appendChild(inputData); // manter input no DOM
        atualizarMesAno(subset);
    }

    function atualizarMesAno(diasVisiveis) {
        const label = document.getElementById('mesAno');
        if (!label || diasVisiveis.length === 0) return;

        const primeiro = diasVisiveis[0].data;
        const ultimo = diasVisiveis[diasVisiveis.length - 1].data;

        const mesPrimeiro = primeiro.toLocaleString('pt-BR', { month: 'long' });
        const anoPrimeiro = primeiro.getFullYear();
        const mesUltimo = ultimo.toLocaleString('pt-BR', { month: 'long' });
        const anoUltimo = ultimo.getFullYear();

        let texto;
        if (anoPrimeiro === anoUltimo) {
            if (mesPrimeiro === mesUltimo) texto = `${capitalize(mesPrimeiro)} ${anoPrimeiro}`;
            else texto = `${capitalize(mesPrimeiro)} – ${capitalize(mesUltimo)} ${anoPrimeiro}`;
        } else {
            texto = `${capitalize(mesPrimeiro)} ${anoPrimeiro} – ${capitalize(mesUltimo)} ${anoUltimo}`;
        }
        label.textContent = texto;
    }

    // --- Gerar horários de um dia ---
    function gerarHorarios(dia) {
        const info = fotografo.horarios_funcionamento[dia];
        if (!info || !info.status || info.horario === "Fechado") return [];

        const [inicio, fim] = info.horario.split('-');
        let horaInicio = toMinutes(inicio);
        const horaFim = toMinutes(fim);
        const horarios = [];

        while (horaInicio + duracao <= horaFim) {
            const h = toHour(horaInicio);
            let periodo = horaInicio < 12 * 60 ? 'manha' : horaInicio < 18 * 60 ? 'tarde' : 'noite';
            horarios.push({ hora: h, periodo });
            horaInicio += duracao;
        }
        return horarios;
    }

    // --- Renderizar horários da página atual ---
    function renderizarHorariosPagina() {
        wrapperHorarios.innerHTML = '';
        if (!horariosDiaAtual.length) {
            wrapperHorarios.innerHTML = '<p>Sem horários disponíveis</p>';
            inputHorario.value = '';
            return;
        }

        const inicio = paginaHorarioAtual * horariosPorPagina;
        const fim = inicio + horariosPorPagina;
        const subset = horariosDiaAtual.slice(inicio, fim);

        subset.forEach(h => {
            const div = document.createElement('div');
            div.classList.add('wrapper__horario');
            div.dataset.periodo = h.periodo;
            div.innerHTML = `<p>${h.hora}</p>`;
            wrapperHorarios.appendChild(div);
        });

        // Seleciona automaticamente o primeiro horário visível
        const primeiroHorario = wrapperHorarios.querySelector('.wrapper__horario');
        if (primeiroHorario) {
            primeiroHorario.classList.add('wrapper__horario--select');
            inputHorario.value = primeiroHorario.textContent.trim();
        }
    }

    // --- Eventos de dias ---
    leftDiaArrow.addEventListener('click', () => {
        if (paginaDiasAtual > 0) { paginaDiasAtual--; renderizarDias(paginaDiasAtual); }
    });
    rightDiaArrow.addEventListener('click', () => {
        if ((paginaDiasAtual + 1) * diasPorPagina >= diasGerados.length) gerarDias(diasPorPagina);
        paginaDiasAtual++; renderizarDias(paginaDiasAtual);
    });

    diasContainer.addEventListener('click', e => {
        const diaEl = e.target.closest('.dias-disponiveis__container-dia');
        if (!diaEl) return;

        diasContainer.querySelectorAll('.dias-disponiveis__container-dia').forEach(d => d.classList.remove('dias-disponiveis__container-dia--select'));
        diaEl.classList.add('dias-disponiveis__container-dia--select');

        const nomeDiaAbrev = diaEl.querySelector('p:last-child').textContent.toLowerCase();
        const mapaDias = { seg: 'Segunda', ter: 'Terça', qua: 'Quarta', qui: 'Quinta', sex: 'Sexta', sab: 'Sábado', dom: 'Domingo' };
        const chave = nomeDiaAbrev.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const diaFormatado = mapaDias[chave] || 'Segunda';

        // Atualiza input e horários
        inputData.value = diaEl.dataset.iso;
        horariosDiaAtual = gerarHorarios(diaFormatado);
        paginaHorarioAtual = 0;
        renderizarHorariosPagina();
    });

    // --- Eventos de horários ---
    wrapperHorarios.addEventListener('click', e => {
        const horarioEl = e.target.closest('.wrapper__horario');
        if (!horarioEl) return;
        wrapperHorarios.querySelectorAll('.wrapper__horario').forEach(h => h.classList.remove('wrapper__horario--select'));
        horarioEl.classList.add('wrapper__horario--select');
        inputHorario.value = horarioEl.textContent.trim();
    });

    leftHorarioArrow.addEventListener('click', () => {
        if (paginaHorarioAtual > 0) { paginaHorarioAtual--; renderizarHorariosPagina(); }
    });
    rightHorarioArrow.addEventListener('click', () => {
        const totalPaginasHorarios = Math.ceil(horariosDiaAtual.length / horariosPorPagina);
        if (paginaHorarioAtual + 1 < totalPaginasHorarios) { paginaHorarioAtual++; renderizarHorariosPagina(); }
    });

    // --- Períodos ---
    function ativarPeriodo(periodo) {
        btnManha.classList.remove('manha--ativo');
        btnTarde.classList.remove('tarde--ativo');
        btnNoite.classList.remove('noite--ativo');
        if (periodo === 'manha') btnManha.classList.add('manha--ativo');
        if (periodo === 'tarde') btnTarde.classList.add('tarde--ativo');
        if (periodo === 'noite') btnNoite.classList.add('noite--ativo');

        // Rolar para o primeiro horário do período na página atual
        const alvo = wrapperHorarios.querySelector(`.wrapper__horario[data-periodo="${periodo}"]`);
        if (alvo) alvo.scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }

    btnManha.addEventListener('click', () => ativarPeriodo('manha'));
    btnTarde.addEventListener('click', () => ativarPeriodo('tarde'));
    btnNoite.addEventListener('click', () => ativarPeriodo('noite'));

    // --- Inicial ---
    gerarDias(diasPorPagina * 2);
    renderizarDias(paginaDiasAtual);

    // Seleciona primeiro dia automaticamente
    const primeiro = diasContainer.querySelector('.dias-disponiveis__container-dia');
    if (primeiro) primeiro.click();
});
