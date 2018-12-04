const DELETEtasksId = require('../core/DELETEtasksId');

test('Test DELETE valid', () => {
	let res = DELETEtasksId(20);
	expect(res).toBe(200);
});

test('Test DELETE unvalid not found', () => {
	let res = DELETEtasksId(999);
	expect(res).toBe(404);
})


test('Test DELETE unvalid bad format', () => {
	let res = DELETEtasksId(-1);
	expect(res).toBe(400);
})
