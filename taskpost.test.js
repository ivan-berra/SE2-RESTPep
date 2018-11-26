const taskpost = require('./taskpost');

test('valid open question', () => {
	expect(taskpost(true, 'consegna 1', 'risoluzione1',10)).toBe(200);
});

test('valid closed question', () => {
	expect(taskpost(false, 'Di che colore è il sole', 'Giallo | Verde | Blu',5)).toBe(200);
});

test('valid, risoluzione null', () => {
	expect(taskpost(true, 'consegna 1',"",10)).toBe(200);
});

//UNVALID 

test('unvalid field aperta', () => {
	expect(taskpost('ciao', 'consegna 1', 'risoluzione1',10)).toBe(400);
});

test('unvalid field consegna', () => {
	expect(taskpost(true, 12.1, 'risoluzione1',10)).toBe(400);
});

test('unvalid field risoluzione', () => {
	expect(taskpost(true, 'consegna 1', 12 ,10)).toBe(400);
});

test('unvalid field punteggiomax', () => {
	expect(taskpost(true, 'consegna 1', 'risoluzione1', 'd')).toBe(400);
});








