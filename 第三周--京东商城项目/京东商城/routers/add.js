/**
 * Created by Administrator on 2016/10/20.
 */
var express = require('express'),
    add = require('../db/add'),
    register = require('../db/register'),
    cookieParser = require('cookie-parser'),
    multer = require('multer')

var router = express.Router()
router.use(cookieParser())
var form = multer()

var storage = multer.diskStorage({
    destination: 'www/uploads',
    filename: function (req, file, callback) {
        var name = req.body.name
        console.log(name)

        callback(null, name + '.jpg')
    }
}),
    uploads = multer({ storage })

router.post('/add', uploads.single('photo'), function (req, res) {
    // console.log(req.body)
    var username = req.cookies.username
    // console.log(username)
    // console.log(req.body)
    register.find({ username: username }).exec(function (err, data) {
        if (!err) {
            // console.log(data)
            req.body.creatUser = data[0].id
            var data = new add(req.body)
            // console.log(data)
            data.save(function (err, data) {
                if (!err) {
                    res.cookie('name', req.body.name)
                    res.json({
                        code: 'success',
                        message: '商品上传成功'
                    })
                } else {
                    res.json({
                        code: 'error',
                        message: '商品上传失败'
                    })
                }
            })
        }
    })
})
router.get('/add.html', function (req, res) {
    res.render('add', {
        title: '添加商品页面'
    })
})

module.exports = router