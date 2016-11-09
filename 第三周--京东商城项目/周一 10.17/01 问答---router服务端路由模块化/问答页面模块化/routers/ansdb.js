/**
 * Created by Administrator on 2016/10/17.
 */
var mongoose = require('mongoose'),
    textdb = require('./textdb')

var subSchema = mongoose.Schema({
    content:String,
    petname:String,
    time:Date,
    ip:String,
    creatUser:{
        type:mongoose.Schema.ObjectId,
        ref:'subjects'
    },
    asks: {
        type:mongoose.Schema.ObjectId,
        ref:'asks'
    }
})

var Subject = mongoose.model('answers', subSchema)
module.exports = Subject