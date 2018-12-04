const delivery = require('../core/delivery');

test('valid open question', () => {
	expect(delivery.postdelivery(1,1,3,[7,"false", 44])).toBe(200);
});

/*test('valid open question', () => {
	expect(delivery.getdeliveryid(1)).toBe(200);
});*/

test('valid open question', () => {
	expect(delivery.getdelivery()).toBe(200);
});


//UNVALID

test('unvalid field exam_ID', () => {
	expect(delivery.postdelivery('ciao',45,54,[7,"false", 44])).toBe(400);
});

test('unvalid field tested_ID', () => {
	expect(delivery.postdelivery(3,'ciali',34,[7,"false", 44])).toBe(400);
});

test('unvalid field reviewed_ID', () => {
	expect(delivery.postdelivery(2,45,"crisre",[7,"false", 44])).toBe(400);
});

test('unvalid field examples', () => {
	expect(delivery.postdelivery('ciao',45,54,34,null)).toBe(400);
});

test('multiple unvalid field ID', () => {
	expect(delivery.postdelivery('ciao','robe',45,null)).toBe(400);
});

test('delivery not found', () => {
	expect(delivery.getdeliveryid(-1)).toBe(404);
});

test('unvalid ID field', () => {
	expect(delivery.getdeliveryid("ciao")).toBe(404);
});


