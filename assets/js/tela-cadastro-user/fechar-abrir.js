// --- Pegando os elementos ---
const cadastroModal = document.getElementById('cadastroModal');
const loginModal = document.querySelector('.modal-overlay__section-login').parentElement; // o pai é o overlay
const closeCadastro = document.getElementById('closeModal');
const closeLogin = document.querySelector('.modal-overlay__section-login__modal-close');

// Botões de abrir modal de cadastro e login na página
const cadastroLinks = document.querySelectorAll('.section__div-topo_a, .section__div_user, #sec-qua__cont__box-cad-log-user__info__button');

// Botões dentro dos modais para alternar
const irParaLogin = document.querySelector('.modal-overlay__section-cadastro__div-button p'); // "Já tenho uma conta"
const irParaCadastro = document.querySelector('.modal-overlay__section-login__div-button p'); // "Não tenho conta"

// --- Abrir modal de cadastro ---
cadastroLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    cadastroModal.style.display = 'flex';
    loginModal.style.display = 'none'; // garante que o login esteja fechado
  });
});

// --- Fechar modal de cadastro ---
closeCadastro.addEventListener('click', () => {
  cadastroModal.style.display = 'none';
});

// --- Fechar modal de login ---
closeLogin.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

// --- Alternar de cadastro para login ---
irParaLogin.addEventListener('click', () => {
  cadastroModal.style.display = 'none';
  loginModal.style.display = 'flex';
});

// --- Alternar de login para cadastro ---
irParaCadastro.addEventListener('click', () => {
  loginModal.style.display = 'none';
  cadastroModal.style.display = 'flex';
});

// --- Fechar modais com ESC ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cadastroModal.style.display = 'none';
    loginModal.style.display = 'none';
  }
});
