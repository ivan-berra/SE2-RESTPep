const GETtasks = require('../core/GETtasks.js');

test('Test valido', () => {

    expect(GETtasks().status).toBe(200);

});
