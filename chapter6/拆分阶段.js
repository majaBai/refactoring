/*
一段函数只做一件事情
*/

function priceOrder(product, quantity, shippingMethods){
    const basePrice = product.basePrice * quantity
    const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate
    const shippingPerCase = (basePrice > shippingMethods.discountThreshold) ? shippingMethods.discountRate : shippingMethods.feePerCase
    const shippingCost = quantity * shippingPerCase
    const price = basePrice - discount + shippingCost
    return price
}

//拆分

function priceOrder2(product, quantity, shippingMethods){
    const priceData = getPriceData(product, quantity)
    return applyingShipping(priceData, shippingMethods)
}

function getPriceData(product, quantity) {
    const basePrice = product.basePrice * quantity
    const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate
    return {
        basePrice,
        discount,
        quantity

    }
}

function applyingShipping (priceData, shippingMethods) {
    const shippingPerCase = (priceData.basePrice > shippingMethods.discountThreshold) ? shippingMethods.discountRate : shippingMethods.feePerCase
    const shippingCost = priceData.quantity * shippingPerCase
    return priceData.basePrice - priceData.discount + shippingCost
}