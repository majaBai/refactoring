


/*
除了循环变量和结果变量外，一个变量只应该承担一个责任，多次赋值多半是因为承担了多重责任
*/

let temp = 2 * (width + height)
console.log(temp)
temp = heigth * width
console.log(temp)

const perimeter =  2 * (width + height)
console.log(temp)
const area = height * width
console.log(area)

// 变量以参数形式定义，在函数内部又被重新赋值

function discount (inputValue, quantity) {
    if(inputValue > 2) inputValue -= 2
    if(quantity > 50) inputValue -= 1
    return inputValue
}

function discount2 (originalInput, quantity) {
    let input = originalInput
    if(input > 2) input -= 2
    if(quantity > 50) input -= 1
    return input
}