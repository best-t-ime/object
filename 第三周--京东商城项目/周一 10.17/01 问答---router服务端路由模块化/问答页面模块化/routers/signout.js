/**
 * Created by Administrator on 2016/10/10.
 */
var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()

var router = express.Router()

router.get('/user/signout', function(req, res){
    res.clearCookie('petname')
    res.status(200).send('success')
})

module.exports = router