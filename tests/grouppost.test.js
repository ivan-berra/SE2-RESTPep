const grouppost = require('../core/grouppost');

//il metodo per il test è pensato per restituire il valore di http status

test('valid', () => {
	expect(grouppost('nomegruppo', [1,2,3]).status).toBe(200);
});


test("unvalid1: l'utente 1054 non esiste", () => {
	expect(grouppost('nomegruppo', [1,2,1054]).status).toBe(400);
});

test("unvalid1: l'utente 1054 non esiste", () => {
	expect(grouppost('nomegruppo', [1,2,1054]).id).toBe(null);
});


/*test("unvalid2: il nome del gruppo è già stato usato", () => {
	expect(grouppost('nomeusato', [1,2,3])).toBe(400);
});*/


test("unvalid3: formato dati erroneo 1", () => {
	expect(grouppost(5, [1,2,3]).status).toBe(400);
});


test("unvalid4: formato dati erroneo 2", () => {
	expect(grouppost(5.3, [1,2,3]).status).toBe(400);
});


test("unvalid5: formato dati erroneo 3", () => {
	expect(grouppost("nomegruppo", "errore").status).toBe(400);
});


test("unvalid6: formato dati erroneo 4", () => {
	expect(grouppost("nomegruppo", 5).status).toBe(400);
});


test("unvalid7: formato dati erroneo 5", () => {
	expect(grouppost("nomegruppo", 5.3).status).toBe(400);
});


test("unvalid8: formato dati erroneo 6", () => {
	expect(grouppost("nomegruppo", ["prova", "prova2"]).status).toBe(400);
});

test("unvalid9: formato dati erroneo 7", () => {
	expect(grouppost(null, [1,2,3]).status).toBe(400);
});

test("unvalid10: formato dati erroneo 8", () => {
	expect(grouppost("nomegruppo", null).status).toBe(400);
});

test("unvalid11: formato dati erroneo 9", () => {
	expect(grouppost("nomegruppo", [1,-2,3]).status).toBe(400);
});
