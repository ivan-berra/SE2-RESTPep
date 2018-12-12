const POSTtaskgroup = require('../../core/taskgroup/POSTtaskgroup');

var ex = {
    "id": 0,
    "aperta": "false",
    "consegna": "domanda a crocette | opzione 1 | opzione 2",
    "risoluzione": 1,
    "punteggiomax": 5
  }
  let ex_String=JSON.stringify(ex);

  test('valid', () => {
    var received = POSTtaskgroup.POSTtaskgroup(ex);
    expect(received.status).toBe(200);
  });

  test("unvalid1: Unvalid JSON", () => {
	var received = POSTtaskgroup.POSTtaskgroup(null);
  expect(received.status).toBe(400);
});

test('It is a Json', () =>{
    expect(POSTtaskgroup.isJson(ex_String)).toBe(true);
})


test('It is not a Json', () =>{
    expect(POSTtaskgroup.isJson("[22,dadad]")).toBe(false);
})