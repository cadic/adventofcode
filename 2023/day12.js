const fs = require("fs");
const rows = fs
  .readFileSync("day12e.txt", { encoding: "utf-8" })
  .split("\n")
  .map((l) => {
    const [s, scheme] = l.split(" ");
    return {
      springs: s,
      scheme: scheme.split(",").map((a) => parseInt(a)),
    };
  });

console.log(rows);

const isValid = (line, mask) => {
  if (line.length !== mask.length) {
    return false;
  }
  for (let i = 0; i < line.length; i++) {
    if (!(mask[i] === "?" || mask[i] === line[i])) {
      return false;
    }
  }
  return true;
};

const generate = (scheme, mask) => {
  const size = mask.length;
  const springs = scheme.map((s) => new Array(s + 1).join("#"));
  const gaps = springs.length + 1;
  const maxGapSize = size - springs.join("").length - gaps + 3;
  console.log(scheme, mask, size, springs, gaps, maxGapSize);
};

rows.map((row) => {
  const lines = generate(row.scheme, row.springs);
});
