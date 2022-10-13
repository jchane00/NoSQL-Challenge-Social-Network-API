const mongoose = require('mongoose')

const{model,Schema,Types} = mongoose

const schema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts:[{
        type: Types.ObjectId,
        ref: 'thoughts',
    }],
    friends:[{
        type: Types.ObjectId,
        ref: 'users'
    }]
},{
    toJSON: {
        virtuals: true,
            }
})

schema.virtual('friendCount').get(function(){
    return this.friends.length
})

module.exports = model('users',schema)