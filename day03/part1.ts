import getInput from "../utils/getInput"

const input = getInput(3).split("\n").map(v => v.split("").map(a=>Number(a)));

function getMaxInRange(arr: number[], start: number, end: number) {
  let max = Number.NEGATIVE_INFINITY;
  let maxI = 0;

  for (let i = start; i <= end; i++) {
    const val = arr[i]!
    if (val > max) {
      max = val;
      maxI = i;
    }
  }

  return {max, index: maxI};
}

let total = 0;

for (const bank of input) {
  const {max: num1, index} = getMaxInRange(bank, 0, bank.length - 2);
  const {max: num2} = getMaxInRange(bank, index + 1, bank.length - 1);

  const num = String(num1) + String(num2)
  total += Number(num);
}


console.log(total);