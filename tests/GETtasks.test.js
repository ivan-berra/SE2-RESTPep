const GETtasks = require('../core/tasks/GETtasks.js');
const retreiveBackup = require('../core/retreiveBackup');
const resetJSON = require('../core/resetJSON');
const file = 'db/tasks.json';

let fileBackup = null

beforeAll(() => {
    fileBackup = retreiveBackup(file);
})

afterEach(() => {
    resetJSON(file, fileBackup);
})

test('Test valido', () => {
    expect(GETtasks().status).toBe(200);

});

test('Test invalido: error during reading db/tasks', () => {
	require('fs').writeFileSync(file, "not json");
	expect(GETtasks().status).toBe(500);

});
