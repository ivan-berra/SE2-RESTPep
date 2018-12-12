const idGet = require('../core/exams/ExamId').idGet;
const idFound = require('../core/exams/ExamId').idFound;
const idDelete = require('../core/exams/ExamId').idDelete;
const idPut = require('../core/exams/ExamId').idPut;
const fs = require('fs');

let examJSON = fs.readFileSync('./db/exams.json', 'utf8');
var exams = JSON.parse(examJSON);

var errorRes = {"jsonData": null, "status": 400};
var notfoundRes = {"jsonData": null, "status": 404};
var testExam = {
	"destinatario":100,
	"deadline":"1010-10-10T10:10:10Z",
	"tasksarray":[1,10,11,100,101],
	"autore":101010,
	"condivisi":[110,111,101110]
};

afterEach(() => {
	testExam = {
		"destinatario":100,
		"deadline":"1010-10-10T10:10:10Z",
		"tasksarray":[1,10,11,100,101],
		"autore":101010,
		"condivisi":[110,111,101110]
	};
});

afterAll(() => {
	let newJson = JSON.stringify(exams);
	fs.writeFileSync('./db/exams.json', newJson);
})


// EXAMS/{EXAMSID} -> IDFOUND
test('valid', () => {
	expect(idFound(1)).toBe(0);
});

test('unvalid1: formato ID erroneo', () => {
	expect(idFound(null)).toBe(-1);
});

test('unvalid2: formato ID erroneo2', () => {
	expect(idFound('errore')).toBe(-1);
});

test('unvalid3: formato ID erroneo3', () => {
	expect(idFound(undefined)).toBe(-1);
});

test('unvalid4: ID non esiste', () => {
	expect(idFound(-10.3)).toBe(-2);
});

test('unvalid5: ID non esiste', () => {
	expect(idFound(9999)).toBe(-2);
});


//EXAMS/{EXAMSID} -> IDGET (TEST FORMATO ID PASSANO PER IDFOUND)
test('valid', () => {
	expect(idGet(1)).toEqual({"status": 200, "jsonData": exams.exams[0]});
});

test('unvalid1: formato ID erroneo', () => {
	expect(idGet(null)).toEqual(errorRes);
});

test('unvalid2: ID non esiste', () => {
	expect(idGet(101)).toEqual(notfoundRes);
});
test('unvalid2: ID non esiste', () => {
	expect(idGet(-2)).toEqual(notfoundRes);
});
test('unvalid2: ID non esiste', () => {
	expect(idGet(101.10)).toEqual(notfoundRes);
});
test('unvalid2: ID non esiste', () => {
	expect(idGet([101,1])).toEqual(notfoundRes);
});

//EXAMS/{EXAMSID} -> IDDELETE (TEST FORMATO ID PASSANO PER IDFOUND)
test('valid', () => {
	expect(idDelete(1)).toBe(204);
});

test('unvalid1: formato ID erroneo', () => {
	expect(idDelete(null)).toBe(400);
});

test('unvalid2: ID non esiste', () => {
	expect(idDelete(1010101010)).toBe(404);
});

//EXAMS/{EXAMSID} -> IDPUT (TEST FORMATO ID PASSANO PER IDFOUND, TEST FORMATO ESAMI PASSANO PER EXAM.VALID)
test('valid', () => {
	expect(idPut(testExam,2)).toBe(202);
});

test('unvalid1: formato ID erroneo', () => {
	expect(idPut(testExam,null)).toBe(400);
});

test('unvalid2: ID non esiste', () => {
	expect(idPut(testExam,1010101010)).toBe(404);
});

test("unvalid1: formato destinatario erroneo", () => {
	testExam.destinatario = "error";
	expect(idPut(testExam,2)).toBe(400);

});

test("unvalid2: formato deadline erroneo", () =>{
	testExam.deadline = 404;
  expect(idPut(testExam,2)).toBe(400);

});

test("unvalid3: formato tasksarray erroneo", () => {
	testExam.tasksarray = "error";
	expect(idPut(testExam,2)).toBe(400);

});

test("unvalid4: contenuto tasksarray erroneo", () => {
	testExam.tasksarray[0] = "error";
	expect(idPut(testExam,2)).toBe(400);
});

test("unvalid5: formato autore erroneo", () => {
	testExam.autore = "error";
	expect(idPut(testExam,2)).toBe(400);
});

test("unvalid6: formato condivisi erroneo", () => {
	testExam.condivisi = "error";
	expect(idPut(testExam,2)).toBe(400);
});

test("unvalid7: contenuto condivisi erroneo", () => {
	testExam.condivisi[0] = "error";
	expect(idPut(testExam,2)).toBe(400);
});

test("unvalid8: formato dati erroneo 1", () => {
	expect(idPut(testExam.destinatario,2)).toBe(400);
});

test("unvalid9: formato dati erroneo 2", () => {
	testExam.tasksarray = null;
	testExam.autore = null;
	testExam.condivisi = null;
	expect(idPut(testExam,2)).toBe(400);
});

test("unvalid10: formato dati erroneo 3", () => {
	testExam.autore = null;
	testExam.condivisi = null;
	expect(idPut(testExam,2)).toBe(400);
});

test("unvalid11: formato dati erroneo 4", () => {
	testExam.condivisi = null;
	expect(idPut(testExam,2)).toBe(400);
});
