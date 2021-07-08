/*
以类取代记录（对象）
记录型结构有两种类型：一种需要声明合法的字段名字，另一种可以随便用任何字段名字。
后者常由语言库本身实现，并通过类的形式提供出来，这些类称为散列（hash）、映射（map）、散列映射（hashmap）、字典（dictionary）或关联数组（associative array）等
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

// 封装嵌套记录

const customerData = {
    '1920': {
        name: 'maja',
        id: '1920',
        usages: {
            '2016': {
                '1': 50,
                '2': 55
            }
        }
    },
    '38673': {
        name: 'neal',
        id: '38673',
        usages: {
            '2016': {
                '3': 80,
                '4': 76
            }
        }
    }
}

function compareUsage(customerId, lasterYear, month) {
    const later = customerData[customerId].usages[lasterYear][month]
    const earlier = customerData[customerId].usages[lasterYear - 1][month]
    return {
        laterAmount: later,
        change: later - earlier
    }
}

// 1.封装变量
function getRawDataOfCustomers() {
    return customerData;
}
function setRawDataOfCustomers(arg) {
    customerData = arg;
}

// -->
function compareUsage2(customerId, lasterYear, month) {
    const later = getRawDataOfCustomers()[customerId].usages[lasterYear][month]
    const earlier = getRawDataOfCustomers()[customerId].usages[lasterYear - 1][month]
    return {
        laterAmount: later,
        change: later - earlier
    }
}

// 2. 使用数据类
// customerData 提供了一份清晰的 API 列表，清楚描绘了该类的全部用途。
// 只需阅读类的代码，就能知道数据的所有用法
class CustomerData {
    constructor(data) {
        this.dada = data
    }
    setUsage(customerId, year, month, amount) {
        this.data[customerId].usages[year][month] = amount
    }
    get rawData() {
        return _.cloneDeep(this.data); // 返回一个副本，从而避免改动源数据; 根据实际情况选择，因为复制巨大的数据结构时代价颇高
    }
    usage(customerId, year, month) {
        return this.data[customerId].usages[year][month]
    }
}
function getCustomerData() {
    return customerData;
  }
  function getRawDataOfCustomers2() {
    return customerData.rawData;
  }
  function setRawDataOfCustomers2(arg) {
    customerData = new CustomerData(arg);
  }

//   function setUsage(customerId, year, month, amount) {
//     getRawDataOfCustomers2()[customerId].usages[year][month] = amount
//   }
getCustomerData().setUsage(customerId, year, month, amount)

function compareUsage3(customerID, laterYear, month) {
    const later = getCustomerData().usage(customerID, laterYear, month);
    const earlier = getCustomerData().usage(customerID, laterYear - 1, month);
    return { laterAmount: later, change: later - earlier };
}