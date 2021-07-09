/*
“重构”可以把一些复杂的东西分解为较简单的小块，但有时你就必须壮士断腕，删掉整个算法，代之以较简单的算法
*/
function foundPerson(people) {
  for(let i = 0; i <= people.length; i++) {
   if (people[i] === "Don") {
    return "Don";
   }
   if (people[i] === "John") {
    return "John";
   }
   if (people[i] === "Kent") {
    return "Kent";
   }
  }
  return "";
 }
 
 
function foundPerson2(people) {
  const candidates = ["Don", "John", "Kent"];
  return people.find(p => candidates.includes(p)) || '';
 }