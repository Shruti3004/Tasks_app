const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    // in mongoose worked with mongodb and allow us to create indexes which we want to create
    useCreateIndex: true,
    // useFindAndModify: false
});

// mongoose.model takes two arguments first the name of the collection and second the properties which we wanted to work with
// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid');
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value){
//             if(value.toLowerCase().includes("password")){
//                 throw new Error('enter a valid password');
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if(value < 0){
//                 throw new Error('Age must be a positive no');
//             }
//         }
//     }
// })

// It also added the property _v that is version of the document
// const me = new User({
//     name: 'Shruti Agarwal',
//     email: 'mail2shruti.ag@gmail.com',
//     password: '@123Password',
//     age: '19'
// })

// me.save()
// .then(() => console.log(me))
// .catch(error => console.log(`Error: ${error}`))

// const Tasks = mongoose.model('Tasks', {
//     description: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// });

// const task = new Tasks({
//     description: "Clean the house",
// })

// task.save()
// .then(() => console.log(task))
// .catch((error) => console.log(`Error: ${error}`))