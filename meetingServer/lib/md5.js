const crypto = require('crypto');
// let hash=crypto.createHash('md5');
// hash.update('admin');
// console.log(hash.digest('hex'));
module.exports = function(str) {
    let hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex');
}