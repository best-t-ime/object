var express = require('express'),
    register = require('../db/register')
var router = express.Router()

router.post('/register', function(req, res){
    //console.log(req.body)
    var username = req.body.username
    var isUser = req.body.isUser
    //console.log(isUser)
    //console.log(username)
    function send(code, message){
        res.status(200).json({code,message})
    }
    //在数据库中查找用户名,如果存在说明已注册,如果不存在,则可以注册
    register.find({username:username}).exec(function(err, data){
        if(!err){
            //console.log(data.length)
            if(data.length == 1){
                send('register', '该用户已注册')
            } else{
                var data1 = new register(req.body)
                data1.save(function(err, data){
                    if(!err){
                        // console.log(data)
                        send('success', isUser + '注册成功,请登录...')
                    }
                })
            }
        }
    })
})
router.get('/register.html', function(req, res){
    res.render('register', {
        title:'注册页面',
        name:'register'
    })
})

module.exports = router