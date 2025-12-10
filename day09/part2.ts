import getInput from "../utils/getInput";

type Coordinate = { x: number; y: number };
type Edge = { minX: number; minY: number; maxX: number; maxY: number };

const vertices: Coordinate[] = getInput(9)
  .split("\n")
  .map((v) => v.split(","))
  .map((a) => ({ x: Number(a[0]), y: Number(a[1]) }));

// Create the edge array for the poly
const edges: Edge[] = [];;
let p1 = vertices[vertices.length - 1]
for (let i = 0; i < vertices.length - 1; i++) {
  const p2 = vertices[i];

  edges.push({
    minX: Math.min(p1.x, p2.x),
    minY: Math.min(p1.y, p2.y),
    maxX: Math.max(p1.x, p2.x),
    maxY: Math.max(p1.y, p2.y),
  });

  p1 = p2
}

function isContained(
  minX: number,
  minY: number,
  maxX: number,
  maxY: number
): boolean {
  for (const edge of edges) {
    // Checks if the rect collides with the edge
    if (
      minX < edge.maxX &&
      maxX > edge.minX &&
      minY < edge.maxY &&
      maxY > edge.minY
    ) {
      return false;
    }
  }
  return true;
}

let maxArea = 0;

for (let i = 0; i < vertices.length; i++) {
  for (let j = i + 1; j < vertices.length; j++) {
    const p1 = vertices[i];
    const p2 = vertices[j];

    const area = (Math.abs(p2.x - p1.x) + 1) * (Math.abs(p2.y - p1.y) + 1);
    if (area <= maxArea) continue;

    const minX = Math.min(p1.x, p2.x);
    const maxX = Math.max(p1.x, p2.x);
    const minY = Math.min(p1.y, p2.y);
    const maxY = Math.max(p1.y, p2.y);

    if (isContained(minX, minY, maxX, maxY)) {
      maxArea = area;
    }
  }
}

console.log(maxArea);