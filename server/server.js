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

app.get( '/taco', (req, res) => {
    res.send( formData );
})

app.post( '/taco', (req, res) => {
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


// this will handle the email!
app.post('/send', function(req, res, next) {
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'joh04971@gmail.com', // generated ethereal user
            clientId: '474000593328-4lh0cllak5r0gmmdmnaf98v5be7qug6t.apps.googleusercontent.com',
            clientSecret: 'y3lK-ZofVrNsjH7lM0EMYWuI',
            refreshToken: '1/fNHI4IYEbf1F50xnrdNQYb1p7zrz7MruMVvrPZU2ynU',

        }
    });
    const mailOptions = {
      from: `${req.body.email}`,
      to: 'joh04971@gmail.com',
      subject: `${req.body.name}`,
      text: `${req.body.message}`,
      replyTo: `${req.body.email}`
    };
    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', res)
      }
    });
});



/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});