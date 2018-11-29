const idGet = require('./ExamId').idGet;
const fs = require('fs');

let examJSON = fs.readFileSync('./exams.json', 'utf8', function(err, data){
	if (err) throw err;
	let parsedJson = JSON.parse(data);
});
var exams = JSON.parse(examJSON);

test('valid', () => {
	expect(idGet(1)).toEqual(exams.exams[0]);
});

test('unvalid1: formato ID erroneo', () => {
	expect(idGet(null)).toBe(400);
});

test('unvalid2: formato ID erroneo2', () => {
	expect(idGet('errore')).toBe(400);
});

test('unvalid3: ID non esiste', () => {
	expect(idGet(9999)).toBe(404);
});
