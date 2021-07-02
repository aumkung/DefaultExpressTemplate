const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// logger config
const logger = require('morgan');
const rt = require("file-stream-rotator")
const Writable = require("stream").Writable
class TerminalStream extends Writable {
  write(line) {
    //here you send the log line to wherever you need
    console.log("Logger:: ", line)
  }
}
let fileWriter = rt.getStream({filename: "/log/errors.log", frequency: "daily", verbose: true});
let terminalWriter = new TerminalStream()
// Skip requests that aren't for the homepage
const skipSuccess = (req, res)  => res.statusCode < 400; const skipError = (req, res) => res.statusCode >= 400;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const baseControllerRouter = require('./routes/baseController')

const server = express();

const { port, app_env } = require('./config').app

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');

// error logging
server.use(logger('combined', {
  skip: skipSuccess,
  stream: fileWriter
}))

// success logging
server.use(logger('combined', {
  skip: skipError,
  stream: terminalWriter
}))

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/', indexRouter);
server.use('/users', usersRouter);
server.use('/api', baseControllerRouter);

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = app_env === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log(`Server ready on PORT:${port}`);
console.log(`Server is running on ${app_env} mode`);


module.exports = server;
