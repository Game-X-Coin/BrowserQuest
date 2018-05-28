
var cls = require("./lib/class"),
    axios = require('axios');

const FAUCET_ACCOUNT_ACCESS_TOKEN = process.env.FAUCET_ACCOUNT_ACCESS_TOKEN;
const FAUCET_ACCOUNT_NAME = process.env.FAUCET_ACCOUNT_NAME;

var GXC = {};

module.exports = GXC;

GXC.generateToken = function(account, tokenName, quantity) {
    return axios.post(process.env.GXC_SERVER + '/v1/oauth/transfer_token', {tokenName: tokenName, to: account, quantity: quantity},
    {headers: {Authorization: 'Bearer ' + FAUCET_ACCOUNT_ACCESS_TOKEN}});
}

GXC.consumeToken = function(accessToken, tokenName, quantity) {
    // return this.databaseHandler.getAccessToken(account)
    // .then(function(accessToken) {
    return axios.post(process.env.GXC_SERVER + '/v1/oauth/transfer_token', {tokenName: tokenName, to: FAUCET_ACCOUNT_NAME, quantity: quantity},
        {headers: {Authorization: 'Bearer ' + accessToken}});
};
