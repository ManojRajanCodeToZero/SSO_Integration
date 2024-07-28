const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login',(req,res)=>{
    res.render('login')
});


router.get('/logout',(req,res)=>{
   req.session.destroy((err)=>{
        if(err){
            console.log(`Logout exception - ${err}`)
        }else{
                req.session = null;
                console.log("logout successful");
                return res.redirect('/');
        }
   }) 
});

//auth with google
router.get('/google',passport.authenticate('google',{
    scope: ['profile']
}));
//Here, the authenticator will use the code from callback url and exchanges it to get the profile information
router.get('/google/callback',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile/')
});

module.exports = router;