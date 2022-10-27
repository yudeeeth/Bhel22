class dbClient{
    constructor(){
        this.db = require('aa-sqlite');
    }

    async setup(){
        await this.db.open("./sensorData.db");
        await this.db.push("CREATE TABLE IF NOT EXISTS sensorData (timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, data TEXT)");
    }

    async deleteBeforeThreeDays(){
        await this.db.push("DELETE FROM sensorData WHERE timestamp < datetime(?,?)",['now',`-${3} days`]);
    }

    async insertData(data){
        await this.db.push("INSERT INTO sensorData (data) VALUES (?)",[data]);
    }

    async getData(prevTimestamp){
        if(prevTimestamp!==null){
            return await this.db.all("SELECT * FROM sensorData WHERE timestamp > ?",[prevTimestamp]);
        }
        else{
            return await this.db.all("SELECT * FROM sensorData");
        }
    }

    async delete(){
        await this.db.all("DELETE FROM sensorData");
    }

    close(){
        this.db.close();
    }
}

//         let d = new dbClient();
//         d.setup();
// async function test(){
//     try{
//         await d.insertData("test");
//         await d.delete();
//         console.log(await d.getData())
//     }
//     catch(err){
//         console.error(err);
//     }
    
// }

// test();


module.exports = { dbClient };