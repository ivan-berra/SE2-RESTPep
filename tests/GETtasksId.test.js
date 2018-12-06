const GETtasksId = require('../core/GETtasksId');

test('valid test: id found', () => {
	let res = GETtasksId(1);
	expect(res.status).toBe(200);
	expect(res.jsonData).toEqual( { id: 1,
         aperta: true,
         consegna: 'domanda aperta... ?',
         risoluzione: 'risposta...',
         punteggiomax: 10 });
});

test('invalid test: id is a string', () => {
	let res = GETtasksId('$');
	expect(res.status).toBe(400);
	expect(res.jsonData).toEqual('400 BAD REQUEST');
});

test('invalid test: id not positive', () => {
	let res = GETtasksId('-1');
	expect(res.status).toBe(400);
	expect(res.jsonData).toEqual('400 BAD REQUEST');
});

test('invalid test: id not found', () => {

	let res = GETtasksId(999);
	expect(res.status).toBe(404);
	expect(res.jsonData).toEqual('404 NOT FOUND');
})


test('invalid test: id null', () => {

	let res = GETtasksId(null);
	expect(res.status).toBe(400);
	expect(res.jsonData).toEqual('400 BAD REQUEST');
})


test('invalid test: id undefined', () => {

	let res = GETtasksId(undefined);
	expect(res.status).toBe(400);
	expect(res.jsonData).toEqual('400 BAD REQUEST');


})
