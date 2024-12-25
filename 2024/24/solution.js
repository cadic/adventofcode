const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), {
    encoding: "utf-8",
  })
  .split("\n\n");

const wires = new Map();

input[0].split("\n").forEach((r) => {
  const [idx, val] = r.split(": ");
  wires.set(idx, parseInt(val));
});

input[1].split("\n").forEach((row) => {
  const [o, r] = row.split(" -> ");
  const [a, op, b] = o.split(" ");
  wires.set(r, [a, b, op]);
});

const calc = (a, b, op) => {
  if (![0, 1].includes(wires.get(a))) {
    const [a1, b1, op1] = wires.get(a);
    wires.set(a, calc(a1, b1, op1));
  }
  if (![0, 1].includes(wires.get(b))) {
    const [a2, b2, op2] = wires.get(b);
    wires.set(b, calc(a2, b2, op2));
  }

  const av = wires.get(a),
    bv = wires.get(b);
  switch (op) {
    case "AND":
      return av && bv;
    case "OR":
      return av || bv;
    case "XOR":
      return av ^ bv;
  }
};

for (let key of wires.keys()) {
  if (![0, 1].includes(wires.get(key))) {
    const [a, b, op] = wires.get(key);
    wires.set(key, calc(a, b, op));
  }
}

const bits = [],
  bx = [],
  by = [];

for (let key of [...wires.keys()].sort()) {
  if (key.startsWith("z")) {
    bits.unshift(wires.get(key));
  }
  if (key.startsWith("x")) {
    bx.unshift(wires.get(key));
  }
  if (key.startsWith("y")) {
    by.unshift(wires.get(key));
  }
}
const x = bx.reverse().join("");
const y = by.reverse().join("");
console.log("X", x, parseInt(x, 2));
console.log("Y", y, parseInt(y, 2));

const expected = parseInt(x, 2) + parseInt(y, 2);
console.log("E", expected.toString(2).split("").reverse().join(""), expected);

const r = bits.join("");
console.log("R", r.split("").reverse().join(""), parseInt(r, 2));

const expectedBits = expected.toString(2).split("").reverse();
const realBits = bits.reverse();

console.log(expectedBits.join(""));
console.log(realBits.join(""));
const candidates = [];
for (let i = 0; i < expectedBits.length; i++) {
  if (expectedBits[i] != realBits[i]) {
    candidates.push(i);
  }
}
console.log(candidates);

//Reinit ops
input[1].split("\n").forEach((row) => {
  const [o, r] = row.split(" -> ");
  const [a, op, b] = o.split(" ");
  wires.set(r, [a, b, op]);
});

const moreCandidates = [...candidates];
