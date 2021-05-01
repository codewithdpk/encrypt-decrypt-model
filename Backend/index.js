"use strict";

const express = require("express");

const app = express();

const dotenv = require("dotenv");

const cors = require("cors");

const bodyParser = require("body-parser");

dotenv.config();

const authRoute = require("./Routes/Auth");

const dbMongo = require("./Database/config");

var mashery = require("./Security/mashery");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

app.use(mashery);

app.use("/auth", authRoute);

app.listen(1234, () => console.log("Running on 1234..."));
