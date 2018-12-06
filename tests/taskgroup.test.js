const Tgroup = require('../core/taskgroup');
//il metodo per il test è pensato per restituire il valore di http status

test('valid', () => {
	var received = Tgroup.Tgrouppost([1,2,3]);
	expect(received.status).toBe(200);
});


/*test("unvalid1: due id uguali", () => {
	expect(Tgroup.Tgrouppost([1,2,2])).toBe(400);
});*/

test("unvalid3: formato dati nullo ", () => {
	var received = Tgroup.Tgrouppost(null);
	expect(received.status).toBe(400);
});


test("unvalid4: formato dati erroneo String Problem", () => {
	var received = Tgroup.Tgrouppost("oye como va");
	expect(received.status).toBe(400);
});

test('valid', () => {
	var received = Tgroup.Tgroupget();
	expect(received.status).toBe(200);
});

