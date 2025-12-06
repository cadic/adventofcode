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
const [sr, sc] = [h - 2, 1];
const [er, ec] = [1, w - 2];

const dirs = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
};

const deadEnds = new Map();

const paths = [];
let minPath = Infinity;
// minPath = 174564;
let steps = 0;
const start = new Date();
let straights = 0;
let turns = 0;

const printMaze = () => {
  console.log(maze.map((r) => r.join("")).join("\n"));
  console.log("===");
};

const check = (r, c, d, path, score) => {
  steps++;
  if (steps % 100000 === 0) {
    const millis = (Date.now() - start) / 1000;

    console.log(
      "steps:",
      steps,
      "straights:",
      straights,
      "turns:",
      turns,
      "longest:",
      path.size
    );
    console.log("score", score);
    console.log("speed", steps / millis, "s/sec");
  }
  if (
    score > minPath ||
    maze[r][c] === "#" ||
    path.has(`${r},${c}`) ||
    deadEnds.has(`${r},${c}`)
  ) {
    return false;
  }
  const newPath = new Map(path);
  newPath.set(`${r},${c}`, true);

  if (r === er && c === ec) {
    if (score < minPath) {
      minPath = score;
      console.log(minPath, path.size);
      paths.push(score);
      return true;
    }
  } else {
    for (let nd of Object.keys(dirs)) {
      const [dr, dc] = dirs[nd],
        nr = r + dr,
        nc = c + dc,
        price = nd === d ? 1 : 1001,
        newScore = score + price;

      if (check(nr, nc, nd, newPath, newScore)) {
        maze[r][c] = nd;
        //printMaze();
      }
    }
  }
  return true;
};

check(sr, sc, ">", new Map(), 0);
console.log(paths);
