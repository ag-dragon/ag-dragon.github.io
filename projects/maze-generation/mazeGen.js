const canvas = document.getElementById("mazeCanvas");
const cellSizeInput = document.getElementById("sizeInput");
const cellsPerDelayInput = document.getElementById("cellsPerDelayInput");
const delayInput = document.getElementById("delayInput");
var cellSize = 4;
var cellSpacing = 4;
var cellWidth = (canvas.width - cellSpacing) / (cellSize + cellSpacing);
var cellHeight = (canvas.height - cellSpacing) / (cellSize + cellSpacing);
var restart = true;
var delay = parseInt(delayInput.value);
var cellsPerDelay = parseInt(cellsPerDelayInput.value);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw(maze) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";

    for (let y = 0; y < maze.length; y++) {
        var row = maze[y];
        for (x = 0; x < row.length; x++) {
            if (row[x][1] > 0) {
                ctx.fillStyle = `hsl(
                    ${Math.floor(row[x][1]/5 % 300)}
                    100%
                    70%)`;
                ctx.fillRect((x * (cellSize + cellSpacing)) + cellSpacing, (y * (cellSize + cellSpacing)) + cellSpacing, cellSize, cellSize);
            }
            if (row[x][0] & 1 == 1) {
                ctx.fillRect((x * (cellSize + cellSpacing)) + cellSpacing*2, (y * (cellSize + cellSpacing)) + cellSpacing, cellSize, cellSize);
            }
            if ((row[x][0] >> 1) & 1 == 1) {
                ctx.fillRect((x * (cellSize + cellSpacing)) + cellSpacing, (y * (cellSize + cellSpacing)) + cellSpacing*2, cellSize, cellSize);
            }
        }
    }
}

// the maze is a 2d array of cells, each cell is a an array consisting of:
// - walls: first bit = east wall, second bit = south wall
// - depth: an integer reperesenting the depth of the cell
//   0 means the cell is not active and should not be drawn
function initMaze() {
    var maze = [];
    for (let y = 0; y < cellHeight; y++) {
        var row = [];
        for (let x = 0; x < cellWidth; x++) {
            row.push([0, 0]);
        }
        maze.push(row);
    }
    return maze;
}

async function genDepth() {
    var maze = initMaze();
    var cellStack = [];
    maze[0][0][1] = 1;
    cellStack.push([0, 0])
    draw(maze);
    var sleepCounter = 0;
    while (cellStack.length > 0 && !restart) {
        var cell = cellStack.pop();
        var cX = cell[0];
        var cY = cell[1];
        var depth = maze[cY][cX][1];
        var borders = [];
        if (cX > 0 && maze[cY][cX-1][1] == 0) {
            // left
            borders.push(0);
        } if (cX < cellWidth-1 && maze[cY][cX+1][1] == 0) {
            // right
            borders.push(1);
        } if (cY > 0 && maze[cY-1][cX][1] == 0) {
            // up
            borders.push(2);
        }if (cY < cellHeight-1 && maze[cY+1][cX][1] == 0) {
            // down
            borders.push(3);
        }
        if (borders.length > 0) {
            var dir = Math.floor(Math.random() * borders.length);
            cellStack.push(cell);
            if (borders[dir] == 0) {
                maze[cY][cX-1][1] = depth+1;
                maze[cY][cX-1][0] |= 1;
                cellStack.push([cX-1, cY]);
            } else if (borders[dir] == 1) {
                maze[cY][cX+1][1] = depth+1;
                maze[cY][cX][0] |= 1;
                cellStack.push([cX+1, cY]);
            } else if (borders[dir] == 2) {
                maze[cY-1][cX][1] = depth+1;
                maze[cY-1][cX][0] |= 2;
                cellStack.push([cX, cY-1]);
            } else if (borders[dir] == 3) {
                maze[cY+1][cX][1] = depth+1;
                maze[cY][cX][0] |= 2;
                cellStack.push([cX, cY+1]);
            }
        }
        sleepCounter++;
        if (sleepCounter >= cellsPerDelay) {
            await sleep(delay);
            sleepCounter = 0;
        }
        draw(maze);
    }
}

async function generateMaze() {
    while (true) {
        if (restart) {
            cellSize = parseInt(cellSizeInput.value);
            cellSpacing = cellSize;
            cellWidth = (canvas.width - cellSpacing) / (cellSize + cellSpacing);
            cellHeight = (canvas.height - cellSpacing) / (cellSize + cellSpacing);
            restart = false;
            cellsPerDelay = parseInt(cellsPerDelayInput.value);
            delay = parseInt(delayInput.value);
            await genDepth();
        }
        await sleep(1);
    }
}

const button = document.getElementById("generateButton");
window.addEventListener("load", generateMaze);
button.onclick = function(){restart = true;};
