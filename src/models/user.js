const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        dropDups: true,
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
    },
    tokens : [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Instance message
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user.id.toString()}, 'thisismynewcourse');
    user.tokens = user.tokens.concat({token});
    await user.save()
    return token;
}

// userSchema.methods.getPublicProfile = function () {
//     const user = this;
//     const userObject = user.toObject();
//     delete userObject.password;
//     delete userObject.tokens;
//     return userObject
// }


userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField :'owner'
})

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject
}


// Model message
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Unable to login');
    }
    return user
}

// Hash the plain text password before saving;
userSchema.pre('save', async function (next) {
    // this gives a access to the user which is going to save
    const user = this;
    // is modified will give the properties that user wants to change
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    // console.log(user);
    next();
})

// Delete User Tasks
userSchema.pre('remove', async function (next){
    const user = this;
    await Task.deleteMany({ owner: user._id})
    next();
} )

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