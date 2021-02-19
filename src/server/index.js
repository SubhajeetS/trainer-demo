const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

app.use(express.static('dist'));
app.use('/', proxy('http://ec2-18-191-151-130.us-east-2.compute.amazonaws.com:8100'));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
