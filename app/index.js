"use strict"
/**
 * Created by garusis on 29/01/17.
 */
const express = require("express")
const app = express()

app.get("/", function (req, res) {
    res.sendStatus(200)
})

if (process.env.NODE_ENV !== "test") {
    const appPort = process.env.APP_PORT || 3000
    app.listen(appPort, function () {
        console.log(`Server is listening at ${appPort}`)
    })
}

if (process.env.NODE_ENV === "test") {
    process.nextTick(function () {
        run()
    })
}
module.exports = app