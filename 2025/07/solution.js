const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve("input.txt"), { encoding: "utf-8" })
  .split("\n")
  .map((l) => l.split(""));

const beams = new Map();
const paths = new Map();
let splits = 0;

const s = input[0].findIndex((e) => e === "S");
beams.set(s, true);
paths.set(`${s}`, 0);

for (let i = 1; i < input.length; i++) {
  const line = input[i];
  const obstacles = line.reduce((p, v, idx) => {
    if (v === "^") {
      p.push(idx);
    }
    return p;
  }, []);
  obstacles.forEach((idx) => {
    if (beams.has(idx)) {
      splits++;
      beams.delete(idx);
      beams.set(idx - 1, true);
      beams.set(idx + 1, true);
    }
  });
}

console.log("Part1", splits);

const rows = input.length;
const known = new Map();

const countPaths = (row, col) => {
  if (row >= rows) {
    return 1;
  }

  const key = `${row},${col}`;

  if (known.has(key)) {
    return known.get(key);
  }

  const cell = input[row][col];
  let pathCount = 0;

  if (cell === "." || cell === "S") {
    pathCount = countPaths(row + 1, col);
  } else if (cell === "^") {
    pathCount = countPaths(row + 1, col - 1) + countPaths(row + 1, col + 1);
  }

  known.set(key, pathCount);
  return pathCount;
};

const part2 = countPaths(0, s);

console.log("Part2", part2);
