// Write your "projects" router here!
const express = require('express');
const { validateProjectId, validateProject, validateCompleted } = require('./projects-middleware');

const Projects = require('./projects-model');
const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(resp => {
            res.json(resp);
        }).catch()
});

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.body.project);
});

router.post('/', validateProject, async (req, res, next) => {
    let newProject = req.body;
    try {
        let result = await Projects.insert(newProject);
        res.status(201).json(result);
    } catch(err){
        err.status = 400;
        next(err)
    }
});

router.put('/:id', validateProjectId, validateProject, validateCompleted, (req, res, next) => {
    let { id } = req.params;
    Projects.update(id, {
        "name": req.body.project_id,
        "description": req.body.description,
        "completed": req.body.completed
    })
        .then(updatedProject => {
            res.json(updatedProject);
        }).catch(next);
});

router.delete('/:id', validateProjectId, (req, res, next) => {
    let { id } = req.params;
    Projects.remove(id)
        .then(() => {
            res.json();
        }).catch(next);
});

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    let { id } = req.params;
    Projects.getProjectActions(id)
        .then(actions => {
            res.json(actions);
        }).catch(next);
});

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'An error occurred',
        message: err.message,
        stack: err.stack
    });
});

module.exports = router;