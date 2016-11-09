/**
 * Created by Administrator on 2016/10/15.
 */
var mongoose = require('mongoose'),
    textdb = require('./textdb')

// var askSchema = mongoose.Schema({
//     content:String,
//     petname:String,
//     time:Date,
//     ip:String,
//     ansId:[{
//         type:mongoose.Schema.ObjectId,
//         ref:'answers'
//     }]
// })

var askSchema = mongoose.Schema({
   content:String,
   time:Date,
   ip:String,
   creatUser:{
       type:mongoose.Schema.ObjectId,
       ref:'subjects'
   },
   answers: [{
       type:mongoose.Schema.ObjectId,
       ref:'answers'
   }]
})

var Subject = mongoose.model('asks', askSchema)
module.exports = Subject