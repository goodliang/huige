var express = require('express');
var router = express.Router();




/* GET home page. */
router.all('*', function(req, res, next) {

	var request = req.params[0];
	console.log(request);
	if((request === "/")||(request === "")) {
		request = "/index.html";
	}
	if((request.substr(0, 1) === "/")&&(request.substr(request.length - 4) === "html")) {
		request = request.substr(1);
		res.render(request);
			console.log(request);
	} else {

		console.log('go next')
		next();


	}



	// var url=req.param

	// console.log('a url ')

 //  res.render('index', { title: 'Express' });
});

module.exports = router;
