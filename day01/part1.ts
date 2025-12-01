import getInput from "../utils/getInput"

const input = getInput(1).split("\n").map(v => ({direction: v[0] === "L" ? "left" : "right", count: Number.parseInt(/\d+/.exec(v)![0])}));

let count = 0;
let position = 50;


for (const turn of input) {
  const dist = turn.direction === "right" ? turn.count: -turn.count;

  position = (position + dist + 100) % 100 

  if (position === 0) count++;
}



console.log(count);