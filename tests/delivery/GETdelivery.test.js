const GETdelivery = require('../../core/delivery/GETdelivery');

test('valid open question', () => {
	expect(GETdelivery().status).toBe(200);
});