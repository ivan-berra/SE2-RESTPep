var esisteUser = require("./esisteUser");

var fs = require('fs');

function userdeleteid(searchedId){

    if (searchedId >= 0 && typeof searchedId === "number")
    {
        var searchedUser = esisteUser(searchedId);
        if (!searchedUser)
            return {"status": 404, "jsonData": null};
        else {

            let imported = fs.readFileSync('./users.json', 'utf8');
	    
            let utenti=JSON.parse(imported);
            
            delete utenti['users'][searchedId];
            
            let exported=JSON.stringify(utenti);
	    
	        fs.writeFileSync('./users.json', exported);
            
                return {"status": 204, "jsonData": null};
        }

    } else return {"status": 400, "jsonData": null};

}

module.exports = userdeleteid;
