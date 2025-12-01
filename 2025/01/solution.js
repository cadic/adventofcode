const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve("input.txt"), { encoding: "utf-8" })
  .split("\n");

const weights = {
  R: 1,
  L: -1,
};

let pos = 50;
let step1 = 0;
let step2 = 0;

for (let i = 0; i < input.length; i++) {
  const old = pos;
  const v = input[i];
  const direction = v.slice(0, 1);
  const distance = parseInt(v.slice(1));
  const fullTurns = Math.floor(distance / 100);
  const r = (pos + weights[direction] * distance) % 100;
  pos = Math.abs(r < 0 ? 100 + r : r);
  if (pos === 0) {
    step1++;
  } else if (
    old !== 0 &&
    ((pos > old && direction === "L") || (pos < old && direction === "R"))
  ) {
    step2++;
  }
  step2 += fullTurns;
}

console.log("Step1", step1);
console.log("Step2", step1 + step2);
