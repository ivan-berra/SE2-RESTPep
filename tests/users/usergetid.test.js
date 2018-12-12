const usergetid = require('../../core/users/GETuserId');

const retreiveBackup = require('../utils/retreiveBackup');
const resetJSON = require('../utils/resetJSON');

const file = 'db/users.json';

let fileBackup = null

beforeAll(() => {
    fileBackup = retreiveBackup(file);
})

afterEach(() => {
    resetJSON(file, fileBackup);
})

test('Test valido', () => {

    var received = usergetid(2);

    expect(received.status).toBe(200);
    expect(received.jsonData.mat).toBe(137846);
    expect(received.jsonData.email).toBe("emailuser2@legitmail.com");
    expect(received.jsonData.isTeacher).toBe(false);

});

test('Test non valido: id negativo', () => {

    var received = usergetid(-1);

    expect(received.status).toBe(400);

});

test('Test valido: utente non esistente', () => {

    var received = usergetid(200);

    expect(received.status).toBe(404);

});

test('Test non valido: id stringa', () => {

    var received = usergetid("alfa");

    expect(received.status).toBe(400);

});

test('Test non valido: id booleano', () => {

    var received = usergetid(false);

    expect(received.status).toBe(400);

});

test('Test non valido: id null', () => {

    var received = usergetid(null);

    expect(received.status).toBe(400);

});

test('Test non valido: id undefined', () => {

    var received = usergetid(undefined);

    expect(received.status).toBe(400);

});