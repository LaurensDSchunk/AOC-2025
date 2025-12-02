import getInput from "../utils/getInput"

const input = getInput(2).split(",").map(v => {
  const vals = v.split("-").map(s => Number(s))
  return {begin: vals[0]!, end: vals[1]!}
});

function isIdValid(id: number) {
  const str = String(id);
  const n = str.length;

  outer: for (let subLen = 1; subLen <= str.length / 2; subLen++) {
    if (n % subLen !== 0) continue;
    const sub = str.substring(0, subLen)
    let copy = str;
    while (copy.length > 0) {
      const substr = copy.substring(0, subLen);
      copy = copy.slice(subLen)
      if (sub !== substr) continue outer;
    }

    return false
  }

  return true;
}

let total = 0;
for (const range of input) {
  for (let i = range.begin; i <= range.end; i++) {
    if (!isIdValid(i)) {
      total += i;
    };
  }
}

console.log(total)