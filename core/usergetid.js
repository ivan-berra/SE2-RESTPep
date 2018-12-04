var fs = require("fs");

var esisteUser = require("./esisteUser")

function usergetid(searchedId){

    if (searchedId >= 0 && typeof searchedId === "number")
    {
        var searchedUser = esisteUser(searchedId);
        if (!searchedUser)
            return {"status": 404, "jsonData": null};
        else {
            let imported = fs.readFileSync('db/users.json', 'utf8');
	    
            let utenti=JSON.parse(imported);
            
            return {
                "status": 200,
                "jsonData": {"id":utenti['users'][searchedId].id,"mat":utenti['users'][searchedId].mat,"email":utenti['users'][searchedId].email,"isTeacher":utenti['users'][searchedId].isTeacher}
            };
            
        }

    } else return {"status":400, "jsonData": null};

}

module.exports = usergetid;