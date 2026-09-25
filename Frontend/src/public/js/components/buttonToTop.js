let buttonTop = document.querySelector('.button-top');
buttonTop.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    buttonTop.classList.add('active');
  } else {
    buttonTop.classList.remove('active');
  }
});
