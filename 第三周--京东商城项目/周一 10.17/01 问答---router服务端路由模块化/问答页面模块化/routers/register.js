/**
 * Created by Administrator on 2016/10/10.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    textdb = require('./textdb')
var router = express.Router()

router.post('/user/register', function(req, res){
    //console.log(req.body)
    var petname = req.body.petname
    function send(code, message){
        res.status(200).json({code, message})
    }
    textdb.find(({petname:petname}), function(err, data){
        if(err){
        //    读取数据失败
        } else{
            console.log(data.length)
            if(data.length){
                //console.log('111')
                send('registered', '该用户已注册')
            }else{
                var data1 = new textdb(req.body)
                data1.save(function(err, data){
                    if(!err){
                        send('success', '恭喜，注册成功，请登录')
                    }
                })
            }
        }
    })
})
router.get('/register.html', function(req, res){
    res.render('register',{
        title:'注册页面',
        name:'register'
    })
})

module.exports = router