

// 以简单数据表示
order.filter(o => 'high' === o.priority || 'rush' === o.priority)
// 以对象表示
order.filter(o => o.priority.higherThan(new Priority('normal')))

class Order {
  constructor(data) {
    this.priority = data.priority
  }
  get priority() {
    return this.priority
  }
  get priorityString () {
    return this.priority.toString()
  }
  set priority(val) {
    // this.priority = val
    this.priority = new Priority(val)
  }
}

class Priority {
  constructor(val) {
    if (val instanceof Priority) return val
    if (Priority.legalValues().includes(val)){
      this.value = val
    } else {
      throw new Error(`${val} is invalid for Priority`)
    }
  }
  toString() {
    return this.value
  }
  static legalValues() {
    return ['low', 'normal', 'high', 'rush']
  }
  get _index() {
    return Priority.legalValues().findIndex(s => s === this.value)
  }

  equals(other) {
    return this._index === other._index
  }

  higherThan(other) {
    return this._index > other._index
  }

  lowerThan(other) {
    return this._index < other._index
  }
}