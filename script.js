const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarPausarBt = document.querySelector('#start-pause span')
const iniciarPausarIcon = document.querySelector('.app__card-primary-butto-icon')
const relogio = document.querySelector('#timer')

const volumeInput = document.getElementById('volume-input');
const volumeLabel = document.getElementById('volume-label');
const playButton = document.getElementById('alternar-musica');

const musica = new Audio('sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('sons/play.wav')
const audioPausa = new Audio('sons/pause.mp3')
const audioFinalizado = new Audio('sons/beep.mp3')

let tempoDecorridoSegundos = 1500
let intervaloId = null

musica.loop = true

let currentVolume = musica.volume;
volumeInput.value = currentVolume * 10;
volumeLabel.innerText = 'Volume: ' + Math.round(currentVolume * 10);

function updateVolume(value) {
    currentVolume = value / 10;
    musica.volume = currentVolume;
    volumeLabel.innerText = 'Volume: ' + Math.round(currentVolume * 10);
}

volumeInput.addEventListener('input', function () {
    updateVolume(volumeInput.value);
});

playButton.addEventListener('click', function () {
    if (musica.paused) {
        musica.play();
        playButton.innerText = 'Pause';
    } else {
        musica.pause();
        playButton.innerText = 'Play';
    }
});

focoBt.addEventListener('click', () => {
    tempoDecorridoSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostraTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`

            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoSegundos <= 0) {
        audioFinalizado.play()
        alert("Tempo finalizado")
        zerar()
        return
    }
    tempoDecorridoSegundos -= 1
    mostraTempo()
}

startPauseBt.addEventListener("click", iniciarPausar)

function iniciarPausar(){
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarPausarBt.textContent = "Pausar"
    iniciarPausarIcon.setAttribute('src', `imagens/pause.png`)
}

function zerar(){
    clearInterval(intervaloId)
    iniciarPausarBt.textContent = "Começar"
    iniciarPausarIcon.setAttribute('src', `imagens/play_arrow.png`)
    intervaloId = null
}

function mostraTempo(){
    const tempo = new Date(tempoDecorridoSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    relogio.innerHTML = `${tempoFormatado}`
}

mostraTempo()