// add middlewares here related to actions
const Actions = require('./actions-model');

async function validateActionsId(req, res, next){
    let { id } = req.params;

    try{
        const actions = await Actions.get(id)
        if(!actions){
            res.status(404).json({ 
                message: 'Actions not found at this id'
            })
        } else {
            req.body.actions = actions;
            next()
        }
    } catch(err){
        res.status(500).json({
            message: 'Problem finding project'
        })
    }
}

async function validateAction(req, res, next){
    const { project_id, description, notes } = req.body;
    if(!project_id || !description || !notes){
        res.status(400).json({
            message: 'Project ID, description, and notes field required'
        })
    } else {
        next()
    }
}

module.exports = {
    validateActionsId,
    validateAction
}