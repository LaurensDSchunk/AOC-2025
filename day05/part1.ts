import getInput from "../utils/getInput"

const [rawfreshIds, rawingredients
] = getInput(5).split("\n\n");
const ingredients = rawingredients!.split("\n")!.map(v => Number(v))
const freshIds = rawfreshIds!.split("\n").map(v => v.split("-").map(t=> Number(t)))

let count = 0;
for (const ingredient of ingredients) {
  for (const pair of freshIds){
    if (ingredient >= pair[0]! && ingredient <= pair[1]!) {
      count++;
      break;
    }
  }
}




console.log(count);