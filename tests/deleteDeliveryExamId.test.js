const deleteDeliveryExamId = require('../core/deleteDeliveryExamId');

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


test('Test valido', () => {

    expect(deleteDeliveryExamId(0).status).toBe(204);

});

test('Test non valido: id negativo', () => {
    expect(deleteDeliveryExamId(-1).status).toBe(400);

});

test('Test valido: utente non esistente', () => {
    expect(deleteDeliveryExamId(200).status).toBe(404);

});

test('Test non valido: id stringa', () => {
    expect(deleteDeliveryExamId("alfa").status).toBe(400);

});

test('Test non valido: id booleano', () => {
    expect(deleteDeliveryExamId(false).status).toBe(400);

});

test('Test non valido: id null', () => {
    expect(deleteDeliveryExamId(null).status).toBe(400);

});

test('Test non valido: id undefined', () => {
    expect(deleteDeliveryExamId(undefined).status).toBe(400);

});