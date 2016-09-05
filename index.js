/**
 * index.js - cryptojs_bot
 * Copyright (C) 2016 Karim Alibhai.
 */

'use strict';

const T = new (require('twit'))(require('rc')('twitter'))
    , chalk = require('chalk')
    , methods = require('./lib/methods')

T.stream('statuses/filter', {
  track: '@cryptojs_bot',
  language: 'en'
}).on('tweet', tweet => {
  const id = tweet.id_str
      , user = tweet.user.screen_name
      , text = tweet.text

  text = text.split(/\s+/).slice(1)
  text[0] = text[0].toLowerCase()

  try {
    if (methods.hasOwnProperty(text[0])) {
      console.log(chalk.green(`${chalk.bold('@' + user)} => ${text[0]}(${text.slice(1).join(', ')})`))
      T.post('statuses/update', {
        status: `@${user} ${methods[text[0]].apply(this, text.slice(1))}`.substr(0, 140),
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