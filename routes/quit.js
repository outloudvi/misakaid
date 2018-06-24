var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res, next) {
  let noerr = true;
  try {
    if (!global.misaka.data) global.misaka.data = {};
    fs.writeFileSync(process.cwd() + "/data.json", JSON.stringify(global.misaka.data), "utf8");
  } catch (err) {
      console.log(err);
      noerr = false;
      res.sendStatus(500);
  }

  if (noerr) process.exit();
});

module.exports = router;
