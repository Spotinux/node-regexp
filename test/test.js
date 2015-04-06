var assert = require('assert')
var regexp = require('../')
var equal = assert.equal

console.log('Start...')
var re = regexp()
  .start('http')
  .maybe('s')
  .must('://')
  .maybe('WWW.')
  .somethingBut(regexp.space)
  .end('.com')
  .ignoreCase()
  .toRegExp()

equal(re.test("http://qq.com"), true) // => true
equal(re.test("http://www.qq.com"), true) // => true
equal(re.test("https://www.qq.com"), true) // => true
equal(re.test("http://www.qqcom"), false) // => false
equal(re.test("https://www.qq.net"), false) // => false

var re = regexp()
    .add(regexp.pattern.zipCode)
    .ignoreCase()
    .toString()

console.log(re);

console.log(
    "95350".match(re)
);

console.log('Done.')