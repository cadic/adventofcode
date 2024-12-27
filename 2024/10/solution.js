const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), {
    encoding: "utf-8",
  })
  .split("\n")
  .map((r) => r.split("").map((e) => parseInt(e)));

const trailHeads = [];

for (let c = 0; c < input.length; c++) {
  for (let r = 0; r < input[0].length; r++) {
    if (input[r][c] === 0) {
      trailHeads.push([r, c, 0, new Map()]);
    }
  }
}

const d = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const check = (r, c, i, prev, num) => {
  if (r < 0 || c < 0 || r >= input.length || c >= input[0].length) {
    return num;
  }
  const current = input[r][c];
  if (isNaN(current) || current !== prev + 1) {
    return num;
  }
  if (current === 9) {
    trailHeads[i][3].set(`${r},${c}`);
    return num + 1;
  }
  let cur = 0;
  for (let [dr, dc] of d) {
    cur += check(r + dr, c + dc, i, current, num);
  }
  return cur;
};

for (let i = 0; i < trailHeads.length; i++) {
  const th = trailHeads[i];
  r = check(th[0], th[1], i, -1, 0);
  trailHeads[i][2] = r;
}

const score1 = trailHeads.reduce((p, th) => p + th[3].size, 0);
console.log(score1);

const score2 = trailHeads.reduce((p, th) => p + th[2], 0);
console.log(score2);
