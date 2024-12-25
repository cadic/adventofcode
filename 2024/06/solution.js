const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
  .split("\n")
  .map((r) => r.split(""));

let map = JSON.parse(JSON.stringify(input));

const moves = {
    "^": [0, -1],
    ">": [1, 0],
    V: [0, 1],
    "<": [-1, 0],
  },
  nextMove = {
    "^": ">",
    ">": "V",
    V: "<",
    "<": "^",
  },
  p = "X",
  o = "#",
  startG = "^",
  w = map[0].length,
  h = map.length;

const drawMap = (map) => {
  console.log(map.map((r) => r.join("")).join("\n"));
};

const findGuard = (map) => {
  for (let i = 0; i < map.length; i++) {
    const ix = map[i].indexOf("^");
    if (ix > -1) {
      return { x: ix, y: i };
    }
  }
};

const makeMove = () => {
  const newRecord = `${x}|${y}|${g}`;
  if (history.has(newRecord)) {
    return "loop";
  } else {
    history.set(newRecord);
  }

  seen.set(`${x}|${y}`, [x, y]);

  let move = moves[g];
  let nX = x + move[0],
    nY = y + move[1];

  if (nX < 0 || nY < 0 || nX === w || nY === h) {
    // Move outside
    return "out";
  }

  // Check obsticle
  if (map[nY][nX] === o) {
    // change direction
    g = nextMove[g];
    move = moves[g];
    nX = x + move[0];
    nY = y + move[1];
  }

  x = nX;
  y = nY;

  return "success";
};

const { x: startX, y: startY } = findGuard(map);

let x = startX,
  y = startY;
let g = startG;
let history = new Map();

let exit = "success";
let seen = new Map();

while ("success" === exit) {
  exit = makeMove();
}

const step1 = seen.size;

console.log(step1);

let bigOs = 0;
const bigOsMap = new Map();

new Map(seen).forEach(([i, j]) => {
  // clear history
  history = new Map();

  x = startX;
  y = startY;
  g = startG;

  if (map[j][i] === g) {
    // Guard position
    return;
  }

  map[j][i] = o;
  exit = "success";
  while ("success" === exit) {
    exit = makeMove();
  }
  if ("loop" === exit) {
    bigOsMap.set(`${i}|${j}`);
    bigOs++;
  }
  map[j][i] = ".";
});

console.log(bigOs, bigOsMap.size);
