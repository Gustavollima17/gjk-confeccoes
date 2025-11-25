// MENU MOBILE AVANÇADO
const menuToggle = document.getElementById('menu-toggle');
const mainMenu = document.getElementById('main-menu');
if (menuToggle && mainMenu) {
  menuToggle.addEventListener('click', function() {
    mainMenu.classList.toggle('menu-active');
    if (mainMenu.classList.contains('menu-active')) {
      mainMenu.querySelector('a').focus();
    }
  });

  mainMenu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => mainMenu.classList.remove('menu-active'))
  );

  document.addEventListener('click', (e) => {
    if (
      mainMenu.classList.contains('menu-active') &&
      !mainMenu.contains(e.target) &&
      e.target !== menuToggle
    ) {
      mainMenu.classList.remove('menu-active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") mainMenu.classList.remove('menu-active');
  });
}

// CARROSSEL DE PRODUTOS AVANÇADO
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const carrosselInner = document.getElementById('carrossel-inner');

function updateCarouselButtons() {
  if (!btnPrev || !btnNext || !carrosselInner) return;
  btnPrev.disabled = carrosselInner.scrollLeft <= 10;
  btnNext.disabled = carrosselInner.scrollLeft + carrosselInner.offsetWidth >= carrosselInner.scrollWidth - 10;
}

if (btnPrev && btnNext && carrosselInner) {
  btnPrev.addEventListener('click', () => {
    carrosselInner.scrollBy({ left: -250, behavior: 'smooth' });
  });
  btnNext.addEventListener('click', () => {
    carrosselInner.scrollBy({ left: 250, behavior: 'smooth' });
  });

  carrosselInner.addEventListener('scroll', updateCarouselButtons);

  carrosselInner.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      btnNext.click();
      e.preventDefault();
    }
    if (e.key === 'ArrowLeft') {
      btnPrev.click();
      e.preventDefault();
    }
  });

  updateCarouselButtons();
}

// FADE-IN NAS SEÇÕES AO ROLAR
function fadeInOnScroll() {
  document.querySelectorAll('.anim-fadein').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.style.animation = 'fadeInUp 1s forwards';
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);

// TOAST DE NOTIFICAÇÃO
function showToast(message, duration = 3000) {
    let toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('visible');
    }, 50);
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => document.body.removeChild(toast), 400);
    }, duration);
}

// MODAL DE PRODUTO
document.querySelectorAll('.produto-card').forEach(card => {
    card.addEventListener('click', function() {
        let modal = document.createElement('div');
        modal.className = 'produto-modal';
        modal.innerHTML = `
            <div class="modal-content">
                ${card.innerHTML}
                <button class="close-modal">&times;</button>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.close-modal').onclick = () => document.body.removeChild(modal);
        modal.onclick = e => { if (e.target === modal) document.body.removeChild(modal); };
    });
});

// LOADER ANIMADO
function showLoader() {
    let loader = document.createElement('div');
    loader.className = 'custom-loader';
    loader.innerHTML = `<span class="loader-dots"></span>`;
    document.body.appendChild(loader);
}
function hideLoader() {
    let loader = document.querySelector('.custom-loader');
    if(loader) document.body.removeChild(loader);
}

// MODO ESCURO/CLARO (opcional, se adicionar switch no HTML)
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    themeToggle.textContent =
      document.body.classList.contains('light-theme') ? 'Modo Escuro' : 'Modo Claro';
  });
}
