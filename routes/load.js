var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res, next) {
  let noerr = true;
  try {
    let fsconf = fs.readFileSync(process.cwd() + "/config.json", "utf8");
    if (fsconf == "") {
      fsconf = "{}";
      console.info("Config initalized.");
    }
    global.misaka.config = JSON.parse(fsconf);
  } catch (err) {
    console.log(err);
    noerr = false;
    res.sendStatus(500);
  }

  try {
    let fsconf = fs.readFileSync(process.cwd() + "/data.json", "utf8");
    if (fsconf == "") {
      fsconf = "{}";
      console.info("Data initalized.");
    }
    global.misaka.data = JSON.parse(fsconf);
    if (!global.misaka.data.connect) global.misaka.data.connect = {};
    if (!global.misaka.data.cache) global.misaka.data.cache = {};
  } catch (err) {
    console.log(err);
    noerr = false;
    res.sendStatus(500);
  }
  if (noerr) {
    console.info("Config & data loaded.");
    res.sendStatus(200);
  }
});

module.exports = router;
