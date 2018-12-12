const userdeleteid = require('../core/users/DELETEuserId');

const retreiveBackup = require('../core/retreiveBackup');
const resetJSON = require('../core/resetJSON');

const file = 'db/users.json';

let fileBackup = null

beforeAll(() => {
    fileBackup = retreiveBackup(file);
})

afterEach(() => {
    resetJSON(file, fileBackup);
})


test('Test valido', () => {

    expect(userdeleteid(0).status).toBe(204);

});

test('Test non valido: id negativo', () => {
    expect(userdeleteid(-1).status).toBe(400);

});

test('Test valido: utente non esistente', () => {
    expect(userdeleteid(200).status).toBe(404);

});

test('Test non valido: id stringa', () => {
    expect(userdeleteid("alfa").status).toBe(400);

});

test('Test non valido: id booleano', () => {
    expect(userdeleteid(false).status).toBe(400);

});

test('Test non valido: id null', () => {
    expect(userdeleteid(null).status).toBe(400);

});

test('Test non valido: id undefined', () => {
    expect(userdeleteid(undefined).status).toBe(400);

});