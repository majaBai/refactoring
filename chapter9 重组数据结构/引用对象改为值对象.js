/*
把一个对象（数据结构）嵌入另一个对象中时，内部的这个对象可以看成是引用对象或值对象，区别在于：
如果将内部对象视为引用对象，在更新其属性时，会保留原对象不动，只是更新对象的属性；
如果视为值对象，则会替换整个内部对象，新换上的对象会有我想要的属性

一般说来，不可变的数据结构处理起来更容易；但是如果要在多个模块间共享数据的变动，则应该使用引用对象

*/
class Person {
    constructor(){
      this._telephonNumber = new TelephonNumber()
    }

    get officeAreaCode()    {return this._telephoneNumber.areaCode;}
    set officeAreaCode(arg) {this._telephoneNumber.areaCode = arg;}

    get officeNumber () {
        return this._telephonNumber.number
    }
    set officeNumber (val) {
       this._telephonNumber.number = val
    }

  }
  
  class TelephonNumber {
    get areaCode()    {return this._areaCode;}
    set areaCode(arg) {this._areaCode = arg;}

    get number () {
        return this.number
    }

    set number (val) {
        this.number = val
    }
  
  }

  // 将 Person 变为值对象， 首先将内部类变成值对象
  class TelephonNumber2 {
      constructor(areaCode, number) {
          this._areaCode = areaCode
          this._number = number
      }
    get areaCode() {
        return this._areaCode
    }
    // 移除设置函数，变成不可变数据
    // set areaCode(arg) {
    //     this._areaCode = arg
    // }

    get number () {
        return this._number
    }

    // set number (val) {
    //     this._number = val
    // }

    // 值对象可以基于值判断其相等性
    equal (another) {
        if (!(another instanceof TelephonNumber2)) return false
        return this.areaCode === another.areaCode && this.number === another.number
    }
  }

  class Person2 {
    constructor(p){
        this._telephonNumber = new TelephonNumber(p.officeAreaCode, p.officeNumber)
      }
    get officeAreaCode() {
        return this._telephoneNumber.areaCode
    }
    set officeAreaCode(val) {
        // this._telephoneNumber.areaCode = arg
        this._telephonNumber = new TelephonNumber2 (val, this.officeNumber)
    }

    get officeNumber () {
        return this._telephonNumber.number
    }
    set officeNumber (val) {
    //    this._telephonNumber.number = val
          this._telephonNumber = new TelephonNumber2(this.officeAreaCode, val)
    }
  }