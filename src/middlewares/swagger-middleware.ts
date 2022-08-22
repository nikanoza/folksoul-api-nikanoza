
import SwaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'folksoul',
}

const swaggerDocument = YAML.load('./src/config/swagger.yaml')
export const swaggerMiddleware = [SwaggerUI.serve , SwaggerUI.setup(swaggerDocument, options)]


