// 如果有几行代码取用了同一个数据结构，那么最好是让它们在一起出现，而不是夹杂在取用其他数据结构的代码中间。
// 元素的声明点和使用点互相靠近
// 代码片段中间的代码有没有副作用，是不是对执行次序敏感


const pricingPlan = retrievePricingPlan();
const order = retreiveOrder();
const baseCharge = pricingPlan.base;
// let charge;
const chargePerUnit = pricingPlan.unit;
const units = order.units;
// let discount
let charge;
charge = baseCharge + units * chargePerUnit;

let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);
let discount
discount = discountableUnits * pricingPlan.discountFactor;

if (order.isRepeat) discount += 20;
charge = charge - discount;
chargeOrder(charge);

// 包含条件逻辑的移动
// 消除重复逻辑

// let result;
// if (availableResources.length === 0) {
//   result = createResource();
//   allocatedResources.push(result);
// } else {
//   result = availableResources.pop();
//   allocatedResources.push(result);
// }
// return result;


let result2;
if (availableResources.length === 0) {
  result2 = createResource();
} else {
  result2 = availableResources.pop();
}
allocatedResources.push(result);
return result2;