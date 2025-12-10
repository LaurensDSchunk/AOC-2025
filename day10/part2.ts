import getInput from "../utils/getInput"
import { equalTo, solve, type Constraint, type Model, type Solution } from "yalps";

type Machine = {requiredLights: boolean[], buttons: number[][], joltage: number[]};

const machines: Machine[] = getInput(10).split("\n").map(v=> {
  const [rawLights, remaining] = v.split("] (")
  const [rawButtons, rawJoltage] = remaining.split(") {")
  const lights = rawLights.substring(1).split("").map(a => a === "#")
  const buttons = rawButtons.split(") (").map(v => v.split(",").map(v => Number(v)))
  const joltage = rawJoltage.substring(0, rawJoltage.length - 1).split(",").map(v => Number(v))

  return {requiredLights: lights, buttons, joltage };
});


let total = 0
for (const machine of machines) {

  const constraints = new Map<string, Constraint>()
  machine.joltage.forEach((v, i) => {
    constraints.set(String(i), equalTo(v))
  })

  const variables = new Map<string, Map<string, number>>()
  machine.buttons.forEach((v, i) => {
    const variable = new Map<string, number>()

    variable.set("presses", 1);
    v.forEach((v, i) => {
      variable.set(String(v), 1);
    })

    variables.set(String(i), variable)
  }) 

  const model: Model = {
    direction: "minimize" as const,
    objective: "presses",
    constraints,
    variables,
    integers: true
  }

  const solution: Solution = solve(model)
  total += solution.result;

}
console.log(total)