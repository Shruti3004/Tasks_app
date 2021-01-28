// Middleware is a way to customize behaviour of mongoose model

const express = require('express');
const router = new express.Router();
const User = require("../models/user");
const auth = require('../middleware/auth')
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
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token });
    } catch (error){
        res.status(400).send(error);
    }
})



router.post('/users/login', async (req, res)=> {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        // console.log(user.getPublicProfile())
        // res.send({ user: user.getPublicProfile() , token });
        res.send({user, token})
    }catch(e){
        res.status(400).send(e);
    }
})



router.post('/users/logout', auth, async (req, res) => {
    try {
        // console.log(req.user.tokens)
        req.user.tokens = req.user.tokens.filter(token => {
            // console.log(token.token, req.token);
            return token.token !== req.token
        })
        // console.log(req.user.tokens);
        await req.user.save();
        res.send()
    } catch(e){
        console.log(e)
        res.status(500).send()
    }
})



router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

// Second arguement should be middleware
router.get('/users/me', auth ,async (req,res)=> {

    // This is gonna return all the users
    // User.find({}).then(users => {
    //     res.send(users);
    // }).catch(error => {
    //     res.status(500).send();
    // })

    // try{
    //     const users = await User.find({});
    //     res.send(users);
    // }catch(error){
    //     res.status(500).send();
    //     console.log(error)
    // }

    res.send(req.user)
})



// router.get('/users/:id', async (req, res)=> {

//     console.log(req.params);
//     const _id = req.params.id;

//     // Mongoose automatically converts string id to Object id
//     // User.findById(_id).then(user => {
//     //     if(!user){
//     //         // Ye tab aayega jab hexadecimal hi id hogi lekin User mil nahi raha hai
//     //         return res.status(404).send("User NOt found");
//     //     }
//     //     res.send(user);
//     // }).catch(error => {
//     //     res.status(500).send(`Internal Server Error: ${error}`);
//     // })

//     try{
//         const user = await User.findById(_id);
//         if(!user){
//             return res.status(404).send("User NOt found");
//         }           
//         res.send(user);

//     }catch(error){
//         res.status(500).send(`Internal Server Error: ${error}`);
//     }
// })



router.patch("/users/me", auth, async (req, res) => {

    // it will return the array of strings
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation){
        return res.status(400).send('Invalid Updates');
    }
    try {
        
        // new will return the new/updated user
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        updates.forEach(update => {
            // console.log(req.user[update], req.body[update])
            req.user[update] = req.body[update];
        });
        // console.log(req.user)

        await req.user.save();

        // if(!user){
        //     res.status(404).send();
        // }
        res.send(req.user);
    }catch(error){
        res.status(500).send(error);
    }
})



router.delete("/users/me", auth, async(req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id);
        // if(!user){
        //     return res.status(404).send();
        // }
        await req.user.remove();
        res.send(req.user);
    }catch (e){
        res.status(500).send(e);
    }
})


module.exports = router