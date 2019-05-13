var connection = require('../../config/db/connection')();
var tms = require('../../public/javascripts/tms.util');
var resultCode = require('../returnType/resultCode.json');
var returnFormat = require('../returnType/resultCode.js');
var fetch = require('node-fetch');
const { JsonRpc } = require('eosjs');

module.exports = {
    tableRows: async function(param) {

        /*
        * lower_bound : seq 시작
        * upper_bound: seq 종료
        * ex) lower_bound: 1 , upper_bound: 3 seq 1~2번까지 조회
        * ex) lower_bound: 0 , upper_bound: -1 전체검색
        * */
        // Instantiate a new JsonRpc object, with the Network Api Uri, and a request object
        const rpc = new JsonRpc(param.httpEndpoint, { fetch });

        //2. Get info
        let result = await rpc.get_table_rows({
            json : true
            ,code : param.contractId
            ,scope: param.contractId
            ,table: param.tableNm
            // ,table_key: "user_seq"
            ,lower_bound: tms.isEmpty(param.lowerBound)? "0": param.lowerBound
            ,upper_bound: tms.isEmpty(param.upperBound)? "-1": param.upperBound
            ,limit: tms.isEmpty(param.limit)? -1: param.limit //-1: 전체 조회
            ,key_type: "i64"
            ,index_position: tms.isEmpty(param.indexPosition)? "1": param.indexPosition
         }).catch((err) => {
            console.error(`tableRows err======${err}`)
            return returnFormat.returnFormat(resultCode.error, null);
        });

        return returnFormat.returnFormat(resultCode.success, result);
    }
}
