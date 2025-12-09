const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve("input.txt"), { encoding: "utf-8" })
  .split("\n")
  .map((l) => l.split(",").map((e) => parseInt(e)));

const rectangles = [];
const edges = [];

for (let i = 0; i < input.length - 1; i++) {
  edges.push([input[i], input[i + 1]]);
}

edges.push([input[input.length - 1], input[0]]);

let largest = 0;
let largest2 = 0;

function intercect(a, b, e) {
  const [rL, rR] = [Math.min(a[0], b[0]), Math.max(a[0], b[0])];
  const [rB, rT] = [Math.min(a[1], b[1]), Math.max(a[1], b[1])];

  const [[x3, y3], [x4, y4]] = e;
  const [sXMin, sXMax] = [Math.min(x3, x4), Math.max(x3, x4)];
  const [sYMin, sYMax] = [Math.min(y3, y4), Math.max(y3, y4)];

  if (y3 === y4) {
    return y3 > rB && y3 < rT && Math.max(sXMin, rL) < Math.min(sXMax, rR);
  }

  if (x3 === x4) {
    return x3 > rL && x3 < rR && Math.max(sYMin, rB) < Math.min(sYMax, rT);
  }

  return false;
}

const edgesInside = (a, b) => {
  if (a[0] === b[0] || a[1] === b[1]) {
    return 0;
  }

  const e = edges.filter((e) => intercect(a, b, e));
  return e.length;
};

for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    const s =
      (Math.abs(input[i][0] - input[j][0]) + 1) *
      (Math.abs(input[i][1] - input[j][1]) + 1);
    const rectangle = [input[i], input[j], s];
    rectangles.push(rectangle);
    if (largest < s) {
      largest = s;
    }

    if (0 === edgesInside(input[i], input[j])) {
      if (largest2 < s) {
        largest2 = s;
      }
    }
  }
}

console.log("Part1", largest);
console.log("Part2", largest2);
