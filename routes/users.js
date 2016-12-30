var express = require('express');
var router = express.Router();

/* 定义模拟接口 */
router.post('/xxx/xxx', function(req, res, next) {
  res.json({
  	errorno:0,
  	msg:"接口返回：提交成功",
  	data:[1,2,3]
  });

});


/* 定义模拟接口 */
router.get('/url', function(req, res, next) {
  res.json({
  	errorno:0,
  	msg:"请求成功",
  	data:[1,2,3]
  });

});


module.exports = router;
