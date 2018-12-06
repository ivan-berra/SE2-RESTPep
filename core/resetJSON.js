const fs = require("fs");

function resetJSON(file, backup) {
    fs.writeFileSync(file, JSON.stringify(backup));
}

module.exports = resetJSON;
