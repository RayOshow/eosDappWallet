var express = require('express');
var router = express.Router();
var action = require("../model/action/setActionM");

/* 액션
 * @param contractId 
 * @param from 
 * @param to 
 * @param quantity (including Symbol)
 * @param memo 
 * @param pw (for fetching private key)
 * @param chainId 
 * @param httpEndpoint httpEndpoint
 * */
router.post('/action/:nm', async function(req, res, next) {
    var params = req.body;
    var actionNm = req.params.nm;
    var result = await action.do(actionNm, params)
    res.json(result);
});
module.exports = router;



