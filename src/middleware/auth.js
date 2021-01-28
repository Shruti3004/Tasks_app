const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        // console.log(token);
        const decoded = jwt.verify(token, 'thisismynewcourse');
        // console.log(decoded)
        // What it gonna do is it gonna search a user find a user with this id and with this token in the tokens array
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});
        // console.log(user)
        if(!user){
            throw new Error
        }
        req.token = token;
        req.user = user
        next();
    } catch (e){
        res.status(401).send({error: 'You are not logged in'})
    }
}

module.exports = auth;