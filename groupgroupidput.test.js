const groupgroupidput = require('./groupgroupidput');


//il metodo per il test è pensato per restituire il valore di http status

test('valid1', () => {
	expect(groupgroupidput(0, [1,2])).toBe(200);
});

test('valid2', () => {
	expect(groupgroupidput(0, [1,2,3])).toBe(200);
});

test("unvalid1: l'utente 1054 non esiste", () => {
	expect(groupgroupidput(0, [1,2,1054])).toBe(400);
});

test("unvalid2: il gruppo 1054 non esiste", () => {
	expect(groupgroupidput(1054, [1,2,3])).toBe(400);
});

test("unvalid3: formato dati erroneo 1", () => {
	expect(groupgroupidput("errore", [1,2,3])).toBe(400);
});

test("unvalid4: formato dati erroneo 2", () => {
	expect(groupgroupidput(0, "errore")).toBe(400);
});

test("unvalid5: formato dati erroneo 3", () => {
	expect(groupgroupidput(1.3, [1,2,3])).toBe(400);
});

test("unvalid6: formato dati erroneo 4", () => {
	expect(groupgroupidput(0, 2)).toBe(400);
});

test("unvalid7: formato dati erroneo 5", () => {
	expect(groupgroupidput(0, [1.3,2.8,3.1])).toBe(400);
});

test("unvalid8: formato dati erroneo 6", () => {
	expect(groupgroupidput(0, ["errore1", "errore2"])).toBe(400);
});

test("unvalid9: formato dati erroneo 7", () => {
	expect(groupgroupidput([1,2,3], 0)).toBe(400);
});

test("unvalid10: formato dati erroneo 8", () => {
	expect(groupgroupidput(-6, [1,2,3])).toBe(400);
});

test("unvalid11: formato dati erroneo 9", () => {
	expect(groupgroupidput(0, [-1,-2,-3])).toBe(400);
});

test("unvalid12: troppi parametri", () => {
	expect(groupgroupidput(0, [1,2,3], "parametro in più")).toBe(400);
});

test("unvalid13: troppo pochi parametri", () => {
	expect(groupgroupidput(0)).toBe(400);
});
