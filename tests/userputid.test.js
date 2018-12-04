const userput = require('../core/userputid');

test('Test valido', () => {

    expect(userput(1, 197621, "prova@prova.com", false).status).toBe(200);

});

test('Test valido: utente non trovato', () => {

    expect(userput(1000, 197621, "prova@prova.com", false).status).toBe(404);

});

test('Test valido: matricola è un null', () => {
    expect(userput(1, null, "prova@prova.com", false).status).toBe(200);

});

test('Test valido: email è un null', () => {
    expect(userput(1, 197621, null, false).status).toBe(200);

});

test('Test valido: email è un undefined', () => {
    expect(userput(1, 197621, undefined, false).status).toBe(200);

});

test('Test valido: isTeacher è un undefined', () => {
    expect(userput(1, 197621, "prova@prova.com", undefined).status).toBe(200);

});

test('Test valido: isTeacher è un null', () => {
    expect(userput(1, 197621, "prova@prova.com", null).status).toBe(200);

});

test('Test valido: matricola è un undefined', () => {
    expect(userput(1, undefined, "prova@prova.com", false).status).toBe(200);

});

test('Test non valido: id è null', () => {
    expect(userput(null, 197621, "prova@prova.com", false).status).toBe(400);

});

test('Test non valido: nessuna informazione inserita', () => {
    expect(userput(null, null, null, null).status).toBe(400);

});

test('Test non valido: nessuna informazione di modifica', () => {
    expect(userput(1, null, null, null).status).toBe(400);

});

test('Test non valido: id è una stringa', () => {
    expect(userput("alfa", 197621, "prova@prova.com", false).status).toBe(400);

});

test('Test non valido: id è un boolean', () => {
    expect(userput(true, 197621, "prova@prova.com", false).status).toBe(400);

});

test('Test non valido: id è undefined', () => {
    expect(userput(undefined, 197621, "prova@prova.com", false).status).toBe(400);

});

test('Test non valido: id è negativo', () => {
    expect(userput(-1, 197621, "prova@prova.com", false).status).toBe(400);

});

test('Test non valido: matricola è una stringa', () => {
    expect(userput(1, "test", "prova@prova.com", false).status).toBe(400);

});

test('Test non valido: matricola è un boolean', () => {
    expect(userput(1, true, "prova@prova.com", false).status).toBe(400);

});

test('Test non valido: matricola è inferiore a 0', () => {
    expect(userput(1, -1, "prova@prova.com", false).status).toBe(400);

});

test('Test non valido: email è un boolean', () => {
    expect(userput(1, 197621, true, false).status).toBe(400);

});

test('Test non valido: email è un numero', () => {
    expect(userput(1, 197621, 300, false).status).toBe(400);

});

test('Test non valido: email non è una mail valida', () => {
    expect(userput(1, 197621, "prova", false).status).toBe(400);

});

test('Test non valido: isTeacher è un numero', () => {
    expect(userput(1, 197621, "prova@prova.com", 30).status).toBe(400);

});

test('Test non valido: isTeacher è una stringa', () => {
    expect(userput(1, 197621, "prova@prova.com", "forse").status).toBe(400);

});





