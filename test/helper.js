/**
 * Created by garusis on 04/12/16.
 */
const chai = require('chai')
const _ = require('lodash')
const Promise = require('bluebird')
const moment = require('moment')
const request = require('supertest')
const app = require('../app')

global.should = chai.should()
global.expect = chai.expect
global.assert = chai.assert
global.BPromise = Promise
global.request = request
global.moment = moment
global.app = app
global._ = _

global.agent = request.agent(app)

global.MathUtils = {
    randomNumber: function (max, min) {
        min = min || 0
        max = max || 10
        return min + Math.floor(Math.random() * (max - min + 1))
    }
}