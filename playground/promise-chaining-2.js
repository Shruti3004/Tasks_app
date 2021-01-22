require('../src/db/mongoose');
const Task = require("../src/models/task");

Task.findByIdAndDelete("600a2f09816e6525eebb0c88").then(task => {
    console.log(task);
    return Task.countDocuments({completed: false})
}).then(result => {
    console.log(result);
}).catch(e => {
    console.log(e);
})