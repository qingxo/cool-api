var { getQuery } = require('../src/common/databaseUtil');

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const app = require('../app');


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


router.post('/upload', (req, res) => {
  let fileObject = null;
  let filePath = '';

  // 判断上传文件是否为空
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send(
      {
        message: '上传失败',
        code: 500,

      }
    );
    return;
  }
  fileObject = req.files.file;
  // filePath = '../public/upload/' + fileObject.name;
  filePath = path.join(__dirname, '../public/upload') + '/' + fileObject.name;

  const fileFolder = path.join(__dirname, '../public/upload');
  // console.log("filepath:", filePath);
  // console.log("thepath:", path.join(__dirname, '../public/upload'))
  // 检查文件夹是否存在 ，不存在则进行上传处理
  if (!fs.existsSync(fileFolder)) {
    fs.mkdirSync(fileFolder);
  }

  fileObject.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send({
        message: 'system error',
        code: 1
      })
    }
    res.send({
      code: 200,
      data: '上传成功'
    })
  });
});

router.get('/download/:name', (req, res) => {
  const fileName = req.params.name;
  const file = {
    name: fileName,
    path: path.join(__dirname, '../public/upload') + '/' + fileName,
  }
  let isExist = fs.existsSync(path.resolve(file.path));

  if (isExist) {
    res.download(file.path);
  } else {
    res.send({
      code: 1,
      msg: 'file not exist'
    })
  }

});

module.exports = router;
