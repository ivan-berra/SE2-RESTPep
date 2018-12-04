const valid = require ('./core/Exam').valid;
const write = require ('./core/Exam').write;
const get = require ('./core/Exam').get;
const fs = require('fs');

let examJSON = fs.readFileSync('./db/exams.json', 'utf8');
var exams = JSON.parse(examJSON);

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
	fs.writeFileSync('./exams.json', newJson);
})


// EXAMS -> GET
test('exams.json not a JSON', () => {
	let newJson = "blabla";
	fs.writeFileSync('./exams.json', newJson);
	expect(get()).toBe(500);
});

test('valid', () => {
	let newJson = JSON.stringify(exams);
	fs.writeFileSync('./exams.json', newJson);
	expect(get()).toEqual(exams);
});


//EXAMS -> VALID
test('valid', () => {
	expect(valid(testExam)).toBe(200);
});

test("unvalid1: formato destinatario erroneo", () => {
	testExam.destinatario = "error";
	expect(valid(testExam)).toBe(400);

});

test("unvalid2: formato deadline erroneo", () =>{
	testExam.deadline = 404;
  expect(valid(testExam)).toBe(400);

});

test("unvalid3: formato tasksarray erroneo", () => {
	testExam.tasksarray = "error";
	expect(valid(testExam)).toBe(400);

});

test("unvalid4: contenuto tasksarray erroneo", () => {
	testExam.tasksarray[0] = "error";
	expect(valid(testExam)).toBe(400);
});

test("unvalid5: formato autore erroneo", () => {
	testExam.autore = "error";
	expect(valid(testExam)).toBe(400);
});

test("unvalid6: formato condivisi erroneo", () => {
	testExam.condivisi = "error";
	expect(valid(testExam)).toBe(400);
});

test("unvalid7: contenuto condivisi erroneo", () => {
	testExam.condivisi[0] = "error";
	expect(valid(testExam)).toBe(400);
});

test("unvalid8: formato dati erroneo 1", () => {
	expect(valid(testExam.destinatario)).toBe(400);
});

test("unvalid9: formato dati erroneo 2", () => {
	testExam.tasksarray = null;
	testExam.autore = null;
	testExam.condivisi = null;
	expect(valid(testExam)).toBe(400);
});

test("unvalid10: formato dati erroneo 3", () => {
	testExam.autore = null;
	testExam.condivisi = null;
	expect(valid(testExam)).toBe(400);
});

test("unvalid11: formato dati erroneo 4", () => {
	testExam.condivisi = null;
	expect(valid(testExam)).toBe(400);
});


//EXAMS -> WRITE
test('valid', () => {
	expect(write(exams.exams[0])).toBe(200);
});

test("unvalid1: formato esame erroneo", () => {
	testExam.destinatario = "error";
	expect(write(testExam)).toBe(400);
});
