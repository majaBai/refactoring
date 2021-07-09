/*
“封装”意味着每个模块都应该尽可能少了解系统的其他部分,意味着应该隐藏自己的字段
*/

manager = aPerson.department.manager;


manager = aPerson.manager;

class Person {
  get manager() {return this.department.manager;}
}