/*
字段名字的重要性
改名- 封装
*/

const organization = {
    name: 'Acme Gooseberries',
    country: 'GB'
}

class Organization {
    constructor (data) {
        this.name = data.name
        this.country = data.country
    }

    get name (){
        return this.name
    }
    set name (val) {
        this.name = val
    }
    get conutry () {
        return this.country
    }
    set country (val) {
        this.conutry = val
    }
}

const o = new Organization({ name: 'Acme Gooseberries', country: 'GB'})