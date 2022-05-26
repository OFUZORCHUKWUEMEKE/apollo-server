const {model,Schema} = require('mongoose')

const userSchema = new Schema({
    username:{type:String},
    password:String,
    email:{type:String},
    createdAt:String
});

module.exports = model('User',userSchema)