const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const webpack = require('webpack');
const mongoose = require('mongoose');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js')
const {User, ChatHistory, Messages} = require('./models/models');
const DATABASE_URL = 'mongodb://localhost/thinkgames-db';
const moment = require('moment');

mongoose.Promise = global.Promise;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.json())

mongoose.connect(DATABASE_URL, err => {
    if(err) {
        console.log(err)
        return err;
    } else {
        console.log('Db connected');
    }
})

const db = mongoose.connection;


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

//Basic user signup. TODO: add bcyrpt
app.post('/api/users/signup', (req, res) => {
    User
        .create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
        .then(newUser => {
            console.log(newUser)
            res.status(201).json(newUser)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message:'internal server error'});
        })
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

    // socket.on('connect', () => {
    //     const messages = db.collection('messages').find({}).sort({
    //         createdAt: -1
    //     })
    //     socket.emit('message', messages)
    // })

    socket.on('disconnect', () => {
        console.log('user has disconnected')
    });

    socket.on('message', body => {
        db.collection('messages').insert({
                fromUser: socket.id.slice(9),
                messageContent: body,
                createdAt: Date.now()
            });
            
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(9),
            createdAt: moment().format('MM/D/YYYY hh:mm:ss')
        })
    });
})



server.listen(3000);