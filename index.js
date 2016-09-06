/**
 * index.js - cryptojs_bot
 * Copyright (C) 2016 Karim Alibhai.
 */

'use strict';

const T = new (require('twit'))(require('./lib/auth'))
    , chalk = require('chalk')
    , methods = require('./lib/methods')

T.get('account/verify_credentials', { skip_status: true })
  .catch(function (err) {
    console.log('caught error', err.stack)
    process.exit(0)
  })
  .then(() => {
    console.log(chalk.bold(chalk.green('@cryptojs_bot started')))
    T.stream('statuses/filter', {
      track: '@cryptojs_bot'
    }).on('tweet', tweet => {
      const id = tweet.id_str
          , user = tweet.user.screen_name
          , text = tweet.text.split(/\s+/).slice(1)
          , method = text[0].toLowerCase()

      try {
        if (methods.hasOwnProperty(method)) {
          console.log(chalk.green(`${chalk.bold('@' + user)} => ${method}(${text.slice(1).join(', ')})`))
          T.post('statuses/update', {
            status: `@${user} ${methods[method].apply(this, text.slice(1))}`.substr(0, 140),
            in_reply_to_status_id: id
          })
        } else throw 'No such method.'
      } catch (err) {
        console.log(chalk.red(`${chalk.bold('@' + user)} => ${err}`))
        T.post('statuses/update', {
            status: `@${user} Oops: ${err}`
        })
      }
    })
  })