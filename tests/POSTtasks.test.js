const POSTtasks = require('../core/POSTtasks');
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
	let received = POSTtasks(taskValida1);
	expect(received.status).toEqual(201);
});

test('Test valido: domanda a crocette', () => {
	let received = POSTtasks(taskValida2);
	expect(received.status).toEqual(201);
});

test('Test invalido: bad formatting in aperta', () => {
	let received = POSTtasks(taskInvalida1);
	expect(received.status).toEqual(400);
});

test('Test invalido: bad formatting in consegna', () => {
	let received = POSTtasks(taskInvalida2);
	expect(received.status).toEqual(400);
});

test('Test invalido: bad formatting in risoluzione', () => {
	let received = POSTtasks(taskInvalida3);
	expect(received.status).toEqual(400);
});
test('Test invalido: bad formatting in punteggio', () => {
	let received = POSTtasks(taskInvalida4);
	expect(received.status).toEqual(400);
});
test('Test invalido: null object', () => {
	let received = POSTtasks(null);
	expect(received.status).toEqual(400);
});

test('Test invalido: undefined object', () => {
	let received = POSTtasks(undefined);
	expect(received.status).toEqual(400);
});
