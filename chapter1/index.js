const { plays } = require("./play")
const { invoice } = require("./invoice")

function format (num) {
  return new Intl.NumberFormat("en-US",{ style: "currency", currency: "USD",minimumFractionDigits: 2 }).format(num / 100);
}
function amountFor (perf) {
  let thisAmount = 0
  switch (playForPerf(perf).type) {
    case "tragedy":
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy":
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
        throw new Error(`unknown type: ${playForPerf(perf).type}`);
    }
    return thisAmount
}

function volumeCreditsFor (perf) {
  let result = Math.max(perf.audience - 30, 0);
  if ("comedy" === playForPerf(perf).type) result += Math.floor(perf.audience / 5);
  return result
}

function playForPerf (perf) {
  return plays[perf.playID]
}

function totalVolumeCredits() {
  let total = 0
  for (let perf of invoice[0].performance) {
    total += volumeCreditsFor(perf)
  }
  return total
}

function totalAmount() {
  let total = 0
  for (let perf of invoice[0].performance) {
    total += amountFor(perf)
  }
  return total
}

function statement () {
  let result = `Statement for ${invoice[0].customer}\n`;
  for (let perf of invoice[0].performance) {
    result += ` ${playForPerf(perf).name}: ${format(amountFor(perf))} (${perf.audience} seats)\n`
  }
  result += `Amount owed is ${format(totalAmount())}\n`;
  result += `You earned ${format(totalVolumeCredits())} credits\n`;
  return result;
}

const result = statement()
console.log(result)

/*
Statement for BigCo
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
*/