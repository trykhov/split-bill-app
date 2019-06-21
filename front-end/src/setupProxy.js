const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy(["/login-confirm", "/register-confirm"], {target: "http://localhost:4000"}));
}
