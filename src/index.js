const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Tasks = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

// Its automatically gonna parse incoming json response to object
app.use(express.json());

app.post('/users', async (req, res) => {
    
    const user = new User(req.body);
    // user.save()
    // .then(user => {
    //     res.status(201).send(user);
    // }).catch(error => {
    //     res.status(400).send(error);
    //     // res.send(`Error: ${error}`);
    // })
    
    try{
        await user.save();
        res.status(201).send(user);
    } catch (error){
        res.status(400).send(error);
    }
})



app.get('/users', async (req,res)=> {

    // This is gonna return all the users
    // User.find({}).then(users => {
    //     res.send(users);
    // }).catch(error => {
    //     res.status(500).send();
    // })

    try{
        const users = await User.find({});
        res.send(users);
    }catch(error){
        res.status(500).send();
    }
})



app.get('/users/:id', async (req, res)=> {

    console.log(req.params);
    const _id = req.params.id;

    // Mongoose automatically converts string id to Object id
    // User.findById(_id).then(user => {
    //     if(!user){
    //         // Ye tab aayega jab hexadecimal hi id hogi lekin User mil nahi raha hai
    //         return res.status(404).send("User NOt found");
    //     }
    //     res.send(user);
    // }).catch(error => {
    //     res.status(500).send(`Internal Server Error: ${error}`);
    // })

    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send("User NOt found");
        }           
        res.send(user);

    }catch(error){
        res.status(500).send(`Internal Server Error: ${error}`);
    }
})



app.patch("/users/:id", async (req, res) => {

    // it will return the array of strings
    const updates = Object.keys(req.body);
    // console.log(updates);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    const _id = req.params.id;

    if(!isValidOperation){
        return res.status(400).send('Invalid Updates');
    }
    try {
        // new will return the new/updated user
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if(!user){
            res.status(404).send();
        }
        res.send(user);
    }catch(error){
        res.status(500).send();
    }
})



app.post("/tasks", async (req,res) => {

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



app.get("/tasks", async (req, res) => {
    
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



app.get("/tasks/:id", async (req,res) => {
    
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



app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`)
})