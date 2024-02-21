export default () => ({
  server: {
    url: process.env.APP_URL,
    prefix: process.env.APP_PREFIX,
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    version: process.env.APP_VERSION,
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_DATABASE,
  },
  jwtSecret: process.env.JWT_SECRET,
});
