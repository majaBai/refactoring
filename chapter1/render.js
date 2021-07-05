function format (num) {
  return new Intl.NumberFormat("en-US",{ style: "currency", currency: "USD",minimumFractionDigits: 2 }).format(num / 100);
}

function renderPlaintext (data) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performance) {
    result += ` ${perf.play.name}: ${format(perf.amount)} (${perf.audience} seats)\n`
  }
  result += `Amount owed is ${format(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

exports.renderPlaintext = renderPlaintext