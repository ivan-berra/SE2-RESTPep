const PUTtasksId = require('../core/PUTtasksId');

var validTask = {"aperta":true,"consegna":"test post valida","risoluzione":"1","punteggiomax":10}


var unvalidTask = {"aperta":"error","consegna":"test put valida","risoluzione":"1","punteggiomax":10}


var unvalidTask2 = {"aperta":"false","consegna":"test put valida","risoluzione":"1","punteggiomax":10}

test('Test PUT valid', () => {
	let res = PUTtasksId(validTask, 8);
	expect(res).toBe(200);
});

test('Test PUT unvalid aperta field', () => {
	let res = PUTtasksId(unvalidTask, 8);
	expect(res).toBe(400);
})


test('Test PUT unvalid multiple choice formatting', () => {
	let res = PUTtasksId(unvalidTask, 8);
	expect(res).toBe(400);
})
