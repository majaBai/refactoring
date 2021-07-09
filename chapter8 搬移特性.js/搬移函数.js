/*
模块化是优秀软件设计的核心所在，好的模块化能够让我在修改程序时只需理解程序的一小部分。
为了设计出高度模块化的程序，我得保证互相关联的软件要素都能集中到一块，并确保块与块之间的联系易于查找、直观易懂。
同时，我对模块设计的理解并不是一成不变的，随着我对代码的理解加深，我会知道那些软件要素如何组织最为恰当。
要将这种理解反映到代码上，就得不断地搬移这些元素。


搬移函数最直接的一个动因是，它频繁引用其他上下文中的元素，而对自身上下文中的元素却关心甚少
*/

// 搬移内嵌函数至顶层

function trackSummary (points) {
  const totalTime = calculateTime()
  // const totalDistance = calculateDistance()
  const totalDistance = _calculateDistance()
  const pace = totalTime / 60 / totalDistance
  return {
    time: totalTime,
    distance: totalDistance,
    pace: pace
  }

  // function calculateDistance () {
  //   let result = 0
  //   for(let i = 1; i < points.length; i++) {
  //     result += distance(points[i -1], points[i])
  //   }
  //   return result
  // }

  // function distance(p1, p2){}
  // function radians(degree) {}
  function calculateTime() {}

}

function _calculateDistance (points) {
  let result = 0
  for(let i = 1; i < points.length; i++) {
    result += _distance(points[i -1], points[i])
  }
  return result
}

function _distance(p1, p2){
  const EARTH_RADIUS = 3959; // in miles
  const dLat = radians(p2.lat) - radians(p1.lat);
  const dLon = radians(p2.lon) - radians(p1.lon);
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos(radians(p2.lat)) *
      Math.cos(radians(p1.lat)) *
      Math.pow(Math.sin(dLon / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS * c;
}

function radians (degrees) {
  return (degrees * Math.PI) / 180
}


// 在类之间搬移函数

class Account {
  constructor(type) {
    this.type = new AccountType(type)
  }

  get bankCharge() {
    let result = 4.5
    if(this._daysOverdrawn > 0){
      result += this.overdraftCharge
    }
  }

  get overdraftCharge() {
    // if(this.type.isPremiun) {
    //   const baseCharge = 10
    //   if(this.daysOverdrawn >= 7){
    //     return baseCharge
    //   } else {
    //     return baseCharge + (this.daysOverdrawn - 7) * 0.85
    //   }
    // } else {
    //   return this.daysOverdrawn * 1.75
    // }
    return this.type.overdraftCharge(this)
  }
}

class AccountType {
  // ...
 overdraftCharge(acocount) {
    if(this.isPremiun) {
      const baseCharge = 10
      if(acocount.daysOverdrawn >= 7){
        return baseCharge
      } else {
        return baseCharge + (acocount.daysOverdrawn - 7) * 0.85
      }
    } else {
      return acocount.daysOverdrawn * 1.75
    }
  }
}

