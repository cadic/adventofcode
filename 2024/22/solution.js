const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), {
    encoding: "utf-8",
  })
  .split("\n")
  .map((r) => BigInt(r));

const mix = (a, b) => a ^ b;
const prune = (a) => a % 16777216n;

const next = (s) => {
  s1 = prune(mix(s * 64n, s));
  s2 = prune(mix(s1 / 32n, s1));
  s3 = prune(mix(s2 * 2048n, s2));
  return s3;
};

const final = (n) => {
  let r = n;
  for (let i = 0; i < 2000; i++) {
    r = next(r);
  }
  return r;
};

const finals = input.map((i) => final(i));
const step1 = finals.reduce((p, v) => p + v, 0n);
console.log(parseInt(step1));
