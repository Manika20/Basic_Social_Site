const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
const session = require('express-session');
const passport= require('passport');
const LocalStrategy = require('./config/passport-local-stratrgy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware(
    {
        src:"./assets/scss",
        dest:'./assets/css',
        debug:true,
        outputStyle:'extended',
        prefix:'/css'
    }
))
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine',"ejs");
app.set('views','./views');




app.use(session(
    {
        name : 'major2',
        secret: 'blahsomething',
        saveUninitialized:false,
        resave:false,
        cookie:
        {
            maxAge:(1000*60*100)
        },
        store:  MongoStore.create(
            {
                //mongooseConnection:db,
                mongoUrl:'mongodb://0.0.0.0:27017/contact_list_cookie',
                autoRemove :'disabled'
            },
            function(err)
            {
                console.log(err||'connect-mongo-db-setup-ok');
            }
        )

    }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});