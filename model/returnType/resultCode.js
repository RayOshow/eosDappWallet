var resultCode = require('./resultCode.json');
var tms = require('../../public/javascripts/tms.util');

module.exports = {
    returnFormat: function(returnType, data){
        return {
            data: data,
            msg:returnType.msg,
            code: returnType.code,
            detailCode: returnType.detailCode
        }
    },
    customErrorCode: function(detailCode, msg){
        let code = resultCode.error;
        if(tms.isNotEmpty(msg)){
            code['msg'] = msg;
        }
        if(tms.isNotEmpty(detailCode)){
            code['detailCode'] = detailCode;
        }

        return code;
    }
};