

class Person {
  constructor (id, name) {
    this._id = id
    this._name = name
  }

  get name() {
    return this._name
  }
  set name(val) {
    this._name = val
  }

  get id() {
    return this._id
  }
  set name(val) {
    this._id = val
  }

}