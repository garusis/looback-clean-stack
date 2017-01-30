"use strict"

import loopback from "loopback"
import boot from "loopback-boot"
import cluster from "cluster"
import control from "strong-cluster-control"


let app
if (process.env.NODE_ENV === 'production') {
  if (cluster.isWorker) {
    startWorker()
  } else {
    let cpuNumber = Number(process.env.CPUS) || control.CPUS
    control.start({
      size: cpuNumber,
      throttleDelay: 5000
    })
    console.log('CPUs: ', cpuNumber)
  }
} else {
  app = startWorker()
}
export default app

function startWorker() {
  const app = loopback()

  app.start = function () {
    // start the web server
    return app.listen(function () {
      app.emit("started")
      let baseUrl = app.get("url").replace(/\/$/, "")
      console.log(`Web server listening at: ${baseUrl}`)
      if (app.get("loopback-component-explorer")) {
        let explorerPath = app.get("loopback-component-explorer").mountPath
        console.log(`Browse your REST API at ${baseUrl}${explorerPath}`)
      }
    })
  }

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
  boot(app, __dirname, function (err) {
    if (err) throw err

    app.emit("booted")
    // start the server if `$ node server.js`
    if (require.main === module)
      app.start()
  })
  return app
}

