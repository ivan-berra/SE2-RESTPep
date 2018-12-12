const GETtaskgroup = require('../core/GETtaskgroup');
//il metodo per il test è pensato per restituire il valore di http status

var ex = {
  "id": 0,
  "aperta": "false",
  "consegna": "domanda a crocette | opzione 1 | opzione 2",
  "risoluzione": 1,
  "punteggiomax": 5
}
let ex_String=JSON.stringify(ex);

/*test('valid', () => {
  var received = Tgroup.Tgrouppost(ex); 
  expect(received.status).toBe(200);
});

test("unvalid1: Unvalid JSON", () => {
	var received = Tgroup.Tgrouppost(null); 
  expect(received.status).toBe(400);
});


/*test("unvalid2: il nome del gruppo è già stato usato", () => {
	expect(Tgroup.Tgrouppost('nomeusato', [1,2,3])).toBe(400);
});*/

test('valid', () => {
  expect(GETtaskgroup().status).toBe(200);
});

/*test('It is a Json', () =>{
	expect(Tgroup.isJson(ex_String)).toBe(true);
})


test('It is not a Json', () =>{
	expect(Tgroup.isJson("[22,dadad]")).toBe(false);
}) */