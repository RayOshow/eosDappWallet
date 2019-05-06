var Eos = require('eosjs');

let com = {
    init: async function(chainId, httpEndpoint, id, de) {
        if(de !== '' && de !== null && de !== 'undefinded'){
            return eos = await Eos({
                chainId: chainId,
                keyProvider: [de],
                httpEndpoint: httpEndpoint,
                authorization:[`${id}@active`],
                broadcast: true,
                verbose: true,
                sign: true,
                expireInSeconds:120
            });
        } else {
            return eos = await Eos({
                chainId: chainId,
                httpEndpoint: httpEndpoint,
                broadcast: true,
                verbose: true,
                sign: true,
                expireInSeconds:120
            });
        }
    }
};

module.exports = com;