// const assert = require('assert'); 
// var add = require("../src/add.js");
// const ava = require("ava");
import {add} from '../src/add.js'
import assert from 'assert';

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('add', function () {
    it('must answer 7', function () {
        assert.equal(add(3, 4), 7);
      });
  });

// ava("foo", t => {
//     if(add.add(3, 4) === 7) {
//         t.pass();
//     }
// })