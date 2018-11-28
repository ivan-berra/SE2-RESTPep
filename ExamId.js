const fs = require('fs');

//Returns index of input ExamID
//Index -1 if id is unvalid
//Index -2 if id is not found
function idFound(id){
  let examJSON = fs.readFileSync('./exams.json', 'utf8', function(err, data){
  	if (err) throw err;
  	let parsedJson = JSON.parse(data);
  });
  var exams = JSON.parse(examJSON);
  let examID = parseInt(id);
  console.log("idFound received ID: ", examID);
  console.log("is it a number? ",Number.isInteger(examID));
  if(typeof examID === "number" && Number.isInteger(examID)){
    const index = exams.exams.findIndex(obj => obj.id == examID);
    if(index != -1){
      return index;
    }
    else return -2;
  }
  else return -1;
}

//Returns a JSON object exam taken an examIndex
function idGet(examIndex){
//  console.log("idGet received Index: ", examIndex);
  let examJSON = fs.readFileSync('./exams.json', 'utf8', function(err, data){
  	if (err) throw err;
  	let parsedJson = JSON.parse(data);
  });
  var exams = JSON.parse(examJSON);
  return exams.exams[examIndex];
}

function idDelete(examIndex){
  let examJSON = fs.readFileSync('./exams.json', 'utf8', function(err, data){
  	if (err) throw err;
  	let parsedJson = JSON.parse(data);
  });
  var exams = JSON.parse(examJSON);
  try{
    exams.exams.splice(examIndex, 1);
    let newJson = JSON.stringify(exams);
    fs.writeFileSync('./exams.json', newJson);
    console.log("Exam deleted at index: ", examIndex);
    return 200;
  }catch(error){console.log(error);}
}

function idPut(examJson, examIndex){
  let examJSON = fs.readFileSync('./exams.json', 'utf8', function(err, data){
  	if (err) throw err;
  	let parsedJson = JSON.parse(data);
  });
  var exams = JSON.parse(examJSON);
  examJson.id = exams.exams[examIndex].id;
  exams.exams[examIndex] = examJson;
  let newJson = JSON.stringify(exams);
  fs.writeFileSync('./exams.json', newJson);
  return 200;
}
module.exports.idFound = idFound;
module.exports.idGet = idGet;
module.exports.idDelete = idDelete;
module.exports.idPut = idPut;
