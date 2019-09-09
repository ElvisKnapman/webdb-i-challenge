const express = require("express");

// const db = require("./data/dbConfig.js");

const accountsRoutes = require("./accounts/accountsRoutes.js");

const server = express();

server.use(express.json());
server.use("/api/accounts", accountsRoutes);

module.exports = server;
