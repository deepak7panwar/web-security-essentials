const localHost = require("https-localhost");
const express = require("express");
const session = require("express-session");
const routeLogin = require("./routes/login");
const routeMessages = require("./routes/messages");

const port = 443;
const domain = "localhost.charlesproxy.com";

const app = localHost(domain);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false
    }
  })
);

routeLogin(app);
routeMessages(app);

app.use("/static", express.static(__dirname + "/static"));

app.listen(port);

const redirApp = express();
redirApp.use(function(req, res) {
  return res.redirect(`https://${domain}${req.url}`);
});
redirApp.listen(80);

console.log(
  `open https://${domain} to observe localhost network traffic via Charles`
);
