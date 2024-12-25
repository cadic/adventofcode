const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(path.resolve(__dirname, "example.txt"), {
    encoding: "utf-8",
  })
  .split("\n")
  .map((r) => r.split(",").map((e) => parseInt(e)));

let w = 7,
  h = 7;

const maze = [];
for (let r = 0; r < h; r++) {
  maze.push([]);
  for (let c = 0; c < w; c++) {
    maze[r].push(".");
  }
}
i = 0;
input.forEach(([c, r]) => {
  if (i === 12) {
    return;
  }
  maze[r][c] = "#";
  i++;
});

// Simplify maze
row: for (let r = 1; r < h; r++) {
	col: for (let c = 0; c < w; c++) {
		const current = maze[r][c];
		if ("#" === current) {
			continue row;
		}
		
	}
	
}

const [sr, sc] = [0, 0];
const [er, ec] = [h - 1, w - 1];

const dirs = {
  ">": [0, 1],
  v: [1, 0],
  "^": [-1, 0],
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

printMaze();

const check = (r, c, d, path, score) => {
  steps++;
  if (steps % 100000 === 0) {
    const millis = (Date.now() - start) / 1000;

    console.log("steps:", steps, "min", minPath, "longest:", path.size);
    console.log("score", score);
    console.log("speed", steps / millis, "s/sec");
  }
  if (
    score > minPath ||
    path.has(`${r},${c}`) ||
    r < 0 ||
    c < 0 ||
    r >= h ||
    c >= w ||
    maze[r][c] === "#"
  ) {
    return false;
  }
  const newPath = new Map(path);
  newPath.set(`${r},${c}`, true);

  if (r === er && c === ec) {
    if (score < minPath) {
      minPath = score;
      paths.push(score);
      return true;
    }
  } else {
    for (let nd of Object.keys(dirs)) {
      const [dr, dc] = dirs[nd],
        nr = r + dr,
        nc = c + dc,
        price = 1; //nd === d ? 1 : 1001,
      newScore = score + price;

      if (check(nr, nc, nd, newPath, newScore)) {
        maze[r][c] = nd;
        // printMaze();
      }
    }
  }
  return true;
};

check(sr, sc, ">", new Map(), 0);
console.log(paths);
