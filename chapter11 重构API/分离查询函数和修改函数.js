/*
任何有返回值的函数，都不应该有看得到的副作用——命令与查询分离

如果遇到一个“既有返回值又有副作用”的函数，我就会试着将查询动作从修改动作中分离出来。
*/

function alertForMiscreant(people) {
  for (const p of people) {
    if (p === "Don") {
      setOffAlarms();
      return "Don";
    }
    if (p === "John") {
      setOffAlarms();
      return "John";
    }
  }
  return "";
}

// 重构
function findMiscreant (people) {
  for (const p of people) {
    if (p === "Don") {
      // setOffAlarms();
      return "Don";
    }
    if (p === "John") {
      // setOffAlarms();
      return "John";
    }
  }
  return "";
}

function alertMiscreant (people) {
  if(findMiscreant(people) !== '') setOffAlarms()
}