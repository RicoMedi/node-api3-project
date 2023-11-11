const express = require('express');
const{ logger } = require('./middleware/middleware')
const server = express();
const userRouter = require('./users/users-router');
server.use(express.json());
// remember express by default cannot parse JSON in request bodies
server.use(logger)
// global middlewares and the user's router need to be connected here
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((error, req, res, next) => { // eslint-disable-line
  // here you could inspect the error and decide how to respond
  res.status(error.status || 500).json({ message: error.message });
});
module.exports = server;
