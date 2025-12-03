const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve("input.txt"), { encoding: "utf-8" })
  .split("\n")
  .map((l) => l.split("").map((e) => parseInt(e)));

const getJoltage = (line, n) => {
  const batts = [];
  let pl = 0;
  let pr = line.length - n + 1;

  while (batts.length < n) {
    const list = [...line.slice(pl, pr)];
    const max = Math.max(...list);
    pl += list.indexOf(max) + 1;
    pr++;
    batts.push(max);
  }

  return parseInt(batts.join(""));
};

const step1 = input.map((l) => getJoltage(l, 2)).reduce((p, v) => p + v, 0);
console.log(step1);

const step2 = input.map((l) => getJoltage(l, 12)).reduce((p, v) => p + v, 0);
console.log(step2);
