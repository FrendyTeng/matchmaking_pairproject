// File ini berisi method helper
const bcrypt = require("bcrypt")

const hashPassword = (plainText) => {
  return bcrypt.hashSync(plainText, 12)
}

const comparePlainWithHash = (plainText, hash) => {
  return bcrypt.compareSync(plainText, hash)
}

module.exports = { hashPassword, comparePlainWithHash}