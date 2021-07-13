
/*
如果我看见代码从一个记录结构中导出几个值，然后又把这几个值一起传递给一个函数，
我会更愿意把整个记录传给这个函数，在函数体内部导出所需的值。


也有时我不想采用本重构手法，因为我不想让被调函数依赖完整对象，尤其是在两者不在同一个模块中的时候
*/
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (!aPlan.withinRange(low, high)) {
  alerts.push("room temperature went outside range");
}

// 方法1
class HeatingPan {
  withinRange(bottom, top) {
    return (bottom >= this._temperatureRange.low) && (top <= this._temperatureRange.high)
  }
  // 直接传一个范围
  xxNEWwithinRange(aNumberRange) {
    // 内联 withinRange 函数
    // return this.withinRange(aNumberRange.low, aNumberRange.high);
    return (aNumberRange.low >= this._temperatureRange.low) && (aNumberRange.high <= this._temperatureRange.high)
  }
}

if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange)) {
  alerts.push("room temperature went outside range");
}

// 方法2 提炼函数
const tempRange = aRoom.daysTempRange
const isWithinRange = xxNEWwithinRange(aPlan, tempRange);
if (!isWithinRange) {
  alerts.push("room temperature went outside range");
}

function xxNEWwithinRange (aPlan, tempRange) {
  const low = tempRange.low;
  const high = tempRange.high;
  const isWithinRange = aPlan.withinRange(low, high);
  return isWithinRange
}

