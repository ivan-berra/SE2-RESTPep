const fs = require('fs');
const checkExamId = require('../utils/checkExamId');
const checkExamFormat = require('../utils/checkExamFormat');

function PUTexamsId(examJson, examID){
  let examIndex = checkExamId(examID);
  if(examIndex > -1){
    if(checkExamFormat(examJson) == 200){
      let examJSON = fs.readFileSync('./db/exams.json', 'utf8');
      var exams = JSON.parse(examJSON);
      examJson.id = exams.exams[examIndex].id;
      exams.exams[examIndex] = examJson;
      let newJson = JSON.stringify(exams);
      fs.writeFileSync('./db/exams.json', newJson);
//      console.log("Exam modified at examIndex: ", examIndex);
      return 202;
    }
    else return 400;
  }
  else if(examIndex == -1) return 400;
  else  return 404;
}

module.exports = PUTexamsId;
