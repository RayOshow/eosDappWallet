var crypto = require("crypto");
var connection = require('../../config/db/connection')();
const cryptMethod = 'aes-256-cbc';

let self = {
    decrypt: function(text,key) {
        var decipheredPlaintext = '';

        try{
            var decipher = crypto.createDecipher(cryptMethod,key);
            decipheredPlaintext = decipher.update(text,'hex','utf8');
            decipheredPlaintext += decipher.final('utf8');
        }catch (e){
            decipheredPlaintext='error';
        }

        return decipheredPlaintext;
    },

    encrypt: function(text,key) {
        var cipher = crypto.createCipher(cryptMethod,key);
        var encipheredContent = cipher.update(text,'utf8','hex');
        encipheredContent += cipher.final('hex');

        return encipheredContent;
    },
    getPrivateKey: async function(chainId, id, pwd){
        let query = `select * from ACCOUNT A, CHAIN_INFO I where A.chainSeq = I.seq and A.id = '${id}' and I.chainId = '${chainId}'`

        return new Promise( function(resolve, reject) {

            connection.query(query, function(err, rows) {
                if (!err){
                    if(rows.length>0){
                        var encryptkey = rows[0].encryptKey;
                        var key = id+pwd;
                        var decryptKey = self.decrypt(encryptkey,key);
                        resolve(decryptKey);
                    } else {
                        reject("Decrypt error!!")
                    }
                }else{
                    console.log("Query error!!!");
                    reject(err)
                }
            });
        }).then(function(result){
            console.log("Get private key OK");
            return result;
        }).catch(function(err){
            console.log("Get private key error");
            return null;
        });
    }

};

module.exports = self;