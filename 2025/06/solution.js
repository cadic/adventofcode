const fs = require("fs");
const path = require("path");

const transpose = (matrix) => {
  if (!matrix || matrix.length === 0) return [];

  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

let input = transpose(
  fs
    .readFileSync(path.resolve("input.txt"), { encoding: "utf-8" })
    .split("\n")
    .map((l) =>
      l
        .replaceAll(/\s+/g, " ")
        .trim()
        .split(" ")
        .map((e) => (parseInt(e) ? parseInt(e) : e))
    )
);

const calculate = (problem) => {
  const operands = problem.slice(0, -1);
  const [operation] = problem.slice(-1);
  const result = operands.reduce(
    (p, v) => (operation === "*" ? p * v : p + v),
    operation === "*" ? 1 : 0
  );
  return result;
};

const part1 = input.reduce((p, v) => p + calculate(v), 0);
console.log("Part1", part1);

const input2 = fs
  .readFileSync(path.resolve("input.txt"), {
    encoding: "utf-8",
  })
  .split("\n");

const problems = [];
let operLine = input2[input2.length - 1];
let next;

let run = true;

while (run) {
  const problem = { operation: operLine[0] };
  operLine = operLine.slice(1);
  next = operLine.search(/[^\s]/);
  if (next === -1) {
    // last
    next = operLine.length + 1;
    run = false;
  }
  problem.len = next;
  problem.operands = [];
  for (let i = 0; i < input2.length - 1; i++) {
    const operand = input2[i].slice(0, next);
    input2[i] = input2[i].slice(next + 1);
    problem.operands.push(operand);
  }
  problem.operands = transpose(
    problem.operands.map((l) =>
      l.split("").map((e) => (parseInt(e) ? parseInt(e) : 0))
    )
  ).map((n) => parseInt(n.filter((a) => a).join("")));
  operLine = operLine.slice(next);
  problems.push(problem);
}

const part2 = problems
  .map((p) => [...p.operands, p.operation])
  .reduce((p, v) => p + calculate(v), 0);
console.log("Part2", part2);
