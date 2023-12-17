var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req.auth);

  res.send('here is user info page');
});

module.exports = router;
