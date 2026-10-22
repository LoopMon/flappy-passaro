/* CONFIGURAÇÕES DO CICLO */
const FPS_ALVO = 60;
const INTERVALO = 1000 / FPS_ALVO;

let ultimoTempo = 0;
let acumulador = 0;

/* FUNÇÕES PRINCIPAIS */
function loop(timestamp) {
  if (ultimoTempo === 0) {
    ultimoTempo = timestamp;
  }

  // Tempo transcorrido desde o último quadro renderizado
  const delta = Math.min(timestamp - ultimoTempo, 100);
  ultimoTempo = timestamp;

  acumulador += delta;

  // Atualiza a lógica em intervalos fixos
  while (acumulador >= INTERVALO) {
    update();
    acumulador -= INTERVALO;
  }

  draw();

  window.requestAnimationFrame(loop);
}

function update() {
  moveObjects();

  bird.colision(cano1);
  bird.colision(cano2);
}

function draw() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  cloud.draw(ctx);
  cano1.draw();
  cano2.draw();
  bird.draw(ctx);
}

/* FUNÇÕES SECUNDÁRIAS */
function reset() {
  bird.reset();
  cano1.reset();
  cano2.reset();

  media.pause();
  media.currentTime = 0;

  perdeu.pause();
  perdeu.currentTime = 0;
}

function moveObjects() {
  cloud.move();
  cano1.move();
  cano2.move();
  bird.move();
}