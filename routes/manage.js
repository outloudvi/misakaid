var express = require('express');
var router = express.Router();
var fs = require('fs');
var uuid = require('uuid/v4');

router.get('/show/peer', function (req, res, next) {
  let txt = "";
  for (i in global.misaka.data.connect)
    txt += JSON.stringify(global.misaka.data.connect[i]) + "<br>";
  res.send(txt);
});

router.get('/show/event', function (req, res, next) {
  let txt = "";
  for (i in global.misaka.data.cache)
    txt += JSON.stringify(global.misaka.data.cache[i]) + "<br>";
  res.send(txt);
});

router.get('/force/peer/:id/:title/:value', function(req, res, next){
  let id = req.params.id;
  let title = req.params.title;
  let value = req.params.value;
  try {
  global.misaka.data.connect[id][title] = value;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
    return;
  }
  res.sendStatus(200);
});

module.exports = router;
