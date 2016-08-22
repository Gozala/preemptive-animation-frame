"use strict"

var PAF = require('../')
var test = require('tape')

test('api: lintFiles', function (assert) {
  assert.equal(typeof(PAF.requestAnimationFrame), 'function')
  assert.equal(typeof(PAF.cancelAnimationFrame), 'function')
  assert.end()
})
