var Command=require('../iBot-Command.js');

exports.mod = function(ctx)
{
	this.loaded = function (server) {
		server.addCommand(new Command('hello', '', 'hello', this.cmdHello, [], 'Politely replies in kind.', 'hooktest'));
	}.bind(this);
	this.unloaded = function (server) {}.bind(this);
	
	/*this.core$cmd = function(server, prefix, invoker, target, cmd, params)
	{
		if(cmd === 'hellohook')
		{
			target.privmsg('world!');
		}
	}*/
	
	this.cmdHello = function (server, invoker, target) {
		target.privmsg('Hello!');
	}
}
