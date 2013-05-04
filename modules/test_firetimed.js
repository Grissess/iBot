exports.mod = function(context)
{
	this.loaded = function (server) {}.bind(this);
	this.unloaded = function (server) {}.bind(this);
	
	this.core$cmd = function(server, prefix, invoker, target, cmd, params)
	{
		if(!server.authenticator.test(invoker, 'test.firetimed', target)) {
			return;
		}
		switch(cmd)
		{
			case 'firetimed':
				server.fireTimed(parseInt(params[0]), params[1], 'test', server, target);
				break;
			case 'firecancel':
				server.fireCancel(params[0]);
				break;
			case 'firechange':
				server.fireChange(parseInt(params[0]), params[1]);
				break;
		}
	}

	this.test_firetimed$test = function(server, target)
	{
		server.send('PRIVMSG ' + target + ' :fired!');
	}
}
