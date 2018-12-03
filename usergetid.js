var fs = require("fs");

var esisteUser = require("./esisteUser")

function usergetid(searchedId){

    if (searchedId >= 0 && typeof searchedId === "number")
    {
        var searchedUser = esisteUser(searchedId);
        if (!searchedUser)
            return 404;
        else return 200;

    } else return 400;

}

module.exports = usergetid;
