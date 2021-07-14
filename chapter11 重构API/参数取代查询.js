/*
在浏览函数实现时，我有时会发现一些令人不快的引用关系，例如，引用一个全局变量，或者引用另一个我想要移除的元素。为了解决这些令人不快的引用，
我需要将其替换为函数参数，从而将处理引用关系的责任转交给函数的调用者。

本重构的情况大多源于我想要改变代码的依赖关系——为了让目标函数不再依赖于某个元素，我把这个元素的值以参数形式传递给该函数

这里需要注意权衡：如果把所有依赖关系都变成参数，会导致参数列表冗长重复；如果作用域之间的共享太多，又会导致函数间依赖过度
*/

class HeatingPlan {
  // 严重依赖于全局对象thermostat
  get targetTemperature () {
    if (thermostat.selectedTemplature > this._max) return this._max
    else if(thermostat.selectedTemplature < this._min) return this._min
    else return thermostat.selectedTemplature
  }
  
  // 用参数代替全局对象thermostat
  get xxNEWtargetTemperature (temperature) {
    if (temperature > this._max) return this._max
    else if(temperature < this._min) return this._min
    else return temperature
  }
}
function caller () {
  // if (thePlan.targetTemperature > thermostat.currentTemperature) setToHeat();
  // else if (thePlan.targetTemperature < thermostat.currentTemperature)setToCool();
  // else setOff();

  // 调用方负责传参
  if (thePlan.xxNEWtargetTemperature(thermostat.selectedTemplature ) > thermostat.currentTemperature) setToHeat();
  else if (thePlan.xxNEWtargetTemperature(thermostat.selectedTemplature ) < thermostat.currentTemperature)setToCool();
  else setOff();
}




