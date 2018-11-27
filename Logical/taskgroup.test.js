const Tgrouppost = require('./taskgroup');

//il metodo per il test è pensato per restituire il valore di http status

/*test('valid', () => {
	expect(Tgrouppost('nomegruppo', [1,2,3])).toBe(200);
});*/


test("unvalid1: due id uguali", () => {
	expect(Tgrouppost('nomegruppo', [1,2,2])).toBe(400);
});


/*test("unvalid2: il nome del gruppo è già stato usato", () => {
	expect(Tgrouppost('nomeusato', [1,2,3])).toBe(400);
});*/


test("unvalid3: formato dati erroneo 1", () => {
	expect(Tgrouppost(5, [1,2,3])).toBe(400);
});


test("unvalid4: formato dati erroneo 2", () => {
	expect(Tgrouppost(5.3, [1,2,3])).toBe(400);
});


test("unvalid5: formato dati erroneo 3", () => {
	expect(Tgrouppost("nomegruppo", "errore")).toBe(400);
});


test("unvalid6: formato dati erroneo 4", () => {
	expect(Tgrouppost("nomegruppo", 5)).toBe(400);
});


test("unvalid7: formato dati erroneo 5", () => {
	expect(Tgrouppost("nomegruppo", 5.3)).toBe(400);
});


test("unvalid8: formato dati erroneo 6", () => {
	expect(Tgrouppost("nomegruppo", ["prova", "prova2"])).toBe(400);
});

test("unvalid9: formato dati erroneo 7", () => {
	expect(Tgrouppost(null, [1,2,3])).toBe(400);
});

test("unvalid10: formato dati erroneo 8", () => {
	expect(Tgrouppost("nomegruppo", null)).toBe(400);
});