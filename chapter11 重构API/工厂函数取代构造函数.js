class Employee {
  constructor (name, typeCode) {
    this._name = name
    this._typeCode = typeCode
  }

  get name () {
    return this._name
  }
  get type () {
    return Employee.legalTypeCode[this._typeCode]
  }

  static legalTypeCode () {
    return {
      E: 'Engineer',
      M: 'Manager',
      S: 'Salesman'
    }
  }
}

// 使用工厂函数
// 工厂函数的实现内部可以调用构造函数，但也可以换成别的方式实现
function createEmployee (name, typeCode) {
  return new Employee(name, typeCode)
}

