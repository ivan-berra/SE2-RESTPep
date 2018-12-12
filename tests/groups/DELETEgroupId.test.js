const DELETEgroupId= require('../../core/groups/DELETEgroupId');

const retreiveBackup = require('../utils/retreiveBackup');
const resetJSON = require('../utils/resetJSON');
const file = 'db/groups.json';

let fileBackup = null

beforeAll(() => {
    fileBackup = retreiveBackup(file);
})

afterEach(() => {
    resetJSON(file, fileBackup);
})

//const POSTgroup = require('./POSTgroup'); //serve per inserire i gruppi da testare

//ATTENZIONE: SI SUPPONE CHE IN groups.json IL CAMPO nextId SIA 1, ALTRIMENTI NON FUNZIONA IL TEST
//SI SUPPONE ANCHE SI FACCIA IL TEST SU QUESTO SINGOLO FILE


//il metodo per il test è pensato per restituire il valore di http status
/* MESSO A COMMENTO PER GLI ERRORI ONLINE
test('valid', () => {
	expect(DELETEgroupId(1)).toBe(204);
});


test("unvalid1: cancella gruppo che non esiste", () => {
	expect(DELETEgroupId(1)).toBe(404);
});


test("unvalid2: cancella gruppo che non esiste", () => {
	expect(DELETEgroupId(5000)).toBe(404);
});*/


test("unvalid3: formato dati erroneo 1", () => {
	expect(DELETEgroupId('prova')).toBe(400);
});


test("unvalid4: formato dati erroneo 2", () => {
	expect(DELETEgroupId(5.8)).toBe(400);
});


test("unvalid5: formato dati erroneo 3", () => {
	expect(DELETEgroupId(-15)).toBe(400);
});


test("unvalid6: formato dati erroneo 4", () => {
	expect(DELETEgroupId([2,7])).toBe(400);
});


test("unvalid7: formato dati erroneo 5", () => {
	expect(DELETEgroupId(null)).toBe(400);
});
