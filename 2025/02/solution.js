const fs = require("fs");
const path = require("path");

const ranges = fs
  .readFileSync(path.resolve("input.txt"), { encoding: "utf-8" })
  .split(",")
  .map((i) => i.split("-").map((e) => parseInt(e)));

const invalid = [];
const invalid2 = [];

const isValid1 = (v) => {
  const s = v.toString();
  if (0 !== s.length % 2) {
    return true;
  }
  const p1 = s.slice(0, s.length / 2);
  const p2 = s.slice(s.length / 2);
  return p1 !== p2;
};

const allEqual = (a) => {
  const m = new Map();
  a.forEach((e) => {
    m.set(e, true);
  });
  return m.size === 1;
};

const isValid2 = (v) => {
  const s = v.toString();
  const l = s.length;
  for (let i = 1; i <= l / 2; i++) {
    if (l % i !== 0) {
      continue;
    }
    const chunks = s.match(new RegExp(".{1," + i + "}", "g"));
    if (allEqual(chunks)) {
      return false;
    }
  }
  return true;
};

for (let range of ranges) {
  for (let i = range[0]; i <= range[1]; i++) {
    if (!isValid1(i)) {
      invalid.push(i);
    }
    if (!isValid2(i)) {
      invalid2.push(i);
    }
  }
}

const step1 = invalid.reduce((p, v) => p + v, 0);
console.log(step1);
const step2 = invalid2.reduce((p, v) => p + v, 0);
console.log(step2);
