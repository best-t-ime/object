/**
 * Created by Administrator on 2016/10/20.
 */
var express = require('express'),
    add = require('../db/add'),
    template = require('art-template'),
    multer = require('multer')

var router = express.Router()

var storage = multer.diskStorage({
    destination: 'www/uploads',
    filename: function (req, file, callback) {
        // console.log(req.body)
        var name = req.body.name
        // console.log(name)

        callback(null, name + '.jpg')
    }
}),
    uploads = multer({ storage })

router.get('/update/:id', function(req, res){
    var id = req.params.id
    //console.log(id)
    add.findById(id).exec(function(err, data){
        if(!err){
            // console.log(data)
            data.title = '商品信息更新页面'
            res.render('update', data)
        }
    })
})

router.post('/update/:id', uploads.single('photo'), function(req, res){
    var id = req.params.id
    // console.log(req.body)
    add.findByIdAndUpdate(id, req.body).exec(function(err, data){
        if(!err){
            res.redirect('/')
        }
    })
})



module.exports = router