const userpost = require('../core/users/POSTuser');

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

    var received = userpost(197621, "prova@prova.com", false);

    expect(received.status).toBe(200);

});

test('Test non valido: matricola è una stringa', () => {

    var received = userpost("test", "prova@prova.com", false);

    expect(received.status).toBe(400);

});

test('Test non valido: matricola è un boolean', () => {

    var received = userpost(true, "prova@prova.com", false);

    expect(received.status).toBe(400);

});

test('Test non valido: matricola è un null', () => {

    var received = userpost(null, "prova@prova.com", false);

    expect(received.status).toBe(400);

});

test('Test non valido: matricola è un undefined', () => {

    var received = userpost(undefined, "prova@prova.com", false);

    expect(received.status).toBe(400);

});

test('Test non valido: matricola è inferiore a 0', () => {


    var received = userpost(-1, "prova@prova.com", false);

    expect(received.status).toBe(400);

});

test('Test non valido: email è un boolean', () => {

    var received = userpost(197621, true, false);

    expect(received.status).toBe(400);

});

test('Test non valido: email è un null', () => {

    var received = userpost(197621, null, false);

    expect(received.status).toBe(400);

});

test('Test non valido: email è un undefined', () => {

    var received = userpost(197621, undefined, false);

    expect(received.status).toBe(400);

});

test('Test non valido: email è un numero', () => {

    var received = (userpost(197621, 300, false));

    expect(received.status).toBe(400);

});

test('Test non valido: email non è una mail valida', () => {

    var received = userpost(197621, "prova", false);

    expect(received.status).toBe(400);

});

test('Test non valido: isTeacher è un numero', () => {

    var received = userpost(197621, "prova@prova.com", 30);

    expect(received.status).toBe(400);

});

test('Test non valido: isTeacher è un null', () => {

    var received = userpost(197621, "prova@prova.com", null);

    expect(received.status).toBe(400);

});

test('Test non valido: isTeacher è una stringa', () => {

    var received = userpost(197621, "prova@prova.com", "forse");

    expect(received.status).toBe(400);

});

test('Test non valido: isTeacher è un undefined', () => {

    var received = userpost(197621, "prova@prova.com", undefined);

    expect(received.status).toBe(400);

});