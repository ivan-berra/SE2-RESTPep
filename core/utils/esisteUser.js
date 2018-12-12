var fs = require('fs');

function esisteUser(idUser) {
    //var imported = require('./users.json');
    let imported = fs.readFileSync('db/users.json', 'utf8', function(err, data) {
        if (err) throw err; // we'll not consider error handling for now
        var obj = JSON.parse(data);
    });
    /*var re = /\0/g;
    var utenti=JSON.parse(imported.toString().replace(re, ""));*/
    let utenti = JSON.parse(imported);
    var lookingAt = idUser;
    let tmp = utenti.users[lookingAt];
    if (utenti.nextId <= idUser)
        return -1;
    else if (tmp != null && tmp != undefined && tmp.id == idUser)
        return idUser;
    else {
        let beginSearch = 0;
        let endSearch = utenti.users.length - 1;
        lookingAt = Math.floor(((beginSearch + endSearch) / 2));
        do {
            lookingAt = Math.floor(((beginSearch + endSearch) / 2));
            tmp = utenti.users[lookingAt];
            if (tmp == null) {
                let indice = lookingAt - 1;
                while (indice >= beginSearch && utenti.users[indice] == null)
                    indice--;
                if (indice < beginSearch) {
                    indice = lookingAt + 1;
                    while (indice <= endSearch && utenti.users[indice] == null)
                        indice++;
                    if (indice > endSearch)
                        return -1;
                    else {
                        tmp = utenti.users[indice];
                        if (tmp.id < idUser)
                            beginSearch = indice + 1;
                        else if (tmp.id > idUser)
                            endSearch = indice - 1;
                        else if (tmp.id == idUser)
                            return indice;
                    }
                } else {
                    tmp = utenti.users[indice];
                    if (tmp.id < idUser)
                        beginSearch = indice + 1;
                    else if (tmp.id > idUser)
                        endSearch = indice - 1;
                    else if (tmp.id == idUser)
                        return indice;
                }
            } else if (tmp.id < idUser)
                beginSearch = lookingAt + 1;
            else if (tmp.id > idUser)
                endSearch = lookingAt - 1;
            else if (tmp.id == idUser)
                return lookingAt;
        } while (beginSearch <= endSearch)
        return -1;
    }
}

module.exports = esisteUser;