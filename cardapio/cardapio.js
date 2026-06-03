var botaoModo = document.getElementById("mode-badge");
var pin = document.getElementById("pin");
var lupa = document.getElementById("lupa");
var seuAcai = document.getElementById("seuAcai");
var copoPronto = document.getElementById("copoPronto");
var milkShake = document.getElementById("milkShake");
var shakeAcai = document.getElementById("shakeAcai");
var copoSorvete = document.getElementById("copoSorvete");
var adicional = document.getElementById("adicional");

const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "escuro") {

  body.classList.add("dark-mode");

}

botaoModo.addEventListener("click", function()
{

    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) 
    {

        botaoModo.textContent = 'Modo Escuro 🌑';
        pin.src = "../imagens/PIN AMARELO.png";
        lupa.src = "../imagens/LUPA AMARELA.png";
        seuAcai.src = "../imagens/MONTE SEU AÇAÍ - AMARELO.png";
        copoPronto.src = "../imagens/COPO PRONTO AMARELO.png";
        milkShake.src = "../imagens/MILK SHAKE - AMARELO.png";
        shakeAcai.src = "../imagens/SHAKE AÇAÍ - AMARELO.png";
        copoSorvete.src = "../imagens/COPO SORVETE - AMARELO.png";
        adicional.src = "../imagens/ADICIONAL - AMARELO.png";


    }

    else 
    {

        botaoModo.textContent = 'Modo Claro ☀️';
        pin.src = "../imagens/PIN ROXO.png";
        lupa.src = "../imagens/LUPA ROXA.png";
        seuAcai.src = "../imagens/MONTE SEU AÇAÍ - ROXO.png";
        copoPronto.src = "../imagens/COPO PRONTO ROXO.png";
        milkShake.src = "../imagens/MILK SHAKE - ROXO.png";
        shakeAcai.src = "../imagens/SHAKE AÇAÍ - ROXO.png";
        copoSorvete.src = "../imagens/COPO SORVETE - ROXO.png";
        adicional.src = "../imagens/ADICIONAL - ROXO.png";

    }

});

//Carrosel
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
function goToSlide(i) { 
    
  var totalCards = track.querySelectorAll('.card-categoria').length;
  var max = totalCards - getVisible();

  current = Math.max(0, Math.min(i, max));
  applySlide(); 

}
function applySlide() {
  track.style.transform = 'translateX(-' + (current * getCardWidth()) + 'px)';
  dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
}
window.addEventListener('resize', applySlide);