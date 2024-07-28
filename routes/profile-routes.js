const router = require('express').Router();

//Adding security
const authUser = (req,res,next)=>{
    if(!req.user){
        res.redirect('/auth/login')
    }else{
        next()
    }
}

router.get('/',authUser,(req,res)=>{
    //res.render('profile',{user: req.user})
    res.render('profile',{user: req.user});
})

module.exports = router;