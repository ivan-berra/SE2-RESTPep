const examidget = require('./examidget')

test('valid', () => {
	expect(examidget(1)).toBe(200);
});

test('unvalid1: formato ID erroneo', () => {
	expect(examidget()).toBe(400);
});

test('unvalid1: formato ID erroneo2', () => {
	expect(examidget('errore')).toBe(400);
});
