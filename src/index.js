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

app.post("/tasks", (req,res) => {
    const task = new Tasks(req.body);
    task.save()
    .then(task => {
        res.status(201).send(task);
    }).catch(error => {
        res.status(400).send(error);
    })
})

app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`)
})