const userpost = require('./userpost');

test('Test valido', () => {

    expect(userpost(197621, "prova@prova.com", false)).toBe(200);

});

test('Test non valido: matricola è una stringa', () => {
    expect(userpost("test", "prova@prova.com", false)).toBe(400);

});

test('Test non valido: matricola è un boolean', () => {
    expect(userpost(true, "prova@prova.com", false)).toBe(400);

});

test('Test non valido: matricola è un null', () => {
    expect(userpost(null, "prova@prova.com", false)).toBe(400);

});

test('Test non valido: matricola è un undefined', () => {
    expect(userpost(undefined, "prova@prova.com", false)).toBe(400);

});

test('Test non valido: matricola è inferiore a 0', () => {
    expect(userpost(-1, "prova@prova.com", false)).toBe(400);

});

test('Test non valido: email è un boolean', () => {
    expect(userpost(197621, true, false)).toBe(400);

});

test('Test non valido: email è un null', () => {
    expect(userpost(197621, null, false)).toBe(400);

});

test('Test non valido: email è un undefined', () => {
    expect(userpost(197621, undefined, false)).toBe(400);

});

test('Test non valido: email è un numero', () => {
    expect(userpost(197621, 300, false)).toBe(400);

});

test('Test non valido: email non è una mail valida', () => {
    expect(userpost(197621, "prova", false)).toBe(400);

});

test('Test non valido: isTeacher è un numero', () => {
    expect(userpost(197621, "prova@prova.com", 30)).toBe(400);

});

test('Test non valido: isTeacher è un null', () => {
    expect(userpost(197621, "prova@prova.com", null)).toBe(400);

});

test('Test non valido: isTeacher è una stringa', () => {
    expect(userpost(197621, "prova@prova.com", "forse")).toBe(400);

});

test('Test non valido: isTeacher è un undefined', () => {
    expect(userpost(197621, "prova@prova.com", undefined)).toBe(400);

});




