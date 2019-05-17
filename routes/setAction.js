let express = require('express');
let router = express.Router();
let action = require("../model/action/setActionM");

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
    let params = req.body;
    let actionNm = req.params.nm;
    let result = await action.do(actionNm, params)
    res.json(result);
});
module.exports = router;



