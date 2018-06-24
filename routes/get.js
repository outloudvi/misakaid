var express = require('express');
var router = express.Router();
var fs = require('fs');
var uuid = require('uuid/v4');
var validate = require('../mod/validate');

router.get('/peer/new', function (req, res, next) {
  let newuuid = uuid();
  let timenow = new Date().getTime();
  let newpeer = {
    uuid: newuuid,
    enable: true,
    ip: req.ip,
    comment: req.query.c ? req.query.c : "",
    createTime:  timenow,
    lastQueryTime: timenow
  };
  global.misaka.data.connect[newuuid] = newpeer;
  res.send( JSON.stringify(newpeer) );
});

router.get('/peer/destroy/:id', function (req, res, next) {
  let id = req.params.id;
  if(validate.ip(id,req.ip) == false) {
    res.sendStatus(403);
    return;
  }
  let timenow = new Date().getTime();
  if(global.misaka.data.connect[id]) {
    let tmp = global.misaka.data.connect[id];
    tmp.enable = false;
    tmp.lastQueryTime = timenow;
    global.misaka.data.connect[id] = tmp;
    res.sendStatus(200);
    return;
  }
  res.sendStatus(404);
});

router.get('/event/new/:via/to/:dest', function (req, res, next) {
  let newuuid = uuid();
  let timenow = new Date().getTime();
  let idvia = req.params.via;
  let iddest = req.params.dest;
  if(validate.ip(idvia,req.ip) == false) {
    res.sendStatus(403);
    return;
  }
  let newevent = {
    uuid: newuuid,
    via: idvia,
    dest: iddest,
    content: req.query.c ? req.query.c : "",
    createTime:  timenow,
    read: false
  };
  global.misaka.data.cache[newuuid] = newevent;
  res.send( JSON.stringify(newevent) );
});

module.exports = router;
