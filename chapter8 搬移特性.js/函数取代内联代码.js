//如果我见到一些内联代码，它们做的事情仅仅是已有函数的重复，我通常会以一个函数调用取代内联代码

let appliesToMass = false;
for (const s of states) {
  if (s === "MA") appliesToMass = true;
}

appliesToMass = states.includes("MA");