/**
 * Created by Administrator on 2016/10/20.
 */
var mongoose = require('mongoose'),
    register = require('./register')

var jingSchema = mongoose.Schema({
    name:String,
    price:String,
    descri:String,
    creatUser:{
        type:mongoose.Schema.ObjectId,
        ref:'register'
    }
})

var Jing = mongoose.model('goods', jingSchema)

module.exports = Jing