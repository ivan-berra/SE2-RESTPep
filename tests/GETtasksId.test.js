const GETtasksId = require('../core/tasks/GETtasksId');
const retreiveBackup = require('../core/retreiveBackup');
const resetJSON = require('../core/resetJSON');
const file = 'db/tasks.json';
let fileBackup = null

beforeAll(() => {
    fileBackup = retreiveBackup(file);
})

afterEach(() => {
    resetJSON(file, fileBackup);
})

test('valid test: id found', () => {
	let res = GETtasksId(1);
	expect(res.status).toBe(200);
	expect(res.jsonData).toEqual( { id: 1,
         aperta: true,
         consegna: 'domanda aperta... ?',
         risoluzione: 'risposta...',
         punteggiomax: 10 });
});

test('invalid test: id is a string', () => {
	let res = GETtasksId('$');
	expect(res.status).toBe(400);
});

test('invalid test: id not positive', () => {
	let res = GETtasksId('-1');
	expect(res.status).toBe(400);
});

test('invalid test: id not found', () => {

	let res = GETtasksId(999);
	expect(res.status).toBe(404);
})

test('invalid test: id not found', () => {

	let res = GETtasksId(4);
	expect(res.status).toBe(404);
})

test('invalid test: id null', () => {

	let res = GETtasksId(null);
	expect(res.status).toBe(400);
})


test('invalid test: id undefined', () => {

	let res = GETtasksId(undefined);
	expect(res.status).toBe(400);


})
const fs = require('fs');

test('invalid test: error during reading db/tasks', () => {
	fs.writeFileSync(file, "not json");
	let res = GETtasksId(1);
	expect(res.status).toBe(500);
})
