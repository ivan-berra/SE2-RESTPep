const userget = require('../core/userget');

test('Test valido', () => {

    expect(userget().status).toBe(200);

});