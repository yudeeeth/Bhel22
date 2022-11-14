const { ExitStatus } = require('typescript');
const { modbusClient } = require('./jsmwrapper.js');
const modbus = new modbusClient(ip=process.argv[2],port=parseInt(process.argv[3]));
modbus.setup();

let globalInterval = 5000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const display = (message)=>{
    console.log("=======================================================================================")
    console.log(message)
    // console.log("=======================================================================================")
}

const testRead = async () => {
    display("Read Test")
    try {
        let c = await modbus.readRegisters(260, 40);
        console.log(c.response._body._valuesAsArray);
        console.log("successfully read values from 260 to 299")
    }
    catch (e) {
        console.log("Reading failed because of exception: " + e.toString().slice(0, 80));
    }
}

const testWrite = async () => {
    display("Write Test")
    try {
        let c = await modbus.readRegisters(9, 1);
        await modbus.writeRegisters(9, [c.response._body._valuesAsArray[0] + 1]);
        let d = await modbus.readRegisters(9, 1);
        if (c.response._body._valuesAsArray[0] + 1 == d.response._body._valuesAsArray[0]) {
            console.log("Successfully incremented value in register 9 to " + d.response._body._valuesAsArray[0] + "from " + c.response._body._valuesAsArray[0])
        }
        else {
            console.log("Writing value was not successful");
        }
    }
    catch (e) {
        console.log("Writing failed because of exception: " + e.toString().slice(0, 80));
    }
}

const testInterval = async () => {
    display("Interval Test")
    const intervalList = [5000, 4000, 3000, 2000, 1000, 500, 250, 100];
    for (let i in intervalList) {
        try {
            let c = await modbus.readRegisters(260, 40);
            // console.log(c.response._body._valuesAsArray);
            await sleep(intervalList[i]);
            c = await modbus.readRegisters(260, 40);
            // console.log(c.response._body._valuesAsArray);
            console.log("Successfully read values with interval" + intervalList[i])
            globalInterval = intervalList[i];
            await sleep(globalInterval);
        }
        catch (e) {
            console.log("Reading failed because of exception: " + e.toString().slice(0, 80) +" at Interval "+intervalList[i]);
            break;
        }
    }
    console.log("Minimum interval between readrequests for 40 registers is "+globalInterval);
}

const testRange = async (interval) => {
    display("Range Test")
    const ranges = [50,100,110,112,113,114,115,116,117,118,119,120,121,122,123,124,125,125,127,128,129,130,131,132,133];
    for (let i of ranges) {
        try {
            let c = await modbus.readRegisters(1, i);
            // console.log(c.response._body._valuesAsArray);
            console.log("Successfully read values with range " + i)
            await sleep(interval);
        }
        catch (e) {
            console.log("Reading failed because of exception: " + e.toString().slice(0, 80) +" at range "+i);
            break;
        }
    }
}

const testAll = async () => {
    setTimeout(async ()=>{
        display('Starting Tests');
        await testRead();
        await testWrite();
        await testInterval();
        await testRange(globalInterval);
        process.exit();
    },2000)
}

testAll();