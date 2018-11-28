const delivery = require('./delivery');

test('valid open question', () => {
	expect(delivery.postdelivery(10,13)).toBe(200);
});

test('valid open question', () => {
	expect(delivery.getdelivery(10)).toBe(200);
});


//UNVALID

test('unvalid field ID', () => {
	expect(delivery.postdelivery('ciao',45)).toBe(400);
});

test('unvalid field ID', () => {
	expect(delivery.postdelivery('ciao','robe')).toBe(400);
});

test('unvalid field ID', () => {
	expect(delivery.postdelivery(45,'robe')).toBe(400);
});

test('valid open question', () => {
	expect(delivery.getdelivery(10)).toBe(200);
});

