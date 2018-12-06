const fs = require('fs');
const Exam = require('./Exam');

//Returns examIndex of input ExamID
//Index -1 if id is unvalid
//Index -2 if id is not found
function idFound(id){
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

//Returns a JSON object exam taken an examIndex
function idGet(examID){
  let response = {"status": null, "jsonData": null};
  let examIndex = idFound(examID);
  if(examIndex > -1){
    let examJSON = fs.readFileSync('./db/exams.json', 'utf8');
    response.status = 200;
    exams = JSON.parse(examJSON);
    response.jsonData = exams.exams[examIndex];
//    console.log("Exam taken at examIndex: ", examIndex);
    return response;
  }
  else if(examIndex == -1) {response.status = 400; return response;}
  else if(examIndex == -2) {response.status = 404; return response;}
}

function idDelete(examID){
  let examIndex = idFound(examID);
  if(examIndex > -1){
    let examJSON = fs.readFileSync('./db/exams.json', 'utf8');
    var exams = JSON.parse(examJSON);
    exams.exams.splice(examIndex, 1);
    let newJson = JSON.stringify(exams);
    fs.writeFileSync('./db/exams.json', newJson);
//    console.log("Exam deleted at examIndex: ", examIndex);
    return 204;
  }
  else if(examIndex == -1) return 400;
  else if(examIndex == -2) return 404;
}

function idPut(examJson, examID){
  let examIndex = idFound(examID);
  if(examIndex > -1){
    if(Exam.valid(examJson) == 200){
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
  else if(examIndex == -2) return 404;
}
module.exports.idFound = idFound;
module.exports.idGet = idGet;
module.exports.idDelete = idDelete;
module.exports.idPut = idPut;