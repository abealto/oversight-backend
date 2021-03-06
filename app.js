var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var models = require('./models');
var auth = require('./services/auth');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');
var gamesRouter = require('./routes/games');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

models.sequelize.sync().then(function () {
  console.log("DB Sync'd up");
});

app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/games', gamesRouter);
app.use('/', indexRouter);

module.exports = app;
