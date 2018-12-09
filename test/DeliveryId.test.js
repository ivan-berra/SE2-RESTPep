const delivery = require('../core/DeliveryId');
const fs = require("fs");
let deliveryJSONbackup = fs.readFileSync('./db/deliveries.json', 'utf8');


test('valid delete', () => {
	expect(idDelete(1).status).toBe(204);
});

test('unvalid delete', () => {
	expect(idDelete(1).status).toBe(404);
});

test('unvalid delete', () => {
	expect(idDelete(-7).status).toBe(400);
});

test('unvalid delete', () => {
	expect(idDelete(300).status).toBe(404);
});

test('unvalid delete', () => {
	expect(idDelete(1, 7).status).toBe(400);
});

test('unvalid delete', () => {
	expect(idDelete().status).toBe(400);
});

test('unvalid delete', () => {
	expect(idDelete(5.3).status).toBe(400);
});

test('unvalid delete', () => {
	expect(idDelete('6').status).toBe(400);
});

fs.writeFileSync('./db/deliveries.json', deliveryJSONbackup);
