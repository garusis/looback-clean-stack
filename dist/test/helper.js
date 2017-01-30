'use strict';

/**
 * Created by garusis on 04/12/16.
 */
var chai = require('chai');
var _ = require('lodash');
var Promise = require('bluebird');
var moment = require('moment');
var request = require('supertest');
var app = require('../app');

global.should = chai.should();
global.expect = chai.expect;
global.assert = chai.assert;
global.BPromise = Promise;
global.request = request;
global.moment = moment;
global.app = app;
global._ = _;

global.agent = request.agent(app);

global.MathUtils = {
    randomNumber: function randomNumber(max, min) {
        min = min || 0;
        max = max || 10;
        return min + Math.floor(Math.random() * (max - min + 1));
    }
};
//# sourceMappingURL=helper.js.map
