const userdeleteid = require('./userdeleteid');

test('Test valido', () => {

    expect(userdeleteid(0)).toBe(204);

});

test('Test non valido: id negativo', () => {
    expect(userdeleteid(-1)).toBe(400);

});

test('Test valido: utente non esistente', () => {
    expect(userdeleteid(200)).toBe(404);

});

test('Test non valido: id stringa', () => {
    expect(userdeleteid("alfa")).toBe(400);

});

test('Test non valido: id booleano', () => {
    expect(userdeleteid(false)).toBe(400);

});

test('Test non valido: id null', () => {
    expect(userdeleteid(null)).toBe(400);

});

test('Test non valido: id undefined', () => {
    expect(userdeleteid(undefined)).toBe(400);

});
