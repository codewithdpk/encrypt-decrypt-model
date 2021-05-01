const express = require("express");

const router = express.Router();

const Encryption = require("../Security/Encryption");

router.post("/", async (req, res) => {
  // check for basic auth header

  if (req.headers.client_id && req.headers.client_secret) {
    var data = await Encryption.decrypt(req.body.data, "1234SA");
    console.log("Decrypted Data from request: ", data);
    let newData;
    if (data !== "") {
      newData = JSON.parse(data);
      let hold = newData;
      hold.status = "Checked!";
      newData = hold;

      console.log("New plain data: ", newData);

      let sendRes = await Encryption.encrypt(JSON.stringify(newData), "1234SA");

      console.log("New data which is encrypted: ", sendRes);

      res.json({
        status: 200,
        message: "Working",
        data: sendRes,
      });
    } else {
      res.json({ status: 400, message: "failed" });
    }
  } else {
    return res.status(401).json({ message: "Missing Authorization Header" });
  }
});

module.exports = router;
