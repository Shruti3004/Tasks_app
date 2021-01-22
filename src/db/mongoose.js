const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    // in mongoose worked with mongodb and allow us to create indexes which we want to create
    useCreateIndex: true
});

// mongoose.model takes two arguments first the name of the collection and second the properties which we wanted to work with
const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// It also added the property _v that is version of the document
// const me = new User({
//     name: 'Shruti',
//     age: 'abc'
// })

// me.save()
// .then(() => console.log(me))
// .catch(error => console.log(`Error: ${error}`))

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

const task = new Tasks({
    description: "Clean the house",
    completed: true
})

task.save()
.then(() => console.log(task))
.catch((error) => console.log(error))