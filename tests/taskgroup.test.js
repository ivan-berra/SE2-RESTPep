const Tgroup = require('../core/taskgroup');
//il metodo per il test è pensato per restituire il valore di http status

var robe = {
  "id": 0,
  "aperta": "false",
  "consegna": "domanda a crocette | opzione 1 | opzione 2",
  "risoluzione": 1,
  "punteggiomax": 5
}

test('valid', () => {
  var received = Tgroup.Tgrouppost(robe); 
  expect(received.status).toBe(200);
});

test("unvalid1: Unvalid JSON", () => {
	var received = Tgroup.Tgrouppost([22,"25w463","we!"]); 
  expect(received.status).toBe(400);
});


/*test("unvalid2: il nome del gruppo è già stato usato", () => {
	expect(Tgroup.Tgrouppost('nomeusato', [1,2,3])).toBe(400);
});*/

test('valid', () => {
  var received = Tgroup.Tgroupget(); 
  expect(received.status).toBe(200);
});

test('It is a Json', () =>{
	expect(Tgroup.isJson(robe)).toBe(true);
})


test('It is not a Json', () =>{
	expect(Tgroup.isJson([22,"25w463","we!"])).toBe(true);
})