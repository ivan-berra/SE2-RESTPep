const PUTexamsId = require ('../../core/exams/PUTexamsId');
const resetJSON = require ('../utils/resetJSON');
const retreiveBackup = require ('../utils/retreiveBackup');
const fs = require('fs');
const fileExams = 'db/exams.json';
var fileBackupExams = null;
var testExam = {
 "destinatario":100,
 "deadline":"1010-10-10T10:10:10Z",
 "tasksarray":[1,10,11,100,101],
 "autore":101010,
 "condivisi":[110,111,101110]
};
beforeAll(() => {
 fileBackupExams = retreiveBackup(fileExams);
});

afterEach(() => {
    resetJSON(fileExams, fileBackupExams);
    testExam = {
      "destinatario":100,
      "deadline":"1010-10-10T10:10:10Z",
      "tasksarray":[1,10,11,100,101],
      "autore":101010,
      "condivisi":[110,111,101110]
    };
});

//EXAMS/{EXAMSID} -> IDPUT (TEST FORMATO ID PASSANO PER IDFOUND, TEST FORMATO ESAMI PASSANO PER EXAM.VALID)
test('valid', () => {
	expect(PUTexamsId(testExam,2)).toBe(202);
});

test('unvalid1: formato ID erroneo', () => {
	expect(PUTexamsId(testExam,null)).toBe(400);
});

test('unvalid2: ID non esiste', () => {
	expect(PUTexamsId(testExam,1010101010)).toBe(404);
});

test("unvalid1: formato destinatario erroneo", () => {
	testExam.destinatario = "error";
	expect(PUTexamsId(testExam,2)).toBe(400);

});

test("unvalid2: formato deadline erroneo", () =>{
	testExam.deadline = 404;
  expect(PUTexamsId(testExam,2)).toBe(400);

});

test("unvalid3: formato tasksarray erroneo", () => {
	testExam.tasksarray = "error";
	expect(PUTexamsId(testExam,2)).toBe(400);

});

test("unvalid4: contenuto tasksarray erroneo", () => {
	testExam.tasksarray[0] = "error";
	expect(PUTexamsId(testExam,2)).toBe(400);
});

test("unvalid5: formato autore erroneo", () => {
	testExam.autore = "error";
	expect(PUTexamsId(testExam,2)).toBe(400);
});

test("unvalid6: formato condivisi erroneo", () => {
	testExam.condivisi = "error";
	expect(PUTexamsId(testExam,2)).toBe(400);
});

test("unvalid7: contenuto condivisi erroneo", () => {
	testExam.condivisi[0] = "error";
	expect(PUTexamsId(testExam,2)).toBe(400);
});

test("unvalid8: formato dati erroneo 1", () => {
	expect(PUTexamsId(testExam.destinatario,2)).toBe(400);
});

test("unvalid9: formato dati erroneo 2", () => {
	testExam.tasksarray = null;
	testExam.autore = null;
	testExam.condivisi = null;
	expect(PUTexamsId(testExam,2)).toBe(400);
});

test("unvalid10: formato dati erroneo 3", () => {
	testExam.autore = null;
	testExam.condivisi = null;
	expect(PUTexamsId(testExam,2)).toBe(400);
});

test("unvalid11: formato dati erroneo 4", () => {
	testExam.condivisi = null;
	expect(PUTexamsId(testExam,2)).toBe(400);
});
