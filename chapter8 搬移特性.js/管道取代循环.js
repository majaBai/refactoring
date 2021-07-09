/*
集合管道是这样一种技术，它允许我使用一组运算来描述集合的迭代过程，
其中每种运算接收的入参和返回值都是一个集合
map filter
*/

//下面这个 acquireData 函数的作用是从数据中筛选出印度的所有办公室，
//并返回办公室所在的城市（city）信息和联系电话（telephone number）
function acquireData(input) {
  const lines = input.split("\n");
  let firstLine = true;
  const result = [];
  for (const line of lines) {
    if (firstLine) {
      firstLine = false;
      continue;
    }
    if (line.trim() === "") continue;
    const record = line.split(",");
    if (record[1].trim() === "India") {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }
  return result;
}

function acquireData2 (data) {
  const lines = input.split("\n")
  return line.slice(1)
  .filter(line => line.trim() !== '')
  .map(line => line.split(','))
  .filter(fields => fields[1].trim() === 'India')
  .map(fields => ({
    city: fields[0].trim(),
    phone: fields[2].trime()
  }))
}