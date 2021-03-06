var Command=require('../iBot-Command.js');

exports.mod = function(context)
{
	this.loaded = function (server) {
		server.addCommand(new Command('channels', 'oU', null, this.cmdChannels, ['cs'], 'Reports the channels in which the user is observed; by default, the user is the bot.', 'info'));
		server.addCommand(new Command('isupport', 'w', 'info.isupport', this.cmdISupport, ['is'], 'Reports the named ISUPPORT field as recorded from the 005 response from this server.', 'info'));
		server.addCommand(new Command('mask', 's', 'info.mask', this.cmdMask, [], 'Returns the full masks matching the nicks given as a parameter.', 'info'));
	}.bind(this);
	this.unloaded = function (server) {}.bind(this);
	
	/*this.core$cmd = function(server, prefix, invoker, target, cmd, params)
	{
		switch(cmd)
		{
			case 'channels':
				var k;
				if(typeof params[0] === 'undefined')
				{
					if(!server.authenticator.test(invoker, 'info.channels.bot', target)) {
						return;
					}
					k = Object.keys(server.user.channels);
				}
				else
				{
					if(!server.authenticator.test(invoker, 'info.channels.user', target)) {
						return;
					}
					k = Object.keys(server.users[params[0]].channels);
				}

				target.privmsg('Channels: ' + k.join(', '));
				break;
			case 'isupport':
				if(server.authenticator.test(invoker, 'info.isupport', target)) {
					target.privmsg('ISUPPORT: ' + params[0] + ' = ' + server.isupport[params[0]]);
				}
				break;
			case 'identof':
				if(server.authenticator.test(invoker, 'info.identof', target)) {
					target.privmsg('Ident of ' + params[0] + ' = ' + server.users[params[0]].ident);
				}
				break;
			case 'hostof':
				if(server.authenticator.test(invoker, 'info.hostof', target)) {
					target.privmsg('Host of ' + params[0] + ' = ' + server.users[params[0]].host);
				}
				break;

		}
	}*/

	this.core$mode = function(server, prefix, channel, state, mode)
	{
		channel.privmsg('Mode change detected: ' + (state ? '+' : '-') + mode.mode + ' ' + mode.param);
	}
	
	this.cmdChannels = function (server, invoker, target, user) {
		var k=null;
		if(typeof user === 'undefined') {
			if(!server.authenticator.test(invoker, 'info.channels.bot')) {
				target.privmsg(server.authenticator.failMsg('info.channels.bot'));
				return;
			}
			user=server.user;
		} else {
			if(!server.authenticator.test(invoker, 'info.channels.user')) {
				target.privmsg(server.authenticator.failMsg('info.channels.user'));
				return;
			}
		}
		target.privmsg('Channels of '+user.nick+': '+Object.keys(user.channels).join(','));
	}
	
	this.cmdISupport = function (server, invoker, target, field) {
		target.privmsg('ISUPPORT field '+field+': '+server.isupport[field]);
	}
	
	this.cmdMask = function (server, invoker, target, users) {
		if(users.length==0) {
			target.privmsg('No users matched.');
			return;
		}
		var res=[]
		for(var i in users) {
			res.push(users[i].nick+'='+users[i].getMask());
		}
		target.privmsg('Masks: '+res.join(','));
	}
}
