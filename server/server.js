const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// Nodemailer
const nodemailer = require('nodemailer');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(express.static('build'));


const formData = [];

app.get( '/data', (req, res) => {
    res.send( formData );
})

app.post( '/data', (req, res) => {
    console.log( `req.body is:`, req.body );
    
    let newData = {
        name: req.body.name,
        food: req.body.food,
        animal: req.body.animal
    };
    formData.push(newData);
    console.log( `new formData is:`, formData );
    res.sendStatus(201);
})

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});