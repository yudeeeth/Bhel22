const modbus = require('jsmodbus')
const net = require('net')
const netServer = new net.Server()
const server = new modbus.server.TCP(netServer)
server._options.holding = Buffer.alloc(400*2);

netServer.listen(5050);

setInterval(()=>{
    for(let i=0;i<400*2;i+=2){
        if(i>40)
       server._options.holding[i] = Math.random()*127;
    }
},1000);
