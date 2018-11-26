const delivery = require('./delivery');

test('valid open question', () => {
	expect(delivery(10)).toBe(200);
});

//UNVALID

test('unvalid field ID', () => {
	expect(delivery('ciao')).toBe(400);
});
