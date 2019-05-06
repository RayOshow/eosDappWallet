# eosDappWallet
It is eos wallet made by Node.js for the pre-allowed Dapps.

[Npm install]
 You must once do "npm install" after cloning sources. 

[Setup DB]
 It uses my-sql DB .
 You must setup mysql info /config/database based on the environment. (local/dev/prod)
 And then you clarify your environment selection in connection. 
   var dbConfig = require('./database').local; // or dev or prod
   
   %DB info%
   //////////////////////////////////////////////////////////
    create table ACCOUNT
    (
      accountSeq int auto_increment comment 'account sequence'
        primary key,
      id varchar(100) null comment 'id',
      encryptKey varchar(300) null comment 'password',
      chainSeq int null
    );

    create table CHAIN_INFO
    (
      seq int null,
      chainId varchar(100) null
    );
    /////////////////////////////////////////////////////////

[Insert DApp account info]
  You must insert Dapp's account info to it's DB for set operations.
  And you must insert chain's info too.
  
  %Example%
  table CHAIN_INFO
  seq = 1 (EOS mainnet), Chain id = aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906
  table account
  id = binitkrtoken, encrypt key = af5...066 , chain_id = 1
  
  encrypt key is based on priave key ,id and pwd.
  you could make it by api "encrypt" in model/common/securityUtil .
  
[Start server]
  Get into bin folder and write down "npm start www"
  If you do in prod, you set upt enviroment var (NODE_ENV == 'production').
  If you do in prod, you should use "forever" for endless runnig.
  
[CORS]
  You have to add your Dapp server ip in app.js's whitelist.
  
  
    
  
  
  

  
