const fs = require("fs");
const path = require("path");

let input = fs.readFileSync(path.resolve(__dirname, "input.txt"), {
  encoding: "utf-8",
});
/**
 * 0:  BST 4; B = A % 8 (0-7)
 * 2:  BXL 1; B = B ^ 1 (0-7)
 * 4:  CDV 5; C = A / 2 ** B
 * 6:  BXL 5; B = B ^ 5
 * 8:  BXC 3; B = B ^ C
 * 10: ADV 3; A = A / 2 ** 3
 * 12: OUT 5; OUT> B % 8
 * 14: JNZ 0; IF A != 0 GOTO 0
 */

// input = `Register A: 2024
// Register B: 0
// Register C: 0

// Program: 0,3,5,4,3,0`;

const m = input.match(
  /Register A: (\d+)\nRegister B: (\d+)\nRegister C: (\d+)\n\nProgram: ([\d,]+)/
);

let RA = parseInt(m[1]),
  RB = parseInt(m[2]),
  RC = parseInt(m[3]),
  IP = 0,
  OUT = [];

const program = m[4].split(",").map((e) => parseInt(e));
const code = program.join(",");

const combo = (a) => {
  if (a === 4) {
    return RA;
  }
  if (a === 5) {
    return RB;
  }
  if (a === 6) {
    return RC;
  }
  return a;
};

const adv = (a) => {
  RA = Math.floor(RA / 2 ** combo(a));
  IP += 2;
};

const bxl = (a) => {
  RB = RB ^ a;
  IP += 2;
};

const bst = (a) => {
  RB = combo(a) % 8;
  IP += 2;
};

const jnz = (a) => {
  if (RA === 0) {
    IP += 2;
  } else {
    IP = a;
  }
};

const bxc = (a) => {
  RB = RB ^ RC;
  IP += 2;
};

const out = (a) => {
  OUT.push(combo(a) % 8);
  IP += 2;
};

const bdv = (a) => {
  RB = Math.floor(RA / 2 ** combo(a));
  IP += 2;
};

const cdv = (a) => {
  RC = Math.floor(RA / 2 ** combo(a));
  IP += 2;
};

const imap = new Map([
  [0, adv],
  [1, bxl],
  [2, bst],
  [3, jnz],
  [4, bxc],
  [5, out],
  [6, bdv],
  [7, cdv],
]);

while (IP >= 0 && IP < program.length - 1) {
  const icode = program[IP];
  const oper = program[IP + 1];
  const inst = imap.get(icode);
  inst(oper);
}
console.log(OUT.join(","));

let c = 0;
const s = Date.now();
const inc = 0; //35_184_372_000_000;
const pl = program.length;
const pl1 = pl - 1;

while (true) {
  if (c % 1000000 === 0) {
    const n = Date.now();
    console.log(c + inc, (c / (n - s)) * 1000, "runs/sec");
  }
  RA = c + inc;
  RB = 0;
  RC = 0;
  IP = 0;
  OUT = [];

  run: while (IP >= 0 && IP < pl1) {
    const icode = program[IP];
    const oper = program[IP + 1];
    const inst = imap.get(icode);
    inst(oper);
    // if (icode === 5) {
    //   for (let i = 0; i < pl; i++) {
    //     if (OUT[i]) {
    //       if (program[i] !== OUT[i]) {
    //         break run;
    //       }
    //     }
    //   }
    // }
  }

  const o = OUT.join(",");
  console.log(c, o, code);

  if (OUT.length === pl) {
    const o = OUT.join(",");
    if (code === o) {
      console.log(c + inc, o, code);
      break;
    }
  }
  c++;
}
