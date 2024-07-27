const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login',(req,res)=>{
    res.render('login')
});


router.get('/logout',(req,res)=>{
res.send('Logging out')
})

//auth with google
router.get('/google',passport.authenticate('google',{
    scope: ['profile']
}));
//Here, the authenticator will use the code from callback url and exchanges it to get the profile information
router.get('/google/callback',passport.authenticate('google'),(req,res)=>{
    res.send('res')
});

module.exports = router;