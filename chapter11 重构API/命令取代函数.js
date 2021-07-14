
/*
命令对象为处理复杂计算提供了强大的机制。借助命令对象，
可以轻松地将原本复杂的函数拆解为多个方法，彼此之间通过字段共享状态；
拆解后的方法可以分别调用；开始调用之前的数据状态也可以逐步构建
*/

function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
  // long body code
}

// 将函数封装成对像
class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }

  execute() {
    this._result = 0;
    this._healthLevel = 0;
    // long body code
  }
}

// 重构
function score2(candidate, medicalExam, scoringGuide) {
  // return new Scorer2().execute(candidate, medicalExam, scoringGuide);
  return new Scorer(candidate, medicalExam, scoringGuide).execute();
}

class Scorer2 {
  constructor(candidate, medicalExam, scoringGuide){
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
   }
  //  execute(candidate, medicalExam, scoringGuide) {...}
    execute() {
    this._medicalExamresult = 0;
    let healthLevel = 0;
    let highMedicalRiskFlag = false;

    if (this._medicalExam.isSmoker) {
      healthLevel += 10;
      highMedicalRiskFlag = true;
    }
    let certificationGrade = "regular";
    if (this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
      certificationGrade = "low";
      this._result -= 5;
    } // lots more code like this
    this._result -= Math.max(healthLevel - 5, 0);
    return this._result;
  }
}