const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({
  maxAge: 90 * 24 * 60 * 60, // 90 days // 31536000, // 1 year
  includeSubDomains: true,
  preload: true
}));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.noCache());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'trusted-cdn.com']
  }
}));

// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", "'unsafe-inline'"],
//     styleSrc: ["'self'", "'unsafe-inline'"],
//     imgSrc: ["'self'", 'data:', 'https:'],
//     connectSrc: ["'self'"],
//     fontSrc: ["'self'", 'https://fonts.gstatic.com'],
//     objectSrc: ["'none'"],
//     upgradeInsecureRequests: false,
//   },
//   reportOnly: false,
//   setAllHeaders: false,
//   disableAndroid: false,
//   browserSniff: true,
// }));


app.use('/public', express.static('public'));




app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});














































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
