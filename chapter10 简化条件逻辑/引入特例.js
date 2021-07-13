/*
一种常见的重复代码是这种情况：一个数据结构的使用者都在检查某个特殊的值，
并且当这个特殊值出现时所做的处理也都相同。代码库中有多处以同样方式应对同一个特殊值，
则应该把这个处理逻辑收拢到一处。

办法是使用“特例”（Special Case）模式：创建一个特例元素，用以表达对这种特例的共用行为的处理。
这样就可以用一个函数调用取代大部分特例检查逻辑。
*/

class Site {

  get customer () {
    // return this._customer
    return (this._customer === 'unknown') ? new UnknownCustomer() : this._customer
  }
}

class Customer {
  get name () {}
  get billingPlan () {}
  get billingPlan (arg) {}
  get paymentHistory () {}
  get isUnknown () {
    return false
  }
}
// 创建一个未知客户类，用来专门处理未知客户的情况
class UnknownCustomer {
  get isUnknown () {
    return true
  }

  get billingPlan () {
    return CustomElementRegistry.billingPlans.basic
  }
  set billingPlan (arg) {}
// 如果特例对象需要返回关联对象，被返回的通常也是特例对象。
// 所以，我需要创建一个代表“空支付记录”的特例类 NullPaymentHistory。
  get paymentHistory () {
    return new NullPaymentHistory()
  }
}

class NullPaymentHistory {
  get weeksDelinquentInLastYear() {return 0;}
}

function isUnknown(arg) {
  if (!(arg instanceof Customer || arg instanceof UnknownCustomer)) {
    throw new Error(`investigate bad value: ${arg}`)
  }
  return arg.isUnknown
}


// 我们在上面处理的其实是一些很简单的值，却要创建一个这样的类，未免有点儿大动干戈。但在上面这个例子中，我必须创建这样一个类，因为 Customer 类是允许使用者更新其内容的。但如果面对一个只读的数据结构，我就可以改用字面量对象（literal object）。
// 使用对象字面量

class Customer2 {
  get isUnknown () {
    return false
  }
}
class Site2 {
  get customer () {
    return (this._customer === 'unknown') ? createUnknownCustomer() : this._customer
  }
}

// 使用字面量而非 class 来处理未知客户的情况
function createUnknownCustomer () {
  return {
    isUnknown: true,
    name: 'occupant',
    billingPlan: registtry.billingPlans.basic,
    paymentHistory: {
      weeksDelinquentInLastYear: 0
    }
  }
}

function isUnknown2 (arg) {
  return arg.isUnknown
}

// 使用变换，对 Site 数据增强
function enrichSite (aSite) {
  const result = Object.assign({}, aSite)
  const unknownCustomer = {
    isUnknown: true,
    name: 'occupant',
    billingPlan: registry.billingPlans.basic,
    paymentHistory: {
      weeksDelinquentInLastYear: 0,
    },
  }
  if(isUnknown3(result.customer)) result.customer = unknownCustomer
  else  result.customer.isUnknown = false
  return result
}

function isUnknoewn3 (aCustomer) {
  if (aCustomer === 'unknown') return true
  else return aCustomer.isUnknown
}

// 客户端使用
const rawSite = acquireSiteData();
const site = enrichSite(rawSite);
const aCustomer = site.customer;
// ... lots of intervening code ...
const customerName = aCustomer.name;