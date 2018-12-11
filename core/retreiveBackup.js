const fs = require("fs");

function retreiveBackup(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

module.exports = retreiveBackup;
