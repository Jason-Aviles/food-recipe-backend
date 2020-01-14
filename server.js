const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const authUser = require("./Auth/authRouter");
const authApi = require("./FoodieAuthApi/authRouter");
const authPic = require("./FoodieAuthApi/authpic")
const detailPublic = require("./FoodiePublicApi/detailRouter");
const authMiddleWare = require("./tokenMiddleWare/authenticate");
const server = express();


server.use(helmet());





//server.use(morgan("combined"));
server.use(express.json());





server.use(cors());
// server.options("*", cors());


server.use('/uploads',express.static('uploads'))
server.use("/public", detailPublic);
// server.use("/public", publicApi);
server.use("/photo-of-day",authPic)
server.use("/auth", authUser);
server.use("/auth/api", authMiddleWare, authApi);

module.exports = server;
