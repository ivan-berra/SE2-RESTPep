var fs = require('fs');

function GETgroup(){

  let imported = fs.readFileSync('db/groups.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
  });

  let gruppi=JSON.parse(imported);

  return gruppi.groups;

}

module.exports = GETgroup;
