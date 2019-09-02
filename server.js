const express = require("express");
const helmet = require("helmet");
const cors = require('cors')
const authUser = require("./Auth/authRouter");
const authApi = require("./FoodieAuthApi/authRouter");
const publicApi = require("./FoodiePublicApi/publicRouter");
const detailPublic = require("./FoodiePublicApi/detailRouter")
const authMiddleWare =require('./tokenMiddleWare/authenticate')
const server = express();
  

server.options('*', cors())

server.use(helmet());
server.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));
server.use(express.json());

server.use("/detail",cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}), detailPublic);
 server.use("/public",cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}),  publicApi);
server.use("/auth",cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}),  authUser);
server.use("/auth/api",authMiddleWare, authApi);


module.exports = server;
