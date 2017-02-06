"use strict"
import debug from "debug"

module.exports = function (DebugHelper) {


  DebugHelper.create = function (namespace) {
    namespace = "string" === typeof namespace ? namespace : Model.definition.name
    return debug(`mutual:${namespace}`)
  }

  DebugHelper.debug = {
    test: DebugHelper.create("test"),
    production: DebugHelper.create("production"),
    development: DebugHelper.create("development"),
    staging: DebugHelper.create("staging"),
    error: DebugHelper.create("error"),
    info: DebugHelper.create("info")
  }

}
