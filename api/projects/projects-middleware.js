// add middlewares here related to projects
const Projects = require('./projects-model');

async function validateProjectId(req, res, next){
    let { id } = req.params;

    try{
        const project = await Projects.get(id)
        if(!project){
            res.status(404).json({ 
                message: 'Project not found'
            })
        } else {
            req.body.project = project;
            next()
        }
    } catch(err){
        res.status(500).json({
            message: 'Problem finding project'
        })
    }
}

async function validateProject(req, res, next){
    const { name, description } = req.body;
    if(!name || !description){
        res.status(400).json({
            message: 'Name and description field required'
        })
    } else {
        next()
    }
}

async function validateCompleted(req, res, next){
    const { completed } = req.body;
    if(completed === true || completed === false) {
        next()
    } else {
        res.status(400).json({
            message: 'Completed field required'
        })
    }
}

module.exports = {
    validateProjectId,
    validateProject,
    validateCompleted
}