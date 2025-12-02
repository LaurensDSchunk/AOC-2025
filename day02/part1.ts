import getInput from "../utils/getInput";

const input = getInput(2)
  .split(",")
  .map((v) => {
    const vals = v.split("-").map((s) => Number(s));
    return { begin: vals[0]!, end: vals[1]! };
  });

function isIdValid(id: number) {

  const str = String(id);
  const n = str.length;
  if (n % 2 !== 0) return true;
  const subLen = n / 2;

  const sub1 = str.substring(0, subLen)
  const sub2 = str.substring(subLen , n)

  return sub1 !== sub2

}



let total = 0;
for (const range of input) {
  for (let i = range.begin; i <= range.end; i++) {
    if (!isIdValid(i)) {
      total += i;
    }
  }
}

console.log(total)