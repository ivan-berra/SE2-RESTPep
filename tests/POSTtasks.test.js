const POSTtasks = require('../core/POSTtasks');
/*const fetch = require('node-fetch');
const fs = require('fs');
var url = 'http://localhost:3000/tasks';

var taskValida1 = {aperta:false,consegna:"Di che colore è il mare? | rosso | blu | verde | giallo",risoluzione:"2",punteggiomax:10};

let nextId;

function initializeTaskJSON(){
	let imported = fs.readFileSync('db/tasks.json', 'utf8', function (err, data) {
                if (err) throw err;
            });
        let tasks=JSON.parse(imported);
	nextId = tasks.nextId;
}



beforeEach(() => {
   initializeTaskJSON();
});



test('test post', () => {

	 fetch(url, {
		method: 'post',
		body:    JSON.stringify(taskValida1),
		headers: { 'Content-Type': 'application/json' },
	    })
	    .then(response => {
		//console.log('response status '+response.status);
		expect(response.status).toBe(201);
		const json =  response.json();
		return json;
	    })
	    .then(json => {
		//console.log('recived object '+json);
		let temp = taskValida1;
		temp.id = nextId;
		expect(json).toEqual(temp);
	    }).catch((err) => {
		console.log('There\'s been an error');
		//console.log(err);
    	    });
})

*/

var validTask = {"aperta":true,"consegna":"test post valida","risoluzione":"1","punteggiomax":10}


var unvalidTask = {"aperta":"error","consegna":"test post valida","risoluzione":"1","punteggiomax":10}


var unvalidTask2 = {"aperta":"false","consegna":"test post valida","risoluzione":"1","punteggiomax":10}

test('Test POST valid', () => {
	let res = POSTtasks(validTask);
	expect(res.status).toBe(201);
});

test('Test POST unvalid aperta field', () => {
	let res = POSTtasks(unvalidTask);
	expect(res.status).toBe(400);
})


test('Test POST unvalid multiple choice formatting', () => {
	let res = POSTtasks(unvalidTask2);
	expect(res.status).toBe(400);
})
