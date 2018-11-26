const exampost = require ('./exampost');

test('valid', () => {
	expect(exampost(123, '2018-12-25T09:00:00Z', [1,2,3], 321, [7,8,9])).toBe(200);
});
/*
test("unvalid1: task 1054 non esiste", () => {
	expect(exampost(1, 1054, '2018-12-25T09:00:00Z', 123, 321, [7,8,9])).toBe(400);
});

test("unvalid2: id condiviso 42.9 non esiste", () =>{
  expect(exampost(1, [20,40,44], '2018-12-25T09:00:00Z', 123, 321, [42.9])).toBe(400);
});

test("unvalid3: formato dati erroneo 0", () => {
	expect(exampost(1)).toBe(400);
});

test("unvalid4: formato dati erroneo 1", () => {
	expect(exampost(1, [20,40,44])).toBe(400);
});


test("unvalid5: formato dati erroneo 2", () => {
	expect(exampost(5.3, [1,2,3], '2018-12-25T09:00:00Z')).toBe(400);
});

test("unvalid6: formato dati erroneo 3", () => {
	expect(exampost(5.3, [1,2,3], '2018-12-25T09:00:00Z', 123)).toBe(400);
});

test("unvalid7: formato dati erroneo 4", () => {
	expect(exampost(5.3, [1,2,3], '2018-12-25T09:00:00Z', 123, 321)).toBe(400);
});

test("unvalid5: formato dati erroneo 3", () => {
	expect(exampost(1, "errore", '2018-12-25T09:00:00Z', 123, 321, [7,8,9])).toBe(400);
});


test("unvalid6: formato dati erroneo 4", () => {
	expect(exampost(1, 5, 2018, 123, 321, [7,8,9])).toBe(400);
});


test("unvalid7: formato dati erroneo 5", () => {
	expect(exampost(1, 5.3, '2018-12-25T09:00:00Z', 'errore', 321, [7,8,9])).toBe(400);
});


test("unvalid8: formato dati erroneo 6", () => {
	expect(exampost(1, ["prova", "prova2"], '2018-12-25T09:00:00Z', 123, '321', [7,8,9])).toBe(400);
});

test("unvalid8: formato dati erroneo 6", () => {
	expect(exampost(1, ["prova", "prova2"], '2018-12-25T09:00:00Z', 123, 321, ["prof. Sebastiani"])).toBe(400);
});

test("unvalid9: formato dati erroneo 7", () => {
	expect(exampost(null, [1,2,3], '2018-12-25T09:00:00Z', 123, 321, [7,8,9])).toBe(400);
});

test("unvalid10: formato dati erroneo 8", () => {
	expect(exampost(1, [1,2,3], null, 123, 321, [7,8,9])).toBe(400);
});

test("unvalid10: formato dati erroneo 8", () => {
	expect(exampost(1, [1,2,3], '2018-12-25T09:00:00Z', null, 321, [7,8,9])).toBe(400);
});

test("unvalid10: formato dati erroneo 8", () => {
	expect(exampost(1, [1,2,3], '2018-12-25T09:00:00Z', 123, null, [7,8,9])).toBe(400);
});

test("unvalid10: formato dati erroneo 8", () => {
	expect(exampost(1, [1,2,3], '2018-12-25T09:00:00Z', 123, 321, null)).toBe(400);
});

test("unvalid10: formato dati erroneo 8", () => {
	expect(exampost(1, [1,2,3], '2018-12-25T09:00:00Z', 123, 321, null)).toBe(400);
});
*/
