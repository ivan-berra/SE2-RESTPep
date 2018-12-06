const PUTtasksId = require('../core/PUTtasksId');
const fs = require('fs');

const retreiveBackup = require('../core/retreiveBackup');
const resetJSON = require('../core/resetJSON');

const file = 'db/tasks.json';

let fileBackup = null

beforeAll(() => {
    fileBackup = retreiveBackup(file);
})

afterEach(() => {
    resetJSON(file, fileBackup);
})


// VALID TEST
let taskValida1 = { aperta: true, consegna: "test post", risoluzione: "risposta...", punteggiomax: 10};
let taskValida2 = { aperta: false, consegna: "test post | opzione 1 | opzione 2", risoluzione: "1", punteggiomax: 10};

// UNVALID TEST
let taskInvalida1 = { aperta: "error", consegna: "test post | opzione 1 | opzione 2", risoluzione: "1", punteggiomax: 10};
let taskInvalida2 = { aperta: false, consegna: "test post ", risoluzione: "1", punteggiomax: 10};
let taskInvalida3 = { aperta: true, consegna: "test post | opzione 1 | opzione 2", risoluzione: 1, punteggiomax: 10};
let taskInvalida4 = { aperta: false, consegna: "test post | opzione 1 | opzione 2", risoluzione: "1", punteggiomax: "error"};



test('Test valido: domanda aperta', () => {
	let received = PUTtasksId(taskValida1, 1);
	expect(received).toEqual(200);
});

test('Test valido: domanda a crocette', () => {
	let received = PUTtasksId(taskValida2, 1);
	expect(received).toEqual(200);
});

test('Test invalido: bad formatting in aperta', () => {
	let received = PUTtasksId(taskInvalida1, 1);
	expect(received).toEqual(400);
});

test('Test invalido: bad formatting in consegna', () => {
	let received = PUTtasksId(taskInvalida2, 1);
	expect(received).toEqual(400);
});

test('Test invalido: bad formatting in risoluzione', () => {
	let received = PUTtasksId(taskInvalida3, 1);
	expect(received).toEqual(400);
});
test('Test invalido: bad formatting in punteggio', () => {
	let received = PUTtasksId(taskInvalida4, 1);
	expect(received).toEqual(400);
});
test('Test invalido: null object', () => {
	let received = PUTtasksId(null, 1);
	expect(received).toEqual(400);
});

test('Test invalido: undefined object', () => {
	let received = PUTtasksId(undefined, 1);
	expect(received).toEqual(400);
});


test('Test invalido: id null', () => {
	let received = PUTtasksId(taskValida1, null);
	expect(received).toEqual(400);
});


