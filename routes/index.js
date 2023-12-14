var { getQuery } = require('../src/common/databaseUtil');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ticket/list', async function (req, res, next) {
  var list = await getQuery("select * from ticket");
  console.log("----------------------");
  console.log(list);
  console.log("---------end-------------");
  return res.json(list);
});


module.exports = router;
