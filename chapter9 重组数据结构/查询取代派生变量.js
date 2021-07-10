
/*
计算常能更清晰的表达数据的含义，而且也避免了‘源数据修改时忘了更新派生变量’ 的错误

*/

class ProductionPlan {
    constructor (production) {
        this._production = production
        this._adjustment = []
    }
    get production () {
        return this._production
    }
    applyAdjustment (adjustment) {
        this._adjustment.push(adjustment)
        this._production += adjustment.amount
    }
}

class ProductionPlan2 {
    constructor (production) {
        this._production = production
        this._adjustment = []
    }
    get production () {
        // assert(this._production === this.calculatedProduction)
        // return this._production
        // return this.calculatedProduction
        return this._adjustments.reduce((sum, a) => sum += a.amount, 0) // 如果原始 production 不为 0， 就会报错，应该要加上原始 production
    }

    // get calculatedProduction () {
    //     return this._adjustments.reduce((sum, a) => sum += a.amount, 0)
    // }
    applyAdjustment (adjustment) {
        this._adjustment.push(adjustment)
        // this._production += adjustment.amount
    }
}


//2. 不止一个数据来源
class ProductionPlan {
    constructor (production) {
        // this._production = production
        this._initialProduction = production
        this._productionAccumalator = 0
        this._adjustment = []
    }
    get production () {
        return this._initialProduction + this._productionAccumalator
    }
    get calculatedProductionAccumulator () {
        return this._adjustment.reduce((sum, a) => sum + a.amount, 0)
    }
    applyAdjustment (adjustment) {
        this._adjustment.push(adjustment)
        this._production += adjustment.amount
    }
}