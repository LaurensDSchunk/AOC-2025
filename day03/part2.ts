import getInput from "../utils/getInput";

const input = getInput(3)
  .split("\n")
  .map((v) => v.split("").map((a) => Number(a)));

function getMaxInRange(arr: number[], start: number, end: number) {
  let max = Number.NEGATIVE_INFINITY;
  let maxI = 0;

  for (let i = start; i <= end; i++) {
    const val = arr[i]!;
    if (val > max) {
      max = val;
      maxI = i;
    }
  }

  return { max, index: maxI };
}

let total = 0;

for (const bank of input) {
  let output = "";
  let currentI = 0;
  for (let i = 12; i > 0; i--) {
    const {max, index} = getMaxInRange(bank, currentI, bank.length - i)
    currentI = index + 1;
    output += new String(max);
  }

  total += Number(output)
}

console.log(total);
