const router= require('express').Router();
const passport=require('passport');
const helper= require('../helpers/user.validations');
router.get('/',(req,res)=>{
    res.render('login.ejs',{'test':'testBy Rcr'});
});

router.get('/signup',(req,res)=>{
    res.render('signup.ejs');
});

router.post('/signup',helper.signupValidations,passport.authenticate('local.signup',{
    successRedirect:'/home',
    failureRedirect: '/signup',
    failureFlash:true
}));;

router.get('/home',(req,res)=>{
    res.render('home.ejs');
})


module.exports=router;