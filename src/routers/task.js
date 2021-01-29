const express= require('express');
const router = new express.Router();
const Tasks = require("../models/task");
const auth = require('../middleware/auth')

router.post("/tasks", auth, async (req,res) => {

    // const task = new Tasks(req.body);
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })

    // task.save()
    // .then(task => {
    //     res.status(201).send(task);
    // }).catch(error => {
    //     res.status(400).send(error);
    // })

    try{
        // console.log(task);
        const abc = await task.save();
        // console.log(abc)
        res.status(201).send(task);
    }catch(error){
        res.status(400).send(error);
        console.log(`Error: ${error}`)
    }
})



// GET /tasks?completed=true
// limit skip
// if i skip 0 that is I am getting first ten results if i skip 10 then I skip first page and get next page 10 results 
// GET /tasks?limit=10&skip?0
router.get("/tasks", auth, async (req, res) => {
    const match = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    
    // Tasks.find({}).then(task => {
    //     res.send(task);
    // }).catch(error => {
    //     res.send(error);
    // })

    try{
        // const tasks = await Tasks.find({owner: req.user._id});
        // await req.user.populate('tasks').execPopulate()
        
        await req.user.populate({
            path: 'tasks',
            // match: {
            //     completed: true
            // }
            match,
            options : {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate()

        // res.send(tasks);
        res.send(req.user.tasks);
    }catch(error){
        res.send(error);
    }
})



router.get("/tasks/:id", auth, async (req,res) => {
    
    const _id = req.params.id;
    // const desc = req.params.desc;
    
    // Tasks.find({description: desc}).then(task => {
    //     if(!task){
    //         return res.status(400).send("task NOt Found!")
    //     }
    //     res.send(task);
    // }).catch(error => {
    //     console.log(error);
    // })

    try{
        const task = await Tasks.findOne({_id, owner: req.user._id});
        if(!task){
            return res.status(404).send("Task Not Found!")
        }
        res.send(task);
    }catch(error){
        res.send(`Error: ${error}`)
    }
})



router.patch("/tasks/:id", auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidate = updates.every(update => {
        return allowedUpdates.includes(update);
    })

    if(!isValidate){
        return res.status(400).send('Invalid Update');
    }
    try{
        // const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        // const task = await Tasks.findById(req.params.id);

        const task = await Tasks.findOne({_id: req.params.id, owner: req.user._id})
        if(!task){
            res.status(404).send();
        }
        updates.forEach(update => {
            task[update] = req.body[update];
        })
        await task.save();
        res.send(task);
    }catch(error){
        res.status(500).send(error);
    }

})



router.delete("/tasks/:id", auth, async(req, res) => {
    try {
        // const task = await Tasks.findByIdAndDelete(req.params.id);
        const task = await Tasks.findOneAndDelete({_id: req.params.id, owner: req.user._id })
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch (e){
        res.status(500).send(e);
    }
})


module.exports = router