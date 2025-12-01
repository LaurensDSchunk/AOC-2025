import getInput from "../utils/getInput"

const input = getInput(1).split("\n").map(v => ({direction: v[0] === "L" ? "left" : "right", count: Number.parseInt(/\d+/.exec(v)![0])}));

let count = 0;
let position = 50;


for (const turn of input) {
  const mult = turn.direction === "right"? 1 : -1
  const dist= turn.count;

  for (let i = 0; i < dist; i++) {
    const offset = mult;

    position += offset;
    if (position < 0) position = 99;
    if (position === 100) position = 0;
    if (position === 0) count++;
  }
}

console.log(count);