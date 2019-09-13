const { mongoose } = require('./db');
const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const port = 3000;
const corspermissions = require('./middlewares/corspermissions')
const user = require('./routes/users');

//app.use(corspermissions.permission);
app.use(cors())
app.use(express.json({ limit: '50mb' }));


 
// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log('Listening on port 3000');
})

app.get('/', (req, res) => {
    res.send(200)
})

app.use('/api/users', user);