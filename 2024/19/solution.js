const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(path.resolve(__dirname, "example.txt"), {
    encoding: "utf-8",
  })
  .split("\n\n");

const colors = input[0].split(", ");
const towels = input[1].split("\n");

const check = (towel) => {
  if (towel.length === 0) {
    return true;
  }
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    if (towel.startsWith(color)) {
      const nTowel = towel.substring(color.length);
      if (check(nTowel)) {
        return true;
      }
    }
  }
  return false;
};

const check2 = (mainTowel, towel, path) => {
  if (towel.length === 0) {
    return true;
  }
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    if (towel.startsWith(color)) {
      const nTowel = towel.substring(color.length);
      const nPath = path.length > 0 ? path + "," + color : color;
      miniTowels.set(nPath);
      if (check2(mainTowel, nTowel, nPath)) {
        if (!m.has(mainTowel)) {
          m.set(mainTowel, []);
        }
        m.get(mainTowel).push(nPath);
        console.log("found", mainTowel, nPath);
      }
    }
  }
  return false;
};

const m = new Map();
const miniTowels = new Map();

const step1 = towels.reduce((p, towel) => p + (check(towel) ? 1 : 0), 0);
console.log(step1);

towels.map((towel) => {
  check2(towel, towel, "");
});
console.log(m, miniTowels);
const step2 = Array.from(m).reduce((p, t) => p + t.length, 0);
console.log(step2);
