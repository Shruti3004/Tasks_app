require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate("600a2d50394a3e24a0c8d704", { age: 1}).then(user => {
    console.log(user);
    return User.countDocuments({age: 1});
}).then(result => {
    console.log(result);
}).catch(e => {
    console.log(e);
})