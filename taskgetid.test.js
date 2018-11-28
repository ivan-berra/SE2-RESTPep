const taskgetid = require('./taskgetid');


test('Test valido', () => {

    expect(taskgetid(3)).toBe(200);

});

test('Test valido', () => {
    expect(taskgetid(5)).toBe(200);
});

test('Test valido', () => {
    expect(taskgetid(4)).toBe(404);
});

test('Test valido: id negativo', () => {
    expect(taskgetid(1)).toBe(200);

});


test('Test valido: id negativo', () => {
    expect(taskgetid(0)).toBe(200);

});

test('Test valido: utente non esistente', () => {
    expect(taskgetid(200)).toBe(404);
});

test('Test non valido: id negativo', () => {
    expect(taskgetid(-1)).toBe(400);

});


test('Test non valido: id stringa', () => {
    expect(taskgetid("alfa")).toBe(400);

});

test('Test non valido: id booleano', () => {
    expect(taskgetid(false)).toBe(400);

});

test('Test non valido: id null', () => {
    expect(taskgetid(null)).toBe(400);

});

test('Test non valido: id undefined', () => {
    expect(taskgetid(undefined)).toBe(400);

});

