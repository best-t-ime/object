const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/tast')
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error',function(){
    console.log('数据库连接失败')
})
db.once('open',function(){
    console.log('数据库连接成功,打开数据库.....')
})

const schema = mongoose.Schema({
    content:String,
    time:String,
    complete:Boolean,
    index:Number
})
const Task = mongoose.model('task',schema)

module.exports = Task