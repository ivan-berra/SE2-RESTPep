const userget = require('./userget');

test('Test valido', () => {

    expect(userget().status).toBe(200);

});