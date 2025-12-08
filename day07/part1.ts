import getInput from "../utils/getInput"

const input = getInput(7).split("\n").map(v => v.split("")) as ("S" | "." | "^" | "|")[][];

let splitCount = 0;
for (let row = 1; row < input.length; row++) {
  for (let col = 0; col < input[row].length; col++) {
    if (input[row - 1][col] === "S") input[row][col] = "|"

    if (input[row][col] === '^' && input[row - 1][col] === "|") {
      splitCount++;
      if (col > 0 && input[row][col - 1] === ".") input[row][col - 1] = "|";
      if (col < input[row].length - 1 && input[row][col + 1] === '.') input[row][col + 1] = "|"
    }

    if (input[row - 1][col] === "|" && input[row][col] === ".") input[row][col] = "|"
  }
}

console.log(splitCount);