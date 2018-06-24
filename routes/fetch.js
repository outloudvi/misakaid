var express = require('express');
var router = express.Router();
var fs = require('fs');
var validate = require('../mod/validate');

router.get('/eventof/:id', function (req, res, next) {
  let id = req.params.id;
  if (!global.misaka.data.connect[id]) {
    res.sendStatus(404);
    return;
  }
  if (validate.ip(id, req.ip) == false) {
    res.sendStatus(403);
    return;
  }
  let timenow = new Date().getTime();
  let tmp = global.misaka.data.connect[id];
  tmp.lastQueryTime = timenow;
  global.misaka.data.connect[id] = tmp;
  let events = [];
  for (i in global.misaka.data.cache) {
    if (global.misaka.data.cache[i].dest == id) {
      if (global.misaka.data.cache[i].read == false) {
        events.push(global.misaka.data.cache[i])
        global.misaka.data.cache[i].read = true;
      }
    }
  }
  res.send(JSON.stringify(events));
});

router.get('/eventof/:id/all', function (req, res, next) {
  let id = req.params.id;
  if (!global.misaka.data.connect[id]) {
    res.sendStatus(404);
    return;
  }
  if (validate.ip(id, req.ip) == false) {
    res.sendStatus(403);
    return;
  }
  let timenow = new Date().getTime();
  let tmp = global.misaka.data.connect[id];
  tmp.lastQueryTime = timenow;
  global.misaka.data.connect[id] = tmp;
  let events = [];
  for (i in global.misaka.data.cache)
    if (global.misaka.data.cache[i].dest = id) {
      events.push(global.misaka.data.cache[i])
      global.misaka.data.cache[i].read = true;
    }
  res.send(JSON.stringify(events));
});

module.exports = router;
