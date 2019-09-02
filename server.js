const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const authUser = require("./Auth/authRouter");
const authApi = require("./FoodieAuthApi/authRouter");
const publicApi = require("./FoodiePublicApi/publicRouter");
const detailPublic = require("./FoodiePublicApi/detailRouter");
const authMiddleWare = require("./tokenMiddleWare/authenticate");
const server = express();

server.use(bodyParser.json());

server.use(helmet());








server.use(cors());
server.options("*", cors());

server.use(morgan("combined"));
server.use(express.json());

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});


server.use("/detail", detailPublic);
server.use("/public", publicApi);
server.use("/auth", authUser);
server.use("/auth/api", authMiddleWare, authApi);

module.exports = server;
