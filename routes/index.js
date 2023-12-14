var { getQuery } = require('../src/common/databaseUtil');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ticket/list', async function (req, res, next) {
  var list = await getQuery("select * from ticket");
  return res.json(list);
});


router.get('/ticket/:id', async function (req, res, next) {
  const id = req.params.id;

  var list = await getQuery("select * from ticket where id=" + id);
  return res.json(list);
});


router.get('/test/:id', async function (req, res, next) {
  const id = req.params.id;

  var list = await getQuery("select * from ticket where id=" + id);
  return res.json(list);
});


module.exports = router;
