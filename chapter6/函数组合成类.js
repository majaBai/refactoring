
/*
把数据与函数捆绑到同一个环境中，将一部分数据与函数暴露给其他程序元素以便协作
函数形影不离地操作同一块数据 -> 建类

在有些编程语言中，类不是一等公民，而函数则是。可以用“函数作为对象” 的形式来实现这个重构手法。
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

// 以上都是对同一个数据 aReading 的操作，很多计算重复
// 创建一个类，通过计算获取派生数据

class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }

  get customer() {
    return this._customer
  }
  get quantity() {
    return this._quantity;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }
  get baseCahrge() {
    return this.baseRate() * this.quantity;
  }
  baseRate() {
    // 根据 this.month, this.year 计算 baseRate
  }
  get taxableCharge() {
    return Math.max(0, this.baseCahrge() - taxThreshold(this.year));
  }
}