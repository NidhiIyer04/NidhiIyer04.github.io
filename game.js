const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cols = 53;
const rows = 7;
const cellSize = 14;
const spacing = 2;
const colors = ["#1a1a1a", "#0f0", "#2aff2a", "#66ff66", "#b3ffb3"];

let grid = Array.from({ length: rows }, () => Array(cols).fill(0));
let agent = { x: 0, y: 0 };

function drawGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const value = grid[y][x];
      ctx.fillStyle = colors[value];
      ctx.fillRect(
        x * (cellSize + spacing),
        y * (cellSize + spacing),
        cellSize,
        cellSize
      );
    }
  }
}

function drawAgent() {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(
    agent.x * (cellSize + spacing),
    agent.y * (cellSize + spacing),
    cellSize,
    cellSize
  );
}

function moveAgent() {
  if (grid[agent.y][agent.x] > 0) grid[agent.y][agent.x]--;

  if ((agent.y % 2 === 0 && agent.x < cols - 1) || (agent.y % 2 === 1 && agent.x > 0)) {
    agent.x += agent.y % 2 === 0 ? 1 : -1;
  } else {
    if (agent.y < rows - 1) {
      agent.y++;
    } else {
      agent.y = 0;
      agent.x = 0;
    }
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawAgent();
  moveAgent();
  setTimeout(loop, 100); // speed of animation
}

async function fetchGitHubGrid(username) {
  try {
    const res = await fetch(`https://corsproxy.io/?https://github.com/users/${username}/contributions`);
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    const rects = doc.querySelectorAll("rect[data-level]");

    let tempGrid = Array.from({ length: rows }, () => []);
    for (let rect of rects) {
      const level = parseInt(rect.getAttribute("data-level"));
      const x = parseInt(rect.getAttribute("x"));
      const y = parseInt(rect.getAttribute("y"));
      const col = Math.floor(x / 13); // GitHub cell spacing ~13px
      const row = Math.floor(y / 13);

      if (row < rows && col < cols) {
        tempGrid[row][col] = level;
      }
    }

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        grid[y][x] = tempGrid[y]?.[x] ?? 0;
      }
    }

    loop(); // start animation only after data is ready
  } catch (err) {
    console.error("Failed to load GitHub grid:", err);
  }
}

fetchGitHubGrid("NidhiIyer04");
