/**
 * Created by Administrator on 2016/10/20.
 */
var express = require('express'),
    add = require('../db/add'),
    shopping = require('../db/shopping')
var router = express.Router()
router.get('/remove/:id',function(req, res){
    // console.log(req.params)
    var id = req.params.id
    //console.log(id)
    add.findByIdAndRemove(id, function(err){
        if(err){
            res.json({result:0})
        } else{
            res.json({result:1})
        }
    })
})

// 删除购物车的商品
router.get('/removes/:id', function(req, res){
    var ids = req.params.id
    shopping.findByIdAndRemove(ids, function(err, data){
        if(!err){
            res.json({result:1, message:'购物车商品删除成功'})
        } else{
            res.json({result:0, message:'购物车商品删除失败'})
        }
    })
})

module.exports = router