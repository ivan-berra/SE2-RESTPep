var fs = require('fs');

function userget(){

    let imported = fs.readFileSync('db/users.json', 'utf8');

    let utenti=JSON.parse(imported);

    return {"status": 200, "jsonDatautenti":['users']};

}

module.exports = userget;
