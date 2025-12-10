import getInput from "../utils/getInput"

type Machine = {requiredLights: boolean[], buttons: number[][], joltage: number[]};

const machines: Machine[] = getInput(10).split("\n").map(v=> {
  const [rawLights, remaining] = v.split("] (")
  const [rawButtons, rawJoltage] = remaining.split(") {")
  const lights = rawLights.substring(1).split("").map(a => a === "#")
  const buttons = rawButtons.split(") (").map(v => v.split(",").map(v => Number(v)))
  const joltage = rawJoltage.substring(0, rawJoltage.length - 1).split(",").map(v => Number(v))

  return {requiredLights: lights, buttons, joltage };
});

function getMinPresses(requiredState: boolean[], buttons: number[][]) {
  // Does bfs
  const emptyState = Array.from({length: requiredState.length}, () => false)
  const queue: {state: boolean[], count: number}[] = [{state: emptyState, count: 0}];
  const visited = new Set<string>()
  const targetKey = requiredState.join()

  while (queue.length !== 0) {
    const {state, count} = queue.shift()!;
    const key = state.join();
    if (key === targetKey) return count;

    for (const button of buttons) {
      // Apply the button
      const newState = [...state]
      button.forEach(v => newState[v] = !newState[v]); 
      const newKey = newState.join();
      if (!visited.has(newKey)) {
        visited.add(newKey)
        queue.push({state: newState, count: count + 1})
      }
    }
  }

  return -1;
}

let total = 0
for (const machine of machines) {
  total += getMinPresses(machine.requiredLights, machine.buttons);
}
console.log(total)