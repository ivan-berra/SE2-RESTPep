const userget = require('../core/userget');

const retreiveBackup = require('../core/retreiveBackup');
const resetJSON = require('../core/resetJSON');

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