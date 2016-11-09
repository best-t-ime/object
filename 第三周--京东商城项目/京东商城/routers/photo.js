/**
 * Created by Administrator on 2016/10/20.
 */
var express = require('express'),
    multer = require('multer'),
    cookieParser = require('cookie-parser')



var router = express.Router()

router.use(cookieParser())

//存储上传的文件
var storage = multer.diskStorage({
        destination: 'www/uploads',
        filename: function(req, file, callback){
            //console.log(req.cookies.name)
            // console.log(req)
            var name = req.cookies.name

            callback(null, name + '.jpg')
        }
    }),
    uploads = multer({storage})

router.post('/user/photo',uploads.single('photo'), function(req, res){
    //console.log(req.cookies.name)
    res.status(200).json({code:'success', message:'上传成功,'})
})

module.exports = router