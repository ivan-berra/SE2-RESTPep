function groupget(){

    let imported = fs.readFileSync('db/groups.json', 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
    });

    let gruppi=JSON.parse(imported);

    return gruppi['groups'];

}

module.exports = groupget;
