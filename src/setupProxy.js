const { createProxyMiddleware } = require('http-proxy-middleware');
// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');

module.exports = (app) => {
  dotenv.config();
  app.use(
    '/MVC/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_URL,
      changeOrigin: true,
    })
  );
};
