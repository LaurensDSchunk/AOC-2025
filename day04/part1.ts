import getInput from "../utils/getInput";

const input = getInput(4)
  .split("\n")
  .map((v) => v.split(""));

let count = 0;

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[0]!.length; x++) {
    if (input[y]![x] !== "@") continue;
    
    let localCount = 0;
    for (let offsetY = -1; offsetY <= 1; offsetY++) {
      for (let offsetX = -1; offsetX <= 1; offsetX++) {
        if (offsetX === 0 && offsetY === 0) continue;

        const trueX = x + offsetX;
        const trueY = y + offsetY;

        if (
          trueX < 0 ||
          trueX >= input[0]!.length ||
          trueY < 0 ||
          trueY >= input.length
        ) {
          continue;
        }
        if (input[trueY]![trueX] === "@") localCount++;
      }
    }
    if (localCount < 4) count++
  }
}

console.log(count);
