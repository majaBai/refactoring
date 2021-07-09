// 将 discountRate 字段从 Customer 类搬移到 CustomerContract 类

class Customer {
  constructor(name, discountRate) {
    this._name = name
    this._discountRate = discountRate
    this._contract = new CustomerContract(dateToday())
  }

  get discountRate () {
    // return this._discountRate
    return this._contract.discountRate
  }

  _setDiscountRate(aNumber) {
    // this._discountRate = aNumber;
    this._contract.discountRate = aNumber
  }

  becomePreferred () {
    // this._discountRate += 0.03
    this._setDiscountRate(this.discountRate + 0.03);
  }

  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this._discountRate))
  }
}

class CustomerContract {
  constructor (startDate, discountRate) {
    this._startDate = startDate
    this._discountRate = discountRate
  }
  get discountRate () {
     return this. discountRate
  }
  set discountRate (val) {
    this._discountRate = val
  }

}

// 搬移字段到共享对象
// 不希望让每个账户自己维护一个利率字段, 将它搬移到 AccountType 中去
class Account {
  constructor(number, type, interestRate) {
    this._number = number
    this._type = type
    // this._interestRate = interestRate
  }

  // get interestRate () {
  //   return this._interestRate
  // }
  get interestRate () {
     return this._type.interestRate
  }
}

class AccountType {
  constructor(nameString, interestRate) {
    this._name = nameString
    this._interestRate = interestRate
  }

  get interestRate () {
    return this._interestRate
  }
}