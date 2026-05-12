const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GoPass API Documentation',
      version: '1.0.0',
      description: 'API for managing projects and tasks. Some endpoints require Bearer Token authentication.',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./index.js', './routes/*.js'], // Scan routes for JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

// Manual documentation for endpoints to ensure clarity
const manualSpec = {
  ...swaggerSpec,
  paths: {
    '/api/auth/login': {
      post: {
        summary: 'User Login',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', properties: { username: { type: 'string' }, password: { type: 'string' } } } } }
        },
        responses: { 200: { description: 'Success' }, 401: { description: 'Unauthorized' } }
      }
    },
    '/api/projects': {
      get: {
        summary: 'Get all projects',
        tags: ['Projects'],
        responses: { 200: { description: 'List of projects' } }
      },
      post: {
        summary: 'Create a project',
        tags: ['Projects'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' }, description: { type: 'string' } } } } }
        },
        responses: { 201: { description: 'Created' }, 401: { description: 'Unauthorized' } }
      }
    },
    '/api/projects/{id}': {
      get: {
        summary: 'Get project by ID',
        tags: ['Projects'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Project details' } }
      },
      put: {
        summary: 'Update a project',
        tags: ['Projects'],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' }, description: { type: 'string' } } } } }
        },
        responses: { 200: { description: 'Updated' } }
      },
      delete: {
        summary: 'Delete a project',
        tags: ['Projects'],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 204: { description: 'Deleted' } }
      }
    },
    '/api/tasks': {
      get: {
        summary: 'Get all tasks',
        tags: ['Tasks'],
        parameters: [{ name: 'projectId', in: 'query', schema: { type: 'integer' } }],
        responses: { 200: { description: 'List of tasks' } }
      },
      post: {
        summary: 'Create a task',
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' }, priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] }, status: { type: 'string', enum: ['TODO', 'IN_PROGRESS', 'DONE'] }, projectId: { type: 'integer' } } } } }
        },
        responses: { 201: { description: 'Created' } }
      }
    },
    '/api/tasks/{id}': {
      put: {
        summary: 'Update a task',
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' }, priority: { type: 'string' }, status: { type: 'string' } } } } }
        },
        responses: { 200: { description: 'Updated' } }
      },
      delete: {
        summary: 'Delete a task',
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 204: { description: 'Deleted' } }
      }
    }
  }
};

module.exports = manualSpec;
