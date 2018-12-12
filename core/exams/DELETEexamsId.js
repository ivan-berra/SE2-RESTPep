const fs = require('fs');
const checkExamId = require('../utils/checkExamId');

function DELETEexamsId(examID){
  let examIndex = checkExamId(examID);
  if(examIndex > -1){
    let examJSON = fs.readFileSync('./db/exams.json', 'utf8');
    var exams = JSON.parse(examJSON);
    exams.exams.splice(examIndex, 1);
    let newJson = JSON.stringify(exams);
    fs.writeFileSync('./db/exams.json', newJson);
//    console.log("Exam deleted at examIndex: ", examIndex);
    return 204;
  }
  else if(examIndex == -1) {return 400;}
  else {return 404;}
}

module.exports = DELETEexamsId;
