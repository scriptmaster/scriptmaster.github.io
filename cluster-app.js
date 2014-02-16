var http	= require('http'),
	express	= require('express'),
	path	= require('path'),
	swig	= require('swig'),
	os		= require('os'),
	fs		= require('fs'),
	cluster	= require('cluster'),
	os		= require('os'),
	cpus	= os.cpus().length;


if (cluster.isMaster) {
	console.log('\nTotal number of cores: ' + numCPUs);
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', function (worker, code, signal) {
		console.log(new Date() + ': Worker ' + worker.process.pid + ' exited. Code: '+code+', Signal: '+signal);
		cluster.fork();
	});

	master();
} else {
	worker();
}

function worker(){

	var app = express();

	app.use(express.static(path.join(__dirname, 'public')));

	app.get('/stats', function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/html'});

		res.end('Telebuy App. Stats:<br />'+JSON.stringify(os.cpus())+
				'<br /><br />Uptime: '+os.uptime()+'<br/>loadavg: '+os.loadavg()+
				'<br />Platform: '+os.platform()+' - '+os.release()+'- arch: '+os.arch()+
				'<br />Hostname: '+os.hostname()+'<br/>Type:'+os.type()+
				'<br />totalmem: '+os.totalmem()+'<br/>freemem:'+os.freemem()+
				'<br />NetworkInterfaces: '+JSON.stringify(os.networkInterfaces()));

	});

	http.createServer(app).listen(process.env.VMC_APP_PORT || 1337, function(){
		console.log('Express server listening on port ' + app.get('port'));
	});
}
