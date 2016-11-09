/**
 * Created by Administrator on 2016/10/10.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    askdb = require('./askdb'),
    textdb = require('./textdb'),
    ansdb = require('./ansdb')

var app = express()

var router = express.Router()

router.get('/', function(req, res){
    askdb.find().exec(function(err, data){
        console.log(data)
        if(!err){
            var asks = data.reverse()
            res.render('index', {
                title:'问答首页',
                datas:data
            })
        }
    })
    //ansdb.find().exec(function(err, data){
    //    if(!err){
    //        var ans = data.reverse()
    //        res.render('template', {
    //            title:'问答首页',
    //            datas:data
    //        })
    //    }
    //})
})

module.exports = router


//fs.exists('questions', function(ex){
//    if(!ex){
//        fs.mkdirSync('questions')
//        res.render('template', {
//            title:'问答首页'
//        })
//    } else{
//        fs.readdir('questions', function(err, files){
//            if(err){
//                res.send('读取文件失败')
//            } else{
//                //console.log(files)
//                //翻转文件顺序
//                var files = files.reverse()
//                var ques = []
//                for(var i = 0; i < files.length; i++){
//                    var filePath = 'questions/' + files[i]
//                    //console.log(filePath)
//                    //    同步读文件 fs.readFileSync
//                    var data = fs.readFileSync(filePath)
//                    data = JSON.parse(data)
//                    // console.log(data)
//                    data.questions = filePath
//                    ques.push(data)
//                }
//                //console.log(ques)
//                res.render('template',{
//                    title:'问答网站首页',
//                    datas:ques
//                })
//            }
//        })
//    }
//})