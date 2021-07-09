
/*
但如果你在一次循环中做了两件不同的事，那么每当需要修改循环时，你都得同时理解这两件事情。
如果能够将循环拆分，让一个循环只做一件事情，那就能确保每次修改时你只需要理解要修改的
那块代码的行为就可以了。

拆分循环这个手法本身的内容就结束了。但本手法的意义不仅在于拆分出循环本身，
而且在于它为进一步优化提供了良好的起点——下一步我通常会寻求将每个循环提炼到独立的函数中
*/


let youngest = people[0] ? people[0].age : Infinity;
let totalSalary = 0;
for (const p of people) {
 if (p.age < youngest) youngest = p.age;
 totalSalary += p.salary;
}

let result =  `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;


// 拆分循环

let totalSalary = 0;
for (const p of people) {
 totalSalary += p.salary;
}

let youngest = people[0] ? people[0].age : Infinity;
for (const p of people) {
 if (p.age < youngest) youngest = p.age;
}
let result2 =  `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;


// 提炼函数
function totalSalary() {
  let totalSalary = 0;
  for (const p of people) {
    totalSalary += p.salary;
  }
  return totalSalary
}

function youngestAge() {
  let youngest = people[0] ? people[0].age : Infinity;
  for (const p of people) {
    if (p.age < youngest) youngest = p.age;
  }
  return youngest
}
let result3 = `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`