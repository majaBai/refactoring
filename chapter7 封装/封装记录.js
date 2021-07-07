/*
以类取代记录（对象）
*/

const organization = {
    name: 'Acme Gooseberries',
    country: 'GB'
}

class Organization {
    constructor(data) {
        this.name = data.name
        this.country =  data.country
    }
    get name () {
        return this.name
    }
    set name (val) {
        this.name = val
    }

    get country () {
         return this.country
    }
    set country (val) {
        this.country = val
    }
}