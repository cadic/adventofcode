const fs = require("fs");
const path = require("path");

let input = fs.readFileSync(path.resolve(__dirname, "input.txt"), {
  encoding: "utf-8",
});

const robots = input.split("\n").map((r) => {
  const m = r.match(/p=(\d+),(\d+) v=(\-?\d+),(\-?\d+)/);
  return {
    p: [parseInt(m[1]), parseInt(m[2])],
    v: [parseInt(m[3]), parseInt(m[4])],
  };
});

const w = 101,
  h = 103;

const move = (robot, times) => {
  let x = (robot.p[0] + robot.v[0] * times) % w,
    y = (robot.p[1] + robot.v[1] * times) % h;
  if (x < 0) {
    x = w + x;
  }
  if (y < 0) {
    y = h + y;
  }
  robot.p[0] = x;
  robot.p[1] = y;
};

const moveAll = (times) => {
  robots.forEach((robot) => {
    move(robot, times);
  });
};

const draw = () => {
  const field = [];
  for (let i = 0; i < h; i++) {
    if (!field[i]) {
      field[i] = [];
    }
    for (let j = 0; j < w; j++) {
      field[i][j] = ".";
    }
  }

  robots.forEach((r) => {
    const x = r.p[0];
    const y = r.p[1];
    const c = parseInt(field[y][x]) || 0;
    const res = c + 1;
    field[y][x] = res;
  });
  return field;
  //return field.map((row) => row.join("")).join("\n");
};

const quadrants = [
  { sx: 0, sy: 0, ex: Math.floor(w / 2), ey: Math.floor(h / 2) },
  { sx: 0, sy: Math.ceil(h / 2), ex: Math.floor(w / 2), ey: h },
  {
    sx: Math.ceil(w / 2),
    sy: 0,
    ex: w,
    ey: Math.floor(h / 2),
  },
  { sx: Math.ceil(w / 2), sy: Math.ceil(h / 2), ex: w, ey: h },
];

const solution = (robots) => {
  const q = quadrants.map(
    (quadrant) =>
      robots.filter(
        (robot) =>
          quadrant.sy <= robot.p[1] &&
          robot.p[1] < quadrant.ey &&
          quadrant.sx <= robot.p[0] &&
          robot.p[0] < quadrant.ex
      ).length
  );

  return q.reduce((p, v) => p * v, 1);
};

// console.log(solution(robots));

let c = 0;
while (true) {
  c++;
  moveAll(1);
  const d = draw();
  const nlr = d[d.length - 1].filter((e) => e >= 1).length;
  if (nlr >= d.length - 30) {
    console.log(
      draw()
        .map((row) => row.join(""))
        .join("\n")
    );
  } else if (nlr > 11) {
    console.log(c, nlr);
  }
}
