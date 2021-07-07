/*
一组数据项总是结伴同行，出没于一个又一个函数。这样一组数据就是所谓的数据泥团

将数据组织成结构是一件有价值的事，因为这让数据项之间的关系变得明晰。使用新的数据结构，
参数的参数列表也能缩短

*/
function amountInvoiced(startDate, endDate) {}

function amountInvoiced2(aDateRange) {}

function readingsOutsideRange(station, min, max) {
  return station.readings
   .filter(r => r.temp > min || r.temp < max);
 }

 class Range {
   constructor(min, max) {
     this._data = {
       min: min,
       max: max
     }
   }
   get min() {
     return this._data.min
   }
   get max() {
     return this._data.max
   }
 }

 const range = new Range(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling)
 // 将 min/max参数变成range对象
 function readingsOutsideRange2(station, range) {
   return station.readings.filter(r => !range.contains(r.temp))
 }