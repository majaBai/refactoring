/*
大多数时候，我只是想调用一个函数，让它完成自己的工作就好。
如果这个函数不是太复杂，那么命令对象可能显得费而不惠，
我就应该考虑将其变回普通的函数。
*/

class ChargeCalculator {
  constructor(customer, usage) {
    this._customer = customer;
    this._usage = usage;
  }
  execute() {
    return this._customer.rate * this._usage;
  }
}

function charge(customer, usage) {
  return customer.rate * usage;
}