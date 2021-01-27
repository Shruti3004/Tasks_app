const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// 
// Without Middleware: new request -> run route handler
// 
// With Middleware:    new request -> do something -> run route handler
// 

// app.use((req, res, next) => {
//     // next is required to register middleware
//     console.log(req.method, req.path);
//     // this is to tell the express that we are doe with a function and we should move next
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled')
//     }else{
//         next();
//     }
// })

app.use((req, res, next) => {
    res.status(503).send('SIte is under maintenance')
})

// Its automatically gonna parse incoming json response to object
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// const bcrypt = require('bcryptjs');

// const myFunction = async () => {
//     const password = "Shruti@123";
//     const hashedPassword = await bcrypt.hash(password, 8);
//     // console.log(password);
//     // console.log(hashedPassword);

//     // if user logins again then we will check the value of entered password to hash
//     const isMatch = await bcrypt.compare('SHruti@123', hashedPassword);
//     // console.log(isMatch);
// }
// myFunction()

// https://www.base64decode.org paste the middle one we will get two things one id that we provided and the other is 'iat' that is 'issued at' it will gives us the timestamp

// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days'});
//     console.log(token);
//     const data = jwt.verify(token, 'thisismynewcourse');
//     console.log(data)
// }
// myFunction()











/*******************************************************************************************************/

// const router = new express.Router();
// router.get('/test', (req,res) => {
//     res.send('Testing');
// })
// app.use(router)


// app.post('/users', async (req, res) => {
    
//     const user = new User(req.body);
//     // user.save()
//     // .then(user => {
//     //     res.status(201).send(user);
//     // }).catch(error => {
//     //     res.status(400).send(error);
//     //     // res.send(`Error: ${error}`);
//     // })
    
//     try{
//         await user.save();
//         res.status(201).send(user);
//     } catch (error){
//         res.status(400).send(error);
//     }
// })



// app.get('/users', async (req,res)=> {

//     // This is gonna return all the users
//     // User.find({}).then(users => {
//     //     res.send(users);
//     // }).catch(error => {
//     //     res.status(500).send();
//     // })

//     try{
//         const users = await User.find({});
//         res.send(users);
//     }catch(error){
//         res.status(500).send();
//     }
// })



// app.get('/users/:id', async (req, res)=> {

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



// app.patch("/users/:id", async (req, res) => {

//     // it will return the array of strings
//     const updates = Object.keys(req.body);
//     // console.log(updates);
//     const allowedUpdates = ['name', 'email', 'password', 'age'];
//     const isValidOperation = updates.every((update) => {
//         return allowedUpdates.includes(update);
//     })

//     const _id = req.params.id;

//     if(!isValidOperation){
//         return res.status(400).send('Invalid Updates');
//     }
//     try {
//         // new will return the new/updated user
//         const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
//         if(!user){
//             res.status(404).send();
//         }
//         res.send(user);
//     }catch(error){
//         res.status(500).send();
//     }
// })



// app.delete("/users/:id", async(req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);
//         if(!user){
//             return res.status(404).send();
//         }
//         res.send(user);
//     }catch (e){
//         res.status(500).send(e);
//     }
// })



/******************************* Tasks *********************************/

// app.post("/tasks", async (req,res) => {

//     const task = new Tasks(req.body);

//     // task.save()
//     // .then(task => {
//     //     res.status(201).send(task);
//     // }).catch(error => {
//     //     res.status(400).send(error);
//     // })

//     try{
//         await task.save();
//         res.status(201).send(task);
//     }catch(error){
//         res.status(400).send(error);
//     }
// })



// app.get("/tasks", async (req, res) => {
    
//     // Tasks.find({}).then(task => {
//     //     res.send(task);
//     // }).catch(error => {
//     //     res.send(error);
//     // })

//     try{
//         const tasks = await Tasks.find({});
//         res.send(tasks);
//     }catch(error){
//         res.send(error);
//     }
// })



// app.get("/tasks/:id", async (req,res) => {
    
//     const _id = req.params.id;
//     // const desc = req.params.desc;
    
//     // Tasks.find({description: desc}).then(task => {
//     //     if(!task){
//     //         return res.status(400).send("task NOt Found!")
//     //     }
//     //     res.send(task);
//     // }).catch(error => {
//     //     console.log(error);
//     // })

//     try{
//         const task = await Tasks.find({_id});
//         if(!task){
//             return res.status(400).send("Task Not Found!")
//         }
//         res.send(task);
//     }catch(error){
//         res.send(`Error: ${error}`)
//     }
// })



// app.patch("/tasks/:id", async (req, res) => {

//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['description', 'completed'];
//     const isValidate = updates.every(update => {
//         return allowedUpdates.includes(update);
//     })

//     if(!isValidate){
//         return res.status(400).send('Invalid Update');
//     }
//     try{
//         const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
//         if(!task){
//             res.status(404).send();
//         }
//         res.send(task);
//     }catch(error){
//         res.status(500).send(error);
//     }

// })



// app.delete("/tasks/:id", async(req, res) => {
//     try {
//         const task = await Tasks.findByIdAndDelete(req.params.id);
//         if(!task){
//             return res.status(404).send();
//         }
//         res.send(task);
//     }catch (e){
//         res.status(500).send(e);
//     }
// })




app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`)
})