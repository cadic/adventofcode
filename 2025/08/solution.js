const fs = require("fs");
const path = require("path");
const { Cirquit } = require("../../lib/cirquit");

const input = fs
  .readFileSync(path.resolve("input.txt"), { encoding: "utf-8" })
  .split("\n")
  .map((l) => l.split(",").map((e) => parseInt(e)));

const distances = [];

for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    const e1 = input[i];
    const e2 = input[j];
    const dx = Math.abs(e1[0] - e2[0]);
    const dy = Math.abs(e1[1] - e2[1]);
    const dz = Math.abs(e1[2] - e2[2]);
    distances.push({
      points: [e1, e2],
      distance: Math.sqrt(dx * dx + dy * dy + dz * dz),
    });
  }
}

const entries = [...distances];
entries.sort((a, b) => a.distance - b.distance);

const cirquits = [];
input.forEach((e) => {
  const cirquit = new Cirquit();
  cirquit.add(e);
  cirquits.push(cirquit);
});

let connections = 0;

while (true) {
  const entry = entries.shift();
  const points = [...entry.points];

  const idx0 = cirquits.findIndex((e) => e.has(points[0]));
  const idx1 = cirquits.findIndex((e) => e.has(points[1]));

  if (idx0 !== idx1) {
    const oldPoints = cirquits[idx1].points.keys();
    oldPoints.forEach((p) => {
      cirquits[idx0].points.set(p, true);
    });
    cirquits.splice(idx1, 1);
  }
  connections++;

  if (connections === 1000) {
    cirquits.sort((a, b) => b.size() - a.size());
    const part1 = cirquits[0].size() * cirquits[1].size() * cirquits[2].size();
    console.log("Part1", part1);
  }

  if (cirquits.length === 1) {
    console.log("all connected!", connections);
    console.log("Part2", entry.points[0][0] * entry.points[1][0]);
    break;
  }
}
