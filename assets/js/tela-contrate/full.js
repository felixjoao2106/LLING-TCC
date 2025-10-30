document.addEventListener('DOMContentLoaded', () => {

    // --- Dados do fotógrafo ---
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

    // --- Seleção de dias ---
    const diasContainer = document.querySelector('.div-wrapper__dias-disponiveis');
    const leftArrow = document.querySelector('.next-left__icon');
    const rightArrow = document.querySelector('.next-rigth__icon');
    const inputData = document.getElementById('input-data-selecionada');

    const diasPorPagina = 6;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    let paginaAtual = 0;
    let diasGerados = [];

    function formatarIso(d) { return d.toISOString().split('T')[0]; }
    function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
    function nomeMes(d) { return capitalize(new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(d).replace('.', '')); }
    function nomeDiaSemana(d) { return capitalize(new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(d).replace('.', '')); }

    function gerarDias(qtd) {
        let inicioIndex = diasGerados.length;
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

    function renderizarDias(pagina) {
        diasContainer.innerHTML = '';
        const inicio = pagina * diasPorPagina;
        const fim = inicio + diasPorPagina;
        const subset = diasGerados.slice(inicio, fim);

        subset.forEach(obj => {
            const card = document.createElement('div');
            card.classList.add('dias-disponiveis__container-dia');
            card.dataset.iso = obj.iso;

            card.innerHTML = `
                <div class="container-dia__status"></div>
                <p>${obj.mes}</p>
                <p>${obj.dia}</p>
                <p>${obj.diaSemana}</p>
            `;

            const statusEl = card.querySelector('.container-dia__status');
            const mapaDias = {
                seg: 'Segunda', ter: 'Terça', qua: 'Quarta', qui: 'Quinta',
                sex: 'Sexta', sab: 'Sábado', dom: 'Domingo'
            };
            const chave = obj.diaSemana.slice(0, 3).toLowerCase();
            const nomeDia = mapaDias[chave] || obj.diaSemana;
            const infoDia = fotografo.horarios_funcionamento[nomeDia];

            if (infoDia && infoDia.status && infoDia.horario !== "Fechado") {
                statusEl.classList.add('container-dia__status--ativo');
            } else {
                statusEl.classList.add('container-dia__status--desativo');
            }

            diasContainer.appendChild(card);
        });

        diasContainer.appendChild(inputData); // mantém input no DOM

        const mesAnoEl = document.getElementById('mesAno');
        if (subset.length > 0 && mesAnoEl) {
            const dataReferencia = new Date(subset[0].iso);
            const mes = dataReferencia.toLocaleDateString('pt-BR', { month: 'long' });
            const ano = dataReferencia.getFullYear();
            mesAnoEl.textContent = `${mes.charAt(0).toUpperCase() + mes.slice(1)} ${ano}`;
        }
    }

    leftArrow.addEventListener('click', () => {
        if (paginaAtual > 0) { paginaAtual--; renderizarDias(paginaAtual); }
    });

    rightArrow.addEventListener('click', () => {
        const totalPaginas = Math.ceil(diasGerados.length / diasPorPagina);
        if (paginaAtual + 1 >= totalPaginas) gerarDias(diasPorPagina);
        paginaAtual++;
        renderizarDias(paginaAtual);
    });

    gerarDias(diasPorPagina * 2);
    renderizarDias(paginaAtual);

    // --- Seleção de horários ---
    const duracao = fotografo.ensaios[0].duracao;
    const inputHorario = document.getElementById('input-horario-selecionado');
    const wrapperHorarios = document.querySelector('.horarios__wrapper');
    const btnManha = document.querySelector('.container-horario__manha');
    const btnTarde = document.querySelector('.container-horario__tarde');
    const btnNoite = document.querySelector('.container-horario__noite');

    function toMinutes(h) { const [hh, mm] = h.split(':').map(Number); return hh * 60 + mm; }
    function toHour(min) { const hh = String(Math.floor(min / 60)).padStart(2, '0'); const mm = String(min % 60).padStart(2, '0'); return `${hh}:${mm}`; }

    function gerarHorarios(dia, duracao) {
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

    function renderizarHorarios(dia) {
        wrapperHorarios.innerHTML = '';
        const horarios = gerarHorarios(dia, duracao);
        if (horarios.length === 0) { wrapperHorarios.innerHTML = '<p>Sem horários disponíveis</p>'; return; }

        horarios.forEach(h => {
            const div = document.createElement('div');
            div.classList.add('wrapper__horario');
            div.dataset.periodo = h.periodo;
            div.innerHTML = `<p>${h.hora}</p>`;
            wrapperHorarios.appendChild(div);
        });

        const primeiroHorario = wrapperHorarios.querySelector('.wrapper__horario');
        if (primeiroHorario) {
            primeiroHorario.classList.add('wrapper__horario--select');
            inputHorario.value = primeiroHorario.textContent.trim();
        }
    }

    function ativarPeriodo(periodo) {
        btnManha.classList.remove('manha--ativo');
        btnTarde.classList.remove('tarde--ativo');
        btnNoite.classList.remove('noite--ativo');
        if (periodo === 'manha') btnManha.classList.add('manha--ativo');
        if (periodo === 'tarde') btnTarde.classList.add('tarde--ativo');
        if (periodo === 'noite') btnNoite.classList.add('noite--ativo');
    }

    btnManha.addEventListener('click', () => { ativarPeriodo('manha'); scrollParaPeriodo('manha'); });
    btnTarde.addEventListener('click', () => { ativarPeriodo('tarde'); scrollParaPeriodo('tarde'); });
    btnNoite.addEventListener('click', () => { ativarPeriodo('noite'); scrollParaPeriodo('noite'); });

    function scrollParaPeriodo(periodo) {
        const alvo = wrapperHorarios.querySelector(`.wrapper__horario[data-periodo="${periodo}"]`);
        if (alvo) {
            const offset = alvo.offsetLeft - wrapperHorarios.offsetLeft;
            wrapperHorarios.scrollTo({ left: offset, behavior: 'smooth' });
        } else {
            wrapperHorarios.scrollTo({ left: wrapperHorarios.scrollWidth, behavior: 'smooth' });
        }
    }

    // Clique em dia atualiza data e horários
    diasContainer.addEventListener('click', e => {
        const diaEl = e.target.closest('.dias-disponiveis__container-dia');
        if (!diaEl) return;

        diasContainer.querySelectorAll('.dias-disponiveis__container-dia').forEach(d => d.classList.remove('dias-disponiveis__container-dia--select'));
        diaEl.classList.add('dias-disponiveis__container-dia--select');

        const nomeDiaAbrev = diaEl.querySelector('p:last-child')?.textContent.toLowerCase().trim();
        const mapaDias = { seg: 'Segunda', ter: 'Terça', qua: 'Quarta', qui: 'Quinta', sex: 'Sexta', sab: 'Sábado', dom: 'Domingo' };
        const chave = nomeDiaAbrev.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const diaFormatado = mapaDias[chave] || 'Segunda';

        inputData.value = diaEl.dataset.iso;
        renderizarHorarios(diaFormatado);
    });

    // Clique em horário atualiza input
    wrapperHorarios.addEventListener('click', e => {
        const horarioEl = e.target.closest('.wrapper__horario');
        if (!horarioEl) return;
        wrapperHorarios.querySelectorAll('.wrapper__horario').forEach(h => h.classList.remove('wrapper__horario--select'));
        horarioEl.classList.add('wrapper__horario--select');
        inputHorario.value = horarioEl.textContent.trim();
    });

    // Inicial: seleciona primeiro dia e horários
    const primeiro = diasContainer.querySelector('.dias-disponiveis__container-dia');
    if (primeiro) primeiro.click();

    // Seleciona setas e wrapper de horários
    const leftHorarioArrow = document.querySelector('.horarios__next-left');
    const rightHorarioArrow = document.querySelector('.horarios__next-rigth');


    // Quantos pixels o container vai se mover a cada clique
    const scrollStep = 200; // ajuste conforme o tamanho do horário

    leftHorarioArrow.addEventListener('click', () => {
        wrapperHorarios.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    });

    rightHorarioArrow.addEventListener('click', () => {
        wrapperHorarios.scrollBy({ left: scrollStep, behavior: 'smooth' });
    });





});
