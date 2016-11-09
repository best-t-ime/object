/**
 * Created by Administrator on 2016/10/10.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    cookie = require('cookie-parser'),
    askdb = require('./askdb'),
    textdb = require('./textdb')
var router = express.Router()

router.post('/ask', function(req, res){
    // req.body.petname = req.cookies.petname
    
    // var ansId = data[0]._id
    // console.log(ansId)

    // var datas = new askdb(req.body)
    // console.log(req.body)
    // //console.log(req.body.content)
    // function send(code, message){
    //     res.status(200).json({ code, message })
    // }
    
    
    var uname = req.cookies.petname
    textdb.find({petname:uname}).exec(function(err, data){
        if(!err){
            console.log('找到用户信息')
            var ansId = data[0].id
            req.body.creatUser = ansId
            req.body.ip = req.ip
            req.body.time = new Date()
            var datas = new askdb(req.body)
            datas.save(function(err, data){
                console.log(data)
                console.log(data.petname)
                if(err){
                    send('error', '保存文件失败')
                }else{
                    send('success', '问题提交成功')
                }
            })
        }
    })
    
})

router.get('/ask.html', function(req, res){
    res.render('ask',{
        title:'提问页面',
        datas:'ask'
    })
})

module.exports = router
