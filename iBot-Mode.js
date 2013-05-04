module.exports = function(mode, param, by)
{
	param=(typeof param === 'undefined'?null:param);
	by=(typeof by === 'undefined'?null:by);
	this.mode = mode;
	this.param = param;
	this.by=by;
	
	this.toString = function () {
		return '<Mode '+this.mode+' on '+this.param+' by '+this.by+'>';
	}
}
