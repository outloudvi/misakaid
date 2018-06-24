var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res, next) {
  try {
    let fsconf = fs.readFileSync(process.cwd() + "/config.json", "utf8");
    global.misaka.config = JSON.parse(fsconf);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  try {
    let fsconf = fs.readFileSync(process.cwd() + "/data.json", "utf8");
    global.misaka.data = JSON.parse(fsconf);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  res.sendStatus(200);
});

module.exports = router;
