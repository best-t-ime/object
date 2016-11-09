/**
 * Created by Administrator on 2016/10/15.
 */
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/subject')
var db = mongoose.connection
db.on('error', function(){
    console.log('数据库连接失败')
})
db.once('open', function(){
    console.log('连接数据库成功,打开数据库....')
})

var subSchema = mongoose.Schema({
    petname:String,
    password:String,
    isMale:Boolean,
    email:String,
    course:String
})

var Subject = mongoose.model('subjects', subSchema)
module.exports = Subject