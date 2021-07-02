const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "binancetestdata"});

module.exports.log = log