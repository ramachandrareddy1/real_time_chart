const router= require('express').Router();

router.get('/',(req,res)=>{
    res.render('index.ejs',{'test':'testBy Rcr'});
});

router.get('/login',(req,res)=>{
    res.render('signup.ejs');
})


module.exports=router;