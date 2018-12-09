const GETdeliveryId = require('../core/GETdeliveryId');

test('valid test: id found', () => {
	let res = GETdeliveryId(1);
	expect(res.status).toBe(200);
});

test('invalid test: id is a string', () => {
	let res = GETdeliveryId('$');
	expect(res.status).toBe(400);
});

test('invalid test: id not positive', () => {
	let res = GETdeliveryId('-1');
	expect(res.status).toBe(400);
});

test('invalid test: id not found', () => {

	let res = GETdeliveryId(999);
	expect(res.status).toBe(404);
})


test('invalid test: id null', () => {

	let res = GETdeliveryId(null);
	expect(res.status).toBe(400);
})


test('invalid test: id undefined', () => {

	let res = GETdeliveryId(undefined);
	expect(res.status).toBe(400);
})
