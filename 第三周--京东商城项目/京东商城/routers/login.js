/**
 * Created by Administrator on 2016/10/19.
 */
var express = require('express'),
    register = require('../db/register')
var router = express.Router()

router.post('/login', function(req, res){
    //console.log(req.body)
//    先判断用户名是否已注册
    function send(code, message){
        res.status(200).json({code, message})
    }
    var username = req.body.username
    var password = req.body.password
    register.find({username:username}).exec(function(err, data){
        if(!err){
            //console.log(data.length)
            if(!data.length){
                send('login', '该用户未注册')
            } else{
                //console.log(data)
            //    判断用户名与密码是否匹配
            //    console.log(password)
            //    console.log(data[0].password)
                var isUser = data[0].isUser
                //console.log(isUser)
                if( password == data[0].password ){
                    //console.log(req.body)
                    res.cookie('username', req.body.username)
                    res.cookie('isUser', data[0].isUser)
                    //console.log(isUser)
                    //res.cookie('isUser')
                    send('success', isUser + '登录成功')
                } else{
                    send('login', '用户名或密码错误')
                }
            }
        }

    })

})


router.get('/login.html', function(req, res){
    res.render('login', {
        title:'登录页面'
    })
})

module.exports = router