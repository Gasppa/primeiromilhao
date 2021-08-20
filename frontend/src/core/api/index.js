import Swagger from 'swagger-client'
import axios from 'axios'

const BACKEND_PORT = 8080

const swagger = Swagger(`http://localhost:${BACKEND_PORT}/api/api-docs`)

export const getProjections = () => {
  return swagger.then(client => {
    return client.apis.data.getProjections()
      .then(({ body }) => body)
  })
}

export const getFirstMillionProjection = () => {
  return swagger.then(client => {
    return client.apis.myfirstmillion.getFirstMillionProjection()
      .then(({ body }) => body)
  })
}

export const getFirstMillionProjectionUsingAxios = async (body) => {
  const result = await axios.post('http://localhost:8080/api/myfirstmillion/pmt', { ...body })
  return result
}
