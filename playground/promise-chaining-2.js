require('../src/db/mongoose');
const Task = require("../src/models/task");

// Task.findByIdAndDelete("600a2f09816e6525eebb0c88").then(task => {
//     console.log(task);
//     return Task.countDocuments({completed: false})
// }).then(result => {
//     console.log(result);
// }).catch(e => {
//     console.log(e);
// })

const DeleteTaskAndCount = async (id, completed) => {
    const deleteTask = await Task.findByIdAndDelete(id);
    return count = await Task.countDocuments({completed});
}

DeleteTaskAndCount("600a24a83b07241ecaeae9b9", false).then(count => {
    console.log(count);
}).catch(e => {
    console.log(e);
})