var resultCode = require('../returnType/resultCode.json');
var returnFormat = require('../returnType/resultCode.js');
var security = require('../common/securityUtil');
var com = require('../common/comUtil');

module.exports = {
    do: async function (actionNm, param) {

        var pwd = param.pw;
        var privateKey =  await security.getPrivateKey(param.chainId, param.from, pwd);
        if(!privateKey) return returnFormat.returnFormat(resultCode.password_match, null);

        const eos = await com.init(param.chainId, param.httpEndpoint, param.from, privateKey);
        let resultData = null;
        let resultCd = resultCode.error;

        const result = await eos.transaction(
            {
                actions: [
                    {
                        account: param.contractId,
                        name: actionNm,
                        authorization: [{
                            actor: param.from,
                            permission: 'active'
                        }],
                        data:param.data
                    }
                ]
            },{broadcast: true, sign: true, verbose: true}
        ).then(trx => {
            console.log(`Trx ID: ${trx.transaction_id}`);
            resultCd = resultCode.success
            resultData = {'txid': trx.transaction_id}

        }).catch(error => {
            let errorJson ={};
            try{
                errorJson = JSON.parse(error);

                let msg = errorJson.error.details[0].message;
                msg= msg.replace('assertion failure with message: ', '');

                try{
                    msg = JSON.parse(msg)
                    resultCd = returnFormat.customErrorCode(msg['CODE'], msg['MSG'])

                } catch(e) {
                    console.error(`end function parsing Err====`);
                    resultCd  = returnFormat.customErrorCode(errorJson.error.code, msg)
                }

            } catch(e) {
                console.error(`end function parsing Err====${e}`);
            }
        })

        return returnFormat.returnFormat(resultCd, resultData);
    }
};