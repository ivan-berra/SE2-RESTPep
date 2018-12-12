const DELETEtasksId = require('../core/DELETEtasksId');
const fs = require('fs');

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


test('Test valido', () => {

    expect(DELETEtasksId(0)).toBe(200);

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
