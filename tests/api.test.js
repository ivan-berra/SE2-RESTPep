const retreiveBackup = require('./utils/retreiveBackup');
const resetJSON = require('./utils/resetJSON');
const fetch = require('node-fetch');
const fs = require('fs');
const fileExams = 'db/exams.json';
const url = 'http://localhost:3000/api/';
var fileBackupExams = null;

beforeAll(() => {
 fileBackupExams = retreiveBackup(fileExams);
});

afterEach(() => {
    resetJSON(fileExams, fileBackupExams);
});

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
    expect.assertions(1);
    var status;
    return fetch(url + 'exams')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        })
        .catch((err) => {
            console.log(err);
        })
});

test('POST test', () => {
    expect.assertions(1);
    let status;
    let jsonData;

    return fetch(url + 'exams', {
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
    expect.assertions(1);
    var status;
    return fetch(url + 'exams/1')
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
    expect.assertions(1);
    let status;
    let jsonData;

    return fetch(url + 'exams/1', {

            method: 'put',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(testData)

        })
        .then((res) => {
            status = res.status;
            return res.status;
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
    expect.assertions(1);
    let status;
    let jsonData;

    return fetch(url + 'exams/1', {

            method: 'delete',

        })
        .then((res) => {
            status = res.status;
            return res.status;
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
