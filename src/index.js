const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Tasks = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

// Its automatically gonna parse incoming json response to object
app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save()
    .then(user => {
        res.status(201).send(user);
    }).catch(error => {
        res.status(400).send(error);
        // res.send(`Error: ${error}`);
    })
})

app.get('/users', (req,res)=> {
    // This is gonna return all the users
    User.find({}).then(users => {
        res.send(users);
    }).catch(error => {
        res.status(500).send();
    })
})

app.get('/users/:id', (req, res)=> {
    console.log(req.params);
    const _id = req.params.id;
    // Mongoose automatically converts string id to Object id
    User.findById(_id).then(user => {
        if(!user){
            // Ye tab aayega jab hexadecimal hi id hogi lekin User mil nahi raha hai
            return res.status(404).send("User NOt found");
        }
        res.send(user);
    }).catch(error => {
        res.status(500).send(`Internal Server Error: ${error}`);
    })
})

app.post("/tasks", (req,res) => {
    const task = new Tasks(req.body);
    task.save()
    .then(task => {
        res.status(201).send(task);
    }).catch(error => {
        res.status(400).send(error);
    })
})

app.get("/tasks", (req, res) => {
    Tasks.find({}).then(task => {
        res.send(task);
    }).catch(error => {
        res.send(error);
    })
})

app.get("/tasks/:desc", (req,res) => {
    const desc = req.params.desc;
    Tasks.find({description: desc}).then(task => {
        if(!task){
            return res.status(400).send("task NOt Found!")
        }
        res.send(task);
    }).catch(error => {
        console.log(error);
    })
})

app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`)
})