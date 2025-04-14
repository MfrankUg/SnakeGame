const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('scoreDisplay');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const restartButton = document.getElementById('restartButton');

const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

canvas.width = 600;
canvas.height = 600;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let fruit = { x: 0, y: 0 };
let score = 0;
let level = 1;
let gameInterval;

function placeFruit() {
    fruit.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    fruit.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw fruit
    ctx.fillStyle = 'red';
    ctx.fillRect(fruit.x, fruit.y, 10, 10);
    
    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
    
    // Move snake
    const head = { x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10 };
    
    // Check for fruit collision
    if (head.x === fruit.x && head.y === fruit.y) {
        score++;
        scoreElement.textContent = score; // Update score display
        if (score % 5 === 0) { // Increase level every 5 points
            level++;
            levelElement.textContent = level; // Update level display
        }
        placeFruit();
    } else {
        snake.pop(); // Remove last segment
    }
    
    snake.unshift(head); // Add new head
    
    // Check for wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head)) {
        endGame();
    }
}

function collision(head) {
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = { x: 1, y: 0 };
            }
            break;
    }
}

function startGame() {
    startScreen.style.display = 'none'; // Hide start screen
    scoreDisplay.style.display = 'block'; // Show score display
    canvas.style.display = 'block'; // Show canvas
    document.querySelector('.controls').style.display = 'flex'; // Show controls
    score = 0; // Reset score
    level = 1; // Reset level
    scoreElement.textContent = score; // Update score display
    levelElement.textContent = level; // Update level display
    snake = [{ x: 10, y: 10 }]; // Reset snake
    direction = { x: 0, y: 0 }; // Reset direction
    placeFruit();
    gameInterval = setInterval(draw, 100); // Start the game loop
}

function endGame() {
    clearInterval(gameInterval); // Stop the game loop
    alert('Game Over! Your score: ' + score);
    restartButton.style.display = 'block'; // Show restart button
}

function restartGame() {
    restartButton.style.display = 'none'; // Hide restart button
    startGame(); // Restart the game
}

// Control button event listeners
upButton.addEventListener('click', () => {
    if (direction.y === 0) {
        direction = { x: 0, y: -1 };
    }
});

downButton.addEventListener('click', () => {
    if (direction.y === 0) {
        direction = { x: 0, y: 1 };
    }
});

leftButton.addEventListener('click', () => {
    if (direction.x === 0) {
        direction = { x: -1, y: 0 };
    }
});

rightButton.addEventListener('click', () => {
    if (direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
});

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
document.addEventListener('keydown', changeDirection);