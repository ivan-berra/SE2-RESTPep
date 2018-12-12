const checkExamId = require ('../../core/utils/checkExamId');
const resetJSON = require ('../utils/resetJSON');
const retreiveBackup = require ('../utils/retreiveBackup');
const fs = require('fs');
const fileExams = 'db/exams.json';
const url = 'http://localhost:3000/api/';
var fileBackupExams = null;

beforeAll(() => {
 fileBackupExams = retreiveBackup(fileExams);
});

afterEach(() => {
    resetJSON(fileExams, fileBackupExams);
});

// EXAMS/{EXAMSID} -> IDFOUND
test('valid', () => {
	expect(checkExamId(1)).toBe(0);
});

test('unvalid1: formato ID erroneo', () => {
	expect(checkExamId(null)).toBe(-1);
});

test('unvalid2: formato ID erroneo2', () => {
	expect(checkExamId('errore')).toBe(-1);
});

test('unvalid3: formato ID erroneo3', () => {
	expect(checkExamId(undefined)).toBe(-1);
});

test('unvalid4: ID non esiste', () => {
	expect(checkExamId(-10.3)).toBe(-2);
});

test('unvalid5: ID non esiste', () => {
	expect(checkExamId(9999)).toBe(-2);
});
