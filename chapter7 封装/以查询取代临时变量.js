class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
   }
  
   get price() {
    // const basePrice = this._quantity * this._item.price;
    const basePrice = this.basePrice
    // var discountFactor = 0.98;
    // if (basePrice > 1000) discountFactor -= 0.03;
    var discountFactor = this.discountFactor
    return basePrice * discountFactor;
   }
   get basePrice () {
     return this._quantity * this._item.price
   }
   get discountFactor () {
    var discountFactor = 0.98;
    if (basePrice > 1000) discountFactor -= 0.03;
   }
}