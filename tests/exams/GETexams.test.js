const GETexams = require ('../../core/exams/GETexams');
const resetJSON = require ('../utils/resetJSON');
const retreiveBackup = require ('../utils/retreiveBackup');
const fs = require('fs');
const fileExams = 'db/exams.json';
var fileBackupExams = null;
let examJSON = fs.readFileSync('./db/exams.json', 'utf8');
var exams = JSON.parse(examJSON);

beforeAll(() => {
 fileBackupExams = retreiveBackup(fileExams);
});

afterEach(() => {
    resetJSON(fileExams, fileBackupExams);
});


// EXAMS -> GET (TEST FORMATO PASSANO IN CHECKEXAMSFORMAT)
test('exams.json not a JSON', () => {
	let newJson = "blabla";
	fs.writeFileSync('./db/exams.json', newJson);
	expect(GETexams()).toEqual({"status": 500, "jsonData": null});
});

test('valid', () => {
	let newJson = JSON.stringify(exams);
	fs.writeFileSync('./db/exams.json', newJson);
	expect(GETexams()).toEqual({"status": 200, "jsonData": exams});
});
