const passport= require('passport');
const localStrategy=require('passport-local').Strategy;
const User= require('../models/user.model');
const flash=require('connect-flash');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    })
});


passport.use('local.signup',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback : true
},(req,email,passwprd,done)=>{
User.findOne({email:email},(err,user)=>{
        if(err){
            return done(err);
        }
        if(user){
            return done(null,false,req.flash('error','user with email alerady exist'))
        }

        const newUser=new User();
        newUser.username=req.body.username;
        newUser.email= req.body.email;
        newUser.password= newUser.encryptPassword(req.body.password);
        console.log(newUser);
        newUser.save((error)=>{
            done(error,newUser);
        })
    })
}))