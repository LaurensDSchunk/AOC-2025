import getInput from "../utils/getInput"

const input = getInput(6).split("\n").map(v => v.split(" ").filter(a => a !== ""));
const nums = input.splice(0, input.length - 1).map(v => v.map(a => Number(a)))
const ops = input.flat()

let running = 0;

for (let col = 0; col < ops.length; col++) {
  const op = ops[col] as "*" | "+";
  let total = op === "*" ? 1: 0
  for (let i = 0; i < nums.length; i++) {
    if (op === "*") total *= nums[i][col]; else total += nums[i][col];
  }

  running += total;
}


console.log(running);