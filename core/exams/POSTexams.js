const checkExamFormat = require('../utils/checkExamFormat');
const fs = require('fs');

function POSTexams(newExam){
	let response = {"status": null, "examId": null};
  if(checkExamFormat(newExam) == 200){
		let examJSON = fs.readFileSync('./db/exams.json', 'utf8');
		var exams = JSON.parse(examJSON);
    newExam.id = exams.nextId;
		response.examId = newExam.id;
		response.status = 201;
    exams.exams.push(newExam);
    exams.nextId ++;
    let newJson = JSON.stringify(exams);
    fs.writeFileSync('./db/exams.json', newJson);
    return response;
  }
  else {
		response.status = 400;
		return response;
	}
}

module.exports = POSTexams;
