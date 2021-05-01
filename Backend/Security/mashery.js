"use strict";

var ip = require("ip");
var Logger = require("./logger");

/**
 * To test locally add '::1/32' or '127.0.0.1/32' to the list.
 */
var trafficManagerIPs = ["127.0.0.1/32", "::1/32"];

module.exports = function (req, res, next) {
  var invalidMasheryIP = true;
  var reqIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  for (var i = 0, len = trafficManagerIPs.length; i < len; i++) {
    if (ip.cidrSubnet(trafficManagerIPs[i]).contains(reqIp)) {
      invalidMasheryIP = false;
      next();
    }
  }

  if (invalidMasheryIP) {
    Logger.log(
      Logger.LOG_WARN,
      `An unauthorized IP address ${reqIp} has tried to access the service`
    );
    res.status(403).end();
  }
};
