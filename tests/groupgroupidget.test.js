const groupgroupidget = require('../core/groupgroupidget');

const retreiveBackup = require('../core/retreiveBackup');
const resetJSON = require('../core/resetJSON');
const file = 'db/groups.json';

let fileBackup = null

beforeAll(() => {
    fileBackup = retreiveBackup(file);
})

afterEach(() => {
    resetJSON(file, fileBackup);
})

test('valid1', () => {
	expect(groupgroupidget(0).status).toBe(200);
});

test('valid2', () => {
	expect(groupgroupidget(0).jsonData.groupName).toBe("gruppogiainserito");
});

test('valid3', () => {
	expect(groupgroupidget(0).jsonData.groupId).toBe(0);
});

test("unvalid1: formato dati erroneo 1", () => {
	expect(groupgroupidget(5000).status).toBe(404);
});

test("unvalid1: formato dati erroneo 1", () => {
	expect(groupgroupidget(5000).jsonData).toBe(null);
});

test("unvalid2: formato dati erroneo 2", () => {
	expect(groupgroupidget(-5000).status).toBe(400);
});

test("unvalid3: formato dati erroneo 3", () => {
	expect(groupgroupidget(5.4).status).toBe(400);
});


test("unvalid4: formato dati erroneo 4", () => {
	expect(groupgroupidget("5000").status).toBe(400);
});


test("unvalid5: formato dati erroneo 5", () => {
	expect(groupgroupidget(null).status).toBe(400);
});

test("unvalid6: troppi parametri", () => {
	expect(groupgroupidget(0, 7).status).toBe(400);
});
