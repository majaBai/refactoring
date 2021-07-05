const { plays } = require("./play")
const { invoice } = require("./invoice")

function enrichPerformance(aPerformance) {
  const result = Object.assign({}, aPerformance)
  result.play = playForPerf(result)
  result.amount = amountFor(result)
  result.volumeCredits = volumeCreditsFor(result)
  return result
}

function totalVolumeCredits(data) {
  return data.performance.reduce((total, p) => total + p.volumeCredits, 0)
}

function totalAmount(data) {
 return data.performance.reduce((total, p) => total + p.amount, 0)
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

function createStatementData () {
  const statementData = {}
  statementData.customer = invoice[0].customer
  statementData.performance = invoice[0].performance.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  return statementData
}

exports.createStatementData = createStatementData