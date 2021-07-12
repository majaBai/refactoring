/*
卫语句：给某个条件分支以特别的重视，一旦该条件为真，就立即返回
if-else 分支是同等重视
*/

function getPayAmount () {
    let result
    if(isDead) {
        result = deadAmount()
    } else {
        // 嵌套的条件逻辑让我们看不清真正的逻辑
        if(isSeparated) {
            result = separatedAmount()
        } else {
            if(isRetired) {
                result = retiredAmount()
            } else {
                result = normalPayAmount()
            }
        }
    }
    return result
}

function getPayAmount2 () {
    if(isDead) return deadAmount()
    if(isSeparated()) return separatedAmount()
    if(isRetired) return retiredAmount()
    return normalPayAmount()
}

// 将条件取反

function adjustedCapital (anInstrument) {
    let result = 0
    if(anInstrument.capital > 0) {
        if(anInstrument.interstRate > 0 && anInstrument.duration > 0) {
            result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor
        }
    }
    return result
}

function adjustedCapital2 (anInstrument) {
    if(anInstrument.capital <= 0) return 0
    if(anInstrument.interstRate <= 0 || anInstrument.duration <= 0) return 0
    return (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor
}

function adjustedCapital3 (anInstrument) {
    if(anInstrument.capital <= 0 || anInstrument.interstRate <= 0 || anInstrument.duration <= 0) return 0
    return (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor
}
