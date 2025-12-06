const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), {
    encoding: "utf-8",
  })
  .split("\n\n");

const rotate90 = (matrix, factor) => {
  let oldMatrix = [];
  let newMatrix = JSON.parse(JSON.stringify(matrix));

  for (let k = 0; k < factor; k++) {
    oldMatrix = JSON.parse(JSON.stringify(newMatrix));
    newMatrix = [];
    const h = oldMatrix.length;
    const w = oldMatrix[0].length;
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (!newMatrix[j]) {
          newMatrix[j] = [];
        }
        newMatrix[j][i] = oldMatrix[h - i - 1][j];
      }
    }
  }
  return newMatrix;
};

const locks = [];
const keys = [];

input.forEach((e) => {
  const rows = rotate90(
    e.split("\n").map((r) => r.split("")),
    1
  );
  const s = rows[0][0];
  const el = [];
  for (let i = 0; i < 5; i++) {
    const c = rows[i].join("").split("#").length - 2;
    el.push(c);
  }
  if (s === ".") {
    locks.push(el);
  } else {
    keys.push(el);
  }
});

const fit = (lock, key) => {
  for (let i = 0; i < 5; i++) {
    if (lock[i] + key[i] > 5) {
      return false;
    }
  }
  return true;
};

c = 0;
for (let i = 0; i < locks.length; i++) {
  for (let j = 0; j < keys.length; j++) {
    if (fit(locks[i], keys[j])) {
      c++;
    }
  }
}
console.log(c);
