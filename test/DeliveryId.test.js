const delivery = require('../core/DeliveryId');
const fs = require("fs");
let deliveryJSONbackup = fs.readFileSync('./db/deliveries.json', 'utf8');

const retreiveBackup = require('../core/retreiveBackup');
const resetJSON = require('../core/resetJSON');
const file = 'db/deliveries.json';

let fileBackup = null

beforeAll(() => {
    fileBackup = retreiveBackup(file);
})

afterEach(() => {
    resetJSON(file, fileBackup);
})

test('valid delete', () => {
	expect(delivery.idDelete(1)).toBe(204);
});

test('unvalid delete', () => {
	expect(delivery.idDelete(-7)).toBe(400);
});

test('unvalid delete', () => {
	expect(delivery.idDelete(300)).toBe(404);
});

test('unvalid delete', () => {
	expect(delivery.idDelete(1, 7)).toBe(400);
});

test('unvalid delete', () => {
	expect(delivery.idDelete()).toBe(400);
});

test('unvalid delete', () => {
	expect(delivery.idDelete(5.3)).toBe(400);
});

test('unvalid delete', () => {
	expect(delivery.idDelete('6')).toBe(400);
});

fs.writeFileSync('./db/deliveries.json', deliveryJSONbackup);
