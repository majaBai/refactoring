
/*
函数的参数列表应该总结该函数的可变性，标示出函数可能体现出行为差异的主要方式。
和任何代码中的语句一样，参数列表应该尽量避免重复，并且参数列表越短就越容易理解。

有参数传入时，调用者需要负责获得正确的参数值；参数去除后，责任就被转移给了函数本身
*/

availableVacation(anEmployee, anEmployee.grade);
function availableVacation(anEmployee, grade) {
  // calculate vacation...
}


availableVacation(anEmployee)
function availableVacation(anEmployee) {
  const grade = anEmployee.grade;
  // calculate vacation...
}