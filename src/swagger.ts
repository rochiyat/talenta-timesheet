import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import env from './configs/env.config';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation for Talenta Timesheet',
      version: '1.0.0',
      description:
        'This is a API Documentation for Talenta Timesheet based on the OpenAPI 3.0 specification. You can find out more about Swagger at [https://swagger.io](https://swagger.io). This repo can public, so please be careful when using it.',
      contact: {
        name: 'Rochiyat',
        url: 'https://github.com/rochiyat',
        email: 'rochiyat@gmail.com',
      },
      externalDocs: {
        description: 'Find out more about Swagger',
        url: 'https://swagger.io',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      termsOfService: 'https://swagger.io/terms/',
      tags: [
        {
          name: 'Timesheet',
          description: 'User related endpoints',
        },
      ],
    },
    servers: [
      {
        url: `http://localhost:${env.port}/api/v1`,
      },
    ],
  },
  apis: ['./src/swagger/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
