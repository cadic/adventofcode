const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), {
    encoding: "utf-8",
  })
  .split("\n")
  .map((r) => r.split(""));

const maze = input;

const w = maze[0].length;
const h = maze.length;
let sr, sc, er, ec;

for (let r = 0; r < h; r++) {
  for (let c = 0; c < w; c++) {
    if (maze[r][c] === "S") {
      [sr, sc] = [r, c];
    }
    if (maze[r][c] === "E") {
      [er, ec] = [r, c];
    }
  }
}

let [cr, cc] = [sr, sc];
const p = [];

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const printMaze = () => {
  console.log(maze.map((r) => r.join("")).join("\n"));
  console.log("===");
};

p.push([cr, cc]);

while (!(cr === er && cc === ec)) {
  for (let [dr, dc] of dirs) {
    const [nr, nc] = [cr + dr, cc + dc];
    if ([".", "E"].includes(maze[nr][nc])) {
      maze[cr][cc] = "#";
      cr = nr;
      cc = nc;
      p.push([cr, cc]);
      break;
    }
  }
}

const canJoin = (p1, p2) => {
  const diffr = Math.abs(p1[0] - p2[0]);
  const diffc = Math.abs(p1[1] - p2[1]);
  if (diffr === 0 && diffc === 2) {
    return [p1[0], Math.min(p1[1], p2[1]) + 1];
  } else if (diffr === 2 && diffc === 0) {
    return [Math.min(p1[0], p2[0]) + 1, p1[1]];
  } else {
    return false;
  }
};

const cheats = new Map();
const pl = p.length - 1;

for (let i = 0; i <= pl; i++) {
  for (let j = 0; j <= pl; j++) {
    if (j - i < 4) {
      continue;
    }

    const removedWall = canJoin(p[i], p[j]);
    if (false === removedWall) {
      continue;
    }

    const cheat = j - i - 2;

    if (cheats.has(cheat)) {
      cheats.set(cheat, cheats.get(cheat) + 1);
    } else {
      cheats.set(cheat, 1);
    }
  }
}

let step1 = 0;
for (let [k, v] of cheats) {
  if (k >= 100) {
    step1 += v;
  }
}

console.log(step1);
