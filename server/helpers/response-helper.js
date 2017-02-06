"use strict"
import Promise from "bluebird"
import BuildHelper from "./build-helper"

/**
 * @param {ResponseHelper} Model
 */
module.exports = function (Model) {
  ResponseHelper.successHandler = function (response, cb) {
    if (cb) process.nextTick(() => cb(null, response))
    return Promise.resolve(response)
  }

  ResponseHelper.errorHandler = function (err, cb) {
    if (cb) process.nextTick(() => cb(err))
    throw err
  }

  BuildHelper.build(ResponseHelper, Model)
  function ResponseHelper() {
  }
}
