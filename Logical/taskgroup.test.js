const Tgroup = require('./taskgroup');
//il metodo per il test è pensato per restituire il valore di http status

/*test('valid', () => {
	expect(Tgroup.Tgrouppost('nomegruppo', [1,2,3])).toBe(200);
});*/


test("unvalid1: due id uguali", () => {
	expect(Tgroup.Tgrouppost([1,2,2])).toBe(400);
});

test("unvalid3: formato dati nullo ", () => {
	expect(Tgroup.Tgrouppost(null)).toBe(400);
});


test("unvalid4: formato dati erroneo String Problem", () => {
	expect(Tgroup.Tgrouppost("oye como va")).toBe(400);
});

test('valid', () => {
	expect(Tgroup.Tgroupget()).toBe(200);
});

