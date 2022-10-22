const Modbus = require('jsmodbus')
const net = require('net')

class modbusClient{
    constructor(ip="127.0.0.1",port=5050){
        this.socket = new net.Socket()
        this.client = new Modbus.client.TCP(this.socket, 1)
        this.socket.on('connect',()=>{console.log("...connected to chip..."); this.connected = true})
        this.options = {
            'host' : ip,
            'port' : port
        };
        this.connected = false;
        return this;
    }
    setup = async ()=>{
        this.socket.connect(this.options);
        console.log("...connecting to chip...")
        await new Promise(r => setTimeout(r, 1000));
        // hoping to establish connection by this time
        if(!this.connected) throw new Error("...could not connect to chip...")
    }
    readRegisters = async (start,count)=>{
        try{
            return await this.client.readHoldingRegisters(start, count);
        }
        catch(err){
            console.log(err);
            return false;
        }
    }
    readCoils = async (start,count) => {
        try{
            return await this.client.readCoils(start,count);
        }
        catch(e){
            console.log(e);
            return false;
        }
    }
    writeRegisters = async (start,values) => {
        try{
            if(!values.every(e=>e>=0 && e<=65535)) return false;
            return await this.client.writeMultipleRegisters(start,values);
        }
        catch(err){
            console.log(err);
            return false;
        }
    }
    writeCoils = async (start,values) => {
        try{
            if(!values.every(e=>e>=0 && e<=65535)) return false;
            return await this.client.writeMultipleCoils(start,values);
        }
        catch(err){
            console.log(err);
            return false;
        }
    }
    isconnected = async()=>{
        try{
            await this.client.readHoldingRegisters(0,1);
            return true;
        }
        catch(err){
            console.error(err);
            return false;
        }

    }
}

// function to test if modbus is able to connect to chip
// async function test(){   
    // let k = new modbus()
    // k.setup();
//     let r = await k.readRegisters(200,10);
//     console.log(r.response._body._valuesAsArray);
// }
// test();  

module.exports = {
    modbusClient
}