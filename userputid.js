var fs = require('fs');
var validateEmail = require('./validateEmail');
var esisteUser = require("./esisteUser");


function userput(searchedId, matricola, email, isTeacher){
    
    if (searchedId >= 0 && typeof searchedId === "number")
    {
        var searchedUser = esisteUser(searchedId);
        if (!searchedUser)
            return {"status": 404, "jsonData": null};
    

    var newMatricola = false;
    var newEmail = false;
    var newTeacher = false;

    var validMatricola = false;
    var validEmail = false;
    var validTeacher = false;

    if (matricola != null)
        newMatricola = true;
    if (email != null)
        newEmail = true;
    if (isTeacher != null)
        newTeacher = true;

    if((!newMatricola) || (typeof matricola === "number" && matricola > 0))
        validMatricola = true;

    if((!email) || (typeof email === "string" && validateEmail(email)))
        validEmail = true;

    if((!newTeacher) || (typeof isTeacher === "boolean"))
        validTeacher = true;
        
        if(validMatricola && validEmail && validTeacher && (newMatricola || newEmail || newTeacher))
        {	    
                let imported = fs.readFileSync('./users.json', 'utf8');
                
                    let utenti=JSON.parse(imported);
                
                    if(newMatricola)
                        utenti['users'][searchedId].mat = matricola;
                        
                    if(newEmail)
                        utenti['users'][searchedId].email = email;

                    if(newTeacher)
                        utenti['users'][searchedId].isTeacher = isTeacher;

                    let exported=JSON.stringify(utenti);
                
                fs.writeFileSync('./users.json', exported);
                
                return {"status": 200, "jsonData": null};;	     
                
        }
        else return {"status": 400, "jsonData": null};;
    }
    else return {"status": 400, "jsonData": null};;

}

module.exports = userput;
