const GETexamsId = require ('../../core/exams/GETexamsId');
const resetJSON = require ('../utils/resetJSON');
const retreiveBackup = require ('../utils/retreiveBackup');
const fs = require('fs');
const fileExams = 'db/exams.json';
var fileBackupExams = null;

var errorRes = {"jsonData": null, "status": 400};
var notfoundRes = {"jsonData": null, "status": 404};

beforeAll(() => {
 fileBackupExams = retreiveBackup(fileExams);
});

afterEach(() => {
    resetJSON(fileExams, fileBackupExams);
});

//EXAMS/{EXAMSID} -> IDGET (TEST FORMATO ID PASSANO PER IDFOUND)
test('valid', () => {
	expect(GETexamsId(1)).toEqual({"status": 200, "jsonData": exams.exams[0]});
});

test('unvalid1: formato ID erroneo', () => {
	expect(GETexamsId(null)).toEqual(errorRes);
});

test('unvalid2: ID non esiste', () => {
	expect(GETexamsId(101)).toEqual(notfoundRes);
});
test('unvalid2: ID non esiste', () => {
	expect(GETexamsId(-2)).toEqual(notfoundRes);
});
test('unvalid2: ID non esiste', () => {
	expect(GETexamsId(101.10)).toEqual(notfoundRes);
});
test('unvalid2: ID non esiste', () => {
	expect(GETexamsId([101,1])).toEqual(notfoundRes);
});
