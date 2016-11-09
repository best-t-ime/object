/**
 * Created by Administrator on 2016/10/10.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    textdb = require('./textdb')


var router = express.Router()

router.post('/user/login', function(req, res){
    var petname = req.body.petname
    var password = req.body.password
    function send(code, message){
        res.status(200).json( {code, message} )
    }
    textdb.find().exec(function(err, data){
        if(!err){
            textdb.find(({petname:petname}), function(err, data){
                if(!err){
                    //console.log(data.length)
                    if(!data.length){
                        send('register', '该用户未注册')
                    } else{
                        //console.log(data[0].password)
                        //console.log(password)
                        if(password == data[0].password){
                            res.cookie('petname', req.body.petname)
                            send('success', '用户登录成功')
                        }else{
                            send('failed', '用户名或密码错误')
                        }
                    }
                }
            })
        }
    })
})

router.get('/login.html', function(req, res){
    res.render('login',{
        title:'登陆页面',
        datas:'login'
    })
})

module.exports = router
