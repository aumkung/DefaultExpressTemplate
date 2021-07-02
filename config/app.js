require('dotenv').config()
module.exports = {
    app_env: process.env?.NODE_ENV || 'production',
    port: process.env?.PORT || 3000
};