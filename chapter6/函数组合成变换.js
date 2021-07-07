/*
把数据“喂”给一个程序，让它再计算出各种派生信息。
这些派生数值可能会在几个不同地方用到，因此这些计算逻辑也常会在用到派生数据的地方重复。
把所有计算派生数据的逻辑收拢到一处，这样始终可以在固定的地方找到和更新这些逻辑，避免到处重复。

函数组合成变换的替代方案是函数组合成类，后者的做法是先用源数据创建一个类，再把相关的计算逻辑搬移到类中。
区别：如果代码中会对源数据做更新，那么使用类要好得多；如果使用变换，派生数据会被存储在新生成的记录中，
     一旦源数据被修改，就会遭遇数据不一致。
数据变换（transform）函数：这种函数接受源数据作为输入，计算出所有的派生数据，将派生数据以字段形式填入输出数据
*/

const aReading = {
  customer: "ivan",
  quantity: 10,
  month: 5,
  year: 2017
}
// 使用1
const baseCahrge = baseRate(aReading.month, aReading.year) * aReading.quantity
// 使用2
const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
// 使用3
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity
}

// 将上面派生数据的计算逻辑搬移到下面的变换函数中

function enrichReading(original) {
  const result = _.cloneDeep(original); // 深拷贝，导致外部的修改不会同步到源数据
  result.baseCharge = calculateBaseCharge(result);
  result.taxableCharge = Math.max(
    0,
    result.baseCharge - taxThreshold(result.year)
  );
  return result;
}