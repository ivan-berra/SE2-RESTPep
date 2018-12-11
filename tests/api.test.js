const retreiveBackup = require('../core/retreiveBackup');
const resetJSON = require('../core/resetJSON');
const fetch = require('node-fetch');
const fs = require('fs');
const file = 'db/users.json';
const url = 'https://exam-feature-api.herokuapp.com/';
let fileBackup = null

beforeAll(() => {
    fileBackup = retreiveBackup(file);
})

afterEach(() => {
    resetJSON(file, fileBackup);
})
//var testData = JSON.stringify({matricola: 200000,email: 'prova@prova.it',isTeacher: false});
let examJSON = fs.readFileSync('./db/exams.json', 'utf8');
var exams = JSON.parse(examJSON);

var errorRes = {"jsonData": null, "status": 400};
var notfoundRes = {"jsonData": null, "status": 404};
const testData = {
	destinatario:100,
	deadline:"1010-10-10T10:10:10Z",
	tasksarray:[1,10,11,100,101],
	autore:101010,
	condivisi:[110,111,101110]
};


test('GET test', () => {

    var status;
    fetch(url + 'exams')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});
/*
test('POST test', () => {

    let status;
    let jsonData;

    fetch(url + 'exams', {
            method: 'POST',
            body: JSON.stringify(testData),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(201)
        })
				.catch((err) => {
            console.log(err);
        })

});


test('GET(id) test', () => {

    var status;
    fetch(url + 'exams/1')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then((jsonData) => {
            console.log(jsonData);
            console.log(status);
        })
        .then(function() {
            expect(status).toEqual(200);
        })
				.catch((err) => {
            console.log(err);
        })

});

test('PUT(id) test', () => {

    let status;
    let jsonData;

    fetch(url + 'exams/1', {

            method: 'put',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(testData)

        })
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then((jsonData) => {
            console.log(jsonData);
            console.log(status);
            expect(status).toEqual(202);
        })
        .catch((err) => {
            console.log(err);
        })

});

test('DELETE(id) test', () => {

    let status;
    let jsonData;

    fetch(url + 'exams/1', {

            method: 'delete',

        })
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then((jsonData) => {
            console.log(jsonData);
            console.log(status);
            expect(status).toEqual(200);
        })
        .catch((err) => {
            console.log(err);
        })

});
*/
