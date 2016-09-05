/**
 * lib/methods/random.js - cryptojs_bot
 * Copyright (C) 2016 Karim Alibhai.
 */

'use strict';

const crypto = require('crypto')

module.exports = function (size, format) {
    return crypto.randomBytes(parseInt(size)).toString(format || 'hex').substr(0, size)
}