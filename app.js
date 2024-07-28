const express = require('express');
const authRouter = require('./routes/auth-routes');
const profileRouter = require('./routes/profile-routes');

const app = express();

app.use(express.json())

const passportSetup = require('./config/passport-setup')
const { MongoClient, ServerApiVersion } = require('mongodb');
const keys = require('./config/keys');
const { connectToDB, getDB } = require('./utils/dbUtils');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const expressSession = require('express-session')
const path = require('path')
const filestore = require("session-file-store")(expressSession) 




//Set up view ending and ejs
app.set('view engine', 'ejs');

//Setting up - Cookies
//Method 1 - Using Cookie Session
/*app.use(cookieSession({
  maxAge: 60 * 60 *60 * 1000,
  keys: [keys.session.cookiesKey]
}))
*/

//Method 2 - using express-session
app.set('trust proxy', 1)
app.use(expressSession({
  name: "session-id", 
  secret: keys.session.cookiesKey,
  saveUninitialized: false, 
    resave: false, 
    store: new filestore(),
  cookie: { 
    /*secure: true,*/
    maxAge: 24 * 60 * 60 * 1000 
   }
}))

//Initialize the passport and open a session
app.use(passport.initialize());
app.use(passport.session());

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
let dbConnection
app.get('/dbConnectionStatus', (req, res) => {
  connectToDB((err) => {
    if (!err) {
      res.json({ msg: 'Connected to DB' });
    } else {
      res.json({ msg: 'Not Connected to DB' });
    }
  })
})

app.get('/inserRandomRecord', (req, res) => {
  connectToDB((err) => {
    if (!err) {
      dbConnection = getDB();

      dbConnection.collection('user_details')
        .insertOne({ id: 1, firstName: 'Manoj', lastName: 'R' })
        .then(result => {
          res.status(201).json(result);
        })
        .catch(err => {
          res.status(500).json({ err: 'Document not created.' })
        })
    }
  });
})

//DB Connection : Using Mongoose
mongoose.connect(keys.mongodb.dbURI)

app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.get('/', (req, res) => {
  res.render('home',{user: req.user});
})


app.listen(3000, () => {
  console.log('App now is listening for the request on port 3000')
})