const exampost = require ('./exampost');

test('valid', () => {
	expect(exampost(123, '2018-12-25T09:00:00Z', [1,2,3], 321, [7,8,9])).toBe(200);
});

test("unvalid1: formato destinatario erroneo", () => {
	expect(exampost('Classe 2', '2018-12-25T09:00:00Z', 123, 321, [7,8,9])).toBe(400);
});

test("unvalid2: formato deadline erroneo", () =>{
  expect(exampost(123, 2018.12, [1,2,3], 321, [42,9])).toBe(400);
});

test("unvalid3: formato taskarray erroneo", () => {
	expect(exampost(123, '2018-12-25T09:00:00Z', 1, 321, [7,8,9])).toBe(400);
});

test("unvalid4: contenuto taskarray erroneo", () => {
	expect(exampost(123, '2018-12-25T09:00:00Z', [1,'error',3], 321, [7,8,9])).toBe(400);
});


test("unvalid5: formato autore erroneo", () => {
	expect(exampost(123, '2018-12-25T09:00:00Z', [1,2,3], "Prof. Sebastiani", [7,8,9])).toBe(400);
});

test("unvalid6: formato condivisi erroneo", () => {
	expect(exampost(123, '2018-12-25T09:00:00Z', [1,2,3], 321, 'tutti')).toBe(400);
});

test("unvalid7: contenuto condivisi erroneo", () => {
	expect(exampost(123, '2018-12-25T09:00:00Z', [1,2,3], 321, [7,'error',9])).toBe(400);
});

test("unvalid8: formato dati erroneo 1", () => {
	expect(exampost(123)).toBe(400);
});


test("unvalid9: formato dati erroneo 2", () => {
	expect(exampost(123, '2018-12-25T09:00:00Z')).toBe(400);
});


test("unvalid10: formato dati erroneo 3", () => {
	expect(exampost(123, '2018-12-25T09:00:00Z', [1,2,3])).toBe(400);
});


test("unvalid11: formato dati erroneo 4", () => {
	expect(exampost(123, '2018-12-25T09:00:00Z', [1,2,3], 321)).toBe(400);
});

test("unvalid12: formato dati erroneo 5", () => {
	expect(exampost(null, '2018-12-25T09:00:00Z', [1,2,3], 321, [7,8,9])).toBe(400);
});

test("unvalid13: formato dati erroneo 6", () => {
	expect(exampost(123, null, [1,2,3], 321, [7,8,9])).toBe(400);
});

test("unvalid14: formato dati erroneo 7", () => {
	expect(exampost(123, '2018-12-25T09:00:00Z', null, 321, [7,8,9])).toBe(400);
});

test("unvalid15: formato dati erroneo 8", () => {
	expect(exampost(123, '2018-12-25T09:00:00Z', [1,2,3], null, [7,8,9])).toBe(400);
});

test("unvalid16: formato dati erroneo 8", () => {
	expect(exampost(123, '2018-12-25T09:00:00Z', [1,2,3], 321, null)).toBe(400);
});
