function userget(){

    let imported = fs.readFileSync('./users.json', 'utf8');

    let utenti=JSON.parse(imported);

    return utenti['users'];

}

module.exports = userget;
