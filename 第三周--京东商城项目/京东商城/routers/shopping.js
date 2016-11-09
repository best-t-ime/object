/**
 * Created by Administrator on 2016/10/21.
 */
var express = require('express'),
    shopping = require('../db/shopping'),
    add = require('../db/add'),
    cookieParser = require('body-parser')

var router = express.Router()

router.use(cookieParser())

router.get('/shopping', function(req, res){
    var username = req.cookies.username
    // console.log(username)
    var ids = req.cookies.shopid
    // console.log(ids)
    
    add.findById(ids).exec(function(err, data){
        if(!err){
            // console.log(data)
            data = data.toObject()
            // console.log(data._id)
            delete data._id
            delete data.__v
            delete data.createUser
            // console.log(data)
            data.buyuser = username
            // console.log(data)
            
            var datas = new shopping(data)
            // console.log(datas)
            var shops = []
            
             datas.save(function(err, data){
                if(!err){
                    // console.log('商品已保存成功')
                    //console.log(data)
                    res.json({result:1, message:'商品添加购物车成功'})
                } else {
                    // console.log('商品保存失败')
                    res.json({result:0, message:'商品添加购物车失败'})
                }
            })
            
        }
    })
})

// 显示加入购物车的商品
router.get('/shopping.html', function (req, res) {
    
    // console.log(req.cookies)
    var buyuser = req.cookies.username
    // console.log(buyuser)
    // var name = req.cookies.name
    shopping.find({buyuser:buyuser}).exec(function(err, data){
        if(!err){
            // console.log(data)
            res.render('shopping', {
                title: '购物车页面',
                datas:data
            })
        }
    })
})

module.exports = router