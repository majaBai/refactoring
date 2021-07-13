
/*
“标记参数”是这样的一种参数：调用者用它来指示被调函数应该执行哪一部分逻辑;只有参数值影响了函数内部的控制流，这才是标记参数。
让人难以理解到底有哪些函数可以调用、应该怎么调用;还得弄清标记参数有哪些可用的值
*/
function setDimension(name, value) {
  if (name === "height") {
    this._height = value;
    return;
  }
  if (name === "width") {
    this._width = value;
    return;
  }
}

function setHeight(value) {
  this._height = value;
}
function setWidth(value) {
  this._width = value;
}