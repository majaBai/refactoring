/*
发现两个函数逻辑非常相似，只有一些字面量值不同，可以将其合并成一个函数，
以参数的形式传入不同的值，从而消除重复
*/

function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.1);
}
function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.05);
}


function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor);
}