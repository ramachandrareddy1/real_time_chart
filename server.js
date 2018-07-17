const express= require('express');
const ejs= require('ejs');
const bodyParser= require('body-parser');
const path= require('path');
const http= require('http');
const app =express();
const server= http.createServer(app);
const user= require('./routes/user.router');
const cookieParser= require('cookie-parser');
const validator= require('express-validator');
const session= require('express-session');
const MongoStore= require('connect-mongo')(session);
const flash= require('connect-flash');
const mongoose= require('mongoose');
const passport= require('passport');
const morgan = require('morgan');
require('./passport/passport-local');
mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost:27017/ramu',{ useNewUrlParser: true });

//app basic configaration setup
app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
  }))
   
app.use(express.static('public'));
app.set('view engine',ejs);
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(validator());
app.use(flash());
app.use(session({
 secret:'secreat session',
 resave:true,
 saveUninitialized:true,
 store:new MongoStore({ mongooseConnection: mongoose.connection })
}));



app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))
 



app.use('/',user);






server.listen(3000,((error)=>{if(error)console.log(error);console.log('server running on the port',3000)}));