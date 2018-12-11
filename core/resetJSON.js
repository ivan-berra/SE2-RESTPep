const fs = require("fs");

function resetJSON(file, backup) {
    fs.writeFileSync(file, JSON.stringify(backup), (err) => {
        if (err) console.log(err);
    })
}

module.exports = resetJSON;
