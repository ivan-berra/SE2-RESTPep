const fs = require('fs');

//Returns examIndex of input ExamID
//Index -1 if id is unvalid
//Index -2 if id is not found
function checkExamId(id){
  let examID = parseInt(id);
//  console.log("idFound received ID: ", examID);
//  console.log("is it a number? ",Number.isInteger(examID));
  if(typeof examID === "number" && Number.isInteger(examID)){
    let examJSON = fs.readFileSync('./db/exams.json', 'utf8');
    var exams = JSON.parse(examJSON);
    const examIndex = exams.exams.findIndex(obj => obj.id == examID);
    if(examIndex != -1){
      return examIndex;
    }
    else return -2;
  }
  else return -1;
}

module.exports = checkExamId;
