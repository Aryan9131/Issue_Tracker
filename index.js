// Import required modules and packages
const express = require('express');
const db = require('./config/mongoose');
const env = require('./config/environment');
const logger=require('morgan');
const expressEjsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const nodeSassMiddleware = require('node-sass-middleware');
const path = require('path');

// Create an instance of the Express application
const app = express();
const PORT = 8000;

// Middleware for parsing incoming request data
app.use(express.urlencoded());

// Middleware for compiling SCSS to CSS using node-sass
if(process.env.ISSUE_TRACKER_ENVIRONMENT=='development'){
    app.use(nodeSassMiddleware({
        src: path.join(__dirname, env.assests_path, '/scss'),
        dest: path.join(__dirname, env.assests_path, '/css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware to serve static files from the specified directory
app.use(express.static(env.assests_path));

app.use(logger(env.morgan.mode , env.morgan.options));

// Middleware for using EJS layouts
app.use(expressEjsLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware for managing sessions
app.use(session({
    name: env.session_cookie_key,
    secret: env.session_secret_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) // Session timeout duration
    },
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://aryannayak9131:AhGzJJtziaZKPCYo@cluster0.luuffqt.mongodb.net/${env.db}?retryWrites=true&w=majority`,
        autoRemove: 'disable'
    })
}));

// Middleware for initializing and using Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Use Express routes defined in the 'routes' module
app.use('/', require('./routes'));

// Start the server and listen on the specified port
app.listen(PORT, (err) => {
    if (err) {
        console.log("Error while running Server: ", err);
        return;
    }
    console.log(env.session_secret_key +" "+env.db+" "+env.assests_path+" "+env.name);
    console.log('Server is running at Port:', PORT +"  "+process.env.ISSUE_TRACKER_ENVIRONMENT);
});
