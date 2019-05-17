let express = require('express');
let router = express.Router();
let action = require("../model/action/getActionM");

/* contract DB
* @param contractId 
* @param tableNm 
* @param lowerBound start seq 
* @param upperBound end seq
* @param limit 
* */
router.get('/rows', async function(req, res, next) {
    let params = req.query;
    let result = await action.tableRows(params)
    console.log("Get smart contract table's info", result);
    res.json(result);
});

module.exports = router;