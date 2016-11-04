'use strict'

var PAF = require('../')
var test = require('tape')

test('api check', function (assert) {
  assert.ok(isFunction(PAF.requestAnimationFrame), 'exports requestAnimationFrame')
  assert.ok(isFunction(PAF.cancelAnimationFrame), 'exports cancelAnimationFrame')
  assert.ok(isFunction(PAF.forceAnimationFrame), 'exports forceAnimationFrame')
  assert.ok(isFunction(PAF.now), 'exports now function')
  assert.end()
})

const isFunction =
  value =>
  typeof value === 'function'
