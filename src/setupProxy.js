const { createProxyMiddleware } = require("http-proxy-middleware")

const commonConfig = {
  secure: false,
  changeOrigin: true,
  logLevel: "debug",
}

const rewriteDevFn = function (path, req) {
  return path.replace("/dev/", "/")
}

module.exports = function (app) {
  app.use(
    "/dev/**",
    createProxyMiddleware({
      target: `${process.env.REACT_APP_API_ENDPOINT}`,
      pathRewrite: rewriteDevFn,
      ...commonConfig,
    })
  )
}
