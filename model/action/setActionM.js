let resultCode = require('../returnType/resultCode.json');
let returnFormat = require('../returnType/resultCode.js');
let security = require('../common/securityUtil');

const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder
//const { TextEncoder, TextDecoder } = require('text-encoding');          // React Native, IE11, and Edge Browsers only

module.exports = {
    do: async function (actionNm, param) {

        var pwd = param.pw;
        var privateKey =  await security.getPrivateKey(param.chainId, param.from, pwd);
        if(!privateKey) return returnFormat.returnFormat(resultCode.password_match, null);

        const signatureProvider = new JsSignatureProvider([privateKey]);
        const rpc = new JsonRpc(param.httpEndpoint, { fetch });
        const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

        let resultData = null;
        let resultCd = resultCode.error;

        const result = await api.transact(
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
            },{
                blocksBehind: 3,
                expireSeconds: 30,
            }
        ).then(trx => {
            console.log(`Trx ID: ${trx.transaction_id}`);
            resultCd = resultCode.success;
            resultData = {'txid': trx.transaction_id};
            }
        ).catch(error => {
            let errorJson ={};

            try{
                console.error(error);
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