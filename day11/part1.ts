import getInput from "../utils/getInput";

const input = getInput(11)
  .split("\n")
  .map((v) => {
    const [input, rawoutputs] = v.split(": ");
    const outputs = rawoutputs.split(" ");
    return { input, outputs };
  });

const computers = new Map<string, string[]>();
input.forEach((v) => {
  computers.set(v.input, v.outputs);
});

// Run DFS

const visited = new Map<string, number>();

function search(pos: string): number {
  if (pos === "out") {
    return 1;
  }
  if (visited.has(pos)) {
    return visited.get(pos)!;
  }

  const nexts = computers.get(pos)!;
  let hitCount = 0;
  for (const next of nexts) {
    hitCount += search(next)
  }

  visited.set(pos, hitCount);

  return hitCount;
}

console.log(search("you"));