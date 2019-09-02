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




server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); res.header("optionsSuccessStatus",200) 
  next();
});
server.use(cors());
server.options('*', cors());






server.use(morgan("combined"));
server.use(express.json());

server.use("/detail", detailPublic);
server.use("/public", publicApi);
server.use("/auth", authUser);
server.use("/auth/api", authMiddleWare, authApi);

module.exports = server;
