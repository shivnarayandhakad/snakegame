let blockSize = 25;
let total_row = 17, total_col = 17; // total row & column number
let snakeX = blockSize * 5, snakeY = blockSize * 5;
let speedX = 0, speedY = 0, snakeBody = [];
let foodX, foodY, gameOver = false;
let context; // Make context globally accessible
let score = 0;

window.onload = () => {
    const board = document.getElementById('board');
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext('2d'); // Set context
    placeFood();
    setInterval(update, 400);
    
};
const resetGame=()=>{
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY =0;
    snakeBody=[];
    gameOver = false;
    score = 0;
    placeFood();
}

const placeFood = () => {
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;
};

const update = () => {
    if (gameOver) return;

    // Clear the board
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);

    // Place food
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Check if snake eats food
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]); // Add to snake's body
        score++;
        placeFood(); // Respawn food
    }

    // Move snake's body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Move snake's head
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    // Draw snake
    context.fillStyle = "white";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    snakeBody.forEach(([x, y]) => context.fillRect(x, y, blockSize, blockSize));

    context.fillStyle="black";
    context.fillfont="20px Arial";
    context.fillText("score : " +score,10,20) ;

    // Check for game over
    if (snakeX < 0 || snakeX >= total_col * blockSize || 
        snakeY < 0 || snakeY >= total_row * blockSize || 
        snakeBody.some(([x, y]) => x === snakeX && y === snakeY)) {
        gameOver = true;
        alert('Game Over your score is '+ score );
        resetGame();
    }
};

// Key listener for movement
document.addEventListener("keyup", ({ code }) => {
    if (code === "ArrowUp" && speedY !== 1) [speedX, speedY] = [0, -1];
    if (code === "ArrowDown" && speedY !== -1) [speedX, speedY] = [0, 1];
    if (code === "ArrowLeft" && speedX !== 1) [speedX, speedY] = [-1, 0];
    if (code === "ArrowRight" && speedX !== -1) [speedX, speedY] = [1, 0];
});
resetGame();





