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

app.post('/read',async(req,res)=>{
    let obj = {};
    for(let key in req.body){
        let temp = await modbus.readRegisters(req.body[key][0],req.body[key][1]);
        temp = temp.response.body.valuesAsArray;
        obj[key] = temp;
    }
    res.json(obj);
})

app.post('/write',async(req,res)=>{
    let obj = {};
    for(let key in req.body){
        obj[key] = await modbus.writeRegisters(req.body[key][0],req.body[key][1]);
    }
    res.json(obj);
})