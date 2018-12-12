const GETdelivery = require('../core/GETdelivery');

test('valid open question', () => {
	expect(GETdelivery().status).toBe(200);
});