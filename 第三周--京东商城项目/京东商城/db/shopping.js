/**
 * Created by Administrator on 2016/10/21.
 */
var mongoose = require('mongoose'),
    register = require('./register')

var jingSchema = mongoose.Schema({
    name:String,
    price:String,
    descri:String,
    buyuser:String,
    shopId:{
        type:mongoose.Schema.ObjectId,
        ref:'goods'
    }
})

var Jing = mongoose.model('shopping', jingSchema)

module.exports = Jing