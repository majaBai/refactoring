/*
一个类应该是一个清晰的抽象，只处理一些明确的责任

有更多的功能时，就应该重新抽象一个新类
*/

// 旧类 Person
// get name()   {return this._name;}
// set name(arg) {this._name = arg;}
// get telephoneNumber() {return `(${this.officeAreaCode}) ${this.officeNumber}`;}
// get officeAreaCode()   {return this._officeAreaCode;}
// set officeAreaCode(arg) {this._officeAreaCode = arg;}
// get officeNumber() {return this._officeNumber;}
// set officeNumber(arg) {this._officeNumber = arg;}

class Person {
  constructor(){
    this._telephonNumber = new TelephonNumber()
  }
  get officeAreaCode()    {return this._telephoneNumber.areaCode;}
  set officeAreaCode(arg) {this._telephoneNumber.areaCode = arg;}
}

class TelephonNumber {
  get areaCode()    {return this._areaCode;}
  set areaCode(arg) {this._areaCode = arg;}

}