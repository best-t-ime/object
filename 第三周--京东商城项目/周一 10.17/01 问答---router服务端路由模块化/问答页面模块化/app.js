var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    multer = require('multer'),
    fs = require('fs'),
    template = require('art-template')
//实例化对象
var app = express(),
    form = multer()

app.engine('.html', template.__express)
app.set('view engine', 'html')

template.config('cache', false)

//设置文件存储
//var storage = multer.diskStorage({
//        destination: 'www/uploads',
//        filename: function(req, file, callback){
//            var petname = req.cookies.petname
//            callback(null, petname + '.jpg')
//        }
//    }),
//    uploads = multer({storage})


//设置中间件
app.use(express.static('www'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())


app.use( require('./routers/register') )
app.use( require('./routers/logins') )
app.use( require('./routers/signout') )
app.use( require('./routers/photo') )
app.use( require('./routers/asks') )
app.use( require('./routers/answers') )
app.use( require('./routers/index') )
app.use( require('./routers/own') )

//时间处理
template.helper('dateTime', function(time){
    var t = new Date(time)
    var y = t.getFullYear(),
        m = t.getMonth() + 1,
        d = t.getDate(),
        h = t.getHours(),
        mi = t.getMinutes(),
        s = t.getSeconds()

    m = m < 10 ? '0' + m : m
    d = d < 10 ? '0' + d : d
    h = h < 10 ? '0' + h : h
    mi = mi < 10 ? '0' + mi : mi
    s = s < 10 ? '0' + s : s

    var times = y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s
    return times
})

app.listen(1433, function(){
    console.log( 'ask-answer is running' )
})
