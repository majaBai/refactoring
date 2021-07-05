const  { Province } = require('./province')
const assert = require('assert') // node 自带 assert 断言库
var expect = require('chai').expect; // 安装 chai


function sampleProvinceData() {
  return {
    name: "Asia",
    producers: [
      { name: "Byzantium", cost: 10, production: 9 },
      { name: "Attalia", cost: 12, production: 10 },
      { name: "Sinope", cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}

// 正常测试
describe("province", function () {
  let asia;
  beforeEach(function () {
    asia = new Province(sampleProvinceData());
  });

  it("shortfall", function () {
    assert.equal(asia.shortfall, 5);
  });

  it("profit", function () {
    expect(asia.profit).equal(230);
  });

  it('change production', function() {
    asia.producers[0].production = 20;
    expect(asia.shortfall).equal(-6);
    expect(asia.profit).equal(292);
  });

  it('zero demand', function() {
    asia.demand = 0;
     expect(asia.shortfall).equal(-25);
     expect(asia.profit).equal(0);
  })

  it('nagative demand', function() {
    asia.demand = -1;
     expect(asia.shortfall).equal(-26);
     expect(asia.profit).equal(-10);
  })
});

// 边界测试 数据为空
describe('no producers', function() {
  let noProducers;
  beforeEach(function() {
   const data = {
    name: "No proudcers",
    producers: [],
    demand: 30,
    price: 20
   };
   noProducers = new Province(data);
  });
  it('shortfall', function() {
   expect(noProducers.shortfall).equal(30);
  });
  it('profit', function() {
   expect(noProducers.profit).equal(0);
  })
})
