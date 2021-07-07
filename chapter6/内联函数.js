
/*
内联函数减少函数之间的委托，使得逻辑关系清晰
*/

function getRating(driver) {
 return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(driver) {
 return driver.numberOfLateDeliveries >= 5;
}


// function getRating(driver) {
//  return (driver.numberOfLateDeliveries >= 5) ? 2 : 1;
// }