// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');
const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(resp => {
            res.json(resp);
        }).catch()
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'An error occurred',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router;