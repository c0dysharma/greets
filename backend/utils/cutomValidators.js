const validator = require('validator');
const typeConstant = require('../constants/typeConstant');

function validateReceipent(value) {
  if (this.type === typeConstant.messageType.email)
    return validator.isEmail(value);
  if (
    this.type === typeConstant.messageType.sms ||
    this.type === typeConstant.messageType.whatsapp
  )
    return validator.isMobilePhone(value);
}

module.exports = { validateReceipent };
