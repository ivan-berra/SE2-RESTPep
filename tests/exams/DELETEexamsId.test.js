const DELETEexamsId = require ('../../core/exams/DELETEexamsId');
const resetJSON = require ('../utils/resetJSON');
const retreiveBackup = require ('../utils/retreiveBackup');
const fs = require('fs');
const fileExams = 'db/exams.json';
var fileBackupExams = null;

beforeAll(() => {
 fileBackupExams = retreiveBackup(fileExams);
});

afterEach(() => {
    resetJSON(fileExams, fileBackupExams);
});


//EXAMS/{EXAMSID} -> IDDELETE (TEST FORMATO ID PASSANO PER IDFOUND)
test('valid', () => {
	expect(DELETEexamsId(1)).toBe(204);
});

test('unvalid1: formato ID erroneo', () => {
	expect(DELETEexamsId(null)).toBe(400);
});

test('unvalid2: ID non esiste', () => {
	expect(DELETEexamsId(1010101010)).toBe(404);
});
