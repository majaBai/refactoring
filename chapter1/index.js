const { createStatementData } = require("./statementData")
const { renderPlaintext } = require("./render")

function statement () {
  const statementData = createStatementData()  // 数据逻辑
  const result = renderPlaintext(statementData) // UI渲染逻辑
  console.log(result)
}

statement()

/*
Statement for BigCo
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
*/