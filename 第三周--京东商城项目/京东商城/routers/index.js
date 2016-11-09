/**
 * Created by Administrator on 2016/10/20.
 */
var express = require('express'),
    add = require('../db/add')

var router = express.Router()

router.get('/', function(req, res){
    add.find().exec(function(err, data){
        if(!err){
            res.render('index', {
                title:'京东商城首页',
                name:'index',
                datas:data
            })
        }
    })
})

module.exports = router