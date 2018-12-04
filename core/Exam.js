const fs = require('fs');

function get(){
	let response = {"status": null, "jsonData": null};
	try{
	let examJSON = fs.readFileSync('./db/exams.json', 'utf8');
		response.status = 200;
		response.jsonData = JSON.parse(examJSON);
		return response;
	}catch(error){response.status = 500; return response;}
}

function valid(examJson){
    if(typeof examJson.deadline === "string"){
//      console.log("Deadline is string");
      if(typeof examJson.destinatario === "number" && Number.isInteger(examJson.destinatario)){
//        console.log("Destinatario is int number");
        if(typeof examJson.autore === "number" && Number.isInteger(examJson.autore)){
//          console.log("Autore is int number");
          if(typeof examJson.condivisi === "object" && examJson.condivisi != null){
//            console.log("Condivisi is a not null obj");
            if(typeof examJson.tasksarray === "object" && examJson.tasksarray != null){
//              console.log("TasksArray is a not null obj");
              var formaterror = false;
              for(var i=0; i<examJson.tasksarray.length && !formaterror; i++){
                if(!(typeof examJson.tasksarray[i] === "number" && Number.isInteger(examJson.tasksarray[i])))
                  formaterror = true;
              }
								if(!formaterror){
	              for(var i=0; i<examJson.condivisi.length && !formaterror; i++){
	                if(!(typeof examJson.condivisi[i] === "number" && Number.isInteger(examJson.condivisi[i])))
	                  formaterror = true;
	              }
	              if(!formaterror){
	                return 200;
	              }
	              else return 400;
							}
							else return 400;
            }
            else return 400;
          }
          else return 400;
        }
        else return 400;
      }
      else return 400;
    }
    else return 400;
}

function write(newExam){
	let response = {"status": null, "examId": null};
  if(valid(newExam) == 200){
		let examJSON = fs.readFileSync('./db/exams.json', 'utf8');
		var exams = JSON.parse(examJSON);
    newExam.id = exams.nextid;
		response.examId = newExam.id;
		response.status = 201;
    exams.exams.push(newExam);
    exams.nextid ++;
    let newJson = JSON.stringify(exams);
    fs.writeFileSync('./db/exams.json', newJson);
    return response;
  }
  else {
		response.status = 400;
		return response;
	}
}

module.exports.get = get;
module.exports.valid = valid;
module.exports.write = write;
