mongo = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/examDatabase";

mongo.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created.");

    var dbo = db.db("examDatabase")

    db.close();
})