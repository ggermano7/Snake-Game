let canvas = document.getElementById('snake')
let context = canvas.getContext("2d") //criando o objeto de desenho
let box = 32

let snake = []
snake[0]= {
  x: 8 * box,
  y: 8 * box
}

let direction = "right"

// fazendo com que a comida apareça em lugares aleatórios
let food = {
  x:Math.floor(Math.random() * 15 + 1) * box,
  y:Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
  context.fillStyle = "#96F2A2"
  context.fillRect(0,0, 16 * box, 16 * box)
}

function criarCobra() {
  for( i = 0; i < snake.length; i++) {
    context.fillStyle = "#03A65A"
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

//criando a comida 
function drawFood() {
  context.fillStyle = "#023559" 
  context.fillRect(food.x, food.y, box, box )
}

//quando acontecer um evento, chamará a função 'update'
document.addEventListener('keydown',update)

function update(event) {
  if(event.keyCode == 37 && direction != 'right') direction = 'left'
  if(event.keyCode == 38 && direction != 'down') direction = 'up'
  if(event.keyCode == 39 && direction != 'left') direction = 'right'
  if(event.keyCode == 40 && direction !='up') direction = 'down'
}

function iniciarJogo() { 
  
  // lógica para fazer com que a cobra nunca suma da tela
  if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
  if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box
  if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0
  if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box 

  for(i = 1; i < snake.length ; i++) {
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
      clearInterval(jogo)
      alert('Game Over!')
    }
  }

  criarBG()
  criarCobra()
  drawFood()

  // ponto de partida da cobra
  let snakeX = snake[0].x
  let snakeY = snake[0].y

  //condições para adicionar e retirar um quadrado dependendo da posição a seguir
  if(direction == 'right') snakeX += box
  if(direction == 'left') snakeX -= box
  if(direction == 'up') snakeY -= box
  if(direction == 'down') snakeY += box

  // mudança no tamanho da cobra conforme ela ingere a comida 
  if(snakeX != food.x || snakeY != food.y) {
    snake.pop()
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box,
    food.y = Math.floor(Math.random() * 15 + 1) * box
  }

   
  
  //criando uma nova cabeça para a cobra
  let newHead = {
    x :snakeX,
    y :snakeY
  }

  //método 'unshift' para adicionar um novo quadrado no início
  snake.unshift(newHead)
}

  //chamando a função "criarJogo" a cada 100 milissegundos
  let jogo = setInterval(iniciarJogo,100)



 
