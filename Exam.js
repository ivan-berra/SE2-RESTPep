const fs = require('fs');

function get(){
	let examJSON = fs.readFileSync('./exams.json', 'utf8');
	try{
		let exams = JSON.parse(examJSON);
		return [200,exams];
	}catch(error){return [500,null];}
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
  if(valid(newExam) == 200){
		let examJSON = fs.readFileSync('./exams.json', 'utf8');
		var exams = JSON.parse(examJSON);
    newExam.id = exams.nextid;
    exams.exams.push(newExam);
    exams.nextid ++;
    let newJson = JSON.stringify(exams);
    fs.writeFileSync('./exams.json', newJson);
    return [201,newExam.id];
  }
  else return [400,null];
}

module.exports.get = get;
module.exports.valid = valid;
module.exports.write = write;
