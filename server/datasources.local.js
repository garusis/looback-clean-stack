import _ from "lodash"

let datasources = {
  "memory": {
    "name": "memory",
    "connector": "memory"
  }
}

if (process.env.PG_HOST) {
  datasources.postgresql = {
    "host": process.env.PG_HOST,
    "database": process.env.PG_NAME,
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "max": Number(process.env.PG_POOL_MAX) || 10,
    "name": "postgresql",
    "connector": "postgresql"
  }
}

if (process.env.MY_SQL_HOST) {
  datasources.mysql = {
    "host": process.env.MY_SQL_HOST,
    "database": process.env.MY_SQL_NAME,
    "username": process.env.MY_SQL_USERNAME,
    "password": process.env.MY_SQL_PASSWORD,
    "max": Number(process.env.MY_SQL_POOL_MAX) || 10,
    "name": "mysql",
    "connector": "mysql"
  }
}

if (process.env.MONGO_HOST) {
  datasources.mongodb = {
    "host": process.env.MONGO_HOST,
    "database": process.env.MONGO_NAME,
    "username": process.env.MONGO_USERNAME,
    "password": process.env.MONGO_PASSWORD,
    "max": Number(process.env.MONGO_POOL_MAX) || 10,
    "name": "mongodb",
    "connector": "mongodb"
  }
}

if (process.env.USE_FILESYSTEM) {
  datasources.filesystem = {
    "name": "filesystem",
    "connector": "loopback-component-storage",
    "provider": "filesystem",
    "root": process.env.PATH_FILES || path.join(process.cwd(), "storage"),
    "getFilename": function (origFilename) {
      origFilename = origFilename.name
      let parts = origFilename.split('.')
      let extension = parts[parts.length - 1]
      return Date.now() + '_' + parts[parts.length - 2] + '.' + extension
    }
  }
}

if (process.env.CLOUD_STORAGE_PROVIDER) {
  datasources.cloudstorage = {
    "name": "cloudstorage",
    "connector": "loopback-component-storage",
    "provider": process.env.CLOUD_STORAGE_PROVIDER
  }
  let credentials = JSON.parse(process.env.CLOUD_STORAGE_CREDENTIALS)
  _.assign(datasources, credentials)
}
module.exports = datasources
