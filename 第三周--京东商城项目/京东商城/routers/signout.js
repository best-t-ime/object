/**
 * Created by Administrator on 2016/10/20.
 */
var express = require('express'),
    cookieParser = require('cookie-parser')

var router = express.Router()

router.get('/signout', function(req, res){
    res.clearCookie('username')
    res.status(200).send('success')
})
module.exports = router