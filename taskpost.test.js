const taskpost = require('./taskpost');

test('valid open question', () => {
	expect(taskpost(true, 'consegna 1', 'risoluzione1',10)).toBe(200);
});

test('valid closed question', () => {
	expect(taskpost(false, 'Di che colore è il sole', 'Giallo | Verde | Blu',5)).toBe(200);
});

test('valid risoluzione null', () => {
	expect(taskpost(true, 'consegna 1',"",10)).toBe(200);
});

//UNVALID 

test('unvalid field aperta | not boolean', () => {
	expect(taskpost('ciao', 'consegna 1', 'risoluzione1',10)).toBe(400);
});

test('unvalid field consegna | not string', () => {
	expect(taskpost(true, 12.1, 'risoluzione1',10)).toBe(400);
});

test('unvalid field risoluzione | not string', () => {
	expect(taskpost(true, 'consegna 1', 12 ,10)).toBe(400);
});

test('unvalid field punteggiomax | not number', () => {
	expect(taskpost(true, 'consegna 1', 'risoluzione1', 'd')).toBe(400);
});

test('unvalid punteggio | not integer', () => {
	expect(taskpost(true, 'consegna 1',"",10.1)).toBe(400);
});

test('unvalid field punteggiomax | not positive', () => {
	expect(taskpost(true, 'consegna 1', 'risoluzione1', 'd')).toBe(400);
});

test('unvalid fields all', () => {
	expect(taskpost('testo',12,13,12.1)).toBe(400);
});

test('unvalid field aperta | is undefined', () => {
	expect(taskpost(undefined,'consegna','soluzione',10)).toBe(400);
});


