/**
 * Created by Administrator on 2016/10/17.
 */
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var fs = require('fs')
var cookieParser = require('cookie-parser')
var template = require('art-template')
var router = express.Router()

//存储上传的文件
var storage = multer.diskStorage({
        destination: 'www/uploads',
        filename: function(req, file, callback){
            var petname = req.cookies.petname
            callback(null, petname + '.jpg')
        }
    }),
    uploads = multer({storage})

router.post('/user/photo',uploads.single('photo'), function(req, res){
    res.status(200).json({code:'success', message:'上传成功,'})
})

module.exports = router