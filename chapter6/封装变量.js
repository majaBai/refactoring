/*
搬移一处被广泛使用的数据，最好的办法往往是先以函数形式封装所有对该数据的访问
封装能提供一个清晰的观测点，可以由此监控数据的变化和使用情况；
还可以轻松地添加数据被修改时的验证或后续逻辑
*/
let defaultOwner = {
  firstName: 'Martin',
  lastName: 'Fowler'
}
let spaceship = {}
spaceship.owner = defaultOwner
defaultOwner = {
  firstName: 'Rebeca',
  lastName: 'Parsons'
}

// 封装变量
function getDefaultowner () {
  return defaultOwner // 直接返回数据本身，外部修改会影响数据
}
function getDefaultowner2 () {
  return Object.assign({}, defaultOwner) // 返回副本，外部修改不影响数据本身
}

function setDefaultOwner (arg) {
  defaultOwner = arg
}

spaceship.owner = getDefaultowner()
setDefaultOwner({
  firstName: 'Rebeca',
  lastName: 'Parsons'
})