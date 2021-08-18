import Swagger from 'swagger-client'

const BACKEND_PORT = 8080

const swagger = Swagger(`http://localhost:${BACKEND_PORT}/api/api-docs`)

export const getProjections = () => {
  return swagger.then(client => {
    return client.apis.data.getProjections()
      .then(({ body }) => body)
  })
}
