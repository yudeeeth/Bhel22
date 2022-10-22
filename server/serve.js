// setup express server
const express = require('express');
const app = express();
app.use(express.json());
app.listen(5000,()=>{console.log("...listening on port 3000...")});

// setup modbus connection and get client
const { modbusClient } = require('./jsmwrapper.js');
const modbus = new modbusClient();
modbus.setup();

// serve the static files (react stuff after build)
app.use(express.static('build'));

app.get('/isconnected', async(req,res)=>{
    res.json(await modbus.isconnected());
})