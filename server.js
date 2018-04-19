const express = require('express');
const app = express();
const fs = require('fs')
const inJson = require ("./info.json");
app.use(express.static('./public'));

app.get('/getJson', (req, res) => {
    console.log('through /getJson');
    fs.readFile("./info.json", 'utf-8', (err, jsonFileData) => {
        console.log("what log", jsonFileData);
        res.send({
            jsonFileData : JSON.parse(jsonFileData),
            success : true
        })
    })
});


app.get('/', (req, res) => {
    console.log("logging through / app.get");
    res.sendFile(__dirname + '/index.html')
})

app.listen(8080, function() {
    console.log("I'm listening.")
});
