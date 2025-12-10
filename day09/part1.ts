import getInput from "../utils/getInput";

type Coordinate = {x: number, y: number}

const input: Coordinate[] = getInput(9)
  .split("\n")
  .map((v) => v.split(","))
  .map((a) => ({ x: Number(a[0]), y: Number(a[1]) }));

function getArea(p1: Coordinate, p2: Coordinate): number {
  const width = Math.abs(p2.x - p1.x) + 1;
  const height = Math.abs(p2.y - p1.y) + 1;
  return width * height;
}


let area = 0;

for (const p1 of input) {
  for (const p2 of input) {
    if (p1 === p2) continue;

    area = Math.max(area, getArea(p1,p2))
  }
}

console.log(area);