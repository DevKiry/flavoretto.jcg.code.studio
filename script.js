// ── MOBILE MENU ──
var hamburgerBtn = document.getElementById('hamburgerBtn');
var mobileMenu   = document.getElementById('mobileMenu');
var mobileOverlay = document.getElementById('mobileOverlay');
var mobileCloseBtn = document.getElementById('mobileCloseBtn');
var menuLinks = document.querySelectorAll('.menu-link');
var botaoModo = document.getElementById("mode-badge");
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

}

botaoModo.addEventListener("click", function()
{

    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) 
    {

        botaoModo.textContent = 'Modo Escuro 🌑';

    } 
    else 
    {

        botaoModo.textContent = 'Modo Claro ☀️';

    }

});

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

// ── CARROSSEL ──
var current = 0;
var track = document.getElementById('carTrack');
var dots  = document.querySelectorAll('.c-dot');

document.getElementById('carPrev').addEventListener('click', function() { moveCarousel(-1); });
document.getElementById('carNext').addEventListener('click', function() { moveCarousel(1); });

dots.forEach(function(dot, i) {
  dot.addEventListener('click', function() { goToSlide(i); });
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
  var max = track.children.length - getVisible();
  current = Math.max(0, Math.min(current + dir, max));
  applySlide();
}
function goToSlide(i) { current = i; applySlide(); }
function applySlide() {
  track.style.transform = 'translateX(-' + (current * getCardWidth()) + 'px)';
  dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
}
window.addEventListener('resize', applySlide);

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