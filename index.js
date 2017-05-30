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
const cors = require('cors')
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./config');

mongoose.Promise = global.Promise;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public')); //eslint-disable-line no-undef
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use(passport.initialize())



// Create local strategy
const localOptions = { usernameField: 'username' };
const localLogin = new LocalStrategy(localOptions, function(username, password, done) {
  // Verify this username and password, call done with the user if
  // is the correct username and password
  // otherwise, call done with false
  return User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { console.log('user not found'); return done(null, false); }

    // compare passwords - is req password = to user password?
    return user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { console.log('password does not match'); return done(null, false); }

      return done(null, user);  
    });
  });
});

// Create JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // payload is sub property and iat property
  // See if the user ID in the payload exists in our database
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    // If it does, call 'done' with that user
    if (user) {
      done(null, user);
    }
    // otherwise, call done without a user object
    else {
      done(null, false);
    }

  });
});
passport.use('jwt', jwtLogin)
passport.use('local-login', localLogin)
const requireSignin = passport.authenticate('local-login', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

mongoose.connect(DATABASE_URL, err => {
    if(err) {
        console.log(err)
        return err;
    } else {
        console.log('Db connected');
    }
})

const db = mongoose.connection;

app.get('/', requireAuth, (req, res) => {
    res.send({message: 'super secret message'})
})

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
        .sort({
            createdAt: -1
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
app.post('/api/users/signin', requireSignin, auth.signin)

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

    // socket.on('connect', () => {
    //     const messages = db.collection('messages').find({}).sort({
    //         createdAt: -1
    //     })
    //     socket.emit('message', messages)
    // })

    socket.on('add user', username => {
        socket.username = username;
    })

    socket.on('disconnect', () => {
        console.log('user has disconnected')
    });

    socket.on('message', (body) => {
        console.log('from', socket.username)
        db.collection('messages').insert({
                fromUser: socket.username,
                messageContent: body,
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