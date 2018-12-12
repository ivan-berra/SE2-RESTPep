const fs = require('fs');
const checkExamId = require('../utils/checkExamId');

//Returns a JSON object exam taken an examIndex
function GETexamsId(examID){
  let response = {"status": null, "jsonData": null};
  let examIndex = checkExamId(examID);
  if(examIndex > -1){
    let examJSON = fs.readFileSync('./db/exams.json', 'utf8');
    response.status = 200;
    exams = JSON.parse(examJSON);
    response.jsonData = exams.exams[examIndex];
//    console.log("Exam taken at examIndex: ", examIndex);
    return response;
  }
  else if(examIndex == -1) {response.status = 400; return response;}
  else  {response.status = 404; return response;}
}

module.exports = GETexamsId;
