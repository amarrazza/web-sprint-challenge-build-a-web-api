const express = require('express');
const projectsRouter = require('./projects/projects-router')
const server = express();

server.use(express.json());
server.use('/api/projects', projectsRouter);


server.get('/', (req, res) => {
    res.send(`<h1>gm</h1>`);
});

module.exports = server;
