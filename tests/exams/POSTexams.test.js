const POSTexams = require ('../../core/exams/POSTexams');
const resetJSON = require ('../utils/resetJSON');
const retreiveBackup = require ('../utils/retreiveBackup');
const fs = require('fs');
const fileExams = 'db/exams.json';
const url = 'http://localhost:3000/api/';
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


//EXAMS -> POST (TEST FORMATO PASSANO IN CHECKEXAMSFORMAT)
test('valid', () => {
	expect(POSTexams(testExam)).toEqual({"status":201, "examId": 3});
});

test("unvalid1: formato esame erroneo", () => {
	testExam.destinatario = "error";
	expect(POSTexams(testExam)).toEqual({"status":400, "examId": null});
});
