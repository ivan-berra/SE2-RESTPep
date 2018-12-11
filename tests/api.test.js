const retreiveBackup = require('../core/retreiveBackup');
const resetJSON = require('../core/resetJSON');

const file = 'db/users.json';

let fileBackup = null

beforeAll(() => {
    fileBackup = retreiveBackup(file);
})

afterEach(() => {
    resetJSON(file, fileBackup);
})

const url = 'https://se2-restpep-dev.herokuapp.com';

//const url = 'http://localhost:3000/';

//const port = process.env.PORT || 3000;

var testData = { matricola: 200000, email: 'prova@prova.it', isTeacher: false };

var fetch = require('node-fetch');

const https = require('http');

test('Prova di connessione', () => {

    expect.assertions(1);

    var status;

    return fetch(url)
        .then((res) => {
            status = res.status;
            expect(status).toEqual(200);
        })

});

test('GET test', () => {

    expect.assertions(1);

    var status;
    return fetch(url + 'api/users')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});

test('GET(id) test', () => {

    expect.assertions(1);

    var status;
    return fetch(url + 'api/users/0')
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
        });

});


test('POST test', () => {

    expect.assertions(1);

    let status;
    let jsonData;

    return fetch(url + 'api/users', {

            method: 'post',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(testData)

        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(200)
        })

});


test('PUT(id) test', () => {

    expect.assertions(1);

    let status;
    let jsonData;

    return fetch(url + 'api/users/0', {

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
            expect(status).toEqual(200);
        })
        .catch((err) => {
            console.log(err);
        })

});

test('DELETE(id) test', () => {

    expect.assertions(1);

    let status;

    return fetch(url + 'api/users/0', {

            method: 'delete',

        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(204);
        })
        .catch((err) => {
            console.log(err);
        })

});