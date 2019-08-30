const express = require("express");
const helmet = require("helmet");
const cors = require('cors')
const authUser = require("./Auth/authRouter");
const authApi = require("./FoodieAuthApi/authRouter");
const publicApi = require("./FoodiePublicApi/publicRouter");
const detailPublic = require("./FoodiePublicApi/detailRouter")
const authMiddleWare =require('./tokenMiddleWare/authenticate')
const server = express();

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
server.configure(function() {
  app.use(allowCrossDomain);
  //some other code
});    

server.options('*', cors())

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/detail", detailPublic);
 server.use("/public", publicApi);
server.use("/auth", authUser);
server.use("/auth/api",authMiddleWare, authApi);


module.exports = server;
