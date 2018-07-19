var compression = require('compression');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var session = require('express-session');
const bcrypt = require('bcrypt');

var express = require('express');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const MongoStore = require('connect-mongo')(session);
var app = express();
app.disable('x-powered-by');
app.use(compression())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: "My_secret",
    store: new MongoStore({url: 'mongodb://' + process.env.dbuser + ':' + process.env.dbpassword + '@ds137631.mlab.com:37631/singhportfolio'}),
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//Main Routes

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/blog', require('./api/routes/blogRoutes/blog'));
app.use('/chat', require('./routes/chat'));
app.use('/api/chat', require('./api/routes/chatRoutes/chat'));



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;