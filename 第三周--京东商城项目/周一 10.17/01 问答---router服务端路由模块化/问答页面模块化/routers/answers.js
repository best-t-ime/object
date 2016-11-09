/**
 * Created by Administrator on 2016/10/10.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    cookie = require('cookie-parser'),
    ansdb = require('./ansdb')
    //fs = require('fs')

var app = express()

var router = express.Router()

// router.post('/answer', function(req, res){
//     var aname = req.cookies.petname
//     //var fileName =req.cookies.questions
//     req.body.ip = req.ip
//     req.body.time = new Date()
//     req.body.petname = aname
//     var datas = new ansdb(req.body)
//     console.log(datas)
//     datas.save(function(err, data){
//         if(err){
//             res.send('保存数据失败')
//         } else{
//             res.send('回答提交成功')
//         }
//     })
// })

router.get('/answer/:id', function(req, res){
    var id = req.params.id
    console.log(id)
})


router.get('/answer.html', function(req, res){
    res.render('answer',{
        title:'回答页面',
        datas:'answer'
    })
})

module.exports = router