var express = require('express'),
    bodyParser = require('body-parser'),
    template = require('art-template')

var app = express()

app.engine('.html', template.__express)
app.set('view engine', 'html')
template.config('cache', false)
app.use(express.static('www'))
app.use(bodyParser.urlencoded({extended:false}))

app.use(require('./routers/register'))
app.use(require('./routers/login'))
app.use(require('./routers/index'))
app.use(require('./routers/signout'))
app.use(require('./routers/add'))
app.use(require('./routers/update'))
app.use(require('./routers/remove'))
app.use(require('./routers/shopping'))


app.listen(1255, function(){
    console.log('jingdong is running')
})