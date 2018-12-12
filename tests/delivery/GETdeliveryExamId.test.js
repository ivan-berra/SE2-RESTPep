const getDeliveryExamId = require('../../core/delivery/GETdeliveryExamId').getDeliveryExamId;
const fs = require('fs');

let deliveryJSON = fs.readFileSync('./db/deliveries.json', 'utf8');
var deliveries = JSON.parse(deliveryJSON);

var errorRes = {"jsonData": [], "status": 400};
var notFoundRes = {"jsonData": [], "status": 404};

afterAll(() => {
	let newJson = JSON.stringify(deliveries);
	fs.writeFileSync('./db/deliveries.json', newJson);
})


//DELIVERIES/{EXAMSID} -> getDeliveryExamId (TEST FORMATO ID PASSANO PER ESISTEDELIVERYEXAMID)
test('valid', () => {
	expect(getDeliveryExamId(1)).toEqual({"status": 200, "jsonData":[{"id":2,"examId":1,"testedId":1,"reviewedId":3,"examples":[{"id":1,"soluzione":"true","punteggio":1},{"id":2,"soluzione":"false","punteggio":0},{"id":3,"soluzione":"true","punteggio":69}]}]});
});

test('unvalid1: formato ID erroneo', () => {
	expect(getDeliveryExamId(null)).toEqual(errorRes);
});
test('unvalid2: formato ID erroneo', () => {
	expect(getDeliveryExamId("errore")).toEqual(errorRes);
});
test('unvalid3: formato ID erroneo', () => {
	expect(getDeliveryExamId(-2)).toEqual(errorRes);
});
test('unvalid4: ID non esiste', () => {
	expect(getDeliveryExamId(101.10)).toEqual(notFoundRes);
});
test('unvalid5: ID non esiste', () => {
	expect(getDeliveryExamId(101)).toEqual(notFoundRes);
});
