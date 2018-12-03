var fs = require('fs');
var validateEmail = require('./validateEmail');

function userpost(matricola, email, isTeacher){
    if(typeof matricola === "number" && typeof email === "string" && typeof isTeacher === "boolean")
    {	    
	
	if (matricola > 0 && validateEmail(email))
	    
	{

	    let imported = fs.readFileSync('./users.json', 'utf8');
	    
            let utenti=JSON.parse(imported);
            let idUtente=utenti.nextId;
            utenti.nextId=idUtente+1;
	    
            utenti['users'].push({"id":idUtente,"mat":matricola,"email":email,"isTeacher":isTeacher});
            let exported=JSON.stringify(utenti);
	    
	    fs.writeFileSync('./users.json', exported);
        
        return {
            "status": 200, 
            "jsonData": {"id":idUtente,"mat":matricola,"email":email,"isTeacher":isTeacher}
        };	
            
	}
	
	else return {"status":400, "jsonData": null};
	
    }

    else return {"status":400, "jsonData": null};

}

module.exports = userpost;
