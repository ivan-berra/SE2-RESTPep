const deliverydeliveryiddelete = require('../../core/delivery/DELETEdeliveryId');

const retreiveBackup = require('../../core/retreiveBackup');
const resetJSON = require('../../core/resetJSON');

const file = 'db/deliveries.json';

let fileBackup = null

beforeAll(() => {
    fileBackup = retreiveBackup(file);
})

afterEach(() => {
    resetJSON(file, fileBackup);
})


test('Test valido', () => {
    expect(deliverydeliveryiddelete(2)).toBe(204);
});

test('Test invalido', () => {
    expect(deliverydeliveryiddelete()).toBe(400);
});

test('Test invalido', () => {
    expect(deliverydeliveryiddelete(0, 7)).toBe(400);
});

test('Test invalido', () => {
    expect(deliverydeliveryiddelete(0.7)).toBe(400);
});

test('Test invalido', () => {
    expect(deliverydeliveryiddelete("0")).toBe(400);
});

test('Test invalido', () => {
    expect(deliverydeliveryiddelete(-1)).toBe(400);
});

test('Test invalido', () => {
    expect(deliverydeliveryiddelete(500)).toBe(404);
});
