const db = require("mysql");

const client = db.createConnection({
    host: "localhost",
    user: "root",
    password: "bat@15#45;",
    database: "nodeogin"
})
client.connect(function(err) {
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }else{
        console.log("connected")
    }
});

module.exports = client;