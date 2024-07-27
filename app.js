const express = require('express');
const authRouter = require('./routes/auth-routes');
const app = express();
const passportSetup = require('./config/passport-setup')
const {MongoClient,ServerApiVersion} = require('mongodb');
const keys = require('./config/keys')
const {connectToDB,getDB} = require('./utils/dbUtils')






//Set up view ending and ejs
app.set('view engine','ejs');

//connect to mongodb
//Method 1
/*
const mongoClient = new MongoClient(keys.mongodb.dbURI,{
  serverApi:{
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
});
async function run() {
    try {
      await mongoClient.connect();
      mongoClient.db("code_under_dog")
      .collection('user_details',(err,collection)=>{
        collection.insert({id: 1, firstName: 'Manoj', lastName: 'R'});
      })
      .collection('user_details').count((err,count)=>{
        if(err) console.error(err)

          console.log(`Count: ${count}`)
      })  
      console.log("End! of statement");
    } finally {
      // Ensures that the client will close when you finish/error
      await mongoClient.close();
    }
  }
  run().catch(console.dir);
  */
 //Method 2
app.get('/dbConnectionStatus',(req,res)=>{
   connectToDB((err)=>{
      if(!err){
        res.json({msg: 'Connected to DB'});
      }else{
        res.json({msg: 'Not Connected to DB'});
      }
   })
})

app.use('/auth',authRouter);

app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(3000,()=>{
    console.log('App now is listening for the request on port 3000')
})