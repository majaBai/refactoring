/*
仅仅在条件逻辑非常复杂的情况才考虑
否则用简单的if-else或者switch/case就足够满足需求了

*/

// 实例，想知道鸟的速度和羽毛

function plumages (birds) {
    return new Map(birds.map(b => [b.name, b.plumage(b)]))
}

function plumage (bird) {
    switch(bird.type) {
        case 'EuropeanSwallow':
            return 'average'
        case 'AfricanSwallow':
            return (bird.numberOfCoconuts > 2) ? 'tired' : 'average'
        case 'NorwegianBlueParrot':
            return (bird.voltage > 100) ? 'scorched' : 'beautiful'
        default:
            return 'unknown'
    }
}

function airSpeedVelocity (bird) {
    switch (bird.type) {
        case 'EuropeanSwallow':
            return 35
        case  'AfricanSwallow':
            return 40 - 2 * bird.numberOfCoconuts
        case 'NorwegianBlueParrot':
            return (bird.isNailed) ? 0 : 10 + bird.voltage / 10
        default:
            return null
    }
}


// 重构
// 超类在 js 中并不是必需的，但保留 Bird 这个超类可以迅速理清各个子类与问题域之间的关系
class Bird {
    constructor (birdObj) {
        Object.assign(this, birdObj)
    }

    get plumage () {
        // 这部分由子类自己负责
        // switch(this.type) {
        //     case 'EuropeanSwallow':
        //         return 'average'
        //     case 'AfricanSwallow':
        //         return (this.numberOfCoconuts > 2) ? 'tired' : 'average'
        //     case 'NorwegianBlueParrot':
        //         return (this.voltage > 100) ? 'scorched' : 'beautiful'
        //     default:
        //         return 'unknown'
        // }
        return 'unknown'
    }

    get airSpeedVelocity() {
        // switch (this.type) {
        //     case 'EuropeanSwallow':
        //         return 35
        //     case  'AfricanSwallow':
        //         return 40 - 2 * this.numberOfCoconuts
        //     case 'NorwegianBlueParrot':
        //         return (this.isNailed) ? 0 : 10 + this.voltage / 10
        //     default:
        //         return null
        // }
        return null
    }
}

function plumage2 (bird) {
    // return createBird(bird).plumage
    return new Map(birds.map(b => createBird(b)).map(bird => [bird.name, bird.plumage]))
}

function airSpeedVelocity2 (bird) {
    // return createBird(bird).airSpeedVelocity
    return new Map(birds.map(b => createBird(b)).map(bird => [bird.name, bird.airSpeedVelocity]))
}

function createBird (bird) {
    switch (bird.type) {
        case 'EuropeanSwallow':
            return new EuropeanSwallow()
        case 'AfricanSwallow':
            return new AfricanSwallow()
        case 'NorwegianBlueParrot':
            return new NorwegianBlueParrot()
        default:
            return new Bird(bird)
    }
}

class EuropeanSwallow extends Bird {
    get plumage () {
        return 'average'
    }
    get airSpeedVelocity() {
        return 35
    }
}
class AfricanSwallow extends Bird {
    get plumage () {
        return (this.numberOfCoconuts > 2) ? 'tired' : 'average'
    }
    get airSpeedVelocity() {
        return 40 - 2 * this.numberOfCoconuts
    }
}
class NorwegianBlueParrot extends Bird {
    get plumage () {
        return (this.voltage > 100) ? 'scorched' : 'beautiful'
    }
    get airSpeedVelocity() {
        return (this.isNailed) ? 0 : 10 + this.voltage / 10
    }
}

// 上述继承体系是泛化的，而在实践中，我们常常想表达某个对象与另一个对象大体相似，但又有一些不同之处
// 用多态处理变体逻辑

function rating (voyage, history) {
    const vpf = voyageProfitFactor(voyage, history)
    const vr = voyageRisk(voyage)
    const chr = captainHistoryRisk(voyage, history)
    if (vpf * 3 > (vr + chr * 2)) return 'A'
    else return 'B'
}

function voyageRisk(voyage) {
    let result = 1
    if(voyage.length > 4) result += 2
    if(voyage.length > 8) result += voyage.length - 8
    if(['china', 'east-indies'].includes(voyage.zone)) result += 4
    return Math.max(result, 0)
}

function captainHistoryRisk(voyage, history) {
    let result = 1
    if(history.length < 5) result += 4
    result += history.filter(v => v.profit < 0).length
    if(voyage.zone === 'china' && hasChina(history)) result -= 2
    return Math.max(result, 0)
}

function hasChina(history) {
    return history.some(v => v.zone === 'china')
}

function voyageProfitFactor(voyage, history) {
    let result = 2
    if (voyage.zone === 'china') result += 1
    if (voyage.zone === 'east-indies') result += 1
    if(voyage.zone === 'china' && hasChina(history)){
        result += 3
        if(history.length > 10) result += 1
        if(history.length > 12) result += 1
        if(history.length > 18) result -= 1
    } else {
        if(history.length > 8) result += 1
        if(voyage.length > 14) result -= 1
    }
    return result
}

// 重构
function rating2 (voyage, history) {
    // return new rating(voyage, history).value
    return new createRating(voyage, history).value
}

function createRating (voyage, history) {
    if (voyage.zone === 'china' && history.some(v => v.zone === 'china')) {
        return new ExperiencedChinaRating(voyage, history)
    } else {
        return new Rating(voyage, history)
    }
}

class Rating {
    constructor(voyage, history) {
        this.voyage = voyage
        this.history = history
    }

    get value() {
        const vpf = this.voyageProfitFactor
        const vr = this.voyageRisk
        const chr = this.captainHistoryRisk
        if (vpf * 3 > (vr + chr * 2)) return 'A'
        else return 'B'
    }

    get voyageRisk () {
        let result = 1
        if(this.voyage.length > 4) result += 2
        if(this.voyage.length > 8) result += this.voyage.length - 8
        if(['china', 'east-indies'].includes(this.voyage.zone)) result += 4
        return Math.max(result, 0)
    }
    get captainHistoryRisk () {
        let result = 1
        if(this.history.length < 5) result += 4
        result += this.history.filter(v => v.profit < 0).length
        //  移动到子类
        // if(this.voyage.zone === 'china' && this.hasChinaHistory) result -= 2
        return Math.max(result, 0)
    }
    get hasChinaHistory() {
        return this.history.some(v => v.zone === 'china')
    }
    get voyageProfitFactor () {
        let result = 2
        if (this.voyage.zone === 'china') result += 1
        if (this.voyage.zone === 'east-indies') result += 1
        if(this.voyage.zone === 'china' && this.hasChinaHistory){
            result += 3
            if(this.history.length > 10) result += 1
            if(this.history.length > 12) result += 1
            if(this.history.length > 18) result -= 1
        } else {
            if(this.history.length > 8) result += 1
            if(this.voyage.length > 14) result -= 1
        }
        return result
    }

}

class ExperiencedChinaRating extends Rating {
    get captainHistoryRisk () {
        const result = super.captainHistoryRisk - 2
        return Math.max(result, 0)
    }
}

