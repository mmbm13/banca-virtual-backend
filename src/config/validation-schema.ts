import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.valid('development', 'production', 'test').default(
    'development',
  ),
  // App
  APP_URL: Joi.string().required(),
  APP_PREFIX: Joi.string().required(),
  APP_PORT: Joi.string().required(),
  APP_VERSION: Joi.string().required(),
  // Database
  DB_DATABASE: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  // JWT
  JWT_SECRET: Joi.string().required(),
});
