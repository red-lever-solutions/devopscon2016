var natsort = require('natsort');
var webAppAPI = require('koa')();
var koaRouter = require('koa-router')();
var serve = require('koa-router-static');
var cors = require('koa-cors');
var request = require('request');
var os=require('os');

var getMembersUrl='http://' + process.env.AGENT_IP + ':8500/v1/agent/members';
var servicesUrl='http://' + process.env.AGENT_IP + ':8500/v1/catalog/service/'+process.env.SERVICE_NAME;
var registerUrl='http://' + process.env.AGENT_IP + ':8500/v1/catalog/register';


function registerService( callback ){
	request.put({
		url: registerUrl,	
	 	json:	{
			"Node": process.env.SERVICE_NAME + '-' + process.env.HOSTNAME,
			"Address": process.env.HOST_IP,
			"Service": {
				"Service": process.env.SERVICE_NAME,
				"Tags": ["web-client"],
				"Address": process.env.HOST_IP,
	 			"Port": Number(process.env.LISTENING_PORT)
				}
			}
		},
		function(err,res){
			if (err) {
				callback(err);
			}else{
				callback(null,res);
			}
		}	
	);

}

function getMembers( callback ) {

		request.get( {
			url: getMembersUrl
		},
		function(err, response, body ) {
			if (err) {
				callback(err);
			}else{
				callback(null,JSON.parse(body));
			}
		});
}

function getServices( callback ) {

		request.get( {
			url: servicesUrl
		},
		function(err, response, body ) {
			if (err) {
				callback(err);
			}else{
				if (body=="No known Consul servers"){
					callback(null,body);
				}else{
					callback(null,JSON.parse(body));
				}
			}
		});
}



koaRouter.get('/*', serve('./public/'));

koaRouter.get('/list', function *(next) {
	var self = this;
	yield new Promise( ( resolve , reject ) => {
		getServices(function(err,res){
			if (err) {
				self.status = 500;
				self.body =  {status:'error', message: 'Could not get member list'};
				resolve();
			}else{
				if (res=="No known Consul servers"){
					self.status = 500;
					self.body =  {status:'error', message: 'Could not get member list'};
					resolve();
				}else{
					var members =[]
			 		for (var jj = 0; jj < res.length; jj++){
						members.push([ process.env.SERVICE_NAME, res[jj].Address, res[jj].Address == process.env.HOST_IP ] )
					}
					members.sort(natsort())
					self.body = {status: 'success', members: members};
					resolve();
				}
			}
		});
	});
});


var corsOptions = {
	'origin' : true, 
	'methods' : ['GET']
};

webAppAPI
	.use( cors(corsOptions))
	.use( koaRouter.routes())
	.use( koaRouter.allowedMethods());
	
webAppAPI.listen(process.env.LISTENING_PORT);
process.stdout.write('NodeBackend started listening to port ' + process.env.LISTENING_PORT + '\n')

//registerService(function(err,res){
//	if (err){
//		console.log(err);
//		}
//});

