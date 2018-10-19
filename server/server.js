const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

let app = express();

// app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.url);
    next();
})

app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/name-input-form', (req, res) => {
    let formData = {
        firstName: req.body.firstname,
        lastName: req.body.lastname
    }
    fs.writeFile('forms.json', JSON.stringify(formData), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
    res.send('Name saved successfully!');
})

app.use('/formsubmissions', (req, res) => {
    fs.readFile('forms.json')
})

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000);