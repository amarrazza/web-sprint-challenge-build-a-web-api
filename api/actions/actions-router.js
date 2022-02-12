// Write your "actions" router here!
const express = require('express');
const { validateActionsId, validateAction } = require('./actions-middleware');

const Actions = require('./actions-model');
const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.json(actions);
        }).catch(next);
});

router.get('/:id', validateActionsId, (req, res) => {
    res.json(req.body.actions)
});

router.post('/', validateAction, async(req, res, next) => {
    let newAction = req.body;
    try {
        let result = await Actions.insert(newAction);
        res.status(201).json(result);
    } catch(err) {
        err.status = 400;
        next(err);
    }
});

router.put('/:id', validateActionsId, validateAction, (req, res, next) => {
    let { id } = req.params;
    Actions.update(id, {
        "project_id": req.body.project_id,
        "description": req.body.description,
        "notes": req.body.notes,
        "completed": req.body.completed
    }).then(updatedAction => {
            res.json(updatedAction)
        }).catch(next);
});

router.delete('/:id', validateActionsId, (req, res, next) => {
    let { id } = req.params;
    Actions.remove(id)
        .then(() => {
            res.json();
        }).catch(next);
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'An error occurred',
        message: err.message,
        stack: err.stack
    });
});

module.exports = router;