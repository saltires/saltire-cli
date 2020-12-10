const crypto = require('crypto')
const url = 'https://github.com/saltire-template/ex/archive/master.zip'

const hash = crypto.createHash('md5').update(url).digest('hex').substr(8, 16)

console.log(hash)