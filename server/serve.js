// setup express server
const express = require('express');
const app = express();
app.use(express.json());
app.listen(5000,()=>{console.log("...listening on port 3000...")});

// setup modbus connection and get client
const { modbusClient } = require('./jsmwrapper.js');
const modbus = new modbusClient();
modbus.setup();

// setup sqlite connection and get client
const { dbClient } = require('./dbwrapper.js');
const db = new dbClient();
db.setup();

// current sync value
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let globalInterval = 1000;
let dataSync = new Array(400).fill(0);
console.log(Array.isArray(dataSync));
let getUpdateModbus = true;

setInterval(async ()=>{
    if(getUpdateModbus)
    for(let i=0;i<4;i++){
        let data = await modbus.readRegisters(i*100,100);
        dataSync = [...dataSync.slice(0,i*100),...data.response._body._valuesAsArray,...dataSync.slice((i+1)*100,400)];
        await sleep(globalInterval);
    }
},globalInterval);

setInterval(async () => {
    let data = dataSync.slice(260,300);
    data = data.map(v=>v%127);
    // console.log(data.response._body._valuesAsArray);
    await db.insertData(JSON.stringify(data));
},globalInterval);

setInterval(async ()=>{
    await db.deleteBeforeThreeDays();
},1000*3600*24);

// serve the static files (react stuff after build)
app.use(express.static('build'));

app.get('/isconnected', async(req,res)=>{
    res.json(await modbus.isconnected());
})

app.post('/read',async(req,res)=>{
    let obj = {};
    for(let key in req.body){
        let temp = dataSync.slice(req.body[key][0],req.body[key][0]+req.body[key][1]);
        temp = temp.map(e=>e%127);
        obj[key] = temp;
    }
    res.json(obj);
})

app.post('/set',async(req,res)=>{
    let obj = {};
    for(let key in req.body){
        let temp =await modbus.readRegisters(req.body[key][0],1);
        temp = temp.response._body._valuesAsArray[0];
        temp = temp | 1<<req.body[key][1]
        obj[key]=await modbus.writeRegisters(req.body[key][0],[temp]);
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

app.post('/realtime',async(req,res)=>{
    // read data from dbclient
    let data = await db.getData(req.body?.timestamp);
    let obj = {};
    obj["values"] = [];
    for(let key in data){
        // console.log("helo")
        obj["values"].push({
            timestamp: data[key].timestamp,
            data: JSON.parse(data[key].data)
        });
    }
    obj["latest"] = data.slice(-1)[0].timestamp;
    res.json(obj);
})

