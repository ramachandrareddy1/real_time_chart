const mongoose= require('mongoose');
const bcrypt=require('bcrypt-nodejs');

const userSchema= mongoose.Schema({
    username:{type:String,required:true},
    fullname:{type:String,default:''},
    email:{type:String,required:true},
    password:{type:String,required:true},
    userImage:{type:String,default:'default.png'},
    facebook:{type:String,default:''},
    google:{type:String,default:''},
    fbTookens:[],
    googleTookens:[]
});

userSchema.methods.encryptPassword=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
};


userSchema.methods.decryptPassword=function(password){
   return bcrypt.compareSync(password,this.password);
};
module.exports= mongoose.model('user',userSchema);