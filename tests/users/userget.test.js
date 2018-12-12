const userget = require('../../core/users/GETuser');

const retreiveBackup = require('../utils/retreiveBackup');
const resetJSON = require('../utils/resetJSON');

const file = 'db/users.json';

let fileBackup = null

beforeAll(() => {
    fileBackup = retreiveBackup(file);
})

afterEach(() => {
    resetJSON(file, fileBackup);
})


test('Test valido', () => {

    expect(userget().status).toBe(200);

});