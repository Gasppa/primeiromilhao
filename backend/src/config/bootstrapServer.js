const fs = require('fs')
const path = require('path')
const http = require('http')
const cors = require('cors')

const app = require('connect')()
const swaggerTools = require('swagger-tools')
const jsyaml = require('js-yaml')
const serverPort = process.env.PORT || 8080

const options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, '../controllers'),
  useStubs: process.env.NODE_ENV === 'development'
}

const spec = fs.readFileSync(path.join(__dirname, '../api/swagger.yaml'), 'utf8')
const swaggerDoc = jsyaml.load(spec)

swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  app.use(cors())
  app.use(middleware.swaggerMetadata())
  app.use(middleware.swaggerValidator())
  app.use(middleware.swaggerRouter(options))
  app.use(middleware.swaggerUi({
    apiDocs: '/api/api-docs',
    swaggerUi: '/api/docs'
  }))

  http.createServer(app).listen(serverPort, function () {
    console.log('Backend server listening on port %d (http://localhost:%d)', serverPort, serverPort)
  })
})
