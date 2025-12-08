import { PriorityQueue } from "@datastructures-js/priority-queue";
import getInput from "../utils/getInput";

type Coordinate = { x: number; y: number; z: number };

function getDist(c1: Coordinate, c2: Coordinate) {
  return Math.sqrt(
    (c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2 + (c1.z - c2.z) ** 2
  );
}

const distances = new Set<string>();
const queue = new PriorityQueue<{ i1: number; i2: number; dist: number }>(
  (a, b) => a.dist - b.dist
);

const input: Coordinate[] = getInput(8)
  .split("\n")
  .map((v) => v.split(",").map((a) => Number(a)))
  .map((a) => ({ x: a[0], y: a[1], z: a[2] }));

// Calculate distances
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input.length; j++) {
    const min = Math.min(i, j);
    const max = Math.max(i, j);
    const key = `${min},${max}`;
    if (i === j || distances.has(key)) continue;

    const dist = getDist(input[i], input[j]);
    distances.add(key);
    queue.push({ i1: min, i2: max, dist });
  }
}

const circuts: Set<number>[] = [];

for (let i = 0; i < 1000; i++) {
  const connection = queue.pop()!;

  let circut1 = undefined,
    circut2 = undefined;
  let c1 = 0,
    c2 = 0;
  for (let c = 0; c < circuts.length; c++) {
    const circut = circuts[c];
    if (circut.has(connection.i1)) {
      circut1 = circut;
      c1 = c;
    }
    if (circut.has(connection.i2)) {
      circut2 = circut;
      c2 = c;
    }
  }

  if (!circut1 && !circut2) {
    // None of them are part of a circut
    const circut = new Set<number>([connection.i1, connection.i2]);
    circuts.push(circut);
    continue;
  }

  if (circut1 && !circut2) {
    circut1.add(connection.i2);
  }

  if (!circut1 && circut2) {
    circut2.add(connection.i1);
  }

  if (circut1 && circut2 && c1 !== c2) {
    circuts[c1] = circut1.union(circut2);
    circuts.splice(c2, 1)
  }
  
}


let total = 1;
let biggest = new PriorityQueue<number>((a,b) => b - a)
for (const circut of circuts) {
  biggest.push(circut.size);
}

for (let i = 0; i < 3; i++) {
  const n = biggest.pop()
  total *= n!;
}

console.log(total);
