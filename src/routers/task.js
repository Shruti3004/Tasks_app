const express= require('express');
const router = new express.Router();
const Tasks = require("../models/task");

router.post("/tasks", async (req,res) => {

    const task = new Tasks(req.body);

    // task.save()
    // .then(task => {
    //     res.status(201).send(task);
    // }).catch(error => {
    //     res.status(400).send(error);
    // })

    try{
        await task.save();
        res.status(201).send(task);
    }catch(error){
        res.status(400).send(error);
    }
})



router.get("/tasks", async (req, res) => {
    
    // Tasks.find({}).then(task => {
    //     res.send(task);
    // }).catch(error => {
    //     res.send(error);
    // })

    try{
        const tasks = await Tasks.find({});
        res.send(tasks);
    }catch(error){
        res.send(error);
    }
})



router.get("/tasks/:id", async (req,res) => {
    
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
        const task = await Tasks.find({_id});
        if(!task){
            return res.status(400).send("Task Not Found!")
        }
        res.send(task);
    }catch(error){
        res.send(`Error: ${error}`)
    }
})



router.patch("/tasks/:id", async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidate = updates.every(update => {
        return allowedUpdates.includes(update);
    })

    if(!isValidate){
        return res.status(400).send('Invalid Update');
    }
    try{
        const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!task){
            res.status(404).send();
        }
        res.send(task);
    }catch(error){
        res.status(500).send(error);
    }

})



router.delete("/tasks/:id", async(req, res) => {
    try {
        const task = await Tasks.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch (e){
        res.status(500).send(e);
    }
})


module.exports = router