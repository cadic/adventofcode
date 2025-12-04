const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve("input.txt"), { encoding: "utf-8" })
  .split("\n")
  .map((l) => l.split(""));

const h = input.length;
const w = input[0].length;

const neighbors = (x, y) => {
  let c = 0;
  if (input[x][y] === ".") {
    return Infinity;
  }
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (
        (i === 0 && j === 0) ||
        x + i < 0 ||
        x + i > h - 1 ||
        y + j < 0 ||
        y + j > w - 1
      ) {
        continue;
      }
      if (input[x + i][y + j] === "@" || input[x + i][y + j] === "x") {
        c++;
      }
    }
  }
  return c;
};

const mark = () => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const n = neighbors(i, j);
      if (n < 4) {
        input[i][j] = "x";
      }
    }
  }
};

const remove = () => {
  let c = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === "x") {
        input[i][j] = ".";
        c++;
      }
    }
  }
  return c;
};

const print = () => {
  console.log(input.map((l) => l.join("")).join("\n"));
  console.log("===");
};

let totalRemoved = 0;
let step = 0;

while (true) {
  mark();
  const removed = remove();
  totalRemoved += removed;
  if (step === 0) {
    console.log("Part1", removed);
  }
  step++;
  if (removed === 0) {
    break;
  }
}

console.log("Part2", totalRemoved);
