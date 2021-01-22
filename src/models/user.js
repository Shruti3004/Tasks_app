const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('enter a valid password');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0){
                throw new Error('Age must be a positive no');
            }
        }
    }
})

// const me = new User({
//     name: 'Shruti Agarwal',
//     email: 'mail2shruti.ag@gmail.com',
//     password: 'Shrutia',
//     age: '19'
// })
    
// me.save()
// .then(() => console.log(me))
// .catch(error => console.log(`Error: ${error}`));

module.exports = User