const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
  interval:'1d',
  path:logDirectory
})

const development = {
     name: 'development',
     assests_path: './assets',
     session_secret_key: 'Issue_Tracker_Secret_Key',
     db: 'issueTracker_development',
     morgan:{
       mode: 'dev',
       options: {stream :accessLogStream}
     }
   };
   
   const production = {
     name: 'production',
     assests_path: process.env.ISSUE_TRACKER_ASSET_PATH,
     session_secret_key: process.env.ISSUE_TRACKER_SESSION_SECRET_KEY,
     db: process.env.ISSUE_TRACKER_DB,
     morgan:{
      mode: 'combined',
      options: {stream :accessLogStream}
    }
   };
   
   // Check if the environment variable is not set or explicitly set to 'development'
   module.exports =
     process.env.ISSUE_TRACKER_ENVIRONMENT !== 'production'
       ? development
       : production;
   