//Game Constants and Variables

let SnakeVelocity = { x: 0, y: 0 };
const foodSound = new Audio("Music/food.mp3");
const gameOverSound = new Audio("Music/gameover.mp3");
const moveSound = new Audio("Music/move.mp3");
const musicSound = new Audio("Music/music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];

food = { x: 6, y: 7 };

//Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastPaintTime)/1000 < 1/speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
}

function gameEngine() {
  //Part:1 Updating the snake array and food
  if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    SnakeVelocity =  {x: 0, y: 0}; 
    alert("Game Over. Press any key to play again!");
    snakeArr = [{x: 13, y: 15}];
    musicSound.play();
    score = 0; 
}



  //if you have eaten the food, regenerate the food.
  if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
    foodSound.play();
    snakeArr.unshift({x: snakeArr[0].x + SnakeVelocity.x, y: snakeArr[0].y + SnakeVelocity.y});
    let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}

  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += SnakeVelocity.x;
  snakeArr[0].y += SnakeVelocity.y;

  //part2: Display the snake and food
  //Display the snake
  board.InnerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //Dispaly the food
  FoodElement = document.createElement("div");
  FoodElement.style.gridRowStart = food.y;
  FoodElement.style.gridColumnStart = food.x;
  FoodElement.classList.add("food");
  board.appendChild(FoodElement);
}

//Main logic starts from here.
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
  SnakeVelocity = { x: 0, y: 1 }; //Start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      SnakeVelocity.x = 0;
      SnakeVelocity.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      SnakeVelocity.x = 0;
      SnakeVelocity.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      SnakeVelocity.x = -1;
      SnakeVelocity.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      SnakeVelocity.x = 1;
      SnakeVelocity.y = 0;
      break;
      default:
        break;
  }
});

