var express = require('express');
var router = express.Router();
var get = require('./getAction')
var set = require('./setAction')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.ejs',{'title'  : 'EOS Dapp wallet'});
});

router.use('/get', get)
router.use('/set', set)

module.exports = router;