const idGet = require('../core/DeliveryId').idGet;
const idFound = require('../core/DeliveryId').idFound;
const idDelete = require('../core/DeliveryId').idDelete;
const fs = require('fs');

let deliveryJSON = fs.readFileSync('./db/deliveries.json', 'utf8');
var deliveries = JSON.parse(deliveryJSON);

var errorRes = {"jsonData": null, "status": 400};
var notfoundRes = {"jsonData": null, "status": 404};

// DELIVERIES/{EXAMSID} -> IDFOUND
test('valid', () => {
	expect(idFound(1)).toBe(0);
});

test('unvalid1: formato ID erroneo', () => {
	expect(idFound(null)).toBe(-1);
});

test('unvalid2: formato ID erroneo2', () => {
	expect(idFound('errore')).toBe(-1);
});

test('unvalid3: formato ID erroneo3', () => {
	expect(idFound(undefined)).toBe(-1);
});

test('unvalid4: ID non esiste', () => {
	expect(idFound(-10.3)).toBe(-2);
});

test('unvalid5: ID non esiste', () => {
	expect(idFound(9999)).toBe(-2);
});

//DELIVERIES/{EXAMSID} -> IDGET (TEST FORMATO ID PASSANO PER IDFOUND)
test('valid', () => {
	expect(idGet(1)).toEqual({"status": 200, "jsonData": deliveries.deliveries[0]});
});

test('unvalid1: formato ID erroneo', () => {
	expect(idGet(null)).toEqual(errorRes);
});

test('unvalid2: ID non esiste', () => {
	expect(idGet(101)).toEqual(notfoundRes);
});
test('unvalid2: ID non esiste', () => {
	expect(idGet(-2)).toEqual(notfoundRes);
});
test('unvalid2: ID non esiste', () => {
	expect(idGet(101.10)).toEqual(notfoundRes);
});
test('unvalid2: ID non esiste', () => {
	expect(idGet([101,1])).toEqual(notfoundRes);
});

//DELIVERIES/{EXAMSID} -> IDDELETE (TEST FORMATO ID PASSANO PER IDFOUND)
test('valid', () => {
	expect(idDelete(1)).toBe(204);
});

test('unvalid1: formato ID erroneo', () => {
	expect(idDelete(null)).toBe(400);
});

test('unvalid2: ID non esiste', () => {
	expect(idDelete(1010101010)).toBe(404);
});
