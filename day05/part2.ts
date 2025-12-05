import getInput from "../utils/getInput";

const [rawfreshIds, rawingredients] = getInput(5).split("\n\n");
const ingredients = rawingredients!.split("\n")!.map((v) => Number(v));
const freshIds = rawfreshIds!
  .split("\n")
  .map((v) => v.split("-").map((t) => Number(t)))
  .map((v) => ({ start: v[0]!, end: v[1]! }));

// Merge range
const ranges = freshIds.sort((a, b) => a.start - b.start);
const merged = [];
let current = ranges[0];

for (let i = 1; i < ranges.length; i++) {
  const next = ranges[i];

  if (next!.start <= current!.end + 1) {
    current!.end = Math.max(current!.end, next!.end);
  } else {
    merged.push(current);
    current = next;
  }
}

merged.push(current);

let count = 0;

for (const range of merged) {
  count += range!.end - range!.start + 1;
}

console.log(count);
