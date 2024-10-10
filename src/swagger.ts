import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:2500/api',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email'],
          properties: {
            username: {
              type: 'string',
              description: 'User\'s username',
              example: 'john_doe',
            },
            email: {
              type: 'string',
              description: 'User\'s email',
              example: 'john@example.com',
            },
            profile: {
              $ref: '#/components/schemas/Profile',
            },
            posts: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Post',
              },
              description: 'List of posts by the user',
            },
          },
        },
        Profile: {
          type: 'object',
          properties: {
            bio: {
              type: 'string',
              description: 'User\'s bio',
              example: 'Software developer',
            },
            socialLinks: {
              type: 'array',
              items: {
                type: 'string',
                description: 'Social media links',
                example: 'https://twitter.com/john_doe',
              },
            },
          },
        },
        Post: {
          type: 'object',
          required: ['title', 'content', 'author'],
          properties: {
            title: {
              type: 'string',
              description: 'Title of the post',
              example: 'My First Post',
            },
            content: {
              type: 'string',
              description: 'Content of the post',
              example: 'This is the content of the post...',
            },
            author: {
              type: 'string',
              description: 'ID of the author',
              example: '60d0fe4f5311236168a109ca',
            },
            comments: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Comment',
              },
              description: 'List of comments on the post',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date of the post',
              example: '2024-10-10T12:00:00Z',
            },
          },
        },
        Comment: {
          type: 'object',
          properties: {
            content: {
              type: 'string',
              description: 'Content of the comment',
              example: 'This is a comment.',
            },
            author: {
              type: 'string',
              description: 'ID of the comment author',
              example: '60d0fe4f5311236168a109ca',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date of the comment',
              example: '2024-10-10T12:00:00Z',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { 
  swaggerUi, 
  swaggerDocs 
};
