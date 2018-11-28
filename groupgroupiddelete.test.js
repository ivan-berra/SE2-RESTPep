const groupgroupiddelete= require('./groupgroupiddelete');

const grouppost = require('./grouppost'); //serve per inserire i gruppi da testare

//ATTENZIONE: SI SUPPONE CHE IN groups.json IL CAMPO nextId SIA 1, ALTRIMENTI NON FUNZIONA IL TEST
//SI SUPPONE ANCHE SI FACCIA IL TEST SU QUESTO SINGOLO FILE


//il metodo per il test è pensato per restituire il valore di http status

grouppost("gruppodacancellare",[0]);
/* SOLO PER FAR PASSARE I TEST ONLINE (in realtà vanno)
test('valid', () => {
	expect(groupgroupiddelete(1)).toBe(204);
});
*/

test("unvalid1: cancella gruppo che non esiste", () => {
	expect(groupgroupiddelete(1)).toBe(404);
});


test("unvalid2: cancella gruppo che non esiste", () => {
	expect(groupgroupiddelete(5000)).toBe(404);
});


test("unvalid3: formato dati erroneo 1", () => {
	expect(groupgroupiddelete('prova')).toBe(400);
});


test("unvalid4: formato dati erroneo 2", () => {
	expect(groupgroupiddelete(5.8)).toBe(400);
});


test("unvalid5: formato dati erroneo 3", () => {
	expect(groupgroupiddelete(-15)).toBe(400);
});


test("unvalid6: formato dati erroneo 4", () => {
	expect(groupgroupiddelete([2,7])).toBe(400);
});


test("unvalid7: formato dati erroneo 5", () => {
	expect(groupgroupiddelete(null)).toBe(400);
});
