function exampost(destinatario, deadline, tasksarray, autore, condivisi){
    if(typeof deadline === "string"){
      if(typeof destinatario === "number" && Number.isInteger(destinatario)){
        if(typeof autore === "number" && Number.isInteger(autore)){
          if(typeof condivisi === "object" && condivisi != null){
            if(typeof tasksarray === "object" && tasksarray != null){
              var formaterror = false;
              for(var i=0; i<tasksarray.length && !formaterror; i++){
                if(!(typeof tasksarray[i] === "number" && Number.isInteger(tasksarray[i])))
                  formaterror = true;
              }
              for(var i=0; i<condivisi.length && !formaterror; i++){
                if(!(typeof condivisi[i] === "number" && Number.isInteger(condivisi[i])))
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

module.exports = exampost;
