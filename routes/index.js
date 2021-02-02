var express = require('express');
var router = express.Router();

var res_obj = 
{
	title: "",
	page: "",
	login: false,
};


/* GET home page. */
router.get('/', function(req, res, next) 
{
	res_obj.title = "Home Page";
	res_obj.page = "home";
	res.render('index', res_obj);
});

router.get('/foo', function(req, res, next) 
{
	res_obj.title = "Foo Page";
	res_obj.page = "foo";
	res.render('index', res_obj);
});

router.get('/login', function(req, res, next) 
{
	res_obj.title = "Login",
	res_obj.page = "login";
	res.render('index', res_obj);
});

router.get('/logout', function(req, res)
{
	res_obj.title = "Home Page";
	res_obj.page = "home";
	// delete res_obj.login;
	res_obj.login = false;
	req.session.destroy();
	res.render('index', res_obj);
});

router.get('/login2', function(req, res)
{
	res_obj.title = "Home Page";
	res_obj.page = "home";
	res_obj.login = req.session.logged;
	res.render('index', res_obj);
});

router.post('/login', function(req, res)
{
	var username = req.body['username'];
	var password = req.body['password'];
	
	
	if(username != "")
	{
		if(password != "")
		{
			if(username == "paulo" && password == "teste")
			{
				req.session.logged = true;
				res_obj.login = req.session.logged;
				delete res_obj.err_username_empty;
			}
		}
	}
	else 
	{
		res_obj.err_username_empty = true;
	}
	res.render('index', res_obj);
});

module.exports = router;
