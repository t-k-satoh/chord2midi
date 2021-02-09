const { createProxyMiddleware } = require('http-proxy-middleware');

const expressMiddleWare = (router) => {
  router.use('/_next/image', createProxyMiddleware({ target: 'https://chord2midi.vercel.app', changeOrigin: true }));
};

module.exports = expressMiddleWare;