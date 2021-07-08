/*
内联类正好与提炼类相反。如果一个类不再承担足够责任，不再有单独存在的理由
就挑选这一“萎缩类”的最频繁用户（也是一个类），以本手法将“萎缩类”塞进另一个类中
*/

class TrackingInformation {
  get shippingCompany() {
    return this._shippingCompany;
  }
  set shippingCompany(arg) {
    this._shippingCompany = arg;
  }
  get trackingNumber() {
    return this._trackingNumber;
  }
  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }
  get display() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
}

class Shipment {
  constructor() {
    this._trackingInformation = new TrackingInformation()
  }
  get trackingInfo() {
    return this._trackingInformation.display;
  }
  
  get trackingInformation() {return this._trackingInformation;}
  set trackingInformation(aTrackingInformation) {
  this._trackingInformation = aTrackingInformation;
  }
}