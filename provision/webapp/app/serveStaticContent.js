var koa = require('koa');
var koaFavIcon = require('koa-favicon');
var serve = require('koa-static');
var cors = require('koa-cors');

var staticContentServer = koa();
staticContentServer.use(cors());
staticContentServer.use(koaFavIcon(__dirname + '/public/favicon.ico'));
staticContentServer.use( serve('./public' ) );
//app.use( serve('./src' ) );




module.exports = function(callback) {

	try {

	staticContentServer.listen(process.env.LISTENING_PORT_WWW);

	process.stdout.write('Webserver started listening to port ' + process.env.LISTENING_PORT_WWW + '\n')
	
	callback(null,{'status':'success'});

	}catch (err) {
		callback(err);
	}

}

