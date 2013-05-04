var Command=require('../iBot-Command.js');

exports.mod = function(context)
{
	this.loaded = function (server) {
		server.addCommand(new Command('raw', 'r', 'raw.raw', this.cmdRaw, [], 'Sends the data as specified to the server immediately.', 'raw'));
		server.addCommand(new Command('rawtimed', 'fr', 'raw.rawtimed', this.cmdRawTimed, ['rt'], 'Sends the data to the server after the specified delay (in seconds; 0 or negative values cause it to occur on the next timer tick).', 'raw'));
	}.bind(this);
	this.unloaded = function (server) {}.bind(this);
	
	/*this.core$cmdraw = function(server, prefix, invoker, target, cmd, params)
	{
		switch(cmd)
		{
			case 'raw':
				if(server.authenticator.test(invoker, 'raw.raw', target))
				{
					server.fire('raw', server, params.join(' '));
				}
				break;
			case 'rawtimed':
				if(server.authenticator.test(invoker, 'raw.rawtimed', target))
				{
					server.fireTimed(params[0], undefined, 'raw', server, params.slice(1).join(' '));
				}
				break;
		}

	}*/
	
	this.cmdRaw = function (server, invoker, target, data) {
		server.fire('raw', server, data);
	}
	
	this.cmdRawTimed = function (server, invoker, target, delay, data) {
		server.fireTimed(delay, undefined, 'raw', server, data);
	}

	this.raw$raw = function(server, data)
	{
		server.send(data);
	}
}
