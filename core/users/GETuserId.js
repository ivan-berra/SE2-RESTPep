var fs = require("fs");

var esisteUser = require("../utils/esisteUser");

function GETuserId(searchedId) {

    if (searchedId >= 0 && typeof searchedId === "number") {
        var searchedUser = esisteUser(searchedId);
        if (searchedUser == -1)
            return { "status": 404, "jsonData": null };
        else {
            let imported = fs.readFileSync('db/users.json', 'utf8');

            let utenti = JSON.parse(imported);

            return {
                "status": 200,
                "jsonData": { "id": utenti['users'][searchedUser].id, "mat": utenti['users'][searchedUser].mat, "email": utenti['users'][searchedUser].email, "isTeacher": utenti['users'][searchedUser].isTeacher }
            };

        }

    } else return { "status": 400, "jsonData": null };

}

module.exports = GETuserId;