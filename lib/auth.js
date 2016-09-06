/**
 * lib/auth.js - cryptojs_bot
 * Copyright (C) 2016 Karim Alibhai.
 */

'use strict';

const fs = require('fs')
    , path = require('path')

module.exports = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '.twitterrc'), 'utf8'))