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



function newSearch(start: string, end: string): number {
  const visited = new Map<string, number>();

  function search(start: string, end: string): number {
    if (start === end) {
      return 1;
    }
    if (visited.has(start)) {
      return visited.get(start)!;
    }

    const nexts = computers.get(start)!;
    if (!nexts) return 0;
    let hitCount = 0;
    for (const next of nexts) {
      hitCount += search(next, end);
    }

    visited.set(start, hitCount);

    return hitCount;
  }

  return search(start, end)
}

const svr2dac = newSearch("svr", "dac");
const svr2fft = newSearch("svr", "fft")

const dac2fft = newSearch("dac", "fft");
const fft2dac = newSearch("fft", "dac");

const dac2out = newSearch("dac", "out");
const fft2out = newSearch("fft", "out")

const a = (svr2dac * dac2fft * fft2out)
const b = (svr2fft * fft2dac * dac2out)

console.log(a + b)