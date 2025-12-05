const fs = require("fs");
const path = require("path");

const [input1, input2] = fs
  .readFileSync(path.resolve("input.txt"), { encoding: "utf-8" })
  .split("\n\n");

const freshness = input1
  .split("\n")
  .map((l) => l.split("-").map((e) => parseInt(e)));

freshness.sort((a, b) => a[0] - b[0]);

const ingredients = input2.split("\n").map((e) => parseInt(e));

const merge = (ranges) => {
  const merged = [[...ranges[0]]];

  for (let i = 1; i < ranges.length; i++) {
    const last = merged[merged.length - 1];
    const current = ranges[i];

    if (current[0] <= last[1] + 1) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push([...current]);
    }
  }

  return merged;
};

const mergedFreshness = merge(freshness);

const isFresh1 = (ing) => {
  for (let i = 0; i < mergedFreshness.length; i++) {
    if (mergedFreshness[i][0] <= ing && ing <= mergedFreshness[i][1]) {
      return 1;
    }
  }
  return 0;
};

const step1 = ingredients.reduce((p, v) => p + isFresh1(v), 0);
console.log(step1);

const step2 = mergedFreshness.reduce((p, v) => p + v[1] - v[0] + 1, 0);
console.log(step2);
