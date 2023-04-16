const fs = require('fs');
const rfs = require('rotating-file-stream');
const path =require('path');
const logDirectory = path.join(__dirname,'../production_logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log',
{
    interval:'1d',
    path:logDirectory,

});
const development = 
{
   name:'development',
   asset_path:'assets',
   session_cookie_key:'blahsomething',
   db:'contacts_list_db',
   smtp:{
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:
    {
        user:'mernlearn.15@gmail.com',
        pass:'zyrlzgqjzetqlhpx'
    }
},
google_client_id:"305957639560-sflhsobi01jca8usulsbudd9p8622ha7.apps.googleusercontent.com",
google_client_secret:"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",
google_call_back_url:"http://localhost:8000/users/auth/google/callback",
jwt_secret:'codeial',
morgan:{
    mode:'dev',
    options:{stream:accessLogStream}

}
    
}
const production =
{
  name:'production',
  asset_path:process.env.Major2_Asset_path,
  session_cookie_key:process.env.major2_session_cookie,
  db:process.env.major2_db,
  smtp:{
   service:'gmail',
   host:'smtp.gmail.com',
   port:587,
   secure:false,
   auth:
   {
       user:process.env.major2_gamil_username,
       pass:process.env.major2_gamil_password 
   }
},
google_client_id:process.env.major2_google_client_id ,
google_client_secret:process.env.major2_google_client_secret,
google_call_back_url:process.env.major2_google_call_back_url ,
//google_call_back_url:"http://localhost:8000/users/auth/google/callback",
jwt_secret:process.env.major2_jwt_secret,
morgan:{
    mode:'combined',
    options:{stream:accessLogStream}

}
 
}
module.exports = eval(process.env.major2_environment)== undefined ? development : eval(process.env.major2_environment)