import getInput from "../utils/getInput";
type Tile = "S" | "." | "^" | "|";

const input = getInput(7)
  .split("\n")
  .map((v) => v.split("")) as Tile[][];

const timelineMap = new Map<string, number>();

const startCol = input[0].findIndex((p) => p === "S");

function countTimelines(map: Tile[][], row: number, col: number): number {
  if (row === input.length) return 1;
  const key = `${row},${col}`;
  if (timelineMap.has(key)) return timelineMap.get(key)!;
  let lines = 0;

  if (input[row - 1][col] === "S") {
    input[row][col] = "|";
    lines = countTimelines(map, row + 1, col);
    input[row][col] = ".";
  }

  if (input[row][col] === "^" && input[row - 1][col] === "|") {
    if (col > 0 && input[row][col - 1] === ".") {
      input[row][col - 1] = "|";
      lines += countTimelines(map, row + 1, col - 1);
      input[row][col - 1] = ".";
    }
    if (col < input[row].length - 1 && input[row][col + 1] === ".") {
      input[row][col + 1] = "|";
      lines += countTimelines(map, row + 1, col + 1);
      input[row][col + 1] = ".";
    }
  }

  if (input[row - 1][col] === "|" && input[row][col] === ".") {
    input[row][col] = "|";
    lines = countTimelines(map, row + 1, col);
    input[row][col] = ".";
  }

  timelineMap.set(key, lines);
  return lines;
}

console.log(countTimelines(input, 1, startCol));
