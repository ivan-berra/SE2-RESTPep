const DELETEtasksId = require('../../core/tasks/DELETEtasksId');
const retreiveBackup = require('../utils/retreiveBackup');
const resetJSON = require('../utils/resetJSON');

const file = 'db/tasks.json';

let fileBackup = null

beforeAll(() => {
    fileBackup = retreiveBackup(file);
})

afterEach(() => {
    resetJSON(file, fileBackup);
})


test('Test valido', () => {

    expect(DELETEtasksId(0)).toBe(204);

});

test('Test non valido: id negativo', () => {
    expect(DELETEtasksId(-1)).toBe(400);

});

test('Test valido: task non esistente', () => {
    expect(DELETEtasksId(200)).toBe(404);

});

test('Test non valido: id stringa', () => {
    expect(DELETEtasksId("alfa")).toBe(400);

});

test('Test non valido: id booleano', () => {
    expect(DELETEtasksId(false)).toBe(400);

});

test('Test non valido: id null', () => {
    expect(DELETEtasksId(null)).toBe(400);

});

test('Test non valido: id undefined', () => {
    expect(DELETEtasksId(undefined)).toBe(400);

});


test('Test invalido: id not found', () => {
	let received = DELETEtasksId(4);
	expect(received).toEqual(404);
});

test('Test invalido: error during reading db/tasks', () => {
	require('fs').writeFileSync(file, "not json");
	expect(DELETEtasksId(1)).toBe(500);

});
