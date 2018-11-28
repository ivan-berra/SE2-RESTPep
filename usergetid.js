var fs = require("fs");

function usergetid(searchedId){

    if (searchedId >= 0 && typeof searchedId === "number")
    {
        var searchedUser = esisteUser(searchedId);
        if (!searchedUser)
            return 404;
        else return 200;

    } else return 400;

}

function esisteUser(idUser)
{
	let imported = fs.readFileSync('./users.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
	});
	var utenti = JSON.parse(imported);
	var lookingAt=idUser;
	if(utenti.nextId<=idUser)
		return false;
	else if (utenti.users[lookingAt].id==idUser)
		return true;
	else {
		var beginSearch=0;
		var endSearch=utenti.nextId-1;
		do{
			if(utenti.users[lookingAt]<idUser)
				beginSearch=lookingAt+1;
			else if (utenti.users[lookingAt]>idUser)
				endSearch=lookingAt-1;
			else if(utenti.users[lookingAt]==idUser)
				return true;
			lookingAt=((beginSearch+endSearch)/2);
		}while(beginSearch<=endSearch)
		return false;
	}
}

module.exports = usergetid;
