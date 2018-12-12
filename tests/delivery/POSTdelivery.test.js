const delivery = require('../../core/delivery/POSTdelivery');
var examples = {
	"id":1,
    "soluzione":"false",
    "punteggio":1
}
let examples_String=JSON.stringify(examples);

const retreiveBackup = require('../../core/retreiveBackup');
const resetJSON = require('../../core/resetJSON');

const file = 'db/deliveries.json';

let fileBackup = null

beforeAll(() => {
    fileBackup = retreiveBackup(file);
})

afterEach(() => {
    resetJSON(file, fileBackup);
})

test('valid open question', () => {
	var received = delivery.postdelivery(1,1,3,examples); 
	expect(received.status).toBe(200);
});

test('It is a Json', () =>{
	expect(delivery.isJson(examples_String)).toBe(true);
})

//UNVALID

test('It is a Json', () =>{
	expect(delivery.isJson("sasfaf")).toBe(false);
})

test('unvalid field exam_ID', () => {
	var received = delivery.postdelivery('ciao',45,54,examples);
	expect(received.status).toBe(400);
});

test('unvalid field tested_ID', () => {
	var received = delivery.postdelivery(3,'ciali',34,examples);
	expect(received.status).toBe(400);
});

test('unvalid field reviewed_ID', () => {
	var received = delivery.postdelivery(2,45,"crisre",examples);
	expect(received.status).toBe(400);
});

test('unvalid field examples', () => {
	var received = delivery.postdelivery('ciao',45,54,34,examples);
	expect(received.status).toBe(400);
});

test('multiple unvalid field ID', () => {
	var received = delivery.postdelivery('ciao','robe',45,examples);
	expect(received.status).toBe(400);
});