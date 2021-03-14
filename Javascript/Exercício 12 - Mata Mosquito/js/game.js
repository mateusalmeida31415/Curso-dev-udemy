//Recupera o nivel enviado via http pela página index.html
let gameLevel = window.location.search.replace('?', '')
//Velocidade com que os mosquito irão aparecer na tela
let velocidadeGame = 0

//Modifica a velocidade com os mosquito irão aparecer de acordo com o valor recuperado via http
if(gameLevel === 'normal'){
    velocidadeGame = 2000
}else if(gameLevel === 'dificil'){
    velocidadeGame = 1000
}else{
    velocidadeGame = 500
}

//Adiciona as variaveis o valor da janela do browser
let altura = window.innerHeight
let largura = window.innerWidth

//Valor aleatorio gerado para a posição do mosquito, respeitando as dimensões do browser
let xValue = 0
let yValue = 0

//Valor aleatorio gerado para o tamanho do mosquito - 50px <= sizeMosquito <= 200px
let sizeMosquito = 0

//Variavel que auxilia na contagem das vidas que o jogar apresenta 
let lifePoint = 1

//Tempo que o jogador tem para clicar em todos mosquito e vencer o jogo
let tempo = 15

//Faz a contagem que quantos segundos o jogar tem para clicar em todos os mosquitos 
let cronometro = setInterval(() => {

    //Se o tempo for maior do que zero ele será decrementado em -1 
    if(tempo > 0){
        --tempo
        document.querySelector('#cronometro').innerHTML = tempo + 's'

    //Quando o tempo for igual a zero, o jogador vence o jogo e é redirecionado para a página de vitória
    }else{
        window.location.href = 'you_win.html'
    }
    
}, 1000)

//Ajustando palco do jogo
window.addEventListener('resize', () => {
    //Captura a altuta da janela do browser
    altura = window.innerHeight
    //Captura a largura da janela do browser
    largura = window.innerWidth 
})

//Gerando tamanho 
function tamanhoVariavel(){
    sizeMosquito = Math.ceil(Math.random()*150 + 50)
}

//Gerando posição 
function gerandoPosicao(){
    //Gera uma posição no eixo x para a posição do mosquito - Subtraimos o valor da suas dimensoes 
    xValue = Math.ceil(Math.random()*largura) - sizeMosquito - 20 
    //Gera uma posição no eixo y para a posição do mosquito - Subtraimos o valor da suas dimensoes
    yValue = Math.ceil(Math.random()*altura) - sizeMosquito - 20
    //Se o valor for negativo o mosquito será exibido for da área do browser, 
    //o código abaixo remove essa posibilidade
    xValue = (xValue < 0) ? 0 : xValue
    yValue = (yValue < 0) ? 0 : yValue
}

//Virar mosquito 
function viraMosquito(){
    
    return (Math.ceil(Math.random()*2) == 1) ? 1 : -1 
}


//Criar o mosquito
let criandoMosquito = function (){

    //Se o jogador não clicar no mosquito ele irá perder as suas vidas
    if(document.querySelector('#mosquito')){
        //Troca a imagem do coração cheio para vazio 
        document.querySelector('#vida' + lifePoint).src = './img/coracao_vazio.png'
        ++lifePoint
        //Quando o jogador não conseguir clicar no mosquito por 3 vezes, ele será redirecionado para a página de derrota
        if(lifePoint == 4){
            window.location.href = 'game_over.html'
        }
    }


    //Verifica se o mosquito já existe
    if(document.querySelector('#mosquito')){
    //Remove o mosquito do DOM
    document.querySelector('#mosquito').remove()
    }

    //Chama a função que gera as dimensões do mosquito 
    tamanhoVariavel()

    //Crio o mosquito 
    let mosquito = document.createElement('img')
    //Adiciono o caminho para a imagem
    mosquito.src = 'img/mosca.png'
    //Chama a função que gera as posições aleatorias 
    gerandoPosicao()
    //Modificando o largura e altura do mosquito. As dois atribuos recebem o mesmo valor
    mosquito.style.width = sizeMosquito + 'px'
    mosquito.style.height = sizeMosquito + 'px'

    //Modificando a posição do mosquito 
    mosquito.style.left = xValue + 'px'
    mosquito.style.top = yValue + 'px'

    //O Mosquito agora pode mover por toda página - OBS: Todo elemente img recebera essa valor de position
    mosquito.style.position = 'absolute'
    //Adiciona um id ao mosquito
    mosquito.id = 'mosquito'

    //Inverte a posição do mosquito com relação ao eixo x
    viraMosquito()
    mosquito.style.transform = 'scaleX(' + viraMosquito() + ')'

    //Adiciona o elemento ao DOM
    document.body.appendChild(mosquito)

    //Quando clicar no mosquito ele será removido do DOM 
    mosquito.addEventListener('click', () => {
        mosquito.remove()
    })

}

//Transforma a função criandoMosquito em uma função periódica
setInterval(criandoMosquito, velocidadeGame)
