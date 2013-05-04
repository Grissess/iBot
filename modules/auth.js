exports.mod = function(context)
{
	this.old_authenticators={}; //Server uniqueName -> an authenticator object
	
	this.loaded = function (server) {}.bind(this);
	this.unloaded = function (server) {}.bind(this);
	
	function PermNode(path) {
		this.path=path;
		
		this.getComponents = function () {
			return this.path.split('.');
		}.bind(this);
		
		this.isWildcard = function () {
			return this.path[this.path.length-1]=='*';
		}.bind(this);
		
		this.match = function (othernode) { //We're the pattern, the one with the wildcard (if any).
			var cmps=this.getComponents(); //Other is the node to be tested, and cannot be a wildcard.
			var ocmps=othernode.getComponents();
			if(cmps.length>ocmps.length) {
				//We're too specific, try another.
				return false;
			}
			if(cmps.length<ocmps.length && !this.isWildcard()) {
				return false;
			}
			for(var i=0; i<Math.min(cmps.length, ocmps.length); i++) {
				if(cmps[i]!='*') {
					if(cmps[i]!=ocmps[i]) {
						return false;
					}
				}
			}
			//We got here because:
			//1- There was a component-for-component match.
			//2- There was a component-for-component match (with some wildcards on our side, especially the last one).
			//In either case, we're good.
			return true;
		}.bind(this);
	}
	
	function Group(allow, deny, parent) {
		allow=(typeof allow === 'undefined':[]:allow);
		deny=(typeof deny === 'undefined':[]:deny);
		parent=(typeof nodes === 'undefined':null:parent);
		
		this.allow=allow;
		this.deny=deny;
		this.parent=parent;
		
		this.NOT_SPEC=0;
		this.ALLOWED=1;
		this.DENIED=2;
		this.resolve = function (node) {
			if(typeof node === 'string') {
				node=new PermNode(node);
			}
			var ret=this.NOT_SPEC;
			for(var i in this.allow) {
				if(this.allow[i].match(node)) {
					ret=this.ALLOWED;
					break;
				}
			}
			if(ret==this.ALLOWED) {
				for(var i in this.deny) {
					if(this.deny[i].match(node) {
						ret=this.DENIED;
						break;
					}
				}
			}
			if(ret!=this.DENIED && this.parent !== null) {
				var parret=this.parent.resolve(node);
				ret=Math.max(ret, parret);
			}
			return ret;
		}.bind(this);
		
		this.can = function (node) {
			return this.resolve(node)==this.ALLOWED;
		}.bind(this);
	}
	
	function GroupManager(udb, gdb) {
		
}
