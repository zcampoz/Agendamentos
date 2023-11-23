const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:14116';

const context = [
    "/api/agendamento",
    "/api/avaliacao",
    "/api/categoriaservico",
    "/api/horariodisponibilidade",
    "/api/servico",
    "/api/usuario",
    "/api/auth",
];

const onError = (err, req, resp, target) => {
    console.error(`${err.message}`);
}

module.exports = function (app) {
    console.log(app);
    console.log(context);
    console.log(env.ASPNETCORE_HTTPS_PORT);
  const appProxy = createProxyMiddleware(context, {
    proxyTimeout: 10000,
    target: target,
    onError: onError,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
