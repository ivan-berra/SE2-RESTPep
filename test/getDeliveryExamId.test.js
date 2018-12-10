const getDeliveryExamId = require('../core/getDeliveryExamId').getDeliveryExamId;
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
	expect(getDeliveryExamId(0)).toEqual({"status": 200, "jsonData":[{"id":0,"examId":0,"tested-id":1,"reviewed-id":3,"examples":[7,"false",44]},{"id":1,"examId":0,"tested-id":3,"reviewed-id":5,"examples":[6,"false",32]}]});
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
