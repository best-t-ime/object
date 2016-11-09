/**
 * Created by Administrator on 2016/10/10.
 */
var express = require('express')

var app = express()

var router = express.Router()

router.get('/user.html', function(req, res){
    res.render('user',{
        title:'个人资料页面',
        datas:'user'
    })
})

module.exports = router