// ── MOBILE MENU ──
var hamburgerBtn = document.getElementById('hamburgerBtn');
var mobileMenu   = document.getElementById('mobileMenu');
var mobileOverlay = document.getElementById('mobileOverlay');
var mobileCloseBtn = document.getElementById('mobileCloseBtn');
var menuLinks = document.querySelectorAll('.menu-link');
var botaoModo = document.getElementById("mode-badge");
var iconeModo = document.getElementById("mode-icon");
var textoModo = document.getElementById("mode-text");
var body = document.body;
const temaSalvo = localStorage.getItem("tema");

function openMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
  hamburgerBtn.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  hamburgerBtn.classList.remove('open');
  document.body.style.overflow = '';
}

if (temaSalvo === "escuro") {
  body.classList.add("dark-mode");
  if(iconeModo) iconeModo.src = 'imagens/lua.png';
  if(textoModo) textoModo.textContent = 'Modo Escuro';
} else {
  if(iconeModo) iconeModo.src = 'imagens/sol.png';
  if(textoModo) textoModo.textContent = 'Modo Claro';
}

if(botaoModo) {
  botaoModo.addEventListener("click", function() {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      if(iconeModo) iconeModo.src = 'imagens/lua.png';
      if(textoModo) textoModo.textContent = 'Modo Escuro';
      localStorage.setItem("tema", "escuro");
    } else {
      if(iconeModo) iconeModo.src = 'imagens/sol.png';
      if(textoModo) textoModo.textContent = 'Modo Claro';
      localStorage.setItem("tema", "claro");
    }
  });
}

hamburgerBtn.addEventListener('click', function() {
  if (mobileMenu.classList.contains('open')) closeMenu();
  else openMenu();
});

mobileCloseBtn.addEventListener('click', closeMenu);
mobileOverlay.addEventListener('click', closeMenu);

menuLinks.forEach(function(link) {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeMenu();
});

// ── CARROSSEL INFINITO COM AUTO-PLAY ──
var track = document.getElementById('carTrack');
var originalCards = Array.from(track.children);
var originalLength = originalCards.length;

originalCards.forEach(function(card) {
  var clone = card.cloneNode(true);
  track.appendChild(clone);
});
originalCards.forEach(function(card) {
  var clone = card.cloneNode(true);
  track.appendChild(clone);
});

var current = 0;
var dots = document.querySelectorAll('.c-dot');
var autoPlayTimer;

document.getElementById('carPrev').addEventListener('click', function() { 
  resetAutoPlay();
  moveCarousel(-1); 
});
document.getElementById('carNext').addEventListener('click', function() { 
  resetAutoPlay();
  moveCarousel(1); 
});

dots.forEach(function(dot, i) {
  dot.addEventListener('click', function() { 
    resetAutoPlay();
    goToSlide(i); 
  });
});

function getVisible() {
  return window.innerWidth <= 580 ? 1 : window.innerWidth <= 960 ? 2 : 4;
}

function getCardWidth() {
  var card = track.children[0];
  var gap  = parseInt(window.getComputedStyle(track).gap) || 20;
  return card.offsetWidth + gap;
}

function moveCarousel(dir) {
  current += dir;
  track.style.transition = 'transform .4s cubic-bezier(.4,0,.2,1)';
  applySlide();
  
  setTimeout(function() {
    if (current >= originalLength) {
      track.style.transition = 'none';
      current = current % originalLength;
      applySlide();
    } else if (current < 0) {
      track.style.transition = 'none';
      current = originalLength + current;
      applySlide();
    }
  }, 400);
}

function goToSlide(i) { 
  current = i; 
  track.style.transition = 'transform .4s cubic-bezier(.4,0,.2,1)';
  applySlide(); 
}

function applySlide() {
  track.style.transform = 'translateX(-' + (current * getCardWidth()) + 'px)';
  
  var activeDotIndex = ((current % originalLength) + originalLength) % originalLength;
  dots.forEach(function(d, i) { 
    d.classList.toggle('active', i === activeDotIndex); 
  });
}

function startAutoPlay() {
  autoPlayTimer = setInterval(function() {
    moveCarousel(1);
  }, 3000);
}

function resetAutoPlay() {
  clearInterval(autoPlayTimer);
  startAutoPlay();
}

window.addEventListener('resize', function() {
  track.style.transition = 'none';
  applySlide();
});

startAutoPlay();

// ── WHATSAPP ──
document.getElementById('btnSend').addEventListener('click', function() {
  var nome     = document.getElementById('nome').value.trim();
  var produto  = document.getElementById('produto').value.trim();
  var endereco = document.getElementById('endereco').value.trim();
  var obs      = document.getElementById('obs').value.trim();
  if (!nome || !produto || !endereco) {
    alert('Por favor, preencha Nome, Produto e Endereço!');
    return;
  }
  var msg = 'Olá, Flavoretto! 🍦\n\n*Nome:* ' + nome + '\n*Produto:* ' + produto + '\n*Endereço:* ' + endereco;
  if (obs) msg += '\n*Observações:* ' + obs;
  window.open('https://wa.me/554499569652?text=' + encodeURIComponent(msg), '_blank');
});

var revObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(function(el) { revObs.observe(el); });
