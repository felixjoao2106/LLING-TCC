// pega os elementos
const loginLinks = document.querySelectorAll('.section__div-topo_a, .section__div_user, #sec-qua__cont__box-cad-log-user__info__button');
const modal = document.getElementById('loginModal');
const closeBtn = document.getElementById('closeModal');

// abrir modal
loginLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = 'flex';
  });
});

// fechar modal só pelo botão X
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open'); // libera scroll
});

// fechar modal com ESC (opcional)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
});
