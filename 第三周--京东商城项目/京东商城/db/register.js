var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/jing')
var db = mongoose.connection
db.on('error', function(){
    console.log('数据库连接失败')
})
db.once('open', function(){
    console.log('数据库连接成功,打开数据库...')
})

var jingSchema = mongoose.Schema({
    username:String,
    password:String,
    isUser:String
})

var Jing = mongoose.model('register', jingSchema)

module.exports = Jing