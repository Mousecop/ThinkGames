const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const webpack = require('webpack');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js')
const {User, ChatHistory, Messages} = require('./models/models');
const DATABASE_URL = 'mongodb://dev:dev@ds157621.mlab.com:57621/thinkgames-db';
const moment = require('moment');
const auth = require('./controllers/authentication');
const passport = require('passport');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;

mongoose.Promise = global.Promise;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public')); //eslint-disable-line no-undef
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// Create local strategy
const localLogin = new LocalStrategy({passReqToCallBack: true}, function(username, password, done) {
    console.log(username)
  // Verify this username and password, call done with the user if
  // is the correct username and password
  // otherwise, call done with false
  User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { 
            console.log('user not found');
            return done(null, false); 
        }

        // compare passwords - is req password = to user password?
        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }

            return done(null, user);
        }); 
    });
  });

app.use(passport.initialize())
passport.use(localLogin)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

mongoose.connect(DATABASE_URL, err => {
    if(err) {
        console.log(err)
        return err;
    } else {
        console.log('Db connected');
    }
})

const db = mongoose.connection;

// app.get('/', (req, res) => {
//     res.send({message: 'super secret message'})
// })

app.get('/api/users', (req, res) => {
    User
        .find({})
        .exec()
        .then(listOfUsers => {
            console.log('list of users:',listOfUsers)
            res.json(listOfUsers)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message:'internal server error'});
        })
})

app.get('/api/messages', (req, res) => {
    Messages
        .find({})
        .limit(15)
        .sort({
            createdAt: 'desc'
        })
        .exec()
        .then(listOfMessages => {
            console.log('list of messages:', listOfMessages)
            res.json(listOfMessages)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message:'internal server error'});
        })
})

app.get('/api/user/:username', (req, res) => {
    User
        .find({
            username: req.params.username
        })
        .exec()
        .then(currentUser => {
            res.json(currentUser)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message:'internal server error'});
        })
})

app.post('/api/users/signup', auth.signup)
app.post('/api/users/signin', (req, res, next) => {
    passport.authenticate('local', {session: false}, function(err, user, info) {
        if(err) { return next(err)}
        if(!user) {res.sendStatus(401)}

        req.logIn(user, function(err) {
            if(err) {return next(err);}
            return res.sendStatus(200)
        });
    })(req, res, next);
})

//Creates a new message in db, and then adds to chat history array for displaying later.
app.post('/api/new/message', (req, res) => {
    Messages
        .create({
            orderNumber: req.body.orderNumber,
            fromUser: req.body.fromUser,
            messageContent: req.body.content
        })
        .then(newMessage => {
            ChatHistory
                .findOneAndUpdate({}, {$push:{chatHistory: {orderNumber: newMessage.orderNumber, fromUser: newMessage.fromUser, messageContent: newMessage.messageContent}}})
                .then(created =>{
                    res.end()
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({message:'internal server error'});
                })
            console.log(newMessage)
            res.status(201).json(newMessage)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message:'internal server error'});
        })
})

//This was made to quickly seed db with this collection. Should only be called once.
app.post('/api/new/chat-history', (req, res) => {
    ChatHistory
        .create({
            chatHistory: []
        })
        .then(created => {
            res.status(201).json(created)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message:'internal server error'});
        })
})

//Server socketIo code
io.on('connection', socket =>{
    console.log('user has connected on ' + socket.id);

    socket.on('add user', username => {
        socket.username = username;
    })

    socket.on('disconnect', () => {
        console.log('user has disconnected')
    });

    socket.on('message', (body) => {
        console.log('from', socket.username)
        db.collection('messages').insert({
                from: socket.username,
                body: body,
                createdAt: Date.now()
            });
            
        socket.broadcast.emit('message', {
            body,
            from: socket.username,
            createdAt: moment().format('MM/D/YYYY hh:mm:ss')
        })
    });
})



server.listen(process.env.PORT || 3000);