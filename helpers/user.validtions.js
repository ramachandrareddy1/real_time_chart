const validator= require('express-validator');
module.exports=function(){
    return{
        signupValidations:(req,res,next)=>{
            req.checkBody('username','user name is required').notEmpty;
            req.getValidaionResult()
            .then((result)=>{
               const errors= result.arry();
               const messages=[];
               errors.forEach(error => {
                   messages.push(error);
                   req.flash('error',messages);
                   res.redirect('/signup');
               });
            })
            .catch(()=>{
                return next();
            })

        }
    }
}