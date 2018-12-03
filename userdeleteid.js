var esisteUser = require("./esisteUser");

var fs = require('fs');

function userdeleteid(searchedId){

    if (searchedId >= 0 && typeof searchedId === "number")
    {
        var searchedUser = esisteUser(searchedId);
        if (!searchedUser)
            return 404;
        else {

            let imported = fs.readFileSync('./users.json', 'utf8');
	    
            let utenti=JSON.parse(imported);
            
            delete utenti['users'][searchedId];
            
            let exported=JSON.stringify(utenti);
	    
	        fs.writeFileSync('./users.json', exported);
            
            return 204;
        }

    } else return 400;

}

module.exports = userdeleteid;
