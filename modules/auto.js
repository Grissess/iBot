var Command = require('../iBot-Command.js');

exports.mod = function(context)
{
	this.channels = {};
	
	this.loaded = function (server) {
		server.addCommand(new Command('auto', 'wc', null, this.cmdAuto, [], 'Performs maintenance of automatic actions. + adds a channel to be joined, - removes the channel, and ? lists channels to be automatically joined. Note that, due to current architecture, this affects settings on all users for which this module is loaded.', 'auto'));
	}.bind(this);
	this.unloaded = function (server) {}.bind(this);

	/*this.core$cmd = function(server, prefix, invoker, target, cmd, params)
	{
		if(cmd === 'auto')
		{
			switch(params[0])
			{
				case 'join':
					server.fire('join_cmd', server, prefix, invoker, target, params[1], params[2]);
					break;
			}
		}
	}*/

	this.core$376 = function(server, prefix, message)
	{
		for(var kChannel in this.channels)
		{
			server.send('JOIN ' + kChannel);
		}
	}

	this.auto$join_cmd = function(server, prefix, invoker, target, opcode, channel)
	{
		switch(opcode)
		{
			case '+':
				if(server.authenticator.test(invoker, 'auto.add', target)) {
					if(typeof this.channels[channel] === 'undefined')
					{
						this.channels[channel] = true;
					}
					target.privmsg('done');
				}
				break;
			case '-':
				if(server.authenticator.test(invoker, 'auto.remove', target)) {
					if(typeof this.channels[channel] !== 'undefined')
					{
						delete this.channels[channel];
					}
					target.privmsg('done');
				}
				break;
			case '?':
				if(server.authenticator.test(invoker, 'auto.list', target)) {
					target.privmsg('Auto channels: ' + Object.keys(this.channels).join(', '));
				}
				break;
		}
	}
	
	this.auto$join = function (server, channel) {
		this.channels[channel]=true;
	}
	
	this.cmdAuto = function (server, invoker, target, op, channel) {
		server.fire('join_cmd', server, invoker.getPrefix(), invoker, target, op, channel);
	}
}
