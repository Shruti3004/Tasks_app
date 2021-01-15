// CRUD Create, Read, Update, Delete

// const mongodb = require('mongodb');
// // One thing we needed to connect to the database
// const MongoClient = mongodb.MongoClient;
// // for ids
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const id = new ObjectID();

// console.log(id);
// console.log(id.id.length);
// console.log(id.id.toString());
// console.log(id.toHexString().length);
// // Please google this 12-bit id consits of
// console.log(id.getTimestamp());

// in database we are seeing ObjectId() with every id that is to tell that it is not actually a string it is coming form a ObjectId

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// useNewUrlParser is for setting up that is necessary to provide our url so that connection can be made succesfully
MongoClient.connect(connectionURL, {
    useNewUrlParser : true
}, (error, client) => {
    if(error){
        return console.log('Enable to connect to database')
    }
    // console.log('Connected correctly!')
    const db = client.db(databaseName);

    // ************************ INSERT ONE ************************
    // ************************ INSERT MANY ************************
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Vikram',
    //     age: 26
    // }, (error, result)=> {
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     },
    //     {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'ABC',
    //         completed: true,
    //     },
    //     {
    //         description: 'XYZ',
    //         completed: true,
    //     },
    //     {
    //         description: 'PQR',
    //         completed: false,
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to connect to the database');
    //     }
    //     console.log(result.ops);
    // })


    // ************************ FIND ONE ************************
    // ************************ FIND MANY ************************
    // db.collection('users').findOne({ name: 'Jen'}, (error, user) => {
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(user);
    // })

    // // if we find multiple document with same findinf condition it will gona display the first one
    // // It will return null
    // db.collection('users').findOne({ name: 'Jen', age: 1}, (error, user) => {
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(user);
    // })

    // // It will not display anything because object id is b\not actually a string
    // db.collection('users').findOne({ _id: "6000e5407f85d213e98048db"}, (error, user) => {
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(user);
    // })

    // db.collection('users').findOne({ _id: new ObjectID("6000e5407f85d213e98048db")}, (error, user) => {
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(user);
    // })

    // find doesnt take callback as 2nd parameter instead it will return a cursor that will points to data
    // db.collection('users').find({ age: 19 }).toArray((error, user) => {
    //     console.log(user)
    // })

    // db.collection('users').find({ age: 19 }).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({ _id: ObjectID("6000e1a6d5a43912295914dd") }, (error, task) => {
    //     console.log(task);
    // })

    db.collection('tasks').find({ completed: true }).toArray((error, task) => {
        console.log(task);
    })
})