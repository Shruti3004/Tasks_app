const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
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
});

userSchema.pre('save', async function (next) {
    // this gives a access to the user which is going to save
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    // console.log(user);
    next();
})

const User = mongoose.model('User', userSchema)

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