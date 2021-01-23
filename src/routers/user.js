// Middleware is a way to customize behaviour of mongoose model

const express = require('express');
const router = new express.Router();
const User = require("../models/user");
require('../db/mongoose')

router.post('/users', async (req, res) => {
    
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



router.post('/users/login', async (req, res)=> {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user);
    }catch(e){
        res.status(400).send(e);
    }
})



router.get('/users', async (req,res)=> {

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
        console.log(error)
    }
})



router.get('/users/:id', async (req, res)=> {

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



router.patch("/users/:id", async (req, res) => {

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
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });

        const user = await User.findById(_id);
        updates.forEach(update => {
            user[update] = req.body[update];
        })
        // console.log(user)
        await user.save();

        if(!user){
            res.status(404).send();
        }
        res.send(user);
    }catch(error){
        res.status(500).send(error);
    }
})



router.delete("/users/:id", async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }catch (e){
        res.status(500).send(e);
    }
})


module.exports = router