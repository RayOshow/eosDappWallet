let express = require('express');
let router = express.Router();
let get = require('./getAction')
let set = require('./setAction')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.ejs',{'title'  : 'EOS Dapp wallet'});
});

router.use('/get', get)
router.use('/set', set)

module.exports = router;