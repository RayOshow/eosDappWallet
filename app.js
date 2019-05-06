var express = require('express');
var app = express();
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var ipFilter = require('express-ipfilter').IpFilter;
var IpDeniedError = require('express-ipfilter').IpDeniedError;
var indexRouter = require('./routes/index');
var bodyParser = require('body-parser');

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
console.log(process.env.NODE_ENV+' mode start.');

///////////////////////////////////////////////////////////////////
// Set up CORS.
var whitelist;
if( process.env.NODE_ENV == 'production' ) {
    // This would be filled with allowed Dapp servers.
    whitelist = ['localhost'];
} else if( process.env.NODE_ENV == 'development' ) {
    whitelist = ['localhost'];
}

var corsOptions = {
    origin: function (origin, callback) {

        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials :true
}
///////////////////////////////////////////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404, "Not exist!"));
});

// error handler
app.use(function(err, req, res, next) {

    if(err instanceof IpDeniedError){
        res.status(401);
    }
    res.json(err.message);
});

module.exports = app;