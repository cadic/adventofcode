const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(path.resolve(__dirname, "example.txt"), {
    encoding: "utf-8",
  })
  .split("\n")
  .map((r) => r.split("-"));

const computers = new Map();

input.forEach((i) => {
  if (computers.has(i[0])) {
    computers.get(i[0]).push(i[1]);
  } else {
    computers.set(i[0], [i[0], i[1]]);
  }

  if (computers.has(i[1])) {
    computers.get(i[1]).push(i[0]);
  } else {
    computers.set(i[1], [i[1], i[0]]);
  }
});

const parties = new Map();

computers.forEach((pcs) => {
  for (let i1 = 1; i1 < pcs.length; i1++) {
    for (let i2 = 1; i2 < pcs.length; i2++) {
      if (i1 === i2) {
        continue;
      }
      const pc1 = pcs[i1],
        pc2 = pcs[i2];
      if (computers.get(pc1).includes(pc2)) {
        if (
          pcs[0].startsWith("t") ||
          pc1.startsWith("t") ||
          pc2.startsWith("t")
        ) {
          const conn = [pcs[0], pc1, pc2].sort().join(",");
          parties.set(conn);
        }
      }
    }
  }
});

console.log(parties.size);
