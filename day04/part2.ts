import getInput from "../utils/getInput";

const map = getInput(4)
  .split("\n")
  .map((v) => v.split(""));

function countRollsAround(x: number, y: number) {
  let localCount = 0;
  for (let offsetY = -1; offsetY <= 1; offsetY++) {
    for (let offsetX = -1; offsetX <= 1; offsetX++) {
      if (offsetX === 0 && offsetY === 0) continue;

      const trueX = x + offsetX;
      const trueY = y + offsetY;

      if (
        trueX < 0 ||
        trueX >= map[0]!.length ||
        trueY < 0 ||
        trueY >= map.length
      ) {
        continue;
      }
      if (map[trueY]![trueX] === "@") localCount++;
    }
  }
  return localCount;
}

let changed = true;
let count = 0;

while (changed) {
  changed = false;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0]!.length; x++) {
      if (map[y]![x] !== "@") continue;

      const localCount = countRollsAround(x,y);
      if (localCount < 4) {
        changed = true;
        map[y]![x] = "."
        count++;
      }
    }
  }
}

console.log(count);
