const usergetid = require('./usergetid');

test('Test valido', () => {

    expect(usergetid(1)).toBe(200);

});

test('Test non valido: id negativo', () => {
    expect(usergetid(-1)).toBe(400);

});

test('Test valido: utente non esistente', () => {
    expect(usergetid(200)).toBe(404);

});

test('Test non valido: id stringa', () => {
    expect(usergetid("alfa")).toBe(400);

});

test('Test non valido: id booleano', () => {
    expect(usergetid(false)).toBe(400);

});

test('Test non valido: id null', () => {
    expect(usergetid(null)).toBe(400);

});

test('Test non valido: id undefined', () => {
    expect(usergetid(undefined)).toBe(400);

});
