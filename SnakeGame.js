
// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const heading = document.getElementById('heading');

// Canvas dimensions
const WIDTH = 800;
const HEIGHT = 600;
canvas.width = WIDTH;
canvas.height = HEIGHT;

// Center the canvas
canvas.style.position = "absolute";
canvas.style.top = "50%";
canvas.style.left = "50%";
canvas.style.transform = "translate(-50%, -50%)";

//Center the heading 

heading.style.position = "absolute";
heading.style.transform = "translate(160%, -50%)";

// Colors
const snakeColor = "green";
const foodColor = "red";
const backgroundColor = "black";

// Snake setup
const boxSize = 20;
let snake, direction, food, score, gameOver, gameInterval;

// Initialize game variables
function initializeGame() {
  snake = [{ x: WIDTH / 2, y: HEIGHT / 2 }];
  direction = "RIGHT";
  food = {
    x: Math.floor(Math.random() * (WIDTH / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (HEIGHT / boxSize)) * boxSize,
  };
  score = 0;
  gameOver = false;
}

// Event listener for direction changes
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") {
    direction = "UP";
  } else if (event.key === "ArrowDown" && direction !== "UP") {
    direction = "DOWN";
  } else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.key === "ArrowRight" && direction !== "LEFT") {
    direction = "RIGHT";
  }
}

// Main game loop
function gameLoop() {
  if (gameOver) return;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Draw food
  ctx.fillStyle = foodColor;
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  // Move snake
  let head = { ...snake[0] };

  if (direction === "UP") head.y -= boxSize;
  else if (direction === "DOWN") head.y += boxSize;
  else if (direction === "LEFT") head.x -= boxSize;
  else if (direction === "RIGHT") head.x += boxSize;

  // Check for collisions
  if (
    head.x < 0 ||
    head.x >= WIDTH ||
    head.y < 0 ||
    head.y >= HEIGHT ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    gameOver = true;
    clearInterval(gameInterval);
    showGameOverScreen();
    return;
  }

  snake.unshift(head);

  // Check if snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * (WIDTH / boxSize)) * boxSize,
      y: Math.floor(Math.random() * (HEIGHT / boxSize)) * boxSize,
    };
  } else {
    snake.pop();
  }

  // Draw snake
  ctx.fillStyle = snakeColor;
  for (let segment of snake) {
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
  }

  // Display score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Show restart button
function showRestartButton() {
  const overlay = document.getElementById("gameOverOverlay");
  if (overlay) {
    document.body.removeChild(overlay);
  }
  initializeGame();
    gameInterval = setInterval(gameLoop, 100);
}

// Show exit button
function showExitButton() {
    window.close()
  }

  function showGameOverScreen() {
    const overlay = document.createElement("div");
    overlay.id = "gameOverOverlay";
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    overlay.style.color = "white";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.fontSize = "50px";
    overlay.innerHTML = `
      <p>Game Over! Your Score: ${score}</p>
      <button onclick={showRestartButton()} style="margin: 10px 0; padding: 10px 20px; font-size: 18px;">Restart Game</button>
      <button onclick={showExitButton()} style="margin: 10px 0; padding: 10px 34px; font-size: 18px;">Exit Game</button>
    `;
    document.body.appendChild(overlay);
  }
  

// Start the game
initializeGame();
gameInterval = setInterval(gameLoop, 100);
