function exampost(destinatario, deadline, tasklist, autore, condivisi){
    if(typeof deadline === "string"){
      if(typeof destinatario === "number" && Number.isInteger(destinatario)){
        if(typeof autore === "number" && Number.isInteger(autore)){
          if(typeof condivisi === "object" && condivisi != null){
            if(typeof tasklist === "object" && tasklist != null){
              var formaterror = false;
              for(var i=0; i<tasklist.length && !formaterror; i++){
                if(!(typeof tasklist[i] === "number" && Number.isInteger(tasklist[i])))
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
