const {MongoClient} = require('mongodb')
const keys = require('../config/keys')

let dbConnection
module.exports = {
    connectToDB:(cb)=>{
        MongoClient.connect(`${keys.mongodb.dbURI}`)
        .then((client)=>{
            dbConnection = client.db();
            return cb()
        })
        .catch((err)=>{
            console.log(err);
            return cb(err)
        })
    },
    getDB: ()=>dbConnection
}
