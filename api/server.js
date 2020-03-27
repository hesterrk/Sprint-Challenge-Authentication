const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");
const usersRouter = require("../users/users-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);
server.use("/api/users", authenticate, usersRouter);

//opening route
server.get("/", (req, res) => {
  res.status(200).json({ message: "all working" });
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something went wrong"
  });
});

module.exports = server;
