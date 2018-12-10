var esisteUser = require("./esisteUser");

var fs = require('fs');

function userdeleteid(searchedId) {

    if (searchedId >= 0 && typeof searchedId === "number") {
        var searchedUser = esisteUser(searchedId);
        if (searchedUser == -1)
            return { "status": 404, "jsonData": null };
        else {

            let imported = fs.readFileSync('db/users.json', 'utf8');

            let utenti = JSON.parse(imported);

            utenti['users'][searchedUser];
            utenti.users.splice(searchedUser, 1);

            let exported = JSON.stringify(utenti);

            fs.writeFileSync('db/users.json', exported);

            return { "status": 204, "jsonData": null };
        }

    } else return { "status": 400, "jsonData": null };

}

module.exports = userdeleteid;