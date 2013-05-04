var vm=require('vm');
var util=require('util');

var Command=require('../iBot-Command.js');

exports.mod = function(context)
{
	this.loaded = function (server) {
		server.addCommand(new Command('jsrun', 'r', 'js.run.run', this.cmdJSRun, ['js'], 'Runs the given JS code using eval(). Code has access to server (the current Server), invoker (a User), and target (a User or Channel). Changes made by this code are persistent and visible to other objects in the system; abuse may cause instability or compromise of security.', 'js'));
		server.addCommand(new Command('jssafe', 'r', 'js.run.safe', this.cmdJSSafe, ['jss'], 'Runs the given JS code using vm.runInThisContext(). Code has access to server (the current Server), invoker (a User), and target (a User or Channel). Changes made by this code are not persistent in the system, but may cause persistent changes outside of it (e.g. in the filesystem); abuse may cause instability or compromise of security.', 'js'));
		server.addCommand(new Command('jsclean', 'r', 'js.run.clean', this.cmdJSClean, ['jsc'], 'Runs the given JS code using vm.runInNewContext() with an empty context. In theory, this should mean that no dangerous function is exposed, and that operations are limited strictly to those that are language builtins. However, this is still a dangerous function, and should be used with caution.', 'js'));
	}.bind(this);
	this.unloaded = function (server) {}.bind(this);
	
	this.cmdJSRun = function (server, invoker, target, code) {
		var res=eval(code);
		target.privmsg('Result: '+util.inspect(res));
	}
	
	this.cmdJSSafe = function (server, invoker, target, code) {
		var res=vm.runInThisContext(code);
		target.privmsg('Result: '+util.inspect(res));
	}
	
	this.cmdJSClean = function (server, invoker, target, code) {
		var sandbox={};
		var res=vm.runInNewContext(code, sandbox);
		target.privmsg('Result: '+util.inspect(res)+'; Sandbox: '+util.inspect(sandbox));
	}
}
