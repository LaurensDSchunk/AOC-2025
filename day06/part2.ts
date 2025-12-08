import {getInputUntrimmed} from "../utils/getInput";

const transpose = <T>(arr: T[][]) =>
  arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));

const input = getInputUntrimmed(6).split("\n");
const ops = input
  .splice(input.length - 1, 1)[0]
  .split(" ")
  .filter((v) => v !== "") as ("*" | "+")[];
const cols = transpose(input.map((v) => v.split("").map((a) => Number(a))));

const nums = cols
  .map((v) => {
    let n = "";
    for (const num of v) {
      if (num !== 0) n += num;
    }
    return Number(n);
  })
  .join()
  .split("0,")
  .map((v) =>
    v
      .split(",")
      .filter((a) => a !== "")
      .map((a) => Number(a))
  )


let t = 0;
for (let i = 0; i < ops.length; i++) {
  const op = ops[i]
  let total = op === "*" ? 1: 0
  for (const num of nums[i]) {
    if (op === "*") {
      total *= num;
    } else {
      total += num
    }
  }

  t += total;
}

console.log(t)